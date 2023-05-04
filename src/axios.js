import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://social-site-backend-production.up.railway.app/api/",
    withCredentials: true
})