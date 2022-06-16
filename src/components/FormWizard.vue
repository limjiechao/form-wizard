<script setup lang="ts">
import {
  defineAsyncComponent,
  defineProps,
  ref,
  shallowRef,
  toRefs,
  watch,
} from 'vue';
import {
  emptyStateFormData,
  RetrievedFormData,
  ScreenName,
  Screens,
} from './form.wizard';

const props = defineProps<{ vendorName: string; vendorLogo: string }>();
const { vendorName, vendorLogo } = toRefs(props);

// REF: https://vuejs.org/guide/components/async.html#async-components
const screens: Screens = {
  ScreenWelcome: defineAsyncComponent(
    () => import('./applied/ScreenWelcome.vue')
  ),
  ScreenTellUsAboutYourself: defineAsyncComponent(
    () => import('./applied/ScreenTellUsAboutYourself.vue')
  ),
  ScreenSummary: defineAsyncComponent(
    () => import('./applied/ScreenSummary.vue')
  ),
  ScreenAgeError: defineAsyncComponent(
    () => import('./applied/ScreenAgeError.vue')
  ),
};

const doResetForm = ref<boolean>(true);

const currentScreenName = ref<ScreenName>('ScreenWelcome');
const currentScreen = shallowRef(screens.ScreenWelcome);
const goToNextScreen = (screenName: ScreenName) => {
  // NOTE: Always flag form for reset when going forward
  // NOTE: As form is kept alive, i.e., cached, it will only reset when activated
  doResetForm.value = true;

  currentScreenName.value = screenName;
};
const goToPreviousScreen = (screenName: ScreenName) => {
  // NOTE: Only flag form for *no* reset if going back to `ScreenTellUsAboutYourself`
  // NOTE: This only happens when returning form `ScreenSummary`
  doResetForm.value = screenName !== 'ScreenTellUsAboutYourself';

  currentScreenName.value = screenName;
};

const validatedFormData = ref<RetrievedFormData>(emptyStateFormData());

watch(currentScreenName, (newCurrentScreen) => {
  // NOTE: Always reset `validatedFormData` from prior sessions at the first screen
  if (newCurrentScreen === 'ScreenWelcome') {
    validatedFormData.value = emptyStateFormData();
  }

  // NOTE: Switch screen via new screen name
  currentScreen.value = screens[newCurrentScreen];
});

const storeFormData = (formData: RetrievedFormData) => {
  validatedFormData.value = formData;
};
</script>

<template>
  <div id="form-wizard" class="flex flex-col p-4 items-center gap-4">
    <img
      class="w-1/5 min-w-[12rem] max-w-sm"
      :alt="`${vendorName} logo`"
      :src="vendorLogo"
    />

    <keep-alive>
      <component
        :is="currentScreen"
        :validated-form-data="validatedFormData"
        :do-reset-form="doResetForm"
        @go-to-previous-screen="goToPreviousScreen"
        @go-to-next-screen="goToNextScreen"
        @submit-form-data="storeFormData"
      />
    </keep-alive>
  </div>
</template>

<style scoped></style>
