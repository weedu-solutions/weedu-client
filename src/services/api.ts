import axios from 'axios'

export const Api = axios.create({ 
  baseURL: 'http://174.129.120.82/api'
})
