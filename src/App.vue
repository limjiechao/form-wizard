<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import FormWizard from './components/FormWizard.vue';
</script>

<template>
  <FormWizard />
</template>

<style>
html,
body {
  @apply h-full w-full;
}

body {
  @apply bg-gray-100;
}

#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
