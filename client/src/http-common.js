import axios from "axios";

const baseUrl = process.env.baseURL || "http://localhost:5001/api"

export default axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-type": "application/json"
    }
})