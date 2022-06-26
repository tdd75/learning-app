<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useMeta } from 'vue-meta';
import { DEFAULT_LANGUAGE } from './common/constants';

useMeta({
  title: '',
  htmlAttrs: { lang: DEFAULT_LANGUAGE, amp: true }
})
</script>
