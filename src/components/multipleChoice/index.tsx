import { ChoiceTile } from "../tiles/choiceTile";
import { multipleChoiceProps } from "../../types";


const MultipleChoice = ({ choices, onChoice, answer  }: multipleChoiceProps) => {
    const handleChoice = (choice: string) => {
        if (choice === answer) {
            onChoice(true);
        } else {
            onChoice(false);
        }
    }
    const colors = ['FF0000', '00FF00', '0000FF', 'FFFF00', '00FFFF', 'FF00FF'];
    return (
        <div className="flex shadow-sm w-full">
            <div className="flex flex-wrap justify-center items-center gap-3 w-full">
                {choices.map((choice, index) => {
                    const color = colors[index];
                    return (
                        <ChoiceTile key={index} choice={choice} color={color} onChoice={handleChoice} />
                    )
                })}

            </div>


        </div>
    );
};

export default MultipleChoice;