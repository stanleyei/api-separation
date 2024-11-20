<script setup>
import TheWelcome from '../components/TheWelcome.vue';

const test = async () => {
  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserName: 'user1',
        Password: '123456',
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <main>
    <TheWelcome />
    <button type="button" @click="test">test</button>
  </main>
</template>
