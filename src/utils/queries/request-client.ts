import axios from 'axios'

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

privateApi.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
