import React from 'react'
import PracticeLesson from './PracticeLesson'
import { usePractice } from '../hooks/UsePractice'
import Loading from './Loading'

const PracticeChart = () => {
  const {
    data: listPractice,
    error: errorPractice,
    isFetching: isFetchingPractice,
    refetch: refetchPractice,
  } = usePractice()

  return (
    <section id="PracticeChart">
      <h3 className="font-bold mb-4 text-xl">Practice Lesson</h3>
      {/* Asl Lessons */}
      {isFetchingPractice && (
        <section className="w-full min-h-screen p-4 md:p-8 flex justify-center items-center">
          <Loading />
        </section>
      )}
      {!isFetchingPractice && listPractice && listPractice.length === 0 && (
        <section className="w-full min-h-screen p-4 md:p-8 flex justify-center items-center">
          <h1 className="text-2xl font-bold">No practice found.</h1>
        </section>
      )}
      {!isFetchingPractice && listPractice && (
        <section className="w-full min-h-screen ">
          {listPractice.map((lesson) => (
            <PracticeLesson key={lesson.id} data={lesson} />
          ))}
        </section>
      )}
    </section>
  )
}

export default PracticeChart
