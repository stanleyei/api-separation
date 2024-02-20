<script setup>
import { inject } from 'vue';
import { getCookie } from '@/composables/useRequest';
// import axios from 'axios';

// const client = axios.create({
//   baseURL: 'http://localhost:8000',
//   headers: {
//     'X-Requested-With': 'XMLHttpRequest',
//   },
//   withCredentials: true,
// });

// client.interceptors.request.use((config) => {
//   config.headers['X-XSRF-TOKEN'] = decodeURIComponent(getCookie('XSRF-TOKEN'));
//   return config;
// })

const apiHost = inject('apiHost');

const getData = async () => {
  const response = await fetch(`${apiHost}/api/v1/test`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });
  const data = await response.json();
  console.log(data);
};

const login = async () => {
  await fetch(`${apiHost}/sanctum/csrf-cookie`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    credentials: 'include',
  });

  await fetch(`${apiHost}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN')),
    },
    body: JSON.stringify({
      email: 'admin@gmail.com',
      password: '12345678',
    }),
    credentials: 'include',
  });
};

const logout = async () => {
  await fetch(`${apiHost}/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN')),
    },
    credentials: 'include',
  });
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button type="button" @click="getData">獲取資料</button>
    <button type="button" @click="login">登入</button>
    <button type="button" @click="logout">登出</button>
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
