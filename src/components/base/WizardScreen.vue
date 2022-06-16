<script setup lang="ts">
import WizardDescription from './WizardDescription.vue';
import WizardButtons from './WizardButtons.vue';
import { defineEmits, defineProps, toRefs } from 'vue';
import {
  cannotContinueEventName,
  goToNextScreenEventName,
  goToPreviousScreenEventName,
} from './custom.event.names';
import { ScreenName } from '../form.wizard';
import { WizardScreenConfiguration } from './wizard.screen';

// REF: https://vuejs.org/api/sfc-script-setup.html#type-only-props-emit-declarations
const props = defineProps<{
  title: WizardScreenConfiguration['title'];
  description: WizardScreenConfiguration['description'];
  buttons: WizardScreenConfiguration['buttons'];
  canContinue: boolean;
  redirectToScreen?: ScreenName;
}>();
const { description, buttons, canContinue, redirectToScreen } = toRefs(props);

// REF: https://vuejs.org/api/sfc-script-setup.html#type-only-props-emit-declarations
const emit = defineEmits<{
  (event: typeof goToNextScreenEventName, screenName: ScreenName): void;
  (event: typeof goToPreviousScreenEventName, screenName: ScreenName): void;
  (event: typeof cannotContinueEventName): void;
}>();

const goToPreviousScreen = ($event: ScreenName) => {
  emit(goToPreviousScreenEventName, $event);
};

const goToNextScreen = ($event: ScreenName) => {
  if (canContinue.value) {
    emit(
      goToNextScreenEventName,
      // NOTE: Bypass to a different screen if value is not falsy
      // NOTE: For sending user over 100 to `ScreenAgeError` screen
      redirectToScreen?.value ? redirectToScreen.value : $event
    );
  } else {
    // NOTE: Notify `ScreenTellUsAboutYourself` so it can trigger browser form validation
    emit(cannotContinueEventName);
  }
};
</script>

<template>
  <div
    class="flex flex-col items-center gap-6 border border-gray-200 bg-gray-50 rounded-lg shadow-sm p-6"
  >
    <h1 class="text-2xl font-bold text-gray-700">
      {{ title }}
    </h1>

    <WizardDescription v-if="description.length" :description="description" />

    <slot />

    <div v-if="buttons.length" class="flex gap-4">
      <WizardButtons
        @go-to-previous-screen="goToPreviousScreen($event)"
        @go-to-next-screen="goToNextScreen($event)"
        :buttons="buttons"
      />
    </div>
  </div>
</template>

<style scoped></style>
