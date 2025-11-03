
import React from 'react';
import { Answer } from '../types';

interface ResultPageProps {
  score: number;
  answers: Answer[];
  pageInfo: { current: number; total: number };
  onNext: () => void;
  onRetry: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ score, answers, pageInfo, onNext, onRetry }) => {
  const totalQuestions = answers.length;
  const scorePercentage = (score / totalQuestions) * 100;

  const getFeedbackMessage = () => {
    if (scorePercentage === 100) return "Xuất sắc! Bạn thật tuyệt vời!";
    if (scorePercentage >= 80) return "Làm tốt lắm! Gần hoàn hảo rồi!";
    if (scorePercentage >= 50) return "Khá tốt! Hãy tiếp tục cố gắng nhé!";
    return "Đừng nản lòng! Hãy ôn lại và thử lại nhé!";
  };

  return (
    <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl w-full">
      <header className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Kết quả trang {pageInfo.current}
        </h1>
        <p className="text-slate-300 mt-2 text-lg">{getFeedbackMessage()}</p>
      </header>
      
      <div className="text-center bg-slate-900/50 rounded-lg p-6 mb-6">
        <p className="text-slate-200 text-xl">Điểm của bạn</p>
        <p className="text-6xl font-extrabold my-2">
            <span className={score >= 8 ? 'text-green-400' : score >= 5 ? 'text-yellow-400' : 'text-red-400'}>{score}</span>
            <span className="text-3xl text-slate-400">/{totalQuestions}</span>
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-center">Xem lại câu trả lời</h3>
        <div className="max-h-60 overflow-y-auto bg-slate-900 p-4 rounded-lg space-y-3">
          {answers.map((ans, index) => (
            <div key={index} className="p-3 bg-slate-800 rounded-md">
              <p className="font-semibold text-slate-300">{index + 1}. {ans.word.vietnamese}</p>
              {ans.isCorrect ? (
                <p className="text-green-400"><i className="fa-solid fa-check mr-2"></i>Bạn đã trả lời: {ans.userAnswer}</p>
              ) : (
                <>
                  <p className="text-red-400"><i className="fa-solid fa-times mr-2"></i>Bạn đã trả lời: {ans.userAnswer}</p>
                  <p className="text-sky-400">Đáp án đúng: {ans.word.english}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRetry}
          className="w-full bg-slate-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-transform transform hover:scale-105 duration-300"
        >
            <i className="fa-solid fa-rotate-right mr-2"></i>Thử lại trang này
        </button>
        <button
          onClick={onNext}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300"
        >
            {pageInfo.current < pageInfo.total ? 'Trang tiếp theo' : 'Làm lại từ đầu'} <i className="fa-solid fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
