import React, { useEffect, useRef, useState } from 'react';
import wordPairsData from '../wordPairs.json';
import styles from '../styles';
import useTimeout from '../hooks/useTimeout';
import MultipleChoice from '../components/multipleChoice';
import { GameOverModal } from '../components/modals';
import { InitialCountdown, Question, Timer, Counter } from '../components/game';

export interface WordPair {
    verb: string;
    translation: string;
    group?: string;
}

const GamePage = () => {
    const numberOfQuestions = 100; // TODO: make this a prop read from the URL
    const wordPairs = wordPairsData as WordPair[];
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState<number>(0);
    const [CurrentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
    const [time, setTimer] = useTimeout(60, false, 5500, () => {
        handleNext();
    });
    const [key, setKey] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const isGameOn = useRef<boolean>(false);
    const answer = useRef<string>('');
    const question = useRef<string>('');
    const [options, setOptions] = useState<string[]>([]);
    const [hasFirstCountdownFinished, setHasFirstCountdownFinished] = useState<boolean>(false);

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
    }, [CurrentQuestionNumber]);

    const handleNext = () => {
        if (!isGameOn.current) {
            return;
        }
        if (CurrentQuestionNumber === numberOfQuestions) {
            isGameOn.current = false;
            setIsGameOver(true);
            return;
        }
        setCurrentQuestionNumber(prev => prev + 1);
        setKey(prev => prev + 1);
    };

    const onChoice = (isCorrect: boolean) => {
        if (!isGameOn.current) {
            return;
        }
        if (isCorrect) {
            setNumberOfCorrectAnswers(prev => prev + 1);
        }
        setTimer(false);
        handleNext();
    };

    return (
        <div className="w-full h-screen flex flex-col">
            {hasFirstCountdownFinished ? (
                <div className="flex flex-col grow">
                    <div className='flex flex-col w-full justify-center items-center mt-6'>
                        <Question key={"question" + key} question={question.current} />
                    </div>
                    <div className="flex flex-0.5 flex-row justify-end items-center gap-3 pt-2 px-10">
                        <button className={styles.grayButton} onClick={handleNext}>
                            Skip
                        </button>
                    </div>
                    <div className='flex justify-between align-middle gap-3 p-10'>
                        <Timer time={time} />
                        <Counter key={"counter" + key} value={numberOfCorrectAnswers} />
                    </div>
                    <div className='flex grow p-8 items-center'>
                        <MultipleChoice key={"choice" + key} choices={options} onChoice={onChoice} answer={answer.current} />
                    </div>
                    {isGameOver && <GameOverModal numberOfCorrectAnswers={numberOfCorrectAnswers} numberOfQuestions={numberOfQuestions} onRestart={() => { }} onExit={() => { }} />}
                </div>
            ) : (

                <InitialCountdown onFinished={() => {
                    isGameOn.current = true;
                    setHasFirstCountdownFinished(true);
                }} />)}
        </div >
    );
};

export default GamePage;
