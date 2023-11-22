import React, { useState } from 'react';
import wordPairsData from './wordPairs.json';
import Modal from './components/modal';
import { motion } from 'framer-motion';
import { fadeIn } from './utils/motion';

export interface WordPair {
  verb: string;
  translation: string;
}

const getRandomPairToLearn = (wordPairs: WordPair[]): WordPair => {
  const randomIndex = Math.floor(Math.random() * wordPairs.length);
  return wordPairs[randomIndex]
};

const Learning: React.FC = () => {
  const [wordPairs, setWordPairs] = useState<WordPair[]>(wordPairsData);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isVerb, setIsVerb] = useState<boolean>(Math.random() < 0.5);
  const [question, setQuestion] = useState<string>(getRandomPairToLearn(wordPairs)[isVerb ? 'verb' : 'translation']);
  const [answer, setAnswer] = useState<string>(getRandomPairToLearn(wordPairs)[isVerb ? 'translation' : 'verb']);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<WordPair>({ verb: '', translation: '' });

  const handleReveal = (): void => {
    setIsRevealed(true);
  };

  const handleNext = (): void => {
    setIsRevealed(false);
    setIsVerb(Math.random() < 0.5);
    const pair = getRandomPairToLearn(wordPairs);
    setQuestion(pair[isVerb ? 'verb' : 'translation']);
    setAnswer(pair[isVerb ? 'translation' : 'verb']);
  };


  const handleAddWord = (newWordPair: WordPair): void => {
    setWordPairs([...wordPairs, newWordPair]);
  };

  return (
    <div className="w-full grow ">
      <div className="flex flex-col">
        <h1 className="text-[40px] text-center">Learn French</h1>
        <div className="flex flex-row justify-evenly items-stretch border-[1px] mx-10 flex-template-col-1">
          <motion.div variants={fadeIn("", "spring", 0.5, 10)} className="flex flex-col gap-3 pt-2 grow">
            <h2 className="text-[30px] px-2">Question</h2>
            <h2 className="text-[30px] px-2">{question}</h2>
          </motion.div>
          <motion.div variants={fadeIn("left", "spring", 0.5, 0.7)} className="flex flex-col gap-3 pt-2 grow border-s">
            <h2 className="text-[30px] px-2">Answer</h2>
            {isRevealed && <h2 className=" px-2 text-[30px]">
              {answer}
            </h2>}
          </motion.div>
        </div>
        <div className="flex flex-0.5 flex-row justify-center items-center gap-3 pt-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={isRevealed} onClick={handleReveal}>
            Reveal
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} item={newItem} setItem={setNewItem} />}
    </div>
  );
};

export default Learning;