<template>
  <MainHeader />
  <router-view />
  <MainFooter />
  <el-backtop :right="35" :bottom="40" />
</template>

<script lang="ts" setup>
import MainHeader from './components/MainHeader.vue';
import MainFooter from './components/MainFooter.vue';
</script>

<style lang="scss" scoped>
</style>