import { WizardDescriptionConfiguration } from './WizardDescription.vue';
import { WizardButtonConfigurations } from './wizard.buttons';

export interface WizardScreenConfiguration {
  title: string;
  description: WizardDescriptionConfiguration;
  buttons: WizardButtonConfigurations;
}
