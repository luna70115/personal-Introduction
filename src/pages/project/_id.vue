<template>
  <div class="project-detail">
    <!-- {{ route.params.id }} -->
    <Article
      v-for="(item, index) in msg"
      :key="`article-${index}`"
      :text="item.text"
      :img="item?.img"
      :id="index"
      :keyword="item?.keyword ?? []"
    ></Article>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import Article from "@/widgets/pages/article";
export default {
  breadcrumb: "pages.project.detail.title",
  components: {
    Article,
  },
  setup() {
    const route = useRoute();
    console.log(route.params.id);
    return {
      route,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/project.scss";
</style>
