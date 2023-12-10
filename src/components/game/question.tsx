import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Question = ({ question }: { question: string }) => {
    const [isQuestionVisible, setIsQuestionVisible] = useState(false);
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const handleAnimationComplete = () => {
        setIsAnimationComplete(true);
    };
    useEffect(() => {
        setTimeout(() => {
            setIsQuestionVisible(true);
        }, 800);
    }, [question]);
    return (
        <motion.div
            className="flex flex-row w-fit  bg-white justify-center rounded-md md:px-20 px-6 py-4 z-[1]"
            initial={{ opacity: 0.3, position: "absolute", transform: "translate(-50%, -50%) scale(1.5)", top: "50%", left: "50%" }}
            animate={isQuestionVisible ? { opacity: 1, top: "18%", transform: "scale(1) translate(-50%, -50%)" } : { opacity: 1 }}
            transition={isQuestionVisible ? { duration: 0.5, delay: 0.5 } : { duration: 0.8 }}
        >
            <p className='font-normal lg:text-lg text-md'>What is the translation of
                <p className='font-bold lg:text-3xl text-xl text-center'>{isQuestionVisible
                    ? question
                    : <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                    >
                        ...
                    </motion.div>}
                </p>
            </p>
        </motion.div>
    )
};

export default Question;
