import React, { useEffect, useRef, useState } from 'react';
import wordPairsData from '../wordPairs.json';
import { motion } from 'framer-motion';
import styles from '../styles';
import useTimeout from '../hooks/useTimeout';
import MultipleChoice from '../components/multipleChoice';

export interface WordPair {
    verb: string;
    translation: string;
    group?: string;
}

const GamePage = () => {
    const numberOfQuestions = 100; // TODO: make this a prop read from the URL
    const wordPairs = wordPairsData as WordPair[];
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState<number>(0);
    const [QuestionsNumber, setQuestionsNumber] = useState<number>(1);
    const [time, setTimer] = useTimeout(60, false, () => alert('Time is up!'));
    const answer = useRef<string>('');
    const question = useRef<string>('');
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        const pair = wordPairs[Math.floor(Math.random() * (wordPairs.length - 1))];
        console.log(pair)
        question.current = pair.verb;
        answer.current = pair.translation;

        const localOptions: string[] = [answer.current];
        while (localOptions.length < 4) {
            const randomPair = wordPairs[Math.floor(Math.random() * (wordPairs.length - 1))];
            if (!localOptions.includes(randomPair.translation)) {
                localOptions.push(randomPair.translation);
            }
        }
        setOptions(localOptions.sort(() => Math.random() - 0.5)); // shuffle the options
        setTimer(true);
    }, [QuestionsNumber]);

    const handleNext = () => {
        if (QuestionsNumber === numberOfQuestions) {
            alert('Game over!');
            return;
        }
        setQuestionsNumber(QuestionsNumber + 1);
    };

    const onChoice = (isCorrect: boolean) => {
        if (isCorrect) {
            setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
        }
        setTimer(false);
        handleNext();
    };

    return (
        <div className="w-full grow ">
            <div className="flex flex-col">
                <div className='flex flex-col w-full justify-center items-center mt-6'>
                    <div className="flex flex-row w-fit bg-white justify-center h-20 px-20">
                        <p className='font-normal text-lg'>What is the translation of <p className='font-bold text-3xl text-center'>{question.current}</p></p>
                    </div>
                </div>
                <div className="flex flex-0.5 flex-row justify-end items-center gap-3 pt-2 px-10">
                    <button className={styles.grayButton} onClick={handleNext}>
                        Skip
                    </button>
                </div>
                <div className='flex flex-1 justify-between align-middle gap-3 p-10'>
                    <div className='flex flex-row  gap-3 p-4 bg-white shadow-sm rounded-xl'>
                        <p className='text-5xl font-bold'>{time}</p>
                    </div>
                    <div className='flex flex-row  gap-3 p-4 bg-white shadow-sm rounded-xl'>
                        <p className='text-5xl font-bold'>{numberOfCorrectAnswers}</p>
                    </div>
                </div>
                <div className='flex grow p-10'>
                    <MultipleChoice choices={options} onChoice={onChoice} answer={answer.current} />
                </div>
            </div>

        </div >
    );
};

export default GamePage;
