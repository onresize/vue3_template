import axios from "axios";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.withCredentials = false;

// console.log("request请求地址：", import.meta.env.VITE_APP_BASE_API);
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 8000,
});

request.interceptors.request.use(
  (config) => {
    config.headers["a"] = "aaa";
    return config;
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);

service.interceptors.response.use((response) => {
  return response.data;
});

export default request;
