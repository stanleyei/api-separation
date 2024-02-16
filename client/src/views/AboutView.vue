<script setup>
const useFetch = async () => {
  const response = await fetch('http://demo.api-separation.digipack.io/api/v1/test');
  const data = await response.json();
  console.log(data);
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button type="button" @click="useFetch">發送請求</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}
</style>
