import { choiceTileProps } from "../../types"

const ChoiceTile = ({
    color,
    choice,
    onChoice }: choiceTileProps) => {

    return (
        <div className={`flex flex-col bg-[${color}]`}>
            <button className="flex flex-col bg-white shadow-sm rounded-xl p-4" onClick={() => onChoice(choice)}>
                <p className="text-2xl font-bold">{choice}</p>
            </button>
        </div>
    )
}

export { ChoiceTile }