<script setup lang="ts">
import { defineAsyncComponent, defineEmits, toRefs } from 'vue';
import {
  WizardButtonComponents,
  WizardButtonConfiguration,
  WizardButtonConfigurations,
  WizardButtonEventName,
} from './wizard.buttons';

const buttonComponents: WizardButtonComponents = {
  Primary: defineAsyncComponent(() => import('./WizardPrimaryButton.vue')),
  Secondary: defineAsyncComponent(() => import('./WizardSecondaryButton.vue')),
};

const props = defineProps<{ buttons: WizardButtonConfigurations }>();
const { buttons } = toRefs(props);

const emit = defineEmits<{
  (
    event: WizardButtonEventName,
    screenName: WizardButtonConfiguration['screenName']
  ): void;
}>();
</script>

<template>
  <template v-for="(button, index) in buttons" :key="`button-${index}`">
    <!-- REF: https://v3-migration.vuejs.org/new/fragments.html#_3-x-syntax -->
    <component
      v-bind="$attrs"
      :is="buttonComponents[button.type]"
      class="bg-teal-300 py-4 px-16 rounded-lg font-semibold uppercase"
      type="button"
      @click="emit(button.eventName, button.screenName)"
    >
      {{ button.label }}
    </component>
  </template>
</template>

<style scoped></style>
