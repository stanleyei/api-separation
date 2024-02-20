<script setup>
import { provide } from 'vue'
import { RouterView } from 'vue-router';

provide('apiHost', `${import.meta.env.VITE_API_HOST}`);
</script>

<template>
  <RouterView />
</template>
