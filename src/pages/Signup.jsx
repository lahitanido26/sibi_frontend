import { useState, useRef } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.svg'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { FaExclamationCircle } from 'react-icons/fa'
import { AiOutlineLoading } from 'react-icons/ai'
import Auth from '../utils/auth' // import the Auth utility function
import authService from '../services/auth.service'
import { toast } from 'react-toastify'
const Signup = () => {
  if (Auth.loggedIn()) return <Navigate to="/lessons" />
  const [showPassword, setShowPassword] = useState(false) // state for toggling password visibility
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const formRef = useRef(null) // reference to the form element

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(formRef.current)
    const inputData = Object.fromEntries(formData.entries())
    setIsLoading(true)
    await authService
      .register(inputData)
      .then((response) => {
        toast.success('Register success, please verify your email', {
          position: 'top-right',
        })
        formRef.current.reset()
        navigate('/login')
      })
      .catch((error) => {
        toast.error(error, {
          position: 'top-right',
        })
      })
    setIsLoading(false)
  }

  return (
    <section
      id="signup"
      className="w-full min-h-[calc(100vh-72px)] py-14 flex justify-center bg-[#C3E9FA] dark:bg-[#264754]"
    >
      {/* Sign Up Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="form-container-style"
      >
        <img
          src={logo}
          alt="SignEase Logo"
          className="w-12 h-12 mx-auto mb-2"
        />
        <h1 className="text-2xl font-bold mb-6 text-center text-[#184567] dark:text-[#F1F5F9]">
          {' '}
          Sign up
        </h1>
        {/* Fields Container */}
        <div className="w-full flex flex-col gap-4">
          {/* Name Field Wrapper*/}
          <div className="flex flex-col gap-1 text-[#184567] dark:text-[#F1F5F9]">
            <label className="font-bold" htmlFor="name">
              Name
            </label>
            <input
              className="form-input-style px-3 py-2"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>

          {/* Username Field Wrapper*/}
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="username">
              Username
            </label>
            <input
              className="form-input-style px-3 py-2"
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
          {/* Email Field Wrapper*/}
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="form-input-style px-3 py-2"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          {/* Password Field Wrapper */}
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="password-input"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                autoComplete="off"
                required
              />
              {/* Show password button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-show-btn"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full mt-6 py-3 px-6 bg-[#184567] dark:bg-[#184567] hover:bg-[#96C4DE] text-white font-bold rounded-xl"
          type="submit"
        >
          {isLoading ? (
            <AiOutlineLoading className="animate-spin h-6 w-6 mx-auto" />
          ) : (
            'Create account'
          )}
        </button>
        {/* Login Link */}
        <p className="mt-6 text-gray-500 dark:text-gray-400 text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-bold text-[#184567] dark:text-[#F1F5F9] hover:text-[#96C4DE] hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Signup
