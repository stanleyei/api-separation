<script setup>
import { inject } from 'vue';
import { useFetch } from '@/composables/useRequest';
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

const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key.trim() === name) return value;
  }
  return '';
};

const getData = async () => {
  const response = await fetch(`${apiHost}/test`, {
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
  await fetch('http://localhost:8000/sanctum/csrf-cookie', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    credentials: 'include',
  });

  const res = useFetch('http://localhost:8000/login', 'POST', {
    email: 'admin@gmail.com',
    password: '12345678',
  });

  console.log(res);
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button type="button" @click="getData">獲取資料</button>
    <button type="button" @click="login">登入</button>
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
