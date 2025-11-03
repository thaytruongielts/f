
export interface Word {
  vietnamese: string;
  english: string;
}

export type GameState = 'start' | 'quiz' | 'results';

export interface Answer {
  word: Word;
  userAnswer: string;
  isCorrect: boolean;
}
