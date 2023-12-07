import { ChoiceTile } from "../tiles/choiceTile";
import { multipleChoiceProps } from "../../types";

// TODO: add icons to see if the answer is correct or not (green checkmark or red X) and lower the opacity of the tiles after the user has clicked on one of them
const MultipleChoice = ({ choices, onChoice, answer }: multipleChoiceProps) => {
    const handleChoice = (choice: string) => {
        if (choice === answer) {
            onChoice(true);
        } else {
            onChoice(false);
        }
    }
    const colors = ['#FF0000', '#14b514', '#0000FF', '#ffaa00', '#027c7c', '#FF00FF'];
    return (
        <div className="flex flex-wrap justify-center items-center gap-5 w-full overflow-x-hidden">
            {choices.map((choice, index) => {
                const color = colors[index];
                return (
                    <ChoiceTile key={index} index={index} choice={choice} color={color} onChoice={handleChoice} />
                )
            })}

        </div>

    );
};

export default MultipleChoice;