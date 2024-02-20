<script setup>
import { inject } from 'vue'

const apiHost = inject('apiHost');
const useFetch = async () => {
  const response = await fetch(`${apiHost}/test`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button type="button" @click="useFetch">獲取資料</button>
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
