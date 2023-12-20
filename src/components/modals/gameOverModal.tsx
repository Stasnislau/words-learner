import { gameOverText } from "../../constants";
import { gameStatistics } from "../../types";
import BarChart from "../graphs/barChart";


interface gameOverProps {
    gameStatistics: gameStatistics;
    onRestart: () => void;
    onExit: () => void;
}
const GameOverModal = ({ gameStatistics, onRestart, onExit }: gameOverProps) => {
    const { totalQuestions, correctAnswers, skippedAnswers, incorrectAnswers, totalTime, words } = gameStatistics;
    const topics = words.map((word) => {
        return word.topic;
    });
    const topicSet = new Set(topics);
    const topicArray = Array.from(topicSet);
    const items = topicArray.map((topic) => {
        const correct = words.filter((word) => {
            return word.topic.id === topic.id && word.success === "correct";
        }).length;
        return {
            topic: topic,
            correct: correct
        }
    });
    const tableHeaders = ["Word", "Translation", "Success", "Time"];
    const tableRows = words.map((word) => {
        return (
            <tr key={word.word}>
                <td>{word.word}</td>
                <td>{word.translation}</td>
                <td>{word.success}</td>
                <td>{word.time}</td>
            </tr>
        )
    });
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10">
            <div className="bg-white w-3/4 h-3/4 rounded-lg flex flex-col items-center p-4 shadow-lg">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold text-blue-500">Game Over</h1>
                    <p className="text-lg text-gray-600">{gameOverText.finish}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <div className="flex flex-row justify-between items-center gap-3 grow">
                        <div className="flex w-1/3 flex-col justify-start">
                            <p className="text-lg text-gray-700">Correct: {correctAnswers}</p>
                            <p className="text-lg text-gray-700">Incorrect: {incorrectAnswers}</p>
                            <p className="text-lg text-gray-700">Skipped: {skippedAnswers}</p>
                            <p className="text-lg text-gray-700">Total Questions: {totalQuestions}</p>
                            <p className="text-lg text-gray-700">Total Time: {totalTime} seconds</p>
                        </div>
                        <div className="flex w-2/3 flex-col justify-start overflow-auto">
                            <table className="table-auto w-full text-center bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-blue-500 text-white">
                                    <tr>
                                        {tableHeaders.map((header) => {
                                            return (
                                                <th key={header} className="px-4 py-2">{header}</th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {tableRows.map((row, index) => (
                                        row
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <BarChart items={items} />
            </div>
        </div>
    )
};

export default GameOverModal;