import { ContactPerson } from "./miliki_ContactPerson";
import { Manufacturer } from "./miliki_Manufacturer";
export class ManufacturerContactPersons extends ContactPerson {
  static NAME = "miliki_ManufacturerContactPersons";
  manufacturer?: Manufacturer | null;
}
export type ManufacturerContactPersonsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "manufacturerContactPersons-view";
export type ManufacturerContactPersonsView<
  V extends ManufacturerContactPersonsViewName
> = V extends "_base"
  ? Pick<
      ManufacturerContactPersons,
      "id" | "name" | "email" | "phone" | "position"
    >
  : V extends "_local"
  ? Pick<
      ManufacturerContactPersons,
      "id" | "name" | "email" | "phone" | "position"
    >
  : V extends "_minimal"
  ? Pick<ManufacturerContactPersons, "id" | "name">
  : V extends "manufacturerContactPersons-view"
  ? Pick<
      ManufacturerContactPersons,
      "id" | "name" | "email" | "phone" | "position"
    >
  : never;
