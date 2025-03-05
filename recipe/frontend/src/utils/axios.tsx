import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials:true
})

// Add token to requests
api.interceptors.request.use((config) => {
  //config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  return config
})

export const loginCheck = async () => {
  try {
      const response = await api.get("/authorization");
      return response.status === 200;
  } catch (error) {
      return false;
  }
  
}

export const UserLogOut = async () => {
  try {
      const response = await api.post("/logout");
      return response.status === 200;
  } catch (error) {
      return false;
  }
  
}

export default api