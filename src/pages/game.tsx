import React, { useEffect, useRef, useState } from 'react';
import wordPairsData from '../wordPairs.json';
import styles from '../styles';
import useTimeout from '../hooks/useTimeout';
import MultipleChoice from '../components/multipleChoice';
import { GameOverModal } from '../components/modals';
import { InitialCountdown, Question, Timer, Counter } from '../components/game';
import { TIME_FOR_QUESTIONS, INITIAL_DELAY } from '../constants';
import GameFooter from '../components/game/gameFooter';
import gameMusic from './../assets/sounds/game.wav';
import nextQuestion from './../assets/sounds/nextQuestion.mp3';
import choiceMade from './../assets/sounds/choiceMade.mp3';
import { useParams } from 'react-router-dom';

export interface WordPair {
    verb: string;
    translation: string;
    group?: string;
}

const GamePage = () => {
    const availableMusic = [
        {
            name: 'game',
            src: gameMusic,
            isRepeatable: true
        },
        {
            name: 'nextQuestion',
            src: nextQuestion,
            isRepeatable: false
        },
        {
            name: 'choiceMade',
            src: choiceMade,
            isRepeatable: false
        }
    ]
    const [musicSource, setMusicSource] = useState<string>('game');
    const numberOfQuestions = Number(useParams<{ questions: string }>().questions);
    const wordPairs = wordPairsData as WordPair[];
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState<number>(0);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
    const [time, setTimer] = useTimeout(TIME_FOR_QUESTIONS, false, INITIAL_DELAY, () => {
        handleSkip();
    });
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const [key, setKey] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const isGameOn = useRef<boolean>(false);
    const answer = useRef<string>('');
    const question = useRef<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [hasFirstCountdownFinished, setHasFirstCountdownFinished] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState<boolean>(true);

    useEffect(() => {
        const muteButton = document.getElementById('mute-button-click');
        muteButton?.click();
    }, [])
    useEffect(() => {
        if (!hasFirstCountdownFinished) 
        {
            return;
        }
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [musicSource, hasFirstCountdownFinished]);

    useEffect(() => {
        const pair = wordPairs[Math.floor(Math.random() * (wordPairs.length - 1))];
        question.current = pair.verb;
        answer.current = pair.translation;

        const localOptions: string[] = [answer.current];
        while (localOptions.length < 4) {
            const randomPair = wordPairs[Math.floor(Math.random() * (wordPairs.length - 1))];
            if (!localOptions.includes(randomPair.translation)) {
                localOptions.push(randomPair.translation);
            }
        }
        setOptions(localOptions.sort(() => Math.random() - 0.5));
        setTimer(true);
    }, [currentQuestionNumber]);

    const handleSkip = () => {
        if (!isGameOn.current || isRevealed) {
            return;
        }
        setTimer(false);
        setMusicSource('choiceMade');
        setIsRevealed(true);
        handleNext();
    };

    const handleNext = () => {
        if (!isGameOn.current) {
            return;
        }
        if (currentQuestionNumber === numberOfQuestions) {
            isGameOn.current = false;
            setIsGameOver(true);
            return;
        }
        setTimeout(() => {
            setMusicSource('nextQuestion');
            setIsRevealed(false);
            setCurrentQuestionNumber(prev => prev + 1);
            setKey(prev => prev + 1);
        }, 3000);

    };

    useEffect(() => {
        if (isGameOn.current) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
        console.log('next question', musicSource);
    }, [isGameOn.current]);

    const onChoice = (isCorrect: boolean) => {
        if (!isGameOn.current) {
            return;
        }
        if (isCorrect) {
            setNumberOfCorrectAnswers(prev => prev + 1);
        }
        setMusicSource('choiceMade');
        setIsRevealed(true);
        console.log('choice made', musicSource)
        setTimer(false);
        handleNext();
    };

    return (
        <div className="w-full h-screen flex flex-col">
            {hasFirstCountdownFinished ? (
                <div className="flex flex-col grow">
                    <Question key={"question" + key} question={question.current} onAnimationFinish={
                        () => {
                            setMusicSource('game');
                        }
                    } />
                    <div className="flex flex-0.5 flex-row justify-end items-center gap-3 pt-2 md:px-10 px-5">
                        <button className={styles.grayButton} onClick={handleSkip}>
                            Skip
                        </button>
                    </div>
                    <div className='flex justify-between align-middle gap-3 md:p-10 p-5'>
                        <Timer time={time} />
                        <Counter key={"counter" + key} value={numberOfCorrectAnswers} />
                    </div>
                    <div className='flex grow p-8 items-center'>
                        <MultipleChoice key={"choice" + key} choices={options} onChoice={onChoice} answer={answer.current} isRevealed={isRevealed} />
                    </div>
                    {isGameOver && <GameOverModal numberOfCorrectAnswers={numberOfCorrectAnswers} numberOfQuestions={numberOfQuestions} onRestart={() => { }} onExit={() => { }} />}
                </div>
            ) : (

                <InitialCountdown onFinished={() => {
                    isGameOn.current = true;
                    setHasFirstCountdownFinished(true);
                }} />)}
            <GameFooter numberOfQuestions={numberOfQuestions} currentQuestionNumber={currentQuestionNumber} isMuted={isMuted} setIsMuted={setIsMuted} hasFirstCountdownFinished={hasFirstCountdownFinished}
            />
            <audio ref={audioRef} src={availableMusic.find((file) => file.name === musicSource)?.src} loop={availableMusic.find((file) => file.name === musicSource)?.isRepeatable} muted={isMuted} />
        </div >
    );
};

export default GamePage;
