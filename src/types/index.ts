export interface multipleChoiceProps {
    choices: string[];
    answer: string;
    onChoice: (isCorrect: boolean) => void;
}

export interface choiceTileProps {
    choice: string;
    color: string;
    onChoice: (choice: string) => void;
}