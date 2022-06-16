<script setup lang="ts">
import WizardScreen from '../base/WizardScreen.vue';
import { ScreenWelcome } from './screen.configurations';

const { title, description, buttons } = ScreenWelcome;
</script>

<template>
  <WizardScreen
    id="screen-welcome"
    :title="title"
    :description="description"
    :buttons="buttons"
    :can-continue="true"
  />
</template>

<style scoped></style>
