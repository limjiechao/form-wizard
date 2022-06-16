<script setup lang="ts">
import WizardScreen from '../base/WizardScreen.vue';
import { ScreenAgeError } from './screen.configurations';

const { title, description, buttons } = ScreenAgeError;
</script>

<template>
  <WizardScreen
    id="screen-age-error"
    :title="title"
    :description="description"
    :buttons="buttons"
    :can-continue="true"
  />
</template>

<style scoped></style>
