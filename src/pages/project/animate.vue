<template>
  <div class="animate">
    <div class="animate-video-btn">
      <canvas ref="chestVideo" />
      <div class="animate-video-btn-click" @click="clickChest"></div>
    </div>
    <div class="animate-video-open" v-show="state.isAnimate">
      <canvas ref="openVideo" />
      <div class="animate-video-open-confirm" @click="onClose">
        {{ t("button.clickclose") }}
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, reactive, ref } from "vue";
import { Rive } from "@rive-app/canvas";
import { delay } from "@/tool";
import { useI18n } from "@/hooks/use-i18n";
import { useAlert } from "@/hooks/use-alert";

export default {
  breadcrumb: "pages.project.rive",
  setup() {
    const { t } = useI18n();
    const alert = useAlert();
    // console.log(alert.showLoading);
    const chestVideo = ref(null);
    const openVideo = ref(null);
    const state = reactive({
      isAnimate: false,
      isSetSize: false,
    });
    const chestAnimate = {
      instance: {},
      isCompleted: null,
      click: null,
    };
    const openAnimate = {
      instance: {},
      start: null,
    };
    const clickChest = async () => {
      chestAnimate.click.fire();
      await delay(1000);
      onOpen();
      // 其實也可以用canvas本身的event，但這邊使用手動觸發的方式。
      // chestVideo.value.addEventListener("touchstart", () => prizeAlert());
    };
    const onOpen = async () => {
      state.isAnimate = true;
      await nextTick();
      if (!state.isSetSize) {
        openAnimate.instance.resizeDrawingSurfaceToCanvas();
        state.isSetSize = true;
      }
      openAnimate.start.fire();
    };
    const onClose = () => {
      state.isAnimate = false;
      settingAnimate();
    };
    const settingAnimate = () => {
      alert.showLoading();
      chestAnimate.instance = new Rive({
        canvas: chestVideo.value,
        src: new URL("../../assets/video/chest_v5_normal.riv", import.meta.url)
          .href,
        autoplay: true,
        stateMachines: "Chest",
        onLoad: async () => {
          chestAnimate.isCompleted = chestAnimate.instance
            .stateMachineInputs("Chest")
            .find((item) => item.name === "isCompleted");
          chestAnimate.click = chestAnimate.instance
            .stateMachineInputs("Chest")
            .find((item) => item.name === "click");
        },
      });
      openAnimate.instance = new Rive({
        canvas: openVideo.value,
        src: new URL(
          "../../assets/video/chest_open_normal.riv",
          import.meta.url
        ).href,
        autoplay: true,
        stateMachines: "State Machine 1",
        onLoad: () => {
          openAnimate.start = openAnimate.instance
            .stateMachineInputs("State Machine 1")
            .find((item) => item.name === "btn_click");
        },
      });
      alert.close();
    };
    onMounted(() => {
      settingAnimate();
    });
    return {
      t,
      state,
      onClose,
      openVideo,
      chestVideo,
      clickChest,
      openAnimate,
    };
  },
};
</script>
<style lang="scss" scoped>
.animate {
  // position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 75%;
  &-video {
    &-open {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1040;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      &-confirm {
        position: absolute;
        bottom: 20%;
        color: #a4a4a4;
      }
    }
    &-btn {
      position: relative;
      &-click {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        height: 50%;
        z-index: 1;
      }
    }
  }
}
</style>
