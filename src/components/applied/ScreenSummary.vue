<script setup lang="ts">
import WizardScreen from '../base/WizardScreen.vue';
import { ScreenSummary } from './screen.configurations';
import { toRefs } from 'vue';
import { FieldLabel, FieldName } from './screen.tell.us.about.yourself';
import { RetrievedFormData } from '../form.wizard';

const props = defineProps<{ validatedFormData: RetrievedFormData }>();
const { validatedFormData } = toRefs(props);

const { title, description, buttons } = ScreenSummary;

/**
 * REF: https://vuejs.org/guide/essentials/list.html#v-for-with-an-object
 *
 * NOTE: `getFieldLabel(…)` is a workaround for the following line in <template>…</template>
 *
 * ```
 * v-for="(fieldValue, fieldName) in validatedFormData"
 * ```
 * TypeScript thinks `validatedFormData` is an array and infers`fieldName` as a number.
 * But because `validatedFormData` is an object, it's really a key and hence indeed a string.
 *
 *  (╯°□°）╯︵ ┻━┻
 */
const getFieldLabel = (fieldName: unknown) =>
  FieldLabel[fieldName as FieldName];
</script>

<template>
  <WizardScreen
    id="screen-summary"
    :title="title"
    :description="description"
    :buttons="buttons"
    :can-continue="true"
  >
    <p>
      Hey {{ validatedFormData[FieldName.name] }}, review your application
      details
    </p>

    <div
      class="border border-gray-200 rounded-lg shadow-sm mx-auto divide-y divide-gray-200 w-full"
    >
      <template
        v-for="(fieldValue, fieldName) in validatedFormData"
        :key="`summary-${fieldName}`"
      >
        <div class="py-6">
          <div class="px-4 flex justify-center items-center text-center">
            <div class="flex flex-col-reverse">
              <h3 class="text-2xl font-semibold text-gray-700">
                {{ fieldValue }}
              </h3>

              <p class="text-sm text-gray-500">
                {{ getFieldLabel(fieldName) }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <p>
      If everything's in order, press
      <strong>Buy</strong>
      to proceed
    </p>
  </WizardScreen>
</template>

<style scoped></style>
