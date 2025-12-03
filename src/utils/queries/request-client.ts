import axios from 'axios'
import { LOCAL_STORAGE } from '../constants/local-storage'
// @ts-nocheck
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

privateApi.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
