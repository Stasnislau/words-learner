import React, { useState } from 'react';
import styles from '../styles';
import { availableTopics } from '../constants';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
    const [selectedTopicsIds, setSelectedTopicsIds] = useState<number[]>([]);

    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedTopicsIds([...selectedTopicsIds, Number(event.target.value)]);
        } else {
            setSelectedTopicsIds(selectedTopicsIds.filter(id => id !== Number(event.target.value)));
        }
        if (event.target.value === 'all') {
            if (event.target.checked) {
                setSelectedTopicsIds(availableTopics.map(topic => topic.id));
            } else {
                setSelectedTopicsIds([]);
            }
        }
    };
    return (
        <div className="w-full h-full py-20 ">
            <div className="container mx-auto">
                <div className="flex justify-center items-center">
                    <h1 className="lg:text-6xl text-3xl text-white  font-bold">French Learning Tool</h1>
                </div>
                <div className="flex justify-center items-center pt-4">
                    <p className="lg:text-xl text-md text-gray-200">Learn French with 
                        <span className="font-bold"> FUN </span>
                    </p>
                </div>
                <div className="flex justify-center items-center pt-4 flex-col">
                    <h1 className="lg:text-3xl text-1xl text-[#EDEB58]  font-bold
                    ">Select number of questions</h1>
                    <div className="my-4 flex justify-center">
                        <button className="border w-14 border-black px-4 py-1 text-4xl rounded-lg mx-2 shadow-lg bg-[#EDEB58] hover:bg-[#e2e054] disabled:opacity-50"
                            disabled={numberOfQuestions === 5}
                            onClick={
                                () => {
                                    if (numberOfQuestions === 5) {
                                        return;
                                    }
                                    setNumberOfQuestions(numberOfQuestions - 1);
                                }

                            }>-</button>
                        <span className={`text-4xl font-mono flex items-center drop-shadow-lg
                            justify-center w-16 text-center
                            ${numberOfQuestions === 80 ? 'text-red-500' : numberOfQuestions === 5 ? 'text-red-500' : 'text-black'}
                            transition-all duration-300
                        `}>{numberOfQuestions}</span>
                        <button className="border w-14 border-black px-4 py-1 text-4xl rounded-lg mx-2 shadow-lg bg-[#EDEB58] hover:bg-[#e2e054] disabled:opacity-50"
                            disabled={numberOfQuestions === 80}
                            onClick={
                                () => {
                                    if (numberOfQuestions === 80) {
                                        return;
                                    }
                                    setNumberOfQuestions(numberOfQuestions + 1);
                                }

                            }>+</button>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-wrap mt-5">
                    {availableTopics.map(topic => (
                        <label key={topic.id} className="m-2">
                            <input type="checkbox" checked={
                                selectedTopicsIds.includes(topic.id)
                            } value={topic.id} onChange={handleTopicChange} />
                            {topic.name}
                        </label>
                    ))}
                    <label className="m-2">
                        <input type="checkbox" value="all" onChange={handleTopicChange} />
                        All
                    </label>
                </div>
                <div className="flex justify-center items-center mt-10">
                    <button
                        className={`${styles.purpleButton} px-8 py-4 text-white text-2xl rounded-lg shadow-lg`}
                        onClick={() => {
                            if (selectedTopicsIds.length === 0) {
                                alert('Please select at least one topic of minimum 5 words');
                                return;
                            }
                            navigate(`/game/${numberOfQuestions}?topics=${selectedTopicsIds.join(',')}`);
                        }}
                    >
                        Start
                    </button>
                    <button className={`${styles.greenButton} px-8 py-4 text-white text-2xl rounded-lg shadow-lg ml-5`}>
                        Add word
                    </button>
                </div>
            </div>
        </div>

    );
};

export default HomePage;