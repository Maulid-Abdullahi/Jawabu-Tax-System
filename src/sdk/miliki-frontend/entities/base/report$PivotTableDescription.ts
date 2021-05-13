import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PivotTableAggregation } from "./report$PivotTableAggregation";
import { PivotTableProperty } from "./report$PivotTableProperty";
export class PivotTableDescription extends BaseUuidEntity {
  static NAME = "report$PivotTableDescription";
  bandName?: string | null;
  defaultRenderer?: any | null;
  renderers?: any | null;
  defaultAggregation?: PivotTableAggregation | null;
  aggregations?: PivotTableAggregation | null;
  properties?: PivotTableProperty | null;
  editable?: boolean | null;
  filterFunction?: string | null;
  sortersFunction?: string | null;
  colorScaleGeneratorFunction?: string | null;
  c3Width?: any | null;
  c3Height?: any | null;
  rowsProperties?: string | null;
  columnsProperties?: string | null;
  aggregationProperties?: string | null;
}
export type PivotTableDescriptionViewName = "_base" | "_local" | "_minimal";
export type PivotTableDescriptionView<
  V extends PivotTableDescriptionViewName
> = never;
