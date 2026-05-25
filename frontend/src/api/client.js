import axios from "axios";

const api = axios.create({
  baseURL: "https://breath-esg.onrender.com/api/",
});

export default api;