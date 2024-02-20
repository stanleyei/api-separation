<script setup>
import { inject } from 'vue'

const apiHost = inject('apiHost');
const useFetch = async () => {
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

const getCookieValue = (name) => {
  let b = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

const login = () => {
  fetch('http://localhost:8000/sanctum/csrf-cookie', {
    credentials: 'include',
  }).then(async response => {
    const xsrfToken = getCookieValue('XSRF-TOKEN');
    console.log('🚀 / login / xsrfToken:', xsrfToken);
    // const res = await fetch('http://localhost:8000/login', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'X-Requested-With': 'XMLHttpRequest',
    //     'X-XSRF-TOKEN': response.headers.get('XSRF-TOKEN'),
    //   },
    //   body: JSON.stringify({
    //     email: 'admin@gmail.com',
    //     password: '12345678',
    //   }),
    //   credentials: 'include',
    // });

    // const data = await res.json();
    // console.log(data);
  });
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button type="button" @click="useFetch">獲取資料</button>
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
