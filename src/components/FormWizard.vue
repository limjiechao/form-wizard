<script setup lang="ts">
import {
  defineAsyncComponent,
  defineProps,
  ref,
  shallowRef,
  toRefs,
} from 'vue';
import { RetrievedFormData } from './applied/ScreenTellUsAboutYourself.vue';
import {
  Country,
  FieldName,
  PackageType,
} from './base/form.types.and.constants';

const props = defineProps<{ vendorName: string; vendorLogo: string }>();
const { vendorName, vendorLogo } = toRefs(props);

type ScreenPrefix<Name extends string> = `Screen${Name}`;
export type ScreenName =
  | ScreenPrefix<'Welcome'>
  | ScreenPrefix<'TellUsAboutYourself'>
  | ScreenPrefix<'AgeError'>
  | ScreenPrefix<'Summary'>;

export type AsyncComponent = ReturnType<typeof defineAsyncComponent>;
type Screens = Record<ScreenName, AsyncComponent>;

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

type StringifiedNumber = `${number}`;
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
