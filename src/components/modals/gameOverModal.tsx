import { gameOverText } from "../../constants";
import { gameStatistics } from "../../types";


interface gameOverProps {
    gameStatistics: gameStatistics;
    onRestart: () => void;
    onExit: () => void;
}
const GameOverModal = ({ gameStatistics, onRestart, onExit }: gameOverProps) => {
    const { totalQuestions, correctAnswers, skippedAnswers, incorrectAnswers, totalTime, words } = gameStatistics;
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10">
            <div className="bg-white w-3/4 h-3/4 rounded-lg flex flex-col justify-center items-center">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-center">Game Over</h1>
                    <h2 className="text-2xl font-bold text-center">{gameOverText.finish}</h2>
                </div>
                <div className="flex flex-col justify-center items-center mt-5">
                    <div className="flex flex-row justify-between items-center w-3/4">
                        <h1 className="text-xl">Total Questions:</h1>
                        <h1 className="text-xl">{totalQuestions}</h1>
                    </div>
                    <div className="flex flex-row justify-between items-center w-3/4">
                        <h1 className="text-xl">Correct Answers:</h1>
                        <h1 className="text-xl">{correctAnswers}</h1>
                    </div>
                    <div className="flex flex-row justify-between items-center w-3/4">
                        <h1 className="text-xl">Skipped Answers:</h1>
                        <h1 className="text-xl">{skippedAnswers}</h1>
                    </div>
                    <div className="flex flex-row justify-between items-center w-3/4">
                        <h1 className="text-xl">Incorrect Answers:</h1>
                        <h1 className="text-xl">{incorrectAnswers}</h1>
                    </div>
                    <div className="flex flex-row justify-between items-center w-3/4">
                        <h1 className="text-xl">Total Time:</h1>
                        <h1 className="text-xl">{totalTime}</h1>
                    </div>
                    {/* <div className="flex flex-row justify-between items-center w-3/4">
                        <h1 className="text-xl">Total Words:</h1>
                        <h1 className="text-xl">{words}</h1>
                    </div> */}
                </div>
                <div className="flex flex-row justify-center items-center mt-5">
                    <button className="px-8 py-4 text-white text-2xl rounded-lg shadow-lg bg-purple-600 mr-5" onClick={onRestart}>Restart</button>
                    <button className="px-8 py-4 text-white text-2xl rounded-lg shadow-lg bg-purple-600" onClick={onExit}>Exit</button>
                </div>
            </div>
        </div>
    )
};

export default GameOverModal;