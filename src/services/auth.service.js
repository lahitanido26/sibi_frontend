import axios from 'axios'
import { apiUrl } from '../constants/baseURL'

const BASE_URL = `${apiUrl}/auth`
const authService = {
  login: async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, payload)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Login Gagal!'
    }
  },

  register: async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, payload)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Register Gagal!'
    }
  },

  forgotPassword: async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, payload)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Forgot password Gagal!'
    }
  },
}

export default authService
