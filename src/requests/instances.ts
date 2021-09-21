import axios from "axios"
import { API_URL } from "../config/app"

export const apiRequest = axios.create({
   baseURL: API_URL,
   headers: {
      Accept: "application/json",
   },
})
