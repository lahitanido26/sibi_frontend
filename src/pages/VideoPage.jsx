import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Auth from '../utils/auth'
import { Button } from '../components'
import { useCurrentUnitLesson } from '../hooks/UseCurrentUnitLesson'
import Loading from '../components/Loading'

const VideoLessonPage = () => {
  if (!Auth.loggedIn()) return <Navigate to="/login" />
  const { slug, unit } = useParams()
  const {
    data: listLesson,
    error: errorLesson,
    isFetching: isFetchingLesson,
    refetch: refetchLesson,
  } = useCurrentUnitLesson(unit)

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [videoEnded, setVideoEnded] = useState(false)

  const currentLesson = listLesson ? listLesson[currentLessonIndex] : null

  const handleVideoEnd = () => {
    setVideoEnded(true)
  }

  const handleNextLesson = () => {
    if (currentLessonIndex < listLesson.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      setVideoEnded(false)
    }
  }

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
      setVideoEnded(false)
    }
  }

  return (
    <>
      {isFetchingLesson && (
        <section className="w-full min-h-screen p-4 md:p-8 flex justify-center items-center">
          <Loading />
        </section>
      )}
      {!isFetchingLesson && !currentLesson && (
        <section className="w-full min-h-screen p-4 md:p-8 flex justify-center items-center">
          <h1 className="text-2xl font-bold">No lessons found.</h1>
        </section>
      )}
      {!isFetchingLesson && currentLesson && (
        <section className="w-full min-h-screen p-4 md:p-8 text-[#1F2A3A] dark:text-[#F1F5F9] bg-gradient-to-b from-[#C3E9FA] to-[#C0E8D5] dark:from-[#245261] dark:to-[#23423A]">
          {/* Page Heading */}
          <h1 className="h1-style mb-8">{currentLesson.title}</h1>

          {/* Video Player */}
          <div className="mb-8">
            <iframe
              className="w-full rounded-lg h-64 md:h-96"
              src={currentLesson.videoUrl}
              title={currentLesson.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>

          {/* Lesson Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Lesson Description</h2>
            <p>{currentLesson.description}</p>
          </div>

          {/* Key Points */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Key Points</h3>
            <ul className="list-disc pl-5">
              {currentLesson.keyPoints.map((point, index) => (
                <li key={index} className="mb-2">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mb-8">
            <Button
              type="button"
              btnStyle={`text-white bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded ${
                currentLessonIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handlePreviousLesson}
              disabled={currentLessonIndex === 0}
              title="Previous"
            />
            <Button
              type="button"
              btnStyle={`text-white bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded ${
                currentLessonIndex === listLesson.length - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
              onClick={handleNextLesson}
              disabled={currentLessonIndex === listLesson.length - 1}
              title="Next"
            />
          </div>
        </section>
      )}
    </>
  )
}

export default VideoLessonPage
