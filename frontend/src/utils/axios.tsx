import axios from 'axios'
import { auth } from './cookie'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = auth.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  return config
})

export default api