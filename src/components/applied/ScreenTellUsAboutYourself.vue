<script setup lang="ts">
import WizardScreen from '../base/WizardScreen.vue';
import { computed, onActivated, ref, toRefs } from 'vue';
import {
  Country,
  countryOptions,
  countryToCurrency,
  Currency,
  FieldLabel,
  FieldName,
  maximumAge,
  maximumPolicyAge,
  minimumAge,
  PackageOptions,
  PackageType,
  rate,
  toTwoDecimalPlaces,
} from './screen.tell.us.about.yourself';
import { ScreenTellUsAboutYourself } from './screen.configurations';
import { submitFormDataEventName } from '../base/custom.event.names';
import { RetrievedFormData } from '../form.wizard';

// REF: Handle whether to reset form data
const props = defineProps({
  doResetForm: {
    type: Boolean,
    default() {
      return true;
    },
  },
});
const { doResetForm } = toRefs(props);
onActivated(() => {
  if (doResetForm?.value) {
    name.value = '';
    age.value = 20;
    country.value = 'Hong Kong';
    selectedPackage.value = 'Safe';
  }
});

const { title, description, buttons } = ScreenTellUsAboutYourself;

const name = ref<string>('');
const age = ref<number>(20);

const country = ref<Country>('Hong Kong');

// NOTE: Derive currency from country
const currency = computed<Currency>(() => countryToCurrency[country.value]);

// NOTE: Derive standard premium denominated in country's currency
const standardPremium = computed<number>(
  () => 10 * age.value * rate[currency.value]
);

const withinInsurableAge = computed<boolean>(
  () => age.value > minimumAge && age.value <= maximumPolicyAge
);

// NOTE: Calculate `Safe` and `Super Safe` premium dynamically
// NOTE: If not within insurable age, simply show 0
const packageToAdditionalPremium = computed<Record<PackageType, number>>(() =>
  ((standardPremium) => ({
    Standard: 0,
    Safe: standardPremium * 0.5,
    'Super Safe': standardPremium * 0.75,
  }))(withinInsurableAge.value ? standardPremium.value : 0)
);

// NOTE: Reflect dynamic `Safe` and `Super Safe` premium in the form
const packageOptions = computed<PackageOptions>(() => [
  {
    id: 'package-standard',
    name: 'Standard',
    value: 'Standard',
    description: ``,
  },
  {
    id: 'package-safe',
    name: 'Safe',
    value: 'Safe',
    description: `+${toTwoDecimalPlaces(
      packageToAdditionalPremium.value['Safe']
    )} ${currency.value}, 50%`,
  },
  {
    id: 'package-super-safe',
    name: 'Super Safe',
    value: 'Super Safe',
    description: `+${toTwoDecimalPlaces(
      packageToAdditionalPremium.value['Super Safe']
    )} ${currency.value}, 75%`,
  },
]);

const selectedPackage = ref<PackageType>('Safe');

// NOTE: Calculate premium of selected package formatted to two decimal places
// NOTE: If not within insurable age, simply show 0
const selectedPackagePremium = computed<string>(() =>
  ((selectedPackagePremium) =>
    withinInsurableAge.value
      ? toTwoDecimalPlaces(selectedPackagePremium)
      : '0')(
    standardPremium.value +
      packageToAdditionalPremium.value[selectedPackage.value]
  )
);

// NOTE: Extracting and transforming form data
const formData = ref<FormData>(new FormData());
const updateFormData = (event: Event) => {
  formData.value = new FormData(event.currentTarget as HTMLFormElement);
};

// NOTE: Get form data as key-value pairs
const retrievedFormData = computed(() =>
  Object.fromEntries(formData.value.entries())
);

// NOTE: Form validation
const isAgeMoreThanHundred = computed(
  () => Number(formData.value.get('age')) > 100
);
const isAgeMinimumOrMore = computed(
  () => Number(formData.value.get('age')) >= minimumAge
);
const isAgeMaximumOrLess = computed(
  () => Number(formData.value.get('age')) <= maximumAge
);
const allFieldsAreFilled = computed<boolean>(() =>
  ((values) => values.length > 0 && values.every(Boolean))(
    Array.from(formData.value.values())
  )
);

