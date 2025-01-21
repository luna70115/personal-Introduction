<template>
  <div
    class="article"
    :id="`article-id-${id}`"
    :class="{ 'had-img': img !== '' }"
  >
    <div class="article-text">{{ text }}</div>
    <img v-if="img !== ''" class="article-img" :src="img" alt="" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
const { id, keyword } = defineProps({
  img: {
    type: String,
    default: "",
  },
  text: String,
  keyword: {
    type: Array,
    default: [],
  },
  id: {
    type: Number,
    default: 0,
  },
});

const setKeyword = (searchText, isLink = false, url = "") => {
  console.log(searchText, id);
  // 創建一個正則表達式以找到我們要突出顯示的文本
  const regex = new RegExp(searchText, "g");
  const element = document.querySelector(`#article-id-${id}`);
  console.log(element.innerHTML);
  const replaceElement = isLink
    ? `<a class="keyword--purple" href="${url}">${searchText}</a>`
    : `<span class="keyword--purple">${searchText}</span>`;
  // 替換所有匹配的文本以添加高亮顯示
  element.innerHTML = element.innerHTML.replace(regex, replaceElement);
};

onMounted(() => {
  keyword.forEach((item) => {
    const { isLink, text } = item;
    const url = item?.url ?? "";
    setKeyword(text, isLink, url);
  });
});
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  &-img {
    position: relative;
    z-index: 1;
    background: var(--darkpurple);
    max-height: 20rem;
    object-fit: cover;
  }
  &-text {
    position: relative;
    white-space: pre-wrap;
  }
  &.had-img {
    margin-bottom: 3rem;
    .article-img,
    .article-text {
      width: 50%;
    }
    .article-text {
      // display: flex;
      //   align-items: center;
      // justify-content: center;
      padding: 2rem 0rem 0;
      padding-right: 1rem;
    }
  }
}
@media (max-width: 720px) {
  .article {
    &.had-img {
      flex-direction: column-reverse;
      .article-img,
      .article-text {
        width: 100%;
      }
    }
  }
}
</style>
