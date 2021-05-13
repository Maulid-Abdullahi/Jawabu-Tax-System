import { NamedEntity } from "./NamedEntity";
export class TaxBusinessOffice extends NamedEntity {
  static NAME = "miliki_TaxBusinessOffice";
}
export type TaxBusinessOfficeViewName = "_base" | "_local" | "_minimal";
export type TaxBusinessOfficeView<
  V extends TaxBusinessOfficeViewName
> = V extends "_base"
  ? Pick<TaxBusinessOffice, "id" | "name">
  : V extends "_local"
  ? Pick<TaxBusinessOffice, "id" | "name">
  : V extends "_minimal"
  ? Pick<TaxBusinessOffice, "id" | "name">
  : never;