// NOTE: Trigger browser form validation with programmatic click to hidden form submit button
const submitButton = ref<HTMLButtonElement | null>(null);
const checkRequiredFields = () => {
  submitButton?.value?.click();
};

// NOTE: Emit validated form data to parent `FormWizard` so it can be persisted and passed into `ScreenSummary`
const emit = defineEmits<{
  (event: typeof submitFormDataEventName, formData: RetrievedFormData): void;
}>();

// NOTE: Only emit form data if validated
const submitFormData = () => {
  if (allFieldsAreFilled.value && isAgeMinimumOrMore.value) {
    emit(submitFormDataEventName, retrievedFormData.value);
  }
};
</script>

<template>
  <WizardScreen
    id="screen-tell-us-about-yourself"
    :title="title"
    :description="description"
    :buttons="buttons"
    :can-continue="
      allFieldsAreFilled && isAgeMinimumOrMore && isAgeMaximumOrLess
    "
    v-bind="isAgeMoreThanHundred ? { redirectToScreen: 'ScreenAgeError' } : {}"
    @cannot-continue="checkRequiredFields"
    @go-to-next-screen="submitFormData"
  >
    <div
      class="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 w-full"
    >
      <form @change="updateFormData" ref="form" class="flex flex-col gap-6 p-4">
        <div class="flex flex-col">
          <label for="name" class="block text-sm font-medium text-gray-700">
            {{ FieldLabel.name }}
          </label>

          <input
            v-model="name"
            :id="FieldName.name"
            :name="FieldName.name"
            class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            type="text"
            autocomplete="name"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="age" class="block text-sm font-medium text-gray-700">
            {{ FieldLabel.age }}
          </label>

          <input
            v-model="age"
            :id="FieldName.age"
            :name="FieldName.age"
            class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            type="number"
            step="1"
            :min="minimumAge"
            :max="maximumAge"
            required
          />
        </div>

        <div class="flex flex-col">
          <label
            for="residence"
            class="block text-sm font-medium text-gray-700"
          >
            {{ FieldLabel.residence }}
          </label>
          <select
            v-model="country"
            :id="FieldName.residence"
            :name="FieldName.residence"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            required
          >
            <template
              v-for="(countryOption, index) in countryOptions"
              :key="`country-option-${index}`"
            >
              <option>{{ countryOption }}</option>
            </template>
          </select>
        </div>

        <fieldset class="flex flex-col gap-2">
          <label class="text-base font-medium text-gray-900">
            {{ FieldLabel.package }}
          </label>

          <div class="flex flex-col gap-4">
            <template
              v-for="packageOption in packageOptions"
              :key="packageOption.id"
            >
              <div class="relative flex items-start">
                <div class="flex items-center h-5">
                  <input
                    v-model="selectedPackage"
                    :id="packageOption.id"
                    :name="FieldName.package"
                    type="radio"
                    :checked="packageOption.value === selectedPackage"
                    :value="packageOption.value"
                    class="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                    required
                  />
                </div>

                <div class="ml-3 text-sm">
                  <label
                    :for="packageOption.id"
                    class="font-medium text-gray-700"
                  >
                    {{ packageOption.name }}
                  </label>

                  <p
                    :id="`${packageOption.id}-description`"
                    class="text-gray-500"
                  >
                    {{ packageOption.description }}
                  </p>
                </div>
              </div>
            </template>
          </div>
        </fieldset>

        <!-- REF: For inclusion in form data -->
        <input
          type="hidden"
          :name="FieldName.premium"
          :value="`${selectedPackagePremium} ${currency}`"
          readonly
        />

        <!-- REF: For triggering browser validation -->
        <button ref="submitButton" type="submit" hidden />
      </form>

      <div class="p-4 text-center">
        <p class="text-lg leading-6 font-medium text-gray-700">
          Your premium is
        </p>

        <div
          class="mt-4 flex items-center justify-center text-5xl font-semibold text-gray-700"
        >
          <span>${{ selectedPackagePremium }}</span>
          <span class="ml-3 text-xl font-medium text-gray-500">
            {{ currency }}
          </span>
        </div>
      </div>
    </div>
  </WizardScreen>
</template>

<style scoped></style>
