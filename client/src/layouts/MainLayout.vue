<template>
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>

  <MainHeader />
  <router-view />
  <MainFooter />
  <el-backtop :right="100" :bottom="100" />
</template>

<script lang="ts" setup>
import MainHeader from './components/MainHeader.vue';
import MainFooter from './components/MainFooter.vue';
import { useI18n } from 'vue-i18n';
import { useMeta } from 'vue-meta';

const { t } = useI18n();

useMeta({ title: t('app.title') })

</script>

<style lang="scss" scoped>
</style>