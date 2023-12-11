import { gameFooterProps } from "../../types";
import mute from '../../assets/icons/mute.svg';
import unmute from '../../assets/icons/unmute.svg';

const GameFooter = (
    { numberOfQuestions, currentQuestionNumber, isMuted, setIsMuted }: gameFooterProps
) => {
    return (
        <div className="flex flex-row justify-between items-center gap-3 md:px-10 px-5 md:py-2 py-1 bg-gray-500 opacity-75">
            <div className="text-white text-md">{currentQuestionNumber}/{numberOfQuestions}</div>
            <button onClick={() => setIsMuted(!isMuted)}>{isMuted ?
                <img src={mute} alt="mute" className="w-6 h-6" /> :
                <img src={unmute} alt="unmute" className="w-6 h-6" />
            }</button>
        </div>
    );
}

export default GameFooter;