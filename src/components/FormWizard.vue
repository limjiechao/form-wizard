<script setup lang="ts">
import {
  defineAsyncComponent,
  defineProps,
  ref,
  shallowRef,
  toRefs,
} from 'vue';
import {
  Country,
  FieldName,
  PackageType,
} from './applied/screen.tell.us.about.yourself';
import {
  RetrievedFormData,
  ScreenName,
  Screens,
  StringifiedNumber,
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

const currentScreen = shallowRef(screens.ScreenWelcome);
const goToScreen = (screenName: ScreenName) => {
  currentScreen.value = screens[screenName];
};

const validatedFormData = ref<RetrievedFormData>({
  [FieldName.name]: '' as string,
  [FieldName.age]: '0' as StringifiedNumber,
  [FieldName.residence]: 'Hong Kong' as Country,
  [FieldName.package]: 'Safe' as PackageType,
  [FieldName.premium]: '0' as StringifiedNumber,
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
        @go-to-next-screen="goToScreen"
        @go-to-previous-screen="goToScreen"
        @submit-form-data="storeFormData"
      />
    </keep-alive>
  </div>
</template>

<style scoped></style>
