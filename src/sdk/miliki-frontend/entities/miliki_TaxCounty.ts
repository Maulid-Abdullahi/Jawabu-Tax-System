import { StandardEntity } from "./base/sys$StandardEntity";
import { TaxRegion } from "./miliki_TaxRegion";
export class TaxCounty extends StandardEntity {
  static NAME = "miliki_TaxCounty";
  name?: string | null;
  code?: string | null;
  region?: TaxRegion | null;
}
export type TaxCountyViewName = "_base" | "_local" | "_minimal";
export type TaxCountyView<V extends TaxCountyViewName> = V extends "_base"
  ? Pick<TaxCounty, "id" | "name" | "code">
  : V extends "_local"
  ? Pick<TaxCounty, "id" | "name" | "code">
  : V extends "_minimal"
  ? Pick<TaxCounty, "id" | "name">
  : never;
