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
                    <h1 className="lg:text-6xl text-3xl  font-bold">French Learning Tool</h1>
                </div>
                <div className="flex justify-center items-center pt-4">
                    <h1 className={`${styles.secondaryFunnyText} lg:text-4xl text-xl`}>Ready to learn some french today?:)</h1>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <label>
                        Number of questions:
                        <input
                            type="range"
                            min="5"
                            max="50"
                            step="5"
                            value={numberOfQuestions}
                            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                            className="appearance-none h-1 w-64 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                            style={{ background: `linear-gradient(to right, #7367f0 0%, #7367f0 ${((numberOfQuestions - 10) / 40) * 100}%, #d9d9d9 ${((numberOfQuestions - 10) / 40) * 100}%, #d9d9d9 100%)` }}
                        />
                        <span className="ml-2">{numberOfQuestions}</span>
                    </label>
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