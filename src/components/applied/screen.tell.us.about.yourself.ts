export const minimumAge = 1 as const;
export const maximumAge = 150 as const;

export type Country = 'Australia' | 'Hong Kong' | 'USA';

export type Countries = Country[];

export const countryOptions: Readonly<Countries> = Object.freeze([
  'Australia',
  'Hong Kong',
  'USA',
]);

export type Currency = 'HKD' | 'AUD' | 'USD';

export const countryToCurrency: Readonly<Record<Country, Currency>> =
  Object.freeze({
    Australia: 'AUD',
    'Hong Kong': 'HKD',
    USA: 'USD',
  });

export const rate: Readonly<Record<Currency, number>> = Object.freeze({
  AUD: 3,
  HKD: 1,
  USD: 2,
});

export type PackageType = 'Standard' | 'Safe' | 'Super Safe';

export interface PackageOption {
  id: `package-${string}`;
  name: PackageType;
  value: PackageType;
  description: string;
}

export type PackageOptions = PackageOption[];

export enum FieldName {
  name = 'name',
  age = 'age',
  residence = 'residence',
  package = 'package',
  premium = 'premium',
}

export enum FieldLabel {
  name = 'Name',
  age = 'Age',
  residence = 'Where do you live',
  package = 'Choose your package',
  premium = 'Premium',
}
