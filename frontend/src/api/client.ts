import axios from 'axios'

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('yash_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const mockDelay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))
