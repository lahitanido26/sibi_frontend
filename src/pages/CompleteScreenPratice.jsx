import { useEffect } from 'react'
import { useAudio } from 'react-use'
import { easeInOut, easeOut, stagger, useAnimate } from 'framer-motion'
import { runFireworks } from '../utils/confetti'
import finishSound from '../assets/finish.mp3'
import { useNavigate } from 'react-router-dom'

const CompleteScreenPratice = ({ xp, score }) => {
  // This uses the useAnimate hook from Framer Motion to create a new animation scope.
  const [scope, animate] = useAnimate()
  const navigate = useNavigate()
  // This hook is used to play the finish audio when the component is mounted.
  const [finishAudio] = useAudio({ src: finishSound, autoPlay: true })

  const handleBack = () => {
    navigate('/practice')
  }

  // This useEffect hook will run once the component is mounted.
  // It is used to control the animations.
  useEffect(() => {
    const playAnimations = async () => {
      animate('.quiz-stat-container', { y: -20 }, { duration: 0 })
      await animate('#complete-title', { scale: 5, y: 100 }, { duration: 0 })
      animate(
        '#complete-title',
        { opacity: 1, scale: 1 },
        { duration: 0.3, ease: easeOut, type: 'tween' }
      )
      runFireworks()
      await animate(
        '#complete-title',
        { y: 0 },
        { duration: 0.4, delay: 1, ease: easeInOut, type: 'tween' }
      )
      await animate(
        '#divider',
        { opacity: 1, width: '100%' },
        { delay: 0.2, ease: easeInOut }
      )
      await animate(
        '.quiz-stat-container',
        { opacity: 1, y: 0 },
        { duration: 0.5, delay: stagger(0.3), ease: easeOut }
      )
    }

    playAnimations()
  }, [])

  return (
    <>
      {finishAudio}
      <div
        ref={scope}
        className="grow flex flex-col justify-center items-center text-center gap-8"
      >
        <h1
          id="complete-title"
          style={{ opacity: 0 }}
          className="font-bold text-4xl md:text-5xl lg:text-6xl"
        >
          Pratice Completed!
        </h1>
        <hr
          id="divider"
          style={{ opacity: 0, width: 0 }}
          className="w-full max-w-2xl border-4 border-primary"
        />

        {/* Quiz Statistics Cards */}
        <div className="w-full max-w-2xl flex flex-row gap-2 sm:gap-4 md:gap-8 font-bold">
          {/* Score Card */}
          <div
            style={{ opacity: 0 }}
            className="quiz-stat-container bg-amber-400"
          >
            <div className="p-1">
              <h2 className="uppercase">Score</h2>
            </div>
            <div className="quiz-stat-body">
              <h3 className="text-amber-700 dark:text-amber-400">{score} %</h3>
            </div>
          </div>

          {/* XP Card */}
          <div
            style={{ opacity: 0 }}
            className="quiz-stat-container bg-sky-400"
          >
            <div className="p-1">
              <h2 className="uppercase">Earned</h2>
            </div>
            <div className="quiz-stat-body">
              <h3 className="text-sky-700 dark:text-sky-400">+{xp} XP</h3>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mt-6 px-6 py-2 text-[#F1F5F9] bg-[#184567] border-white hover:bg-[#5DA9C4] font-semibold rounded-xl hover:bg-primary-dark transition-all"
        >
          Back to Menu
        </button>
      </div>
    </>
  )
}

export default CompleteScreenPratice
