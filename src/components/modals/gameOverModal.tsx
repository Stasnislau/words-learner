import { gameStatistics, topic } from "../../types";
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
    const topicSet = new Set(topics.map((topic) => topic.id));
    const topicArrayUndef = [...topicSet].map((id) => {
        return topics.find((topic) => topic.id === id);
    });
    const topicArray = topicArrayUndef.filter((topic) => topic !== undefined) as topic[];



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
    const tableRows = words.map((word, index) => {
        return (
            <tr key={word.word} className={`
            ${index % 2 === 1 ? "bg-gray-100" : "bg-white"}
            `}>
                <td>{word.word}</td>
                <td>{word.translation}</td>
                <td className="text-center">
                    {word.success === "correct" && <span className="text-green-500">✅</span>}
                    {word.success === "incorrect" && <span className="text-red-500">❌</span>}
                    {word.success === "skipped" && <span className="text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                            <path d="M10 6a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1z" />
                        </svg>
                    </span>}
                </td>
                <td
                    className="text-center">
                    {word.time}
                </td>
            </tr>
        )
    });
    return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10">
            <div className="bg-white rounded-lg flex flex-col items-center lg:p-8 md:p-4 p-2  shadow-lg gap-5 md:max-w-[75%] md:max-h-[75%] max-w-[95%] max-h-[95%] grow">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold text-blue-500">Game Over</h1>
                </div>
                <div className="flex md:flex-row flex-col w-full md:overflow-y-hidden overflow-y-auto gap-x-5">
                    <div className="flex flex-col md:w-2/5 w-full">
                        <div className="flex flex-row  md:gap-x-4 gap-x-2 justify-between">
                            <div className="flex flex-col ">
                                <p className="lg:text-lg md:text-md text-xs text-gray-700">Correct: {correctAnswers}/{totalQuestions} </p>
                                <p className="lg:text-lg md:text-md text-xs text-gray-700">Incorrect: {incorrectAnswers}</p>
                                <p className="lg:text-lg md:text-md text-xs text-gray-700">Skipped: {skippedAnswers}</p>

                            </div>
                            <div className="flex flex-col">
                                <p className="lg:text-lg  md:text-md text-xs text-gray-700">Total Time: {totalTime} s</p>
                                <p className="lg:text-lg  md:text-md text-xs text-gray-700">Average Time: {(totalTime / totalQuestions).toFixed(2)} s</p>
                            </div>
                        </div>
                        <div className="flex flex-col grow justify-end">
                            <BarChart items={items} />
                        </div>
                    </div>
                    <div className="flex flex-col md:w-3/5 w-full overflow-y-auto">
                        <table className="table-auto bg-white shadow-md xl:text-lg md:text-md text-xs">
                            <thead className="bg-blue-500 text-white">
                                <tr>
                                    {tableHeaders.map((header) => {
                                        return (
                                            <th key={header} className="lg:px-4 md:px-2 md:py-2 px-1 py-1">{header}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {tableRows.map((row) => (
                                    row
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-5">
                    <button className="border border-gray-400 rounded-lg md:px-4 px-2 py-2 m-2 bg-[#4992ea] text-white hover:bg-[#4992eae9] hover:scale-105" onClick={onRestart}>Restart</button>
                    <button className="border border-gray-400 rounded-lg md:px-4 px-2 py-2 m-2 bg-red-500 text-white hover:bg-red-600 hover:scale-105" onClick={onExit}>Exit</button>
                </div>
            </div>
        </div>
    )
};

export default GameOverModal;