import { ChoiceTile } from "../tiles/choiceTile";
import { multipleChoiceProps } from "../../types";

const MultipleChoice = ({ choices, onChoice, answer, isRevealed }: multipleChoiceProps) => {
    const handleChoice = (choice: string) => {
        if (choice === answer) {
            onChoice(true);
        } else {
            onChoice(false);
        }
    }
    const colors = ['#FF0000', '#14b514', '#0000FF', '#ffaa00', '#027c7c', '#FF00FF'];
    return (
        <div className="flex flex-wrap justify-center items-center gap-5 w-full overflow-hidden pb-2">
            {choices.map((choice, index) => {
                const color = colors[index];
                return (
                    <ChoiceTile key={index} answer={answer} isRevealed={isRevealed} index={index} choice={choice} color={color} onChoice={handleChoice} />
                )
            })}

        </div>

    );
};

export default MultipleChoice;