<script setup>
import { inject, ref } from 'vue';
import { getCookie } from '@/composables/useRequest';
// import axios from 'axios';

const apiHost = inject('apiHost');
// const client = axios.create({
//   baseURL: apiHost,
//   headers: {
//     'X-Requested-With': 'XMLHttpRequest',
//   },
//   withCredentials: true,
// });

// client.interceptors.request.use((config) => {
//   config.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');
//   return config;
// });

const user = ref(null);

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

  try {
    const res = await fetch(`${apiHost}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
      },
      body: JSON.stringify({
        email: 'admin@gmail.com',
        password: '12345678',
      }),
      credentials: 'include',
    });

    const data = await res.json();
    user.value = data;
    console.log(data);
  } catch (error) {
    console.error('login failed', error);
  }
};

const logout = async () => {
  try {
    await fetch(`${apiHost}/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
      },
      credentials: 'include',
    });

    user.value = null;
  } catch (error) {
    console.error('logout failed', error);
  }
};

const getUser = async () => {
  try {
    const res = await fetch(`${apiHost}/api/v1/user`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
      },
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('get user failed', error);
  }
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button type="button" @click="getData">獲取資料</button>
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
