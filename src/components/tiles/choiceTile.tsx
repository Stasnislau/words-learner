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

        } className={`flex flex-col shadow-xl md:w-[45%] w-full`}>
            <button className="flex flex-col  text-white rounded-xl p-4" onClick={() => onChoice(choice)}>
                <p className="text-2xl font-bold drop-shadow-sm">{choice}</p>
            </button>
        </div>
    )
}

export { ChoiceTile }