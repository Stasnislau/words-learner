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
    const numberOfQuestions = 10; // TODO: make this a prop read from the URL
    const [wordPairs, setWordPairs] = useState<WordPair[]>(wordPairsData);
    const counter = useRef<number>(wordPairs.length - 1);
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [QuestionsNumber, setQuestionsNumber] = useState<number>(1);
    const [time, setTimer] = useTimeout(60, false, () => alert('Time is up!'));
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        const pair = wordPairs[counter.current];
        setQuestion(pair['translation']);
        setAnswer(pair['verb']);
        const options: string[] = [pair['verb']];
        while (options.length !== 4) {
            const randomIndex = Math.floor(Math.random() * wordPairs.length);
            const randomPair = wordPairs[randomIndex];

            if (randomPair['verb'] !== pair['verb'] && !options.includes(randomPair['verb'])) {
                options.push(randomPair['verb']);
            }
        }
        setTimer(true);
        setOptions(options);
    }, []);

    const handleNext = (): void => {
        counter.current--;
        if (counter.current === -1) {
            counter.current = wordPairs.length - 1;
        }
        if (QuestionsNumber === numberOfQuestions) {
            alert('Game Over!');
            return;
        }

        const pair = wordPairs[counter.current];
        setQuestion(pair['translation']);
        setAnswer(pair['verb']);
        const options: string[] = [answer];
        while (options.length !== 4) {
            const randomIndex = Math.floor(Math.random() * wordPairs.length);
            const randomPair = wordPairs[randomIndex];
            if (randomPair['verb'] !== pair['verb'] && !options.includes(randomPair['verb'])) {
                options.push(randomPair['verb']);
            }
        }
        setOptions(options);
        setQuestionsNumber((prev) => prev + 1);
        setTimer(true);
    };

    const onChoice = (isCorrect: boolean) => {
        setTimer(false);
        if (isCorrect) {
            setCorrectAnswers(correctAnswers + 1);
        }
        handleNext();
    }

    return (
        <div className="w-full grow ">
            <div className="flex flex-col">
                <div className='flex flex-col w-full justify-center items-center mt-6'>
                    <div className="flex flex-row w-fit bg-white justify-center h-20 px-20">
                        <p className='font-normal text-lg'>What is the translation of <p className='font-bold text-3xl text-center'>{question}</p></p>
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
                        <p className='text-5xl font-bold'>{correctAnswers}</p>
                    </div>
                </div>
                <MultipleChoice choices={options} onChoice={onChoice} answer={answer} />
            </div>
        </div >
    );
};

export default GamePage;
