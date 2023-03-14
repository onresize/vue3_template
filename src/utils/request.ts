import axios from "axios";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia";
// 重新挂载pinia
const PiniaStore = useMainStore(pinia);

console.log("requestJS拿到pinia的值----------", PiniaStore);

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.withCredentials = false;

// console.log("request请求地址：", import.meta.env.VITE_APP_BASE_API);
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 8000,
});

request.interceptors.request.use(
  (config) => {
    config.cancelToken = new axios.CancelToken(function (v) {
      PiniaStore.cancelAxios = v;
    });
    return config;
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);

request.interceptors.response.use((response) => {
  return response.data;
});

export default request;
