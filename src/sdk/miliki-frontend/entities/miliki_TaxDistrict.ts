import { StandardEntity } from "./base/sys$StandardEntity";
import { TaxCounty } from "./miliki_TaxCounty";
export class TaxDistrict extends StandardEntity {
  static NAME = "miliki_TaxDistrict";
  name?: string | null;
  code?: string | null;
  county?: TaxCounty | null;
}
export type TaxDistrictViewName = "_base" | "_local" | "_minimal";
export type TaxDistrictView<V extends TaxDistrictViewName> = V extends "_base"
  ? Pick<TaxDistrict, "id" | "name" | "code">
  : V extends "_local"
  ? Pick<TaxDistrict, "id" | "name" | "code">
  : V extends "_minimal"
  ? Pick<TaxDistrict, "id" | "name">
  : never;
