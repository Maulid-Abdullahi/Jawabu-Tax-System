import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ChartSeries extends BaseUuidEntity {
  static NAME = "report$ChartSeries";
  name?: string | null;
  type?: any | null;
  valueField?: string | null;
  colorField?: string | null;
  order?: number | null;
}
export type ChartSeriesViewName = "_base" | "_local" | "_minimal";
export type ChartSeriesView<V extends ChartSeriesViewName> = never;
