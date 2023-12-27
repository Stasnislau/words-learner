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
        const incorrect = words.filter((word) => {
            return word.topic.id === topic.id && word.success === "incorrect";
        }
        ).length;
        const skipped = words.filter((word) => {
            return word.topic.id === topic.id && word.success === "skipped";
        }
        ).length;

        return {
            topic: topic,
            correct: correct,
            incorrect: incorrect,
            skipped: skipped
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
            <div className="bg-white rounded-lg flex flex-col items-center p-8 shadow-lg gap-5">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold text-blue-500">Game Over</h1>
                    <p className="text-lg text-gray-600">{gameOverText.finish}</p>
                </div>
                <div className="flex flex-row grow w-full">
                    <div className="flex flex-col w-2/5">
                        <div className="flex flex-col justify-start">
                            <p className="text-lg text-gray-700">Correct: {correctAnswers}</p>
                            <p className="text-lg text-gray-700">Incorrect: {incorrectAnswers}</p>
                            <p className="text-lg text-gray-700">Skipped: {skippedAnswers}</p>
                            <p className="text-lg text-gray-700">Total Questions: {totalQuestions}</p>
                            <p className="text-lg text-gray-700">Total Time: {totalTime} seconds</p>
                        </div>
                        <BarChart items={items} />
                    </div>
                    <div className="flex flex-col w-3/5 p-4">
                        <div className="flex  flex-col justify-end overflow-auto">
                            <table className="table-auto w-full text-center bg-white shadow-md  overflow-hidden">
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
                <div className="flex flex-row justify-center items-center gap-5">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onRestart}>Restart</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onExit}>Exit</button>
                </div>
            </div>
        </div>
    )
};

export default GameOverModal;