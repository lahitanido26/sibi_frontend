import axios from 'axios'
import { apiUrl } from '../../constants/baseURL'

// fetch API using Axios
const ApiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default ApiClient
