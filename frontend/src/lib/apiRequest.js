import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/api/v1" :"/api/v1"

const apiRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default apiRequest;