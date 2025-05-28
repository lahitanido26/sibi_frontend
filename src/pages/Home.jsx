import { Link, Navigate } from 'react-router-dom'
import signLanguageLogo from '../assets/SignLanguageLogo.png'
import Auth from '../utils/auth'

const Home = () => {
  if (Auth.loggedIn()) return <Navigate to="/lessons" />

  return (
    // Hero Section with Logo and Call to Action
    <section
      id="hero"
      className="w-full min-h-[calc(100vh-72px)] py-14 hero-bg bg-[#C3E9FA] dark:bg-[#264754]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Call to Action */}
        <div className="flex flex-col items-center lg:items-start font-bold text-center lg:text-left gap-8 order-last lg:order-first">
          <h1 className="text-xl md:text-2xl lg:text-3xl uppercase">
            The Best Way To Learn <br />
            <span className="text-[#2D3748] dark:text-[#F1F5F9] text-5xl md:text-6xl lg:text-7xl">
              SIBIKU
            </span>
          </h1>
          <p className="max-w-md md:text-xl text-[#2D3748] dark:text-[#F1F5F9]">
            Latih kosakata dan frasa Bahasa Isyarat Indonesia (SIBI) melalui
            pelajaran dan kuis yang interaktif.
          </p>
          <div className="w-72 flex flex-col text-center gap-4">
            {/* Sign Up Button */}
            <Link
              to="/signup"
              className="py-3 px-3 text-white dark:text-[#245261] bg-[#184567] dark:bg-[#B3D6EB] hover:bg-[#5DA9C4] dark:hover:bg-[#5DA9C4] rounded-xl shadow-xl"
            >
              Start learning
            </Link>
            {/* Login Button */}
            <Link
              to="/login"
              className="py-3 px-3 text-[#1F2A3A] dark:text-[#F1F5F9] border-2 border-[#1F2A3A] dark:border-gray-300 bg-white dark:bg-slate-900 dark:hover:bg-gray-100/10 hover:bg-gray-300 rounded-xl shadow-xl"
            >
              Already have an account?
            </Link>
          </div>
        </div>
        {/* Sign Language Logo */}
        <img
          src={signLanguageLogo}
          alt="Sign Language Logo"
          className="w-48 h-48 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] transition-all duration-300 ease-in-out"
        />
      </div>
    </section>
  )
}

export default Home
