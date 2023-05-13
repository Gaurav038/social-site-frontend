import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://social-site-tv87.onrender.com/api/",
    withCredentials: true
})