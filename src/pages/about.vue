<template>
  <div class="about animate__animated animate__slow animate__fadeIn">
    <div class="about-introduction">
      <div class="about-introduction-title">
        {{ t("$in.title")
        }}<span style="color: var(--purple)">{{ t("$in.title.2") }}</span>
      </div>
      <div class="about-introduction-caption">{{ t("$in.caption") }}</div>
    </div>
    <div class="about-profile">
      <div class="about-profile-list">
        <ul>
          <li
            v-for="item in profile.personal"
            :key="item.label"
            :class="{ '--point': item.link }"
          >
            <p class="about-profile-list-label">{{ item.label }}</p>
            <p class="about-profile-list-text">{{ item.text }}</p>
            <a v-if="item.link !== ''" :href="item.link" target="_blank"></a>
          </li>
        </ul>
        <div class="about-profile-list-actions">
          <button type="button" class="btn" @click="download">
            {{ t("button.download") }}
          </button>
          <button type="button" class="btn" @click="mailLink">
            {{ t("button.contact") }}
          </button>
        </div>
      </div>
      <div class="about-profile-skill">
        <div
          class="about-profile-skill-item"
          v-for="item in profile.skill"
          :key="item.name"
        >
          <div class="about-profile-skill-item-label">
            <p>{{ item.name }}</p>
            <p>{{ item.percent }}%</p>
          </div>
          <div class="about-profile-skill-item-progress">
            <div
              class="about-profile-skill-item-progress-bar"
              :style="{ width: `${item.percent}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-experience">
      <div class="about-experience-block left">
        <h1 class="about-experience-block-title">
          {{ t("$about.experience.education") }}
        </h1>
        <ul class="about-experience-block-list">
          <li v-for="(item, index) in profile.education" :key="item">
            <div class="about-experience-block-list-graphics">
              <span class="about-experience-block-list-graphics-circle"></span>
              <span class="about-experience-block-list-graphics-line"></span>
            </div>
            <div class="about-experience-block-list-data">
              <div class="about-experience-block-list-data-date">
                <ion-icon name="calendar-clear"></ion-icon>
                <span>{{ item.date }}</span>
              </div>
              <div class="about-experience-block-list-data-title">
                {{ item.place }}
              </div>
              <div
                class="about-experience-block-list-data-caption"
                :class="{
                  'about-experience-block-list-data-caption--last':
                    index === profile.experience.length - 1,
                }"
              >
                {{ item.caption }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="about-experience-block right">
        <h1 class="about-experience-block-title">
          {{ t("$about.experience.experience") }}
        </h1>
        <ul class="about-experience-block-list">
          <li v-for="(item, index) in profile.experience" :key="item">
            <div class="about-experience-block-list-graphics">
              <span class="about-experience-block-list-graphics-circle"></span>
              <span class="about-experience-block-list-graphics-line"></span>
            </div>
            <div class="about-experience-block-list-data">
              <div class="about-experience-block-list-data-date">
                <ion-icon name="calendar-clear"></ion-icon>
                <span>{{ item.date }}</span>
              </div>
              <div class="about-experience-block-list-data-title">
                {{ item.place }}
              </div>
              <div
                class="about-experience-block-list-data-caption"
                :class="{
                  'about-experience-block-list-data-caption--last':
                    index === profile.experience.length - 1,
                }"
              >
                {{ item.caption }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "@/hooks/use-i18n";
import { reactive } from "vue";
import { openUrl } from "@/tool";
import cv from "@/assets/resume.pdf";
export default {
  breadcrumb: "pages.about.title",
  setup() {
    const { t, setPrefix } = useI18n();
    setPrefix({
      $home: "pages.home",
      $about: "pages.about",
      $in: "pages.about.introduce",
    });
    const profile = reactive({
      name: t("$home.name"),
      personal: [
        {
          label: t("$in.label.birthday"),
          text: "1998-01-15",
          link: "",
        },
        {
          label: t("$in.label.age"),
          text: "27",
          link: "",
        },
        {
          label: t("$in.label.web"),
          text: "Link",
          link: "https://github.com/luna70115?tab=repositories",
        },
        {
          label: t("$in.label.mail"),
          text: "vuxups70115@gmail.com",
          link: "mailto: vuxups70115@gmail.com",
        },
        {
          label: t("$in.label.phone"),
          text: "0912-834769",
          link: "tel:+886-912-834769",
        },
        {
          label: t("$in.label.city"),
          text: t("$in.label.city.answer"),
          link: "",
        },
      ],
      skill: [
        {
          name: "Vue",
          percent: 80,
        },
        {
          name: "React",
          percent: 70,
        },
        {
          name: "Node.JS",
          percent: 60,
        },
      ],
      experience: [
        {
          date: "2024 - now",
          place: t("$about.experience.experience.title.1"),
          caption: t("$about.experience.experience.caption.1"),
        },
      ],
      education: [
        {
          date: "2020",
          place: t("$about.experience.education.title.1"),
        },
        {
          date: "2013 - 2018",
          place: t("$about.experience.education.title.2"),
        },
        {
          date: "2010 - 2013",
          place: t("$about.experience.education.title.3"),
        },
      ],
    });

    const download = () => {
      openUrl(cv, { isDownload: true });
    };

    const mailLink = () => {
      openUrl("mailto: vuxups70225@gmail.com", { isBlank: true });
    };

    return {
      t,
      download,
      mailLink,
      profile,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/about.scss";
</style>
