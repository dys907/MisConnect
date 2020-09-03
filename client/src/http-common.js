import axios from "axios";

// let baseUrl;
// if(process.env.NODE_ENV === "development") {
//     baseUrl =  "http://localhost:5001/api"
// } else {
//     baseUrl = "https://misconnect-server.herokuapp.com/api"
// }

//const baseUrl = process.env.REACT_APP_BASEURL || "http://localhost:5001/api"

export default axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
        "Content-type": "application/json"
    }
})