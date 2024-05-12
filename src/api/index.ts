import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.techlcosta.dev/api',
  withCredentials: true
})
