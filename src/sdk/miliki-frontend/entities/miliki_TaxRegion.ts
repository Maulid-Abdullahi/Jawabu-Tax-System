import { NamedEntity } from "./NamedEntity";
import { TaxCounty } from "./miliki_TaxCounty";
export class TaxRegion extends NamedEntity {
  static NAME = "miliki_TaxRegion";
  code?: string | null;
  counties?: TaxCounty[] | null;
}
export type TaxRegionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "taxRegion-view";
export type TaxRegionView<V extends TaxRegionViewName> = V extends "_base"
  ? Pick<TaxRegion, "id" | "name" | "code">
  : V extends "_local"
  ? Pick<TaxRegion, "id" | "code" | "name">
  : V extends "_minimal"
  ? Pick<TaxRegion, "id" | "name">
  : V extends "taxRegion-view"
  ? Pick<TaxRegion, "id" | "code" | "name" | "counties">
  : never;
