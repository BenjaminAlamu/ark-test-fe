import axios from 'axios'
const appUrl = import.meta.env.VITE_APP_URL

const api = axios.create({
  baseURL: `${appUrl}/api/v1`
})

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('auto_gele_token') || ''

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

export default api
