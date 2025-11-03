
import React, { useState, useRef, useEffect } from 'react';
import { Word, Answer } from '../types';

interface QuizPageProps {
  words: Word[];
  pageInfo: { current: number; total: number };
  onComplete: (score: number, answers: Answer[]) => void;
}

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
    const progress = (current / total) * 100;
    return (
        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
            <div
                className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

const QuizPage: React.FC<QuizPageProps> = ({ words, pageInfo, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentQuestionIndex]);

  const currentWord = words[currentQuestionIndex];

  const checkAnswer = () => {
    if (!userInput.trim()) return;

    const correct = userInput.trim().toLowerCase() === currentWord.english.toLowerCase();
    setIsCorrect(correct);
    setIsAnswered(true);

    const newAnswer: Answer = {
      word: currentWord,
      userAnswer: userInput,
      isCorrect: correct,
    };
    setAnswers(prev => [...prev, newAnswer]);
  };

  const handleNext = () => {
    setIsAnswered(false);
    setUserInput('');
    if (currentQuestionIndex < words.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const score = answers.filter(a => a.isCorrect).length;
      onComplete(score, [...answers, { word: currentWord, userAnswer: userInput, isCorrect: isCorrect }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isAnswered) {
        handleNext();
      } else {
        checkAnswer();
      }
    }
  };

  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl w-full transition-all duration-300">
      <header className="mb-6 text-center">
        <p className="text-indigo-400 font-semibold">Trang {pageInfo.current} / {pageInfo.total}</p>
        <h2 className="text-2xl font-bold">Câu hỏi {currentQuestionIndex + 1} / {words.length}</h2>
      </header>
      
      <ProgressBar current={currentQuestionIndex} total={words.length} />

      <div className="bg-slate-700 p-8 rounded-lg text-center mb-6">
        <p className="text-slate-300 text-lg mb-2">Dịch từ sau sang Tiếng Anh:</p>
        <p className="text-4xl font-bold text-white capitalize">{currentWord.vietnamese}</p>
      </div>

      <div className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nhập câu trả lời của bạn..."
          disabled={isAnswered}
          className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-50"
        />
        {!isAnswered ? (
          <button
            onClick={checkAnswer}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300"
          >
            Kiểm tra
          </button>
        ) : (
          <div className="text-center">
            {isCorrect ? (
                <p className="text-green-400 font-bold text-lg animate-pulse"><i className="fa-solid fa-check-circle mr-2"></i>Chính xác!</p>
            ) : (
                <p className="text-red-400 font-bold text-lg">
                    <i className="fa-solid fa-times-circle mr-2"></i>Sai rồi! Đáp án đúng là: <span className="font-extrabold underline">{currentWord.english}</span>
                </p>
            )}
             <button
                onClick={handleNext}
                className="mt-4 w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105 duration-300"
            >
                {currentQuestionIndex < words.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
