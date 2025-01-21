<template>
  <div class="layout-default-nav" :class="{ show: isShowNav }">
    <div
      class="layout-default-nav-logo"
      :class="{ 'layout-default-nav-logo--jump': isAnimation }"
      @mouseenter="logoAnimation"
    >
      <div class="layout-default-nav-logo-font">
        <h1>Ｌ</h1>
        <h3>una</h3>
      </div>
    </div>
    <ul
      class="layout-default-nav-list"
      :class="[`layout-default-nav-list--${locale}`]"
    >
      <li
        class="layout-default-nav-list-item"
        v-for="item in navs"
        :key="item.text"
        @click="isShowNav = false"
      >
        <ion-icon
          :name="item.icon"
          class="layout-default-nav-list-item-icon"
        ></ion-icon>
        <span>{{ item.text }}</span>
        <router-link :to="item.link"></router-link>
      </li>
    </ul>
    <div class="layout-default-nav-actions">
      <div class="layout-default-nav-actions-lang-change">
        <div>
          <select v-model="language.current" @change="onChange">
            <option
              v-for="(item, index) in language.langs"
              :key="item.value"
              :value="item.value"
              :selected="index === 0"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
        <!-- <div class="btn" @click="onChange">
          {{ t("button.change") }}
        </div> -->
      </div>
    </div>
  </div>
  <div class="layout-default-main" ref="main" :class="{ show: isShowNav }">
    <div class="layout-default-main-bg" v-if="isShowBg">
      <img src="@/assets/images/top-left-shape.png" alt="" />
    </div>
    <div class="layout-default-nav-mobile">
      <div
        class="layout-default-nav-mobile-btn"
        :class="{ 'layout-default-nav-mobile-btn--active': isShowNav }"
        @click="isShowNav = !isShowNav"
      >
        <div></div>
      </div>
    </div>
    <div class="layout-default-main-breadcrumb" v-if="breadcrumb !== ''">
      {{ t(breadcrumb) }}
      <div class="layout-default-main-breadcrumb-line"></div>
    </div>
    <slot />
  </div>
</template>

