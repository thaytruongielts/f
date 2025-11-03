import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Word, Answer } from './types';
import { vocabularyPages } from './constants/vocabulary';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastAnswers, setLastAnswers] = useState<Answer[]>([]);
  const [lastScore, setLastScore] = useState<number>(0);

  const totalPages = vocabularyPages.length;

  const handleStart = () => {
    setCurrentPage(0);
    setGameState('quiz');
  };
  
  const handleQuizComplete = useCallback((score: number, answers: Answer[]) => {
    setLastScore(score);
    setLastAnswers(answers);
    setGameState('results');
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      setGameState('quiz');
    } else {
      handleStart();
    }
  };

  const handleRetryPage = () => {
    setGameState('quiz');
  };

  const renderContent = () => {
    switch (gameState) {
      case 'quiz':
        return (
          <QuizPage
            key={currentPage}
            words={vocabularyPages[currentPage]}
            pageInfo={{ current: currentPage + 1, total: totalPages }}
            onComplete={handleQuizComplete}
          />
        );
      case 'results':
        return (
          <ResultPage
            score={lastScore}
            answers={lastAnswers}
            pageInfo={{ current: currentPage + 1, total: totalPages }}
            onNext={handleNextPage}
            onRetry={handleRetryPage}
          />
        );
      case 'start':
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="bg-slate-800 p-10 rounded-2xl shadow-2xl max-w-md w-full">
                <i className="fa-solid fa-plane-departure text-6xl text-indigo-400 mb-6"></i>
                <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                    Luyện Từ Vựng Tiếng Anh Flyers
                </h1>
                <p className="text-slate-300 mb-8">
                    Sẵn sàng để chinh phục từ vựng Flyers? Mỗi trang có 10 từ. Cố gắng hết sức nhé!
                </p>
                <button
                    onClick={handleStart}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                >
                    Bắt đầu
                </button>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-2xl mx-auto">
        {renderContent()}
      </div>
    </main>
  );
};

export default App;