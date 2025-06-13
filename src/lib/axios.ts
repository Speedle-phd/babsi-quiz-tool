import axios from 'axios'
export const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_SHEET_BASE_URL,
   headers: {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
   },
})
