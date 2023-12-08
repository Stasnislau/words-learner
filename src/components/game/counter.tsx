import { AnimatePresence, motion } from "framer-motion";

const Counter = ({ value }: { value: number }) => {
    return (
        <AnimatePresence mode="popLayout">
            <div className="flex flex-col justify-center items-center bg-white shadow-sm rounded-full p-4 min-w-max min-h-max">
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-5xl font-bold">{value}</p>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Counter;