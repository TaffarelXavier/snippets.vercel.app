const axios = require('axios')
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API_REST
})
export default instance
