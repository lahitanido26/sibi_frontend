import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const LessonContainer = ({ lesson }) => {
  const [backgroundGradient, setBackgroundGradient] = useState('')

  // Function to generate a random background gradient
  const pastelGradients = [
    'bg-gradient-to-r from-[#4F88B3] to-[#5A9BAE]',
    'bg-gradient-to-r from-[#6BBBAE] to-[#84BFAE]',
    'bg-gradient-to-r from-[#76A89D] to-[#589779]',
    'bg-gradient-to-r from-[#7EB0B5] to-[#A3CBC7]',
    'bg-gradient-to-r from-[#99CFC5] to-[#8AC7B9]',
    'bg-gradient-to-r from-[#79BDAA] to-[#6EB2A1]',
  ]

  const pastelDarkGradients = [
    'dark:from-[#3A617F] dark:to-[#4A7483]',
    'dark:from-[#3F857A] dark:to-[#397B6B]',
    'dark:from-[#326D5D] dark:to-[#285B4E]',
    'dark:from-[#2D5A5C] dark:to-[#366E6D]',
    'dark:from-[#3A7C77] dark:to-[#407F74]',
    'dark:from-[#38685D] dark:to-[#2F544B]',
  ]

  const getRandomGradient = () => {
    const index = Math.floor(Math.random() * pastelGradients.length)
    return `${pastelGradients[index]} ${pastelDarkGradients[index]}`
  }
  

  useEffect(() => {
    const randomGradient = getRandomGradient()
    console.log('Random background gradient:', randomGradient)
    setBackgroundGradient(randomGradient)
  }, [])

  return (
    <section
      className={`text-white banner-container-style ${backgroundGradient}`}
    >
      <div className="relative p-4 z-10">
        {/* Header */}
        <div className="mb-4">
          <p className="font-bold opacity-80 uppercase tracking-wider text-shadow ">
            Lesson {lesson.number}
          </p>
          <h4 className="font-bold text-2xl sm:text-3xl md:text-4xl text-shadow">
            {lesson.title}
          </h4>
        </div>

        {/* Content */}
        <ul className="sm:text-xl flex flex-col gap-2">
          {lesson.units.map((unit) => (
            <li key={unit.slug}>
              <Link
                to={`/lessons/${lesson.slug}/${unit.slug}`}
                className="exercise-style"
              >
                {unit.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default LessonContainer
