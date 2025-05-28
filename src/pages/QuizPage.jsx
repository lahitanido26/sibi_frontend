import { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAudio } from 'react-use'
import { HiX } from 'react-icons/hi'
import { AiOutlineLoading } from 'react-icons/ai'

import { FeedbackMessage, Button } from '../components'
import { CompleteScreen } from './'

import correctSound from '../assets/correct.wav'
import incorrectSound from '../assets/incorrect.wav'
import auth from '../utils/auth'
import { useCurrentQuiz } from '../hooks/UseCurrentQuiz'
import ApiClient from '../lib/api/ApiClient'

const QuizPage = () => {
  if (!auth.loggedIn()) return <Navigate to="/login" />

  const [correctAudio, _c, correctControls] = useAudio({ src: correctSound })
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: incorrectSound,
  })

  const [selectedOption, setSelectedOption] = useState(null)
  const [questionState, setQuestionState] = useState(null)
  const [question, setQuestion] = useState(null)
  const [quizComplete, setQuizComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [score, setScore] = useState(0)
  const [xp, setXp] = useState(0)

  const { slug } = useParams()
  const {
    data: questionsQuiz,
    error: errorQuestionsQuiz,
    isFetching: isFetchingQuestionsQuiz,
    refetch: refetchQuestionsQuiz,
  } = useCurrentQuiz(slug)

  useEffect(() => {
    if (questionsQuiz && questionsQuiz.length > 0) {
      setQuestion(questionsQuiz[0]) // Assuming first question from the API response
      setTotalQuestions(questionsQuiz.length)
      setProgress(0) // Reset progress
    }
  }, [questionsQuiz])

  const checkAnswer = async (answer) => {
    const token = auth.getToken()
    const payload = {
      slugQuiz: String(slug),
      numberQuiz: parseInt(question.number),
      answer: String(answer),
    }

    try {
      const res = await ApiClient.post('/quiz/check-answer', payload, {
        headers: {
          'Content-Type': 'application/json', // Use application/json for JSON payloads
          Authorization: `Bearer ${token}`,
        },
      })

      const data = res.data.data
      // Handle success response
      correctControls.play()
      setQuestionState('correct')
    } catch (err) {
      // Handle error response
      incorrectControls.play()
      setQuestionState('incorrect')
    }
  }

  const cycleNextQuestion = async () => {
    const nextIndex = questionsQuiz.indexOf(question) + 1
    setProgress((nextIndex / totalQuestions) * 100)
    if (nextIndex < questionsQuiz.length) {
      setQuestion(questionsQuiz[nextIndex])
      setSelectedOption(null)
      setQuestionState(null)
    } else {
      // Last question, complete quiz
      const token = auth.getToken()
      const res = await ApiClient.get(`/quiz/score/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          const data = res.data.data
          setXp(data.xp)
          setScore(data.score)
          setQuizComplete(true)
          setQuestionState(null)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const isYouTubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  // const getYouTubeEmbedUrl = (url) => {
  //   const match = url.match(
  //     /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  //   )
  //   return match ? `https://www.youtube.com/embed/${match[1]}` : null
  // }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        !questionState &&
        (event.key === '1' ||
          event.key === '2' ||
          event.key === '3' ||
          event.key === '4')
      ) {
        setSelectedOption(question.choices[event.key - 1])
      } else if (event.key === 'Enter') {
        if (quizComplete) {
          window.history.back()
        } else if (!quizComplete && !questionState && selectedOption) {
          checkAnswer(selectedOption)
        } else if (!quizComplete && questionState) {
          cycleNextQuestion()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedOption, question, questionState])

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <div className="w-full h-screen overflow-hidden flex flex-col bg-gradient-to-b from-[#C3E9FA] to-[#C0E8D5] dark:from-[#245261] dark:to-[#23423A]">
        {/* Header / Progress bar */}
        {!quizComplete && (
          <div className="h-20 flex-shrink-0">
            <div className="w-full h-full max-w-5xl mx-auto pt-4 px-4 flex items-center">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="hover:opacity-60 mr-4"
              >
                <HiX className="w-7 h-7" />
              </button>
              <div className="bg-gray-300 h-4 w-full rounded-2xl overflow-x-hidden">
                <div
                  className={`${
                    progress <= 0 ? 'opacity-0' : ''
                  } custom-transition h-full px-2 pt-1 bg-gradient-to-b from-primary-tint to-red-800 rounded-2xl`}
                  style={{ width: `${progress}%` }}
                >
                  <div className="bg-white/30 h-1 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-grow overflow-y-auto">
          {!quizComplete && question && (
            <div className="w-full flex justify-center items-center">
              <div className="w-full max-w-2xl md:w-[600px] p-4 md:min-h-[450px] quiz-main-container">
                <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
                  <span>{question.question}</span>
                </h1>
                {question.imageUrl && (
                  <div className="w-full my-4">
                    {isYouTubeUrl(question.imageUrl) ? (
                      <iframe
                        className="w-full h-[250px] md:h-[300px] rounded-xl"
                        src={question.imageUrl}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        src={question.imageUrl}
                        alt="Question"
                        className="w-full max-h-[250px] object-contain"
                      />
                    )}
                  </div>
                )}

                <div className="font-medium text-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                  {question.choices.map((choice, index) => (
                    <button
                      key={`id-${choice}`}
                      type="button"
                      className={`w-full p-2 rounded-xl border-2 ${
                        selectedOption === choice
                          ? `selected-choice`
                          : `border-gray-700 dark:border-gray-300 ${
                              !questionState &&
                              'hover:bg-[#5DA9C4] dark:hover:bg-[#5DA9C4]'
                            } ${
                              questionState === 'incorrect' &&
                              choice === question.answer &&
                              'correct-choice'
                            }`
                      }`}
                      onClick={() => setSelectedOption(choice)}
                      disabled={questionState}
                    >
                      <span className="flex justify-center">{choice}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {quizComplete && <CompleteScreen xp={xp} score={score} />}
        </div>

        {/* Footer / Buttons */}
        {!quizComplete && (
          <div
            className={`h-24 flex-shrink-0 border-t-2 px-4 ${
              questionState === 'correct'
                ? 'border-[#CEFEA8] bg-[#CEFEA8] dark:bg-slate-800 dark:border-gray-700'
                : questionState === 'incorrect'
                ? 'border-[#FED6DD] bg-[#FED6DD] dark:bg-slate-800 dark:border-gray-700'
                : 'border-gray-300 dark:border-gray-700'
            }`}
          >
            <div className="w-full max-w-5xl mx-auto flex items-center h-full">
              <div className="w-full flex flex-col md:flex-row justify-between md:items-center">
                {!questionState ? (
                  <Button
                    type="button"
                    btnStyle="hidden md:flex justify-center items-center gap-2 text-sky-500 border-2 border-sky-500 bg-transparent hover:bg-gray-200 dark:hover:bg-slate-800"
                    onClick={() => checkAnswer('skip')}
                    title="Skip"
                  />
                ) : (
                  <FeedbackMessage
                    questionState={questionState}
                    answer={question.answer}
                  />
                )}
                {!questionState ? (
                  <Button
                    type="button"
                    btnStyle={`flex justify-center items-center gap-2
                    ${
                      !selectedOption
                        ? 'text-gray-500 bg-gray-300'
                        : 'text-white dark:text-slate-800 bg-[#58CC02] dark:bg-lime-500 hover:bg-[#4CAD02] dark:hover:bg-lime-600'
                    }
                      `}
                    onClick={() => checkAnswer(selectedOption)}
                    disabled={!selectedOption}
                    title="Check"
                  />
                ) : (
                  <Button
                    type="button"
                    btnStyle={`flex justify-center items-center gap-2 text-white dark:text-slate-800 ${
                      questionState === 'correct'
                        ? 'bg-[#58CC02] dark:bg-lime-500 hover:bg-[#4CAD02] dark:hover:bg-lime-600'
                        : 'bg-red-600 dark:bg-red-400 hover:bg-red-700 dark:hover:bg-red-500'
                    }`}
                    onClick={cycleNextQuestion}
                    title="Next"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default QuizPage
