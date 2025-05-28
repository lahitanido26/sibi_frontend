import React from 'react'
import QuizLesson from './QuizLesson'
import { useQuiz } from '../hooks/UseQuiz'
import Loading from './Loading'

const QuizChart = () => {
  const {
    data: listQuiz,
    error: errorQuiz,
    isFetching: isFetchingQuiz,
    refetch: refetchQuiz,
  } = useQuiz()
  return (
    <section id="QuizChart">
      <h3 className="font-bold mb-4 text-xl">Quiz Lesson</h3>
      {/* Asl Lessons */}
      {isFetchingQuiz && (
        <section className="w-full min-h-screen p-4 md:p-8 flex justify-center items-center">
          <Loading />
        </section>
      )}
      {!isFetchingQuiz && listQuiz && listQuiz.length === 0 && (
        <section className="w-full min-h-screen p-4 md:p-8 flex justify-center items-center">
          <h1 className="text-2xl font-bold">No quiz found.</h1>
        </section>
      )}
      {!isFetchingQuiz && listQuiz && (
        <section className="w-full min-h-screen">
          {listQuiz.map((lesson) => (
            <QuizLesson key={lesson.id} data={lesson} />
          ))}
        </section>
      )}
    </section>
  )
}

export default QuizChart
