import { gameOverText } from "../../constants";


interface gameOverProps {
    numberOfCorrectAnswers: number;
    numberOfQuestions: number;
    onRestart: () => void;
    onExit: () => void;
}
const GameOverModal = ({ numberOfCorrectAnswers, numberOfQuestions, onRestart, onExit }: gameOverProps) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="flex flex-col bg-white rounded-xl shadow-md">
                <div className="flex flex-col justify-center items-center gap-3 p-10">
                    <p className="text-3xl font-bold">{gameOverText.finish}</p>
                    <p className="text-2xl font-bold">{`${numberOfCorrectAnswers}/${numberOfQuestions}`}</p>
                </div>
                <div className="flex flex-row justify-center items-center gap-3 p-10">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg" onClick={onRestart}>
                        Restart
                    </button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg" onClick={onExit}>
                        Exit
                    </button>
                </div>
            </div>
        </div>
    )
};

export default GameOverModal;