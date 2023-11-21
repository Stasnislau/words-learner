import React, { useState } from 'react';
import wordPairsData from './wordPairs.json';

interface WordPair {
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
  // get random word pair from wordPairs, set it to question. The other one is answer
  const [isVerb, setIsVerb] = useState<boolean>(Math.random() < 0.5);
  const [question, setQuestion] = useState<string>(getRandomPairToLearn(wordPairs)[isVerb ? 'verb' : 'translation']);
  const [answer, setAnswer] = useState<string>(getRandomPairToLearn(wordPairs)[isVerb ? 'translation' : 'verb']);

  const handleReveal = (): void => {
    setIsRevealed(true);
  };

  const handleNext = (): void => {
    setIsRevealed(false);
    setIsVerb(Math.random() < 0.5);
    setQuestion(getRandomPairToLearn(wordPairs)[isVerb ? 'verb' : 'translation']);
    setAnswer(getRandomPairToLearn(wordPairs)[isVerb ? 'translation' : 'verb']);
  };


  // const handleAddWord = (newWordPair: WordPair): void => {
  //   setWordPairs([...wordPairs, newWordPair]);
  // };

  return (
    <div className="w-full grow ">
      <div className="flex flex-col justify-center">
        <h1 className="text-[40px] text-center">Learn French</h1>
        <div className="flex flex-row justify-between items-center border-[1px] mx-10">
          <div className="flex flex-col justify-center gap-3 pt-2">
            <h2 className="text-[30px]">Question</h2>
            <h2 className="text-[30px]">{question}</h2>
          </div>
          <div className="flex flex-col justify-center gap-3 pt-2">
            <h2 className="text-[30px]">Answer</h2>
            {isRevealed && <h2 className="text-[30px]">
              {answer}
            </h2>}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-3 pt-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={isRevealed} onClick={handleReveal}>
            Reveal
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learning;