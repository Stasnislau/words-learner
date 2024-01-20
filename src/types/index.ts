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
  hasFirstCountdownFinished: boolean;
  numberOfQuestions: number;
  currentQuestionNumber: number;
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
}

export interface wordCard {
  word: string;
  translation: string;
  topic: topic;
}

export interface topic {
  id: number;
  name: string;
}

export interface gameStatistics {
  totalQuestions: number;
  correctAnswers: number;
  skippedAnswers: number;
  incorrectAnswers: number;
  totalTime: number;
  words: statisticsWord[];
}

export interface statisticsWord extends wordCard {
  success: "correct" | "incorrect" | "skipped";
  time: number;
}

export interface chartItem {
  topic: topic;
  correct: number;
  incorrect: number;
  skipped: number;
}

export interface wordCardExtended extends wordCard {
  hasBeenAnswered: boolean;
}
