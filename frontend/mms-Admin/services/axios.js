import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const http = axios.create({
  baseURL
});

http.interceptors.request.use(function (config) {
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export default http;
