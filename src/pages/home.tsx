import React, { useState, useEffect } from 'react';
import { availableTopics } from '../constants';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimate } from 'framer-motion';
import { AddModal } from '../components/modals';

const HomePage = () => {
    const navigate = useNavigate();
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
    const [selectedTopicsIds, setSelectedTopicsIds] = useState<number[]>(availableTopics.map((topic) => topic.id));
    const [scope, animate] = useAnimate();

    const handleAnimation = async () => {
        await animate(
            scope.current,
            {
                rotate: "10deg",

            },
            {
                duration: 0.3,
                repeat: 10,
                ease: "easeInOut",
                repeatType: "reverse",
            }
        )
        await animate(
            scope.current,
            {
                y: 20,
            },
            {
                duration: 0.3,
            }
        )
    };

    useEffect(() => {
        handleAnimation();
    }, []);

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="w-full h-[100dvh] md:py-10 py-4 bg-opacity-[15%] bg-stone-950 ">
            <div className="container mx-auto md:p-16 sm:p-10 p-4">
                <div className="flex justify-center items-center">
                    <span className="lg:text-6xl text-3xl text-[#4992ea]  font-bold">French </span>
                    <span className="lg:text-6xl text-3xl text-[#FFFFFF]  font-bold">Language </span>
                    <motion.span
                        ref={scope}
                        className="lg:text-6xl text-3xl text-[#ED2939]  font-bold">Quiz</motion.span>
                </div>

                <div className="flex justify-center items-center pt-8 flex-col">
                    <h1 style={{
                        textShadow: '0px 0px 10px #000000',
                    }} className="md:text-4xl text-1xl text-white
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
                    <h1 className="md:text-4xl text-1xl text-white"
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
                                className="flex items-center cursor-pointer md:text-lg text-md"
                            >
                                <span style={
                                    {
                                        textShadow: '5px 5px 10px #000000',
                                    }
                                } className="mr-2 text-white md:text-lg text-md font-medium">{topic.name}</span>
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
                            <span style={
                                {
                                    textShadow: '5px 5px 10px #000000',
                                }
                            } className="mr-2 text-white md:text-lg text-md font-medium"
                            >All</span>
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
                <div className="flex justify-center items-center mt-10 gap-5 flex-col">
                    <button
                        className="md:text-4xl text-1xl text-white px-10 py-2 rounded-lg shadow-lg bg-[#000454] hover:bg-[#132336]  hover:scale-105 transform transition-all duration-300 h-14"
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
                    <button className="md:text-xl text-lg px-4 py-2 rounded-lg text-white
                         bg-opacity-90 hover:bg-opacity-100
                        hover:scale-95 transform transition-all duration-300
                    "
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    >
                        + Add new word
                    </button>


                </div>
            </div >
            {isModalOpen && <AddModal setIsOpen={setIsModalOpen} />}
        </div >

    );
};

export default HomePage;