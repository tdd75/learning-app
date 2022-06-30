<template>
  <router-view />
</template>

<script lang="ts" setup>
import { DEFAULT_LANGUAGE } from './common/constants';
import { useAuthStore } from './pages/auth/store';

const authStore = useAuthStore();

const token = localStorage.getItem('token');
if (token && token.trim() !== '') {
  authStore.autoLogin(token);
}

</script>
