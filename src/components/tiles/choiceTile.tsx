import { choiceTileProps } from "../../types"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import correctIcon from "../../assets/icons/correct.svg";
import wrongIcon from "../../assets/icons/wrong.svg";

const ChoiceTile = ({
    color,
    choice,
    index,
    isRevealed,
    answer,
    onChoice }: choiceTileProps) => {
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    useEffect(() => {
        if (isRevealed) {
            if (choice === answer) {
                setIsCorrect(true);
            }
        }
    }, [isRevealed]);

    return (
        <motion.div style={
            {
                backgroundColor: color,
                boxShadow: "0px 2px 10px 0px rgba(0,0,0,0.4)",
            }

        }
            initial={{
                display: "hidden",
                opacity: 0,
                x: index % 2 === 0 ? "-100%" : "100%",
            }}
            animate={{
                display: "flex",
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.8,
                    delay: 1,
                }
            }}
            transition={{
                duration: 0.1
            }}
            whileHover={
                isRevealed ? {} :
                    {
                        scale: 1.02,
                        transition: { duration: 0 }, 
                    }}
            whileTap={{
                scale: 1,
                transition: { duration: 0 },
            }}
            className={`flex flex-col md:w-[45%] w-full`}
        >
            <button className={`flex flex-row justify-between items-center text-white lg:h-20 p-4 ${isRevealed ? isCorrect ? "opacity-100" : "opacity-50" : "opacity-100"}`} onClick={() => {
                if (isRevealed) {
                    return;
                }
                onChoice(choice)
            }}>
                <p style={
                    {
                        textShadow: "0px 0px 10px #000000",
                    }
                } className="lg:text-3xl md:text-xl text-lg font-bold">{choice}</p>
                {isRevealed && (
                    <div className="flex flex-row justify-center items-center">
                        {isCorrect ? (
                            <img src={correctIcon} />

                        ) : (
                            <img src={wrongIcon} />
                        )}
                    </div>
                )}
            </button>
        </motion.div>
    )
}

export { ChoiceTile }