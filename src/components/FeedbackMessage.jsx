import React from 'react'
import { HiX, HiCheck } from 'react-icons/hi'

const FeedbackMessage = ({ questionState, message, xpPoints }) => {
  return (
    <div
      className={`py-4 md:p-0 flex h-full ${
        questionState === 'correct'
          ? 'text-[#4CAD02] dark:text-lime-500'
          : 'text-red-600 dark:text-red-400'
      }`}
    >
      {/* Icon */}
      <div
        className={`hidden w-20 h-20 mr-4 rounded-full md:flex justify-center items-center bg-white ${
          questionState === 'correct' ? ' dark:bg-lime-500' : 'dark:bg-red-400'
        }`}
      >
        {questionState === 'correct' ? (
          <HiCheck className="w-16 h-16 stroke-1 dark:text-slate-800" />
        ) : (
          <HiX className="w-16 h-16 stroke-1 dark:text-slate-800" />
        )}
      </div>
      <div>
        <h2 className="font-bold text-xl mb-2">
          {questionState === 'correct' ? 'Correct!' : 'Correct Solution:'}
        </h2>
        <p
          className={`${
            questionState === 'correct' ? 'text-green-600' : 'text-red-600'
          } text-sm mb-2`}
        >
          {message}
        </p>
        {questionState === 'correct' && (
          <p className="text-sm text-gray-600">
            You earned {xpPoints} XP points!
          </p>
        )}
      </div>
    </div>
  )
}

export default FeedbackMessage
