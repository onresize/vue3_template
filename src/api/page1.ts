import request from "@/utils/request";
//页面所有api统一使用async/await方式调用
import { awaitTo } from "@/utils/awaitTo";

export const getTableList = () => {
  return awaitTo(
    request({
      url: "/",
      method: "GET",
    })
  );
};
