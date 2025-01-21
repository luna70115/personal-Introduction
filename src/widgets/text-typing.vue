<template>
  <div class="typewrite">
    <span class="wrap">{{ txt }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  toRotate: {
    type: Array,
    required: true,
  },
  period: {
    type: Number,
    default: 2000,
  },
});

let loopNum = ref(0); // 這個變量保存當前正在顯示的數組索引
let txt = ref(""); // 當前要顯示的文字
let isDeleting = ref(false); // 用於確定是輸入還是刪除文字

const tick = () => {
  let i = loopNum.value % props.toRotate.length; // 獲取當前要顯示的文字
  let fullTxt = props.toRotate[i]; // 獲取完整的文字

  // 判斷是添加還是刪除文字
  if (isDeleting.value) {
    txt.value = fullTxt.substring(0, txt.value.length - 1); // 刪除一個字符
  } else {
    txt.value = fullTxt.substring(0, txt.value.length + 1); // 添加一個字符
  }

  let delta = 200 - Math.random() * 100; // 設置下一次tick的時間

  // 如果正在刪除，加速刪除速度
  if (isDeleting.value) {
    delta /= 2;
  }

  // 當文字全部輸入完畢，設置為刪除模式，並在一段時間後開始刪除
  if (!isDeleting.value && txt.value === fullTxt) {
    delta = props.period;
    isDeleting.value = true;
  } else if (isDeleting.value && txt.value === "") {
    // 當文字刪除完畢，設置為輸入模式，並切換到下一個文字
    isDeleting.value = false;
    loopNum.value++;
    delta = 500;
  }

  // 設置下一次tick的時間
  setTimeout(() => {
    tick();
  }, delta);
};

onMounted(() => {
  tick(); // 初始化第一次打字
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/root.scss";
.typewrite {
  position: relative;
  top: 1px;
  display: inline;
  & > .wrap {
    border-right: 0.08em solid var(--purple);
  }
}
</style>
