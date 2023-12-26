import { useState, useRef, useEffect } from "react";
import { topic, wordCard } from "../../types";
import { availableTopics } from "../../constants";
import useClickOutside from "../../hooks/useClickOutside";

import { motion } from "framer-motion";

type ModalProps = {
  setIsOpen: (isOpen: boolean) => void;
};

const AddModal = ({ setIsOpen }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [modifiedWord, setModifiedWord] = useState("");
  const [modifiedTranslation, setModifiedTranslation] = useState("");
  const [topic, setTopic] = useState({} as topic);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [numberClicked, setNumberClicked] = useState<number>(0);
  const wordsList = useRef<wordCard[]>([]);
  useEffect(() => {
    if (localStorage.getItem("wordList")) {
      wordsList.current = JSON.parse(localStorage.getItem("wordList") || "") as wordCard[];
    }
  }, []);



  const handleSave = () => {
    if (modifiedWord === "" || modifiedTranslation === "" || !topic || !topic.name || !topic.id) {
      setErrorMessage("Please fill all fields");
      setNumberClicked(numberClicked + 1);
      return;
    }
    const newWordCard: wordCard = {
      word: modifiedWord,
      translation: modifiedTranslation,
      topic: topic,
    };
    wordsList.current.push(newWordCard);
    localStorage.setItem("wordList", JSON.stringify(wordsList.current));
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  useClickOutside(ref, handleCancel);

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white relative shadow-xl rounded-lg flex flex-col justify-center items-center md:p-10 p-6" ref={ref}>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">
            <span className="text-[#4992ea]">Add&nbsp;</span>
            <span style={
              {
                textShadow: "0 0 5px #4992ea, 0 0 10px #4992ea, 0 0 15px #4992ea, 0 0 20px #4992ea, 0 0 25px #4992ea, 0 0 30px #4992ea, 0 0 35px #4992ea",
                animation: "glow 2s ease-in-out infinite alternate",
              }
            } className="text-white">NEW&nbsp;</span>
            <span className="text-red-500">word</span>
          </h1>
          <div className="flex flex-col justify-center items-center mt-4">
            <input
              className="border border-gray-400 rounded-lg p-2 m-2"
              placeholder="French word"
              value={modifiedWord}
              onChange={(e) => setModifiedWord(e.target.value)}
            />
            <input
              className="border border-gray-400 rounded-lg p-2 m-2"
              placeholder="Translation"
              value={modifiedTranslation}
              onChange={(e) => setModifiedTranslation(e.target.value)}
            />
            <select
              className="border border-gray-400 rounded-lg p-2 m-2"
              onChange={(e) => {
                const selectedTopic = availableTopics.find((topic) => topic.name === e.target.value);
                if (selectedTopic) {
                  setTopic(selectedTopic);
                }
              }}
            >
              <option value="">Select topic</option>
              {availableTopics.map((topic) => (
                <option key={topic.id} value={topic.name}>
                  {topic.name}
                </option>
              ))}
            </select>
            <div className="flex justify-center items-center">
              <button className="border border-gray-400 rounded-lg md:px-4 px-2 py-2 m-2 bg-[#4992ea] text-white hover:bg-[#4992eae9] hover:scale-105"
                onClick={handleSave}>
                Save
              </button>
              <button onClick={handleCancel}
                className="border border-gray-400 rounded-lg md:px-4 px-2 py-2 m-2 bg-red-500 text-white hover:bg-red-600 hover:scale-105"
              >
                Cancel
              </button>
            </div>
            <motion.div className="text-red-500 absolute md:bottom-5 bottom-2"
              initial={{ y: 0, }}
              animate={{ y: [2, 0, -2, 0, 2, -2, 0] }}
              transition={{ duration: 0.3, }}
              key={numberClicked}
            >{errorMessage}</motion.div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AddModal;
