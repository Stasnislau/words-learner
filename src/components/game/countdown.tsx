import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const countdownNumbers = ['3', '2', '1', 'Start'];

const InitialCountdown = ({ onFinished }: { onFinished: () => void }) => {
    const [countdownIndex, setCountdownIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdownIndex((prevIndex) => prevIndex + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (countdownIndex >= countdownNumbers.length) {
            onFinished();
        }
    }, [countdownIndex, onFinished]);

    return (
        <AnimatePresence>
                {countdownIndex < countdownNumbers.length && (
                    <motion.div
                        key={countdownNumbers[countdownIndex]}
                        initial={{ opacity: 0, fontSize: '13rem' }}
                        animate={{ opacity: 1, fontSize: '9rem' }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className={` flex items-center justify-center fixed w-full h-full bg-black bg-opacity-50 text-white ${countdownIndex < 3 ? 'text-9xl' : 'text-6xl'} font-bold text-shadow-md`}
                    >
                        {countdownNumbers[countdownIndex]}
                    </motion.div>
                )}
        </AnimatePresence>
    );
};

export default InitialCountdown;