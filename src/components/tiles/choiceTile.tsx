import { choiceTileProps } from "../../types"

const ChoiceTile = ({
    color,
    choice,
    onChoice }: choiceTileProps) => {
    return (
        <div style={
            {
                backgroundColor: color,
            }

        } className={`flex flex-col shadow-[0px 4px 4px rgba(0, 0, 0, 0.25)] md:w-[45%] w-full hover:scale-[102%]`}>
            <button className="flex flex-col justify-center text-white rounded-xl lg:h-20 p-4" onClick={() => onChoice(choice)}>
                <p className="lg:text-3xl md:text-xl text-lg font-bold drop-shadow-sm">{choice}</p>
            </button>
        </div>
    )
}

export { ChoiceTile }