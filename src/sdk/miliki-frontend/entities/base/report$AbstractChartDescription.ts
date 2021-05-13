import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class AbstractChartDescription extends BaseUuidEntity {
  static NAME = "report$AbstractChartDescription";
  showLegend?: boolean | null;
  customJsonConfig?: string | null;
}
export type AbstractChartDescriptionViewName = "_base" | "_local" | "_minimal";
export type AbstractChartDescriptionView<
  V extends AbstractChartDescriptionViewName
> = never;
