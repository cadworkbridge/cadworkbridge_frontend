import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cadworkbridge.fly.dev', // Use hardcoded or env
  withCredentials: true, // Send cookies
})

export default instance
