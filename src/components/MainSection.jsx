import { useEffect } from 'react'
import { Header, Footer, Sidebar, MobileMenu } from '.'
import { Route, Routes, useLocation } from 'react-router-dom'

import {
  Home,
  Login,
  Signup,
  NoMatch,
  Lessons,
  QuizList,
  Leaderboards,
  Profile,
  QuizPage,
} from '../pages'

import Auth from '../utils/auth'
import VideoLessonPage from '../pages/VideoPage'
import PracticePage from '../pages/PracticePage'
import PracticeList from '../pages/PracticeList'
import ForgotPassword from '../pages/ForgotPassword'
const MainSection = () => {
  const loggedIn = Auth.loggedIn()
  // returns true if locations includes /quiz
  const quizLocation = useLocation().pathname.includes('/quiz/start')

  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to the top of the page on route change
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {loggedIn && !quizLocation && <Sidebar />}
      <div
        className={`overflow-x-hidden overflow-y-auto flex flex-col ${
          loggedIn
            ? quizLocation
              ? ''
              : 'mb-20 sm:mb-0 sm:ms-[88px] xl:ms-[300px]'
            : ''
        }`}
      >
        {!loggedIn && <Header />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/lessons">
              <Route index element={<Lessons />} />
              <Route path=":slug/:unit" element={<VideoLessonPage />} />
            </Route>
            <Route path="/practice">
              <Route index element={<PracticeList />} />
              <Route path=":slug/:unit" element={<PracticePage />} />
            </Route>
            <Route path="/quiz">
              <Route index element={<QuizList />} />
              <Route path="start/:slug" element={<QuizPage />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        {!quizLocation && <Footer />}
      </div>
      {loggedIn && !quizLocation && <MobileMenu />}
    </>
  )
}

export default MainSection
