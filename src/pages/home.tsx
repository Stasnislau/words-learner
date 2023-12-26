import React, { useState } from 'react';
import styles from '../styles';
import { availableTopics } from '../constants';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
    const [selectedTopicsIds, setSelectedTopicsIds] = useState<number[]>([]);

    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const topicId = Number(event.target.value);
        if (topicId === -1) {
            setSelectedTopicsIds(
                event.target.checked
                    ? availableTopics.map((topic) => topic.id)
                    : []
            );
        } else {
            setSelectedTopicsIds((prevSelectedTopics) =>
                event.target.checked
                    ? [...prevSelectedTopics, topicId]
                    : prevSelectedTopics.filter((id) => id !== topicId)
            );
        }
    };
    return (
        <div className="w-full h-screen py-20 bg-opacity-[15%] bg-stone-950 ">
            <div className="container mx-auto lg:p-16 p-10 ">
                <div className="flex justify-center items-center">
                    <span className="lg:text-6xl text-3xl text-[#4992ea]  font-bold">French &nbsp;</span>
                    <span className="lg:text-6xl text-3xl text-[#FFFFFF]  font-bold">Language &nbsp;</span>
                    <span className="lg:text-6xl text-3xl text-[#ED2939]  font-bold">Quiz</span>
                </div>

                <div className="flex justify-center items-center pt-4 flex-col">
                    <h1 className="lg:text-4xl text-1xl text-white
                    ">Select number of questions</h1>
                    <div className="my-4 flex justify-center">
                        <button className="border w-14 border-black px-4 py-1 text-4xl rounded-lg mx-2 shadow-lg bg-[#002654] hover:bg-[#132336] disabled:opacity-50 text-white"
                            disabled={numberOfQuestions === 5}
                            onClick={
                                () => {
                                    if (numberOfQuestions === 5) {
                                        return;
                                    }
                                    setNumberOfQuestions(numberOfQuestions - 5);
                                }

                            }>-</button>
                        <span
                            style={{
                                textShadow: '0px 0px 10px #000000',
                            }
                            }
                            className={`text-4xl font-mono flex items-center
                            justify-center w-16 text-center font-bold
                            ${numberOfQuestions === 80 ? 'text-red-500' : numberOfQuestions === 5 ? 'text-red-500' : 'text-gray-200'}
                            transition-all duration-300
                        `}>{numberOfQuestions}</span>
                        <button className="border w-14 border-black px-4 py-1 text-4xl rounded-lg mx-2 shadow-lg bg-[#002654] hover:bg-[#132336] disabled:opacity-50 text-white"
                            disabled={numberOfQuestions === 80}
                            onClick={
                                () => {
                                    if (numberOfQuestions === 80) {
                                        return;
                                    }
                                    setNumberOfQuestions(numberOfQuestions + 5);
                                }

                            }>+</button>
                    </div>
                </div>
                <div className="flex justify-center items-center pt-4">
                    <h1 className="lg:text-4xl text-1xl text-white"
                        style={{
                            textShadow: '0px 0px 10px #000000',
                        }}
                    >Select topics</h1>
                </div>
                <div className="flex justify-center items-center flex-wrap mt-5">
                    {availableTopics.map((topic) => (
                        <div key={topic.id} className="m-2">
                            <label
                                htmlFor={`topic-${topic.id}`}
                                className="flex items-center cursor-pointer lg:text-lg text-md"
                            >
                                <span className="mr-2">{topic.name}</span>
                                <input
                                    type="checkbox"
                                    id={`topic-${topic.id}`}
                                    value={topic.id}
                                    onChange={handleTopicChange}
                                    checked={selectedTopicsIds.includes(
                                        topic.id
                                    )}
                                    className="sr-only"
                                />
                                <div className={
                                    `block  w-10 h-6 rounded-full relative
                                    ${selectedTopicsIds.includes(topic.id) ? 'bg-[#4992ea]' : 'bg-gray-600'}
                                    `
                                }>
                                    <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition duration-300
                                    transform
                                    ${selectedTopicsIds.includes(topic.id) ? 'translate-x-full' : 'translate-x-0'}
                                    ${selectedTopicsIds.includes(topic.id) ? 'bg-white' : 'bg-[#ed29397a]'}
                                    `}></div>
                                </div>
                            </label>
                        </div>
                    ))}
                    <div className="m-2">
                        <label
                            htmlFor="selectAll"
                            className="flex items-center cursor-pointer"
                        >
                            <span className="mr-2">All</span>
                            <input
                                type="checkbox"
                                id="selectAll"
                                value={-1}
                                onChange={handleTopicChange}
                                checked={
                                    selectedTopicsIds.length ===
                                    availableTopics.length
                                }
                                className="sr-only"
                            />
                            <div className={
                                `block  w-10 h-6 rounded-full relative
                                ${selectedTopicsIds.length === availableTopics.length ? 'bg-green-500' : 'bg-gray-600'}
                                `
                            }>
                                <div className={`absolute left-1 top-1  w-4 h-4 rounded-full transition duration-300 
                                ${selectedTopicsIds.length === availableTopics.length ? 'bg-white' : 'bg-[#ed29397a]'}
                                transform
                                ${selectedTopicsIds.length === availableTopics.length ? 'translate-x-full' : 'translate-x-0'}
                                `}>

                                </div>
                            </div>
                        </label>

                    </div>
                </div>
                <div className="flex justify-center items-center mt-10 flex-row gap-5">
                    <button className="lg:text-2xl text-lg  px-4 py-2 rounded-lg shadow-lg border font-bold text-[#ED2939]  hover:border-[#ED2939] h-14
                        bg-stone-950 bg-opacity-30
                        hover:scale-105 transform transition-all duration-300
                    ">
                        Add new word
                    </button>

                    <button
                        className="lg:text-4xl text-1xl text-white px-10 py-2 rounded-lg shadow-lg bg-[#002654] hover:bg-[#132336]  hover:scale-105 transform transition-all duration-300 h-14"
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
                </div>
            </div >
        </div >

    );
};

export default HomePage;