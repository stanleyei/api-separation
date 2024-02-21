<script setup>
import { onMounted } from 'vue';
import { useFetch, useAxios } from '@/composables/useRequest';
import { useStorage } from '@vueuse/core';

const user = useStorage('api-separation-user');

const getData = async () => {
  const res = await useAxios.get('/api/v1/test');
  console.log(res.data);
};

const checkAuth = async () => {
  const res = await useFetch('/api/v1/check-auth');
  if (!res?.rt_code) return;
  
  const { isAuthenticated = false, userData = null } = res?.rt_data ?? {};
  user.value = isAuthenticated ? userData : null;
};

const login = async () => {
  await useAxios.get('/sanctum/csrf-cookie');
  const res = await useFetch('/login', 'POST', {
    email: 'admin@gmail.com',
    password: '12345678',
  });

  user.value = res?.rt_data ?? null;
};

const logout = async () => {
  const res = await useFetch('/logout', 'POST');
  if (!res?.rt_code) return;
  user.value = null;
};

const getUser = async () => {
  const res = await useFetch('/api/v1/user');
  console.log(res);
};

onMounted(() => {
  checkAuth();
});
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button type="button" @click="getData">獲取資料</button>
    <button type="button" @click="checkAuth">檢查登入狀態</button>
    <button v-if="!user" type="button" @click="login">登入</button>
    <div v-else>
      <button type="button" @click="logout">登出</button>
      <button type="button" @click="getUser">獲取使用者資料</button>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
}
</style>
