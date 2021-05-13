import { StandardEntity } from "./base/sys$StandardEntity";
import { Trader } from "./miliki_Trader";
export class TraderContactPersons extends StandardEntity {
  static NAME = "miliki_TraderContactPersons";
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  trader?: Trader | null;
}
export type TraderContactPersonsViewName = "_base" | "_local" | "_minimal";
export type TraderContactPersonsView<
  V extends TraderContactPersonsViewName
> = V extends "_base"
  ? Pick<
      TraderContactPersons,
      "id" | "firstName" | "lastName" | "email" | "phone"
    >
  : V extends "_local"
  ? Pick<
      TraderContactPersons,
      "id" | "firstName" | "lastName" | "email" | "phone"
    >
  : V extends "_minimal"
  ? Pick<TraderContactPersons, "id" | "firstName">
  : never;
