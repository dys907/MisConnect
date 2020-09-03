import axios from "axios";

const baseUrl = process.env.BASEURL || "http://localhost:5001/api"

export default axios.create({
    baseURL: process.env.BASEURL || "http://localhost:5001/api",
    headers: {
        "Content-type": "application/json"
    }
})