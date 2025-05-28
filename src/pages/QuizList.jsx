import { Navigate } from 'react-router-dom'
import Auth from '../utils/auth'
import { QuizChart } from '../components'

const QuizList = () => {
  // If the user is not logged in, redirect to the login page
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />
  }

  return (
    <section
      id="QuizList"
      className="w-full min-h-screen p-4 md:p-8 text-[#1F2A3A] dark:text-[#F1F5F9] bg-gradient-to-b from-[#C3E9FA] to-[#C0E8D5] dark:from-[#245261] dark:to-[#23423A]"
    >
      <div className="mb-8">
        {/* Page Heading */}
        <h1 className="h1-style mb-8">Quiz</h1>

        {/* Banner */}
        <div className="banner-container-style text-[#1F2A3A] dark:text-[#F1F5F9] bg-gradient-to-b from-[#C3E9FA] to-[#C0E8D5] dark:from-[#245261] dark:to-[#23423A]">
          <div className="relative p-8 z-10">
            <h2 className="banner-heading mb-3">Let's learn Sign Language!</h2>
            <p className="text-lg">Open your eyes and learn</p>
          </div>
          <div className="banner-bg-style bg-clouds" />
        </div>
      </div>

      {/* Content */}
      <div>
        <div>
          <QuizChart />
        </div>
      </div>
    </section>
  )
}

export default QuizList
