import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // replace with your backend
});

export default api;
