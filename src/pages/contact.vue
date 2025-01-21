<template>
  <div class="contact animate__animated animate__slow animate__fadeIn">
    <div class="contact-title">{{ t("$current.question") }}</div>
    <div class="contact-answer">{{ t("$current.answer") }}</div>
    <ul class="contact-list">
      <li>
        <div class="contact-list-icon">
          <ion-icon name="call"></ion-icon>
        </div>
        <div class="contact-list-text">
          <p class="contact-list-text-top">
            {{ t("$current.item.phone") }}
          </p>
          <p class="contact-list-text-bottom">0912-834769</p>
        </div>
        <a href="tel:+886-975-698910"></a>
      </li>
      <li>
        <div class="contact-list-icon">
          <ion-icon name="mail"></ion-icon>
        </div>
        <div class="contact-list-text">
          <p class="contact-list-text-top">
            {{ t("$current.item.mail") }}
          </p>
          <p class="contact-list-text-bottom">vuxups70115@gmail.com</p>
        </div>
        <a href="mailto: vuxups70115@gmail.com"></a>
      </li>
      <li>
        <div class="contact-list-icon">
          <ion-icon name="logo-github"></ion-icon>
        </div>
        <div class="contact-list-text">
          <p class="contact-list-text-top">
            {{ t("$current.item.github") }}
          </p>
          <p class="contact-list-text-bottom">Link</p>
        </div>
        <a href="https://github.com/luna70115?tab=repositories"></a>
      </li>
    </ul>
    <!-- <div class="contact-title bottom">{{ t("$current.question") }}</div>
    <div class="contact-answer">{{ t("$current.answer") }}</div> -->
  </div>
</template>

<script>
import { useI18n } from "@/hooks/use-i18n";
export default {
  breadcrumb: "pages.contact.title",
  setup() {
    const { t, setPrefix } = useI18n();
    setPrefix({
      $current: "pages.contact",
    });
    return {
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/contact.scss";
</style>
