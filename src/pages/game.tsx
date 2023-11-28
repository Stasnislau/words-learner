import React, { useEffect, useRef, useState } from 'react';
import wordPairsData from '../wordPairs.json';
import Modal from '../components/modal';
import { motion } from 'framer-motion';
import styles from '../styles';
import useTimeout from '../hooks/useTimeout';

export interface WordPair {
    verb: string;
    translation: string;
    group?: string;
}

// const getRandomPairToLearn = (wordPairs: WordPair[]): WordPair => {
//     const randomIndex = Math.floor(Math.random() * wordPairs.length);
//     return wordPairs[randomIndex]
// };

const GamePage = () => {
    const [wordPairs, setWordPairs] = useState<WordPair[]>(wordPairsData);
    const counter = useRef<number>(wordPairs.length - 1);
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    // const pair = getRandomPairToLearn(wordPairs);
    const pair = wordPairs[counter.current];
    const [question, setQuestion] = useState<string>(pair['translation']);
    const [answer, setAnswer] = useState<string>(pair['verb']);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<WordPair>({ verb: '', translation: '' });
    const time = useTimeout(5, () => setIsRevealed(true));
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);

    const handleReveal = (): void => {
        setIsRevealed(true);
    };

    const handleNext = (): void => {
        setIsRevealed(false);
        // const pair = getRandomPairToLearn(wordPairs);
        counter.current--;
        if (counter.current === -1) {
            counter.current = wordPairs.length - 1;
        }
        const pair = wordPairs[counter.current];
        setQuestion(pair['translation']);
        setAnswer(pair['verb']);
    };

    return (
        <div className="w-full grow ">
            <div className="flex flex-col">
                <div className='flex flex-col w-full justify-center items-center mt-6'>
                    <div className="flex flex-row w-fit bg-white justify-center h-20 px-20">
                        <p className='font-normal text-lg'>What is the translation of <p className='font-bold text-3xl text-center'>{question}</p></p>
                    </div>
                </div>
                <div className="flex flex-0.5 flex-row justify-center items-center gap-3 pt-2">
                    <button className={styles.greenButton} disabled={isRevealed} onClick={handleReveal}>
                        Reveal
                    </button>
                    <button className={styles.yellowButton} onClick={handleNext}>
                        Next
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
                <div className={` ${!isRevealed ? "hidden" : "absolute"} flex flex-1 top-[50%] left-[45%] flex-row justify-center items-center gap-3 pt-2 bg-white shadow-sm rounded-xl`}>
                    <div
                        className="flex flex-row justify-center items-center gap-3 p-4 ">
                        <p className='text-5xl font-bold'>{answer}</p>
                    </div>
                </div>
            </div>
            {isModalOpen && <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} item={newItem} setItem={setNewItem} />}
        </div >
    );
};

export default GamePage;
