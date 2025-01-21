<template>
  <!-- 外層利用is載入layout -->
  <component :is="layout" :key="langKey">
    <!-- 內層利用router顯示 透過解構賦值 取得從router-view取得的component 在把Component用在:is＝"Component"身上-->
    <router-view v-slot="{ Component }">
      <!-- <transition name="fade-transform"> -->
      <component :is="Component" />
      <!-- </transition> -->
    </router-view>
  </component>

  <the-popup />
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { isNil, defaultTo, path } from "ramda";
import AOS from "aos";
import useI18n from "./hooks/use-i18n";
// import pro168 from "@/assets/images/pro168_logo.png";
export default {
  setup() {
    const store = useStore(); //啟用vuex
    const { locale } = useI18n(); //啟用i18n
    store.commit("app/set/langKey", locale); //將i18n的語言狀態存入vuex
    const langKey = computed(() => store.state.app.langKey); //取得vuex的語言狀態
    const layout = computed(() => {
      /* 一開始都是 undefined */
      /* isNil為檢查空值，為null或undefined則return null */
      if (isNil(store.state.route.path)) return null;
      /* 拿設定的 layout，預設是 default-layout */
      const currentLayout = defaultTo("layout-error")(
        path(["meta", "layout"], store.state.route)
      );
      // defaulto的功用就是給預設值
      // 這邊的用法是先設定defaultTo預設值，
      // 緊接著馬上用設置好的預設值下去執行再return結果給變數
      // 所以才會是兩個（）（）分別代表執行了兩次fn，設置及使用
      // 分解大概長這樣：
      // const default = defaultTo("layout-error");
      // default(path(["meta", "layout"], store.state.route))
      return currentLayout;
    });

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      window.addEventListener("resize", setVh);
    };

    onMounted(() => {
      setVh();
      AOS.init();
    });

    watch(langKey, (newValue) => {
      console.log("langKey", newValue);
      store.commit("set/langKey", newValue);
    });

    return {
      layout,
      langKey,
    };
  },
};
</script>
<style lang="scss" scoped>
// .fade-transform-enter-active,
// .fade-transform-leave-active {
//   transition: opacity 0.5s ease;
// }

// .fade-transform-enter-from,
// .fade-transform-leave-to {
//   opacity: 0;
// }
</style>
