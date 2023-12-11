export interface multipleChoiceProps {
  choices: string[];
  answer: string;
  isRevealed: boolean;
  onChoice: (isCorrect: boolean) => void;
}

export interface choiceTileProps {
  choice: string;
  isRevealed: boolean;
  color: string;
  index: number;
  answer: string;
  onChoice: (choice: string) => void;
}

export interface gameFooterProps {
  numberOfQuestions: number;
  currentQuestionNumber: number;
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
}
