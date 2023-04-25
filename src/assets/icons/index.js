import { createApp } from "vue";
import App from "@/App.vue";
import pinia from "@/store/store";
import { useMainStore } from "@/store/pinia";

const PiniaStore = useMainStore(pinia);

const files = import.meta.globEager("./svg/*.svg")

const getStr = (str) => {
  let r1 = str.lastIndexOf('/') + 1
  let r2 = str.lastIndexOf('.')
  return str.substring(r1, r2)
}

let modules = Object.keys(files), iconList = []

modules.forEach((v) => {
  iconList.push(getStr(v))
})

console.log('本地图片svg：', iconList)

PiniaStore.changeSvgList(iconList)

