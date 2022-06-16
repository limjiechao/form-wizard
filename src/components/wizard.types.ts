import { defineAsyncComponent } from 'vue';

type ScreenPrefix<Name extends string> = `Screen${Name}`;

export type ScreenName =
  | ScreenPrefix<'Welcome'>
  | ScreenPrefix<'TellUsAboutYourself'>
  | ScreenPrefix<'AgeError'>
  | ScreenPrefix<'Summary'>;

export type AsyncComponent = ReturnType<typeof defineAsyncComponent>;

export type Screens = Record<ScreenName, AsyncComponent>;

export type RetrievedFormData = { [p: string]: FormDataEntryValue };

export type StringifiedNumber = `${number}`;
