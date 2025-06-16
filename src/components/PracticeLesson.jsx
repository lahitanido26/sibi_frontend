import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const PracticeLesson = ({ data }) => {
  const [displayTable, setDisplayTable] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('')

  // Function to generate a random color
  const pastelLight = [
    'bg-[#4F88B3]',
    'bg-[#5A9BAE]',
    'bg-[#6BBBAE]',
    'bg-[#84BFAE]',
    'bg-[#76A89D]',
    'bg-[#589779]',
    'bg-[#7EB0B5]',
    'bg-[#A3CBC7]',
    'bg-[#99CFC5]',
    'bg-[#8AC7B9]',
    'bg-[#79BDAA]',
    'bg-[#6EB2A1]',
  ]

  const pastelDark = [
    'dark:bg-[#3A617F]',
    'dark:bg-[#4A7483]',
    'dark:bg-[#3F857A]',
    'dark:bg-[#397B6B]',
    'dark:bg-[#326D5D]',
    'dark:bg-[#285B4E]',
    'dark:bg-[#2D5A5C]',
    'dark:bg-[#366E6D]',
    'dark:bg-[#3A7C77]',
    'dark:bg-[#407F74]',
    'dark:bg-[#38685D]',
    'dark:bg-[#2F544B]',
  ]

  const getRandomColor = () => {
    const index = Math.floor(Math.random() * pastelLight.length)
    return `${pastelLight[index]} ${pastelDark[index]}`
  }

  useEffect(() => {
    const randomColor = getRandomColor()
    setBackgroundColor(randomColor)
  }, [])

  return (
    <div className={`banner-container-style ${backgroundColor} my-3`}>
      <div className="relative p-4 z-10">
        {/* Header */}
        <div className="text-gray-100">
          {/* Lesson Number and Pages */}
          <p className="font-bold opacity-80 uppercase tracking-wider text-shadow">
            SIBI Practice {data.lesson.number} - {data.lesson.title}
          </p>
          <div className="flex flex-col sm:flex-row justify-between">
            {/* Subject Title */}
            <div>
              <h4 className="font-bold text-2xl sm:text-3xl md:text-4xl text-shadow">
                {data.title}
              </h4>
              <p className="font-bold opacity-80 tracking-wider text-shadow">
                {`Total Questions: ${data.signs.length}`}
              </p>
            </div>
            <div className="flex items-end mt-4 sm:mt-0 gap-4 font-bold">
              {/* Start Practice Button */}
              <Link
                to={`/practice/${data.lesson.slug}/${data.slug}`}
                className="w-full h-fit sm:w-32 p-2 sm:px-4 border-2 text-[#F1F5F9] bg-[#184567] border-[#3E3E3E]  hover:bg-[#5DA9C4] dark:hover:bg-[#5DA9C4] backdrop-blur-sm  rounded-xl flex items-center justify-center"
              >
                Start Practice
              </Link>

              {/* Display Table Button */}
              <button
                className="w-full h-fit sm:w-32 p-2 sm:px-4 border-2 text-[#F1F5F9] border-[#3E3E3E] bg-gray-800/30 hover:bg-gray-800/50 backdrop-blur-sm  rounded-xl"
                onClick={() => setDisplayTable(!displayTable)}
              >
                {displayTable ? 'Hide Words' : 'Show Words'}
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        {displayTable && (
          <table className="table-auto mt-4 text-[#1F2A3A] dark:text-[#F1F5F9] bg-gradient-to-b from-[#C3E9FA] to-[#C0E8D5] dark:from-[#245261] dark:to-[#23423A]">
            <thead>
              <tr className="text-[#1F2A3A] dark:text-[#F1F5F9] bg-gradient-to-b from-[#C3E9FA] to-[#C0E8D5] dark:from-[#245261] dark:to-[#23423A]">
                <th className="p-3">Sign</th>
                <th className="p-3">Word</th>
                <th className="p-3">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {data.signs.map((sign) => (
                <tr key={`id-${sign.label}`}>
                  <td className="w-1/2 border-2 dark:border-gray-700 p-2 sm:p-4 text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-center scale-150 md:scale-100">
                    <img
                      src={sign.imageUrl}
                      alt={sign.label}
                      className="w-20 h-20"
                    />
                  </td>
                  <td className="w-fit border-2 dark:border-gray-700 p-2 sm:p-4 text-xl sm:text-2xl md:text-3xl">
                    {sign.label}
                  </td>
                  <td className="w-1/2 border-2 dark:border-gray-700 p-2 sm:p-4 md:text-xl">
                    {sign.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className={`banner-bg-style ${data.backgroundImage}`} />
    </div>
  )
}

export default PracticeLesson
