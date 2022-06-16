import { defineAsyncComponent } from 'vue';
import {
  Country,
  FieldName,
  PackageType,
} from './applied/screen.tell.us.about.yourself';

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

export const emptyStateFormData = () => ({
  [FieldName.name]: '' as string,
  [FieldName.age]: '0' as StringifiedNumber,
  [FieldName.residence]: 'Hong Kong' as Country,
  [FieldName.package]: 'Safe' as PackageType,
  [FieldName.premium]: '0' as StringifiedNumber,
});
