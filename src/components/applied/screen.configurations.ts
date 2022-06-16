import { WizardScreenConfiguration } from '../base/wizard.screen';

export const ScreenWelcome: WizardScreenConfiguration = {
  title: 'Hello There!',
  description: [
    "Let's buy some insurance. It's only going to take a few steps!",
  ],
  buttons: [
    {
      type: 'Primary',
      label: 'Start',
      eventName: 'goToNextScreen',
      screenName: 'ScreenTellUsAboutYourself',
    },
  ],
};

export const ScreenTellUsAboutYourself: WizardScreenConfiguration = {
  title: 'Tell us about yourself',
  description: [],
  buttons: [
    {
      type: 'Secondary',
      label: 'Back',
      eventName: 'goToPreviousScreen',
      screenName: 'ScreenWelcome',
    },
    {
      type: 'Primary',
      label: 'Next',
      eventName: 'goToNextScreen',
      screenName: 'ScreenSummary',
    },
  ],
};

export const ScreenSummary: WizardScreenConfiguration = {
  title: 'Summary',
  description: [],
  buttons: [
    {
      type: 'Secondary',
      label: 'Back',
      eventName: 'goToPreviousScreen',
      screenName: 'ScreenTellUsAboutYourself',
    },
    {
      type: 'Primary',
      label: 'Buy',
      eventName: 'goToNextScreen',
      screenName: 'ScreenWelcome',
    },
  ],
};

export const ScreenAgeError: WizardScreenConfiguration = {
  title: 'Ooops',
  description: [
    'Your age is over our accepted limit.',
    "We're sorry we cannot accept you now.",
  ],
  buttons: [
    {
      type: 'Primary',
      label: 'Okay 😢',
      eventName: 'goToNextScreen',
      screenName: 'ScreenWelcome',
    },
  ],
};
