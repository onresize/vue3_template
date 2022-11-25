// 取消请求hook
import { ref, onBeforeUnmount } from "vue";
import { useMainStore } from "@/store/main";

const PiniaStore = useMainStore();

function useCancelRequest() {
  onBeforeUnmount(() => {
    PiniaStore.cancelAxios && PiniaStore.cancelAxios();
    ElMessage.warning("已取消请求");
  });
}
export default useCancelRequest;
