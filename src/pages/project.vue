<template>
  <div class="project animate__animated animate__slow animate__fadeIn">
    <div class="project-title">
      {{ t("$current.introduction") }}
    </div>
    <ul class="project-list">
      <li class="project-list-item" v-for="item in list" :key="item.title">
        <img
          v-lazy="{
            src: item.img,
          }"
          :alt="item.title"
        />
        <div class="project-list-item-caption">
          {{ item.title }}
        </div>
        <a :href="item.url" v-if="item.url !== ''" target="_blank"></a>
        <router-link
          :to="{
            path: '/project/' + item.articleType,
          }"
          v-else-if="item.isArticle"
        ></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// import loading from "@/assets/images/icegif-1264.gif";
import { useI18n } from "@/hooks/use-i18n";
import { ref } from "vue";
import { getImageUrl } from "@/tool";
export default {
  breadcrumb: "pages.project.title",
  setup() {
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.project",
    });
    const list = ref([
      {
        title: t("$current.list.title.1"),
        img: getImageUrl("portfolio/miaoLiHan.png"),
        url: "https://miaolihan.netlify.app/",
        isArticle: true,
      },
      {
        title: t("$current.list.title.2"),
        img: getImageUrl("portfolio/seventeen.png"),
        url: "https://seventeen-jade.vercel.app/",
        isArticle: false,
      },

      {
        title: t("$current.list.title.3"),
        img: getImageUrl("portfolio/todolist.png"),
        url: "https://lunatodolist.netlify.app/",
        isArticle: false,
      },
      {
        title: t("$current.list.title.4"),
        img: getImageUrl("portfolio/ooxx.png"),
        url: "https://ooxxgame.vercel.app/",
        isArticle: false,
      },
    ]);
    return {
      t,
      list,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/project.scss";
</style>
