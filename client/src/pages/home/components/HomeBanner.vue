<template>
  <div class="home-banner container-fluid">
    <img class="image-cloud" src="@/assets/images/cloud.png" />
    <div class="content container">
      <img class="image-icon" src="@/assets/images/icon-banner.png" />
      <div class="welcome">{{ t('home.banner.welcome') }}</div>
      <div class="description">{{ t('home.banner.description') }}</div>
      <router-link :to="{
        name: PageName.VOCABULARY_PAGE
      }" class="router-link">
        <el-button type="primary" class="button-start-now">
          <span>{{ t('home.banner.startNow') }}</span>
          <img class="ms-2" src="@/assets/images/icons/next-arrow.svg">
        </el-button>
      </router-link>

    </div>
  </div>

</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { PageName } from '../../../common/constants';

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.home-banner {
  position: relative;
  width: 100%;
  height: 90vh;
  background-color: $color-primary;

  .image-cloud {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin-bottom: -2px;
    height: auto;
  }
}

.content {
  position: relative;

  .image-icon {
    position: absolute;
    width: 250px;
    top: 12vh;
    right: 0;
    animation: zing 4s infinite;
  }

  .welcome {
    padding-top: 16vh;
    margin-bottom: 4vh;
    font-size: 18px;
    color: $color-white;
  }

  .description {
    width: 50vw;
    margin-bottom: 6vh;
    font-size: 32px;
    font-weight: 500;
    color: $color-white;
  }

  .button-start-now {
    padding: 20px 20px !important;
    width: fit-content;
    font-size: 18px;
    font-weight: 500;
    color: $color-primary;
    background-color: $color-white;
    border-radius: 4px;
    cursor: pointer;
  }
}

@keyframes zing {
  0% {
    transform: rotateX(20deg);
    transform: translate(20px, 20px);
  }

  50% {
    transform: rotateX(0deg);
    transform: translate(0px, 0px);
  }

  100% {
    transform: rotateX(-20deg);
    transform: translate(20px, 20px);
  }
}

@media only screen and (max-width: map-get($grid-breakpoints, lg)) {
  .image-icon {
    width: 200px !important;
  }

  .description {
    width: 40vw !important;
  }
}

@media only screen and (max-width: map-get($grid-breakpoints, sm)) {
  .home-banner {
    height: 80vh;
  }

  .image-icon {
    width: 135px !important;
    top: 16vh !important;
    right: 32px !important;
  }

  .welcome {
    width: 50vw;
    padding-top: 10vh !important;
  }

  .description {
    width: 40vw !important;
    margin-bottom: 5vh !important;
    font-size: 20px !important;
  }

  .button-start-now {
    width: 100px;
    font-size: 14px !important;
  }
}
</style>