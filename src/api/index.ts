import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://api.techlcosta.dev/api',
  withCredentials: true
})