<script>
import { useI18n } from "@/hooks/use-i18n";
import { ref, reactive, computed, onUpdated } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import storage from "@/services/storage-service";
export default {
  setup() {
    const { t, setPrefix, change: changeLocale, locale } = useI18n();
    console.log(locale);
    // const router = useRouter();
    const route = useRoute();
    const main = ref(null);
    const isShowBg = computed(() => {
      return ["/project", "/contact"].includes(route.name);
    });
    const store = useStore();
    const isShowNav = ref(false);
    const breadcrumb = computed(() => store.state.route.meta.breadcrumb);
    setPrefix({
      $nav: "app.nav",
    });
    const navs = [
      {
        text: t("$nav.home"),
        icon: "home",
        link: "/home",
      },
      {
        text: t("$nav.about"),
        icon: "person",
        link: "/about",
      },
      {
        text: t("$nav.project"),
        icon: "document",
        link: "/project",
      },
      {
        text: t("$nav.contact"),
        icon: "chatbubbles",
        link: "/contact",
      },
    ];
    const language = reactive({
      langs: [
        { value: "zh-tw", label: "繁體中文" },
        { value: "en", label: "English" },
      ],
      isCanges: false,
      current: locale.value || "zh-tw", // v-modal的值要與select的value對應才會正確顯示 例如option為空，則v-modal預設value也須為空
    });
    const isAnimation = ref(false);
    const logoAnimation = () => {
      /* 執行中則不觸發 依照動畫執行速度在動畫結束後取消calss */
      if (isAnimation.value) return;
      isAnimation.value = true;
      setTimeout(() => {
        isAnimation.value = false;
      }, 3000);
    };
    const onChange = () => {
      changeLocale(language.current);
      storage.set("locale", language.current);
      // router.go(0);
      // 這邊重整的原因是因為若i18n是賦值在陣列 or 物件中，則不會受此影響。
    };
    onUpdated(() => {
      main.value.scrollTop = 0;
    });
    return {
      t,
      onChange,
      logoAnimation,
      navs,
      main,
      locale,
      isShowBg,
      language,
      isShowNav,
      breadcrumb,
      isAnimation,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.layout-default {
  &-nav {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 3rem;
    width: 350px;
    height: 100%;
    color: #fff;
    background: #000000 center / cover;
    cursor: default;
    overflow: hidden;
    transition: all 0.5s;
    &-logo {
      position: relative;
      margin: 3rem 0rem 0;
      // width: 220px;
      letter-spacing: 2.2px;
      &-brackets {
        position: absolute;
        width: 50px;
        height: 50px;
        &.left {
          top: 0;
          left: 0;
        }
        &.right {
          bottom: 0;
          right: 0;
        }
      }
      &-font {
        @include flex-center-center;
        color: var(--purple);
        height: 7rem;
        // font-family: Comic Sans MS;
        font-family: "Montserrat", sans-serif;
        font-weight: 400;
        h1 {
          font-size: 3rem;
        }
        h3 {
          font-size: 2rem;
        }
      }
      &--jump {
        h1 {
          animation-name: jump;
          animation-duration: 3s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
      }
    }
    &-list {
      display: flex;
      flex-direction: column;
      // align-items: center;
      font-size: 1.3rem;
      letter-spacing: 2.2px;
      &-item {
        @include flex-row-center;
        position: relative;
        justify-content: flex-start;
        padding: 0.2rem 1.5rem;
        margin: 0.5rem 0;
        font-weight: 300;
        border-bottom: 1px solid #444444;
        cursor: pointer;
        transition: color 0.3s;
        letter-spacing: 30px;
        &-icon {
          font-size: 1.2rem;
          margin-right: 1.5rem;
        }
        a {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        &:hover {
          color: var(--purple);
        }
      }
      &.layout-default-nav-list--en {
        .layout-default-nav-list-item {
          padding: 0.2rem 2rem;
          letter-spacing: 2px;
        }
      }
    }
    &-actions {
      @include flex-row-center;
      margin-bottom: 2rem;
      cursor: pointer;
      & > div {
        display: flex;
        align-items: center;
      }
      &-icon {
        font-size: 1.2rem;
        margin-right: 0.5rem;
      }
      &:hover {
        color: var(--purple);
      }
      select {
        padding: 0 0.8rem;
        padding-right: 2rem;
        margin-right: 0.5rem;
        height: 2rem;
        font-size: 0.8rem;
        color: var(--purple);
        border-radius: 8px;
        // background: url("@/assets/images/arror_down.svg") #000000 no-repeat 94%
        // center / 1rem;
        -moz-appearance: none; /* Firefox */
        -webkit-appearance: none; /* Safari and Chrome */
        appearance: none;
      }
    }
    &-mobile {
      display: none;
      align-items: center;
      justify-content: flex-start;
      padding: 0 1.2rem;
      height: 3.5rem;
      background: var(--black);
      &-btn {
        position: fixed;
        @include flex-center-center;
        width: 2.5rem;
        height: 2rem;
        border-radius: 2px;
        z-index: 10;
        transition: all 0.5s;
        & > div {
          width: 60%;
          height: 2px;
          background: var(--purple);
        }
        &::after,
        &::before {
          transition: all 0.5s;
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
          width: 60%;
          height: 2px;
          background: var(--purple);
        }
        &::before {
          top: 25%;
        }
        &::after {
          top: 75%;
        }
      }
      &-btn--active {
        // transform: rotate(360deg);
        // background: red;
        & > div {
          border-radius: 9999px;
          transform: translateX(0.5px);
          width: 50%;
        }
        &::before,
        &::after {
          width: 30%;
          left: 40%;
        }
        &::before {
          top: 35%;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
        &::after {
          top: 65%;
          transform: translate(-50%, -50%) rotate(45deg);
        }
      }
    }
  }
  &-main {
    position: fixed;
    top: 0;
    left: 0;
    margin-left: 350px;
    width: calc(100% - 350px);
    // min-height: 100%;
    height: 100%;
    overflow: scroll;
    background: var(--black);
    transition: all 0.5s;
    &-breadcrumb {
      white-space: nowrap;
      color: #fff;
      font-size: 2.2rem;
      padding: 3rem 1.2rem 3.5rem;
      &-line {
        margin-bottom: 10px;
        width: 2.5rem;
        height: 3px;
        background: var(--purple);
        &::after {
          content: "";
          display: block;
          // margin-top: 10px;
          transform: translateY(10px);
          width: 1.25rem;
          height: 3px;
          background: var(--purple);
        }
      }
    }
    &-bg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }
  }
}
@keyframes jump {
  from,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -4px, 0);
    transform: translate3d(0, -4px, 0);
  }
}
/* RWD */

@media (max-width: 980px) {
  .layout-default {
    &-nav {
      left: -350px;
      &-mobile {
        display: flex;
      }
      &.show {
        width: 290px;
        left: 0;
      }
    }
    &-main {
      margin-left: 0;
      width: 100%;
      &.show {
        margin-left: 290px;
        width: calc(100% - 290px);
      }
      &-breadcrumb {
        padding: 0 1.2rem 2rem;
      }
      &-bg {
        display: none;
      }
    }
  }
}
</style>
