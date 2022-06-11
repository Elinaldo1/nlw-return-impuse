import axios from "axios";

export const api = axios.create({
    baseURL: "https://nlw-return-impuse-production.up.railway.app"
})