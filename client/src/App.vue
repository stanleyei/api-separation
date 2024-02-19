<script setup>
import { provide } from 'vue'
import { RouterView } from 'vue-router';

provide('apiHost', `${import.meta.env.VITE_API_HOST}/api/v1`);
</script>

<template>
  <RouterView />
</template>
