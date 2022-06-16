import { AsyncComponent, ScreenName } from '../wizard.types';
import {
  goToNextScreenEventName,
  goToPreviousScreenEventName,
} from './custom.event.names';

export type WizardButtonType = 'Primary' | 'Secondary';

export type WizardButtonComponents = Record<WizardButtonType, AsyncComponent>;

export type WizardButtonEventName =
  | typeof goToPreviousScreenEventName
  | typeof goToNextScreenEventName;

export interface WizardButtonConfiguration {
  type: WizardButtonType;
  label: string;
  eventName: WizardButtonEventName;
  screenName: ScreenName;
}

export type WizardButtonConfigurations = WizardButtonConfiguration[];
