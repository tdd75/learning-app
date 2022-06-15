<template>
  <MainHeaderVue />
  <MainFooterVue />
  <el-backtop :right="100" :bottom="100" />
</template>

<script lang="ts" setup>
import MainHeaderVue from './components/MainHeader.vue';
import MainFooterVue from './components/MainFooter.vue';
</script>

<style lang="scss" scoped>
</style>