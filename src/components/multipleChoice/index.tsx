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
    return (
        <div className="flex flex-wrap flex-col shadow-sm w-full">
            <div className="flex flex-row justify-center items-center gap-3">
                {choices.map((choice) => {
                    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                    return (
                        <ChoiceTile choice={choice} color={randomColor} onChoice={handleChoice} />
                    )
                })}

            </div>


        </div>
    );
};

export default MultipleChoice;