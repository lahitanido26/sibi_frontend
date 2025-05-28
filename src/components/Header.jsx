import React from 'react'
import { Link } from 'react-router-dom'
// import useSelector and useDispatch hooks from react-redux to access state and dispatch actions
import { useSelector, useDispatch } from 'react-redux'
// import darkmode action
import { TOGGLE_DARKMODE } from '../features/darkMode/darkModeSlice'

import logo from '../assets/Logo.svg'
import logoText from '../assets/LogoBlack.svg'
import logoTextDarkMode from '../assets/LogoWhite.svg'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

const Header = () => {
  // get darkmode state from store
  const darkMode = useSelector((state) => state.darkMode.value)
  // get dispatch function from useDispatch hook
  const dispatch = useDispatch()

  return (
    <header className="bg-[#7AB0C7] dark:bg-[#245261] border-b border-gray-100 dark:border-gray-900 z-50">
      <nav className="mx-auto max-w-7xl flex items-center justify-between p-4 lg:px-8">
        {/* Logo image */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-70 custom-transition"
        >
          {/* Show dark mode logo if dark mode is enabled */}
          {darkMode ? (
            <img
              src={logoTextDarkMode}
              alt="SignEase Text Logo"
              className="w-20 h-16 hidden sm:inline-block"
            />
          ) : (
            <img
              src={logoText}
              alt="SignEase Text Logo"
              className="w-20 h-16 hidden sm:inline-block"
            />
          )}
        </Link>
        {/* Log in and Sign Up Links and Dark Mode Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 font-bold">
          {/* Toggle dark mode */}
          <button
            type="button"
            className="hover:opacity-70"
            onClick={() => dispatch(TOGGLE_DARKMODE())}
          >
            {darkMode ? (
              <HiOutlineSun className="w-6 h-6" />
            ) : (
              <HiOutlineMoon className="w-6 h-6" />
            )}
          </button>
          <Link
            to="/login"
            className="py-2 px-4 hover:bg-gray-200/75 dark:hover:bg-slate-700 rounded-xl"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="py-2 px-4 dark:text-[#245261] text-white dark:bg-[#B3D6EB] bg-[#184567] dark:hover:bg-[#5DA9C4] hover:bg-[#5DA9C4] rounded-xl"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
