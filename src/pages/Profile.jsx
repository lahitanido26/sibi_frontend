import { Navigate } from 'react-router-dom'
import moment from 'moment'
import Auth from '../utils/auth'
import { AiOutlineLoading } from 'react-icons/ai'
import { useMe } from '../hooks/UseMe'
import auth from '../utils/auth'
import { useState } from 'react'
import ApiClient from '../lib/api/ApiClient'
import { toast } from 'react-toastify'
import logo from '../assets/Logo.svg'

const Profile = () => {
  // If the user is not logged in, redirect to the login page
  if (!Auth.loggedIn()) return <Navigate to="/login" />
  const token = auth.getToken()

  const { data, isFetching, refetch: refetch } = useMe()

  if (!isFetching && data) {
    localStorage.setItem('user', JSON.stringify(data))
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: data.name || '',
    username: data.username || '',
    email: data.email || '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    ApiClient.put('/user/profile', formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success('Profile updated successfully', {
          position: 'top-right',
        })

        refetch()
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || 'Failed to update profile',
          {
            position: 'top-right',
          }
        )
      })

    setIsLoading(false)
    setIsModalOpen(false)
  }

  // Check if data is loading
  if (isFetching) {
    return (
      <AiOutlineLoading className="animate-spin h-12 w-12 mx-auto bg-gradient-to-b from-[#C3E9FA] to-[#C0E8D5] dark:from-[#245261] dark:to-[#23423A]" />
    )
  }

  // Format createdAt using moment
  const formattedDate = moment(data.createdAt).format('MMMM D, YYYY')

  return (
    <section
      id="profile"
      className="w-full min-h-screen p-4 md:p-8 bg-gradient-to-b from-[#C3E9FA] to-[#C0E8D5] dark:from-[#245261] dark:to-[#23423A]"
    >
      {/* Page Heading */}
      <h1 className="h1-style mb-8">Profile</h1>

      {/* Profile Info */}
      <div className="bg-gradient-to-b from-[#C0E8D5] to-[#FFFFFF] dark:from-[#468676] dark:to-[#d2dadd] w-full h-full p-4 rounded-xl shadow-lg mb-8 flex flex-col sm:flex-row items-center gap-4 text-[#1F2A3A] dark:text-[#F1F5F9]">
        <div className="w-32 h-32 bg-[#184567] rounded-full flex justify-center items-center uppercase font-bold text-6xl text-white">
          {data.username.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{data.username}</h2>
          <p>{`Joined ${formattedDate}`}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-auto px-4 py-2 rounded-lg text-[#F1F5F9] bg-[#184567] border-[#3E3E3E]  hover:bg-[#5DA9C4] hover:border-gray-200"
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Statistics */}
      <div className="box-container-style mb-8 flex flex-col gap-4 text-[#1F2A3A] dark:text-[#F1F5F9] bg-gradient-to-b from-[#C3E9FA] to-[#C0E8D5] dark:from-[#245261] dark:to-[#23423A]">
        <h3 className="text-xl font-bold">Statistics</h3>
        <div>
          <h4 className="text-gray-500 dark:text-gray-400">Total XP:</h4>
          <h2 className="text-2xl font-bold">{data.pointXp}</h2>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-[#264754] rounded-2xl p-6 w-full max-w-md shadow-xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 text-base font-semibold">
                Edit Profile
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
              >
                ×
              </button>
            </div>

            {/* Brand Logo */}
            <div className="text-center mb-5 dark:text-white">
              <div className="mb-3">
                <div className="flex justify-center">
                  <img src={logo} alt="Logo" className="w-24 h-24" />
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-10 bg-white border border-gray-300 rounded-md px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-white text-sm font-medium mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full h-10 bg-white border border-gray-300 rounded-md px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-10 bg-white border border-gray-300 rounded-md px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-white text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-10 bg-white border border-gray-300 rounded-md px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="pt-3 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C3E9FA] hover:bg-slate-800 text-black rounded-md text-sm"
                >
                  {isLoading ? 'Loading...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Profile
