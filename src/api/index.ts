import axios from 'axios'

export const api = axios.create({
<<<<<<< HEAD
  baseURL: 'http://api.techlcosta.dev/api',
=======
  baseURL: import.meta.env.VITE_API_URL,
>>>>>>> c4b1371 (add docker configs)
  withCredentials: true
})
