import axios from "axios";


const request = axios.create({
  baseURL: 'http://localhost:7000/api'
})

export default request;