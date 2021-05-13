import { StandardEntity } from "./base/sys$StandardEntity";
export class ContactPerson extends StandardEntity {
  static NAME = "miliki_ContactPerson";
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  position?: string | null;
}
export type ContactPersonViewName = "_base" | "_local" | "_minimal";
export type ContactPersonView<
  V extends ContactPersonViewName
> = V extends "_base"
  ? Pick<ContactPerson, "id" | "name" | "email" | "phone" | "position">
  : V extends "_local"
  ? Pick<ContactPerson, "id" | "name" | "email" | "phone" | "position">
  : V extends "_minimal"
  ? Pick<ContactPerson, "id" | "name">
  : never;
