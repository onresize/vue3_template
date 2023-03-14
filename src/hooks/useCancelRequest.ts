// 取消请求hook
import { onBeforeUnmount } from "vue";
import { useMainStore } from "@/store/pinia";

const PiniaStore = useMainStore();

function useCancelRequest() {
  onBeforeUnmount(() => {
    PiniaStore.cancelAxios && PiniaStore.cancelAxios();
  });
}
export default useCancelRequest;
