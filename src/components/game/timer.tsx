import { motion, AnimatePresence } from 'framer-motion';

const Timer = ({ time }: { time: number }) => {

    const variants = {
        initial: { opacity: 0, y: -50, scale: 0.7 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 50, scale: 0.7 },
    };

    const lastFiveSecondsVariants = {
        initial: { opacity: 0, y: -50, scale: 1.5, color: "#000" },
        animate: { opacity: 1, y: 0, scale: 1, color: "#f00" },
        exit: { opacity: 0, y: 50, scale: 0.5, color: "#000" },
    };

    const digits = time.toString().padStart(2, '0').split('');

    return (
        <div className="flex justify-center items-center bg-white shadow-sm rounded-full p-4  ">
            <AnimatePresence mode="wait">
                {digits.map((digit, index) => (
                    <motion.span
                        key={index}
                        variants={time <= 5 ? lastFiveSecondsVariants : variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="text-6xl font-bold"
                    >
                        {digit}
                    </motion.span>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Timer;