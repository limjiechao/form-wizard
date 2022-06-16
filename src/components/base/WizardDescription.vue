<script setup lang="ts">
import { toRefs } from 'vue';
import { WizardDescriptionConfiguration } from './wizard.description';

const props = defineProps<{ description: WizardDescriptionConfiguration }>();
const { description } = toRefs(props);
</script>

<template>
  <template v-for="(sentence, index) in description" :key="`sentence-${index}`">
    <p>{{ sentence }}</p>
  </template>
</template>

<style scoped></style>
