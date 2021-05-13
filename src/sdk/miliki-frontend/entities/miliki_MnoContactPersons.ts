import { ContactPerson } from "./miliki_ContactPerson";
import { Mno } from "./miliki_Mno";
export class MnoContactPersons extends ContactPerson {
  static NAME = "miliki_MnoContactPersons";
  mno?: Mno | null;
}
export type MnoContactPersonsViewName = "_base" | "_local" | "_minimal";
export type MnoContactPersonsView<
  V extends MnoContactPersonsViewName
> = V extends "_base"
  ? Pick<MnoContactPersons, "id" | "name" | "email" | "phone" | "position">
  : V extends "_local"
  ? Pick<MnoContactPersons, "id" | "name" | "email" | "phone" | "position">
  : V extends "_minimal"
  ? Pick<MnoContactPersons, "id" | "name">
  : never;
