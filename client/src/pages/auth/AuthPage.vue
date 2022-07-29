<template>
  <HeaderBar :is-login-page="isLoginPage" />
  <LoginForm v-if="isLoginPage" />
  <RegisterForm v-else />
</template>

<script lang="ts" setup>
import { onBeforeMount, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import HeaderBar from './components/HeaderBar.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import { useAuthStore } from './store';

const route = useRoute();
const isLoginPage = ref(true);
const store = useAuthStore();

onBeforeMount(() => {
  isLoginPage.value = route.path.includes('login') ? true : false;
})

watch(() => route.path, (currentValue, oldValue) => {
  isLoginPage.value = currentValue.includes('login') ? true : false;
})


</script>

<style lang="scss" scoped>
</style>