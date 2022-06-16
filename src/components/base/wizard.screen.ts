import { WizardButtonConfigurations } from './wizard.buttons';
import { WizardDescriptionConfiguration } from './wizard.description';

export interface WizardScreenConfiguration {
  title: string;
  description: WizardDescriptionConfiguration;
  buttons: WizardButtonConfigurations;
}
