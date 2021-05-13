import { NamedEntity } from "./NamedEntity";
export class Country extends NamedEntity {
  static NAME = "miliki_Country";
  code?: number | null;
}
export type CountryViewName = "_base" | "_local" | "_minimal";
export type CountryView<V extends CountryViewName> = V extends "_base"
  ? Pick<Country, "id" | "name" | "code">
  : V extends "_local"
  ? Pick<Country, "id" | "code" | "name">
  : V extends "_minimal"
  ? Pick<Country, "id" | "name" | "code">
  : never;
