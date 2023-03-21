import axios from "axios";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia";
// 重新挂载pinia
const PiniaStore = useMainStore(pinia);

export default function server(obj: any) {
  axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
  axios.defaults.withCredentials = false;
  return new Promise((resolve, reject) => {
    console.log("开发模式下request请求地址：", import.meta.env.VITE_APP_BASE_API);
    const request = axios.create({
      baseURL: obj.url.includes("/api")
        ? import.meta.env.VITE_OTHER_BASE_API
        : import.meta.env.VITE_APP_BASE_API,
      timeout: 10000,
    });

    request.interceptors.request.use(
      (config) => {
        config.cancelToken = new axios.CancelToken(function (v) {
          PiniaStore.cancelAxios = v;
        });
        return config;
      },
      (err) => reject(err)
    );

    request.interceptors.response.use((response) => response.data);

    resolve(request({...obj}));
  });
}
