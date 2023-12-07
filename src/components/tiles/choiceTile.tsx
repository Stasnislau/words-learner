import { choiceTileProps } from "../../types"
import { animate, motion } from "framer-motion"

const ChoiceTile = ({
    color,
    choice,
    index,
    onChoice }: choiceTileProps) => {
    return (
        <motion.div style={
            {
                backgroundColor: color,
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
            }}
            transition={{
                duration: 0.8,
                delay: 1,
            }}
            className={`flex flex-col shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] md:w-[45%] w-full hover:scale-[102%]`}>
            <button className="flex flex-col justify-center text-white rounded-xl lg:h-20 p-4" onClick={() => onChoice(choice)}>
                <p className="lg:text-3xl md:text-xl text-lg font-bold drop-shadow-sm">{choice}</p>
            </button>
        </motion.div>
    )
}

export { ChoiceTile }