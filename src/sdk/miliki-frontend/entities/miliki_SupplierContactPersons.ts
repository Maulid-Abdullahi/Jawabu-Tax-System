import { ContactPerson } from "./miliki_ContactPerson";
import { Supplier } from "./miliki_Supplier";
export class SupplierContactPersons extends ContactPerson {
  static NAME = "miliki_SupplierContactPersons";
  supplier?: Supplier | null;
}
export type SupplierContactPersonsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "supplierContactPersons-view";
export type SupplierContactPersonsView<
  V extends SupplierContactPersonsViewName
> = V extends "_base"
  ? Pick<SupplierContactPersons, "id" | "name" | "email" | "phone" | "position">
  : V extends "_local"
  ? Pick<SupplierContactPersons, "id" | "name" | "email" | "phone" | "position">
  : V extends "_minimal"
  ? Pick<SupplierContactPersons, "id" | "name">
  : V extends "supplierContactPersons-view"
  ? Pick<SupplierContactPersons, "id" | "name" | "email" | "phone" | "position">
  : never;
