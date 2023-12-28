import { useEffect, useRef, useState } from 'react';
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
import { useParams, useLocation } from 'react-router-dom';
import { wordCard, gameStatistics } from '../types';
import { useNavigate } from 'react-router-dom';
import Background from "../assets/images/background.jpg";
import BackgroundGame from "../assets/images/backgroundGame.jpg";



const GamePage = () => {

    const navigate = useNavigate();
    const wordPairsRaw = localStorage.getItem('wordList');
    const wordPairsData = wordPairsRaw ? JSON.parse(wordPairsRaw) as wordCard[] : [];
    if (!wordPairsData || wordPairsData === null) {
        navigate('/');
    }
    const isEnoughWords = useRef<boolean>(true);
    const gameStatisticsRef = useRef<gameStatistics>({
        totalQuestions: 0,
        correctAnswers: 0,
        skippedAnswers: 0,
        incorrectAnswers: 0,
        totalTime: 0,
        words: []
    });
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

    const { questions } = useParams<{ questions: string }>();
    const numberOfQuestions = Number(questions);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const topicIds = queryParams.get('topics')?.split(',').map(Number) || [];
    const wordPairs = useRef<wordCard[]>(wordPairsData);

    useEffect(() => {
        const filteredPairs = wordPairsData.filter((wordPair) => {
            return topicIds.includes(wordPair.topic.id)
        });
        if (filteredPairs.length < 5) {
            if (isEnoughWords.current) {
                console.log('not enough words, redirecting')
                return navigate('/');
            }
            isEnoughWords.current = false;
        }
        wordPairs.current = filteredPairs;
    }, [topicIds, wordPairsData]);


    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState<number>(0);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
    const [musicSource, setMusicSource] = useState<string>('game');
    const [time, setTimer, restartTimer] = useTimeout(TIME_FOR_QUESTIONS, false, INITIAL_DELAY, () => {
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
        if (!hasFirstCountdownFinished) {
            return;
        }
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [musicSource, hasFirstCountdownFinished]);

    useEffect(() => {
        if (window.location.href.includes('game')) {
            document.body.style.backgroundImage = `url(${BackgroundGame})`;
        }
        return () => {
            document.body.style.backgroundImage = `url(${Background})`;
        }
    }, [])

    useEffect(() => {
        if (wordPairs.current.length < 5) {
            return
        }
        const pair = wordPairs.current[Math.floor(Math.random() * (wordPairs.current.length - 1))];
        question.current = pair.word;
        answer.current = pair.translation;
        const localOptions: string[] = [answer.current];
        while (localOptions.length < 4) {
            const randomPair = wordPairs.current[Math.floor(Math.random() * (wordPairs.current.length - 1))];
            if (!localOptions.includes(randomPair.translation)) {
                localOptions.push(randomPair.translation);
            }
        }
        setOptions(localOptions.sort(() => Math.random() - 0.5));
        setTimer(true);
    }, [currentQuestionNumber]);
    const handleStatistics = (status: "correct" | "incorrect" | "skipped") => {
        gameStatisticsRef.current.totalQuestions++;
        if (status === "skipped") {
            gameStatisticsRef.current.skippedAnswers++;
            gameStatisticsRef.current.totalTime += (TIME_FOR_QUESTIONS - time)
        }
        if (status === "correct") {
            gameStatisticsRef.current.correctAnswers++;
            gameStatisticsRef.current.totalTime += (TIME_FOR_QUESTIONS - time);
        }
        if (status === "incorrect") {
            gameStatisticsRef.current.incorrectAnswers++;
            gameStatisticsRef.current.totalTime += (TIME_FOR_QUESTIONS - time);
        }
        gameStatisticsRef.current.words.push({
            word: question.current,
            translation: answer.current,
            success: status,
            time: TIME_FOR_QUESTIONS - time,
            topic: wordPairs.current.find((wordPair) => wordPair.word === question.current)?.topic || { id: 0, name: '' }
        });
    }

    const handleSkip = () => {
        if (!isGameOn.current || isRevealed) {
            return;
        }
        setTimer(false);
        handleStatistics('skipped');
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
        if (isGameOver) {
            setMusicSource('');
        }
    }, [isGameOver]);

    useEffect(() => {
        if (isGameOn.current) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isGameOn.current]);

    const onChoice = (isCorrect: boolean) => {
        if (!isGameOn.current) {
            return;
        }
        setTimer(false);
        if (isCorrect) {
            setNumberOfCorrectAnswers(prev => prev + 1);
            handleStatistics('correct');
        }
        else {
            handleStatistics('incorrect');
        }
        setMusicSource('choiceMade');
        setIsRevealed(true);

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
                    {isGameOver && <GameOverModal
                        gameStatistics={gameStatisticsRef.current}
                        onRestart={() => {
                            setIsGameOver(false);
                            setCurrentQuestionNumber(1);
                            setNumberOfCorrectAnswers(0);
                            gameStatisticsRef.current = {
                                totalQuestions: 0,
                                correctAnswers: 0,
                                skippedAnswers: 0,
                                incorrectAnswers: 0,
                                totalTime: 0,
                                words: []
                            };
                            setHasFirstCountdownFinished(false);
                            setIsRevealed(false);
                            restartTimer();
                        }} onExit={() => {
                            navigate('/');
                        }} />}
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
