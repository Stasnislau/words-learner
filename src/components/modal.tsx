import { useState } from "react";
import { WordPair } from "../App";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  item: WordPair;
  setItem: (item: WordPair) => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, item, setItem }) => {
  const [modifiedWord, setModifiedWord] = useState(item.verb);
  const [modifiedTranslation, setModifiedTranslation] = useState(item.translation);

  const handleSave = () => {
    setItem({ verb: modifiedWord, translation: modifiedTranslation });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setModifiedWord(item.verb);
    setModifiedTranslation(item.translation);
    setIsOpen(false);
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Edit Word Translation</h2>
        </div>
        <div className="modal-body">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="word">
              Word
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="word"
              type="text"
              value={modifiedWord}
              onChange={(e) => setModifiedWord(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="translation">
              Translation
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="translation"
              type="text"
              value={modifiedTranslation}
              onChange={(e) => setModifiedTranslation(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
