import React, { useEffect, useState } from 'react';
import wordPairsData from '../wordPairs.json';
import Modal from '../components/modal';
import { motion } from 'framer-motion';
import styles from '../styles';

export interface WordPair {
    verb: string;
    translation: string;
    group?: string;
}

const getRandomPairToLearn = (wordPairs: WordPair[]): WordPair => {
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    return wordPairs[randomIndex]
};

const GamePage = () => {
    const [wordPairs, setWordPairs] = useState<WordPair[]>(wordPairsData);
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const pair = getRandomPairToLearn(wordPairs);
    const [question, setQuestion] = useState<string>(pair['translation']);
    const [answer, setAnswer] = useState<string>(pair['verb']);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<WordPair>({ verb: '', translation: '' });

    const handleReveal = (): void => {
        setIsRevealed(true);
    };
    
    const handleNext = (): void => {
        setIsRevealed(false);
        const pair = getRandomPairToLearn(wordPairs);
        setQuestion(pair['translation']);
        setAnswer(pair['verb']);
    };

    return (
        <div className="w-full grow ">
            <div className="flex flex-col">
                <div className='flex flex-col border-white border-2 w-full bg-white'>
                    <div className="flex flex-row justify-center items-stretch h-20">
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
