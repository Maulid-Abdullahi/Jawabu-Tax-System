import { AbstractChartDescription } from "./report$AbstractChartDescription";
export class PieChartDescription extends AbstractChartDescription {
  static NAME = "report$PieChartDescriptor";
  bandName?: string | null;
  titleField?: string | null;
  valueField?: string | null;
  colorField?: string | null;
  units?: string | null;
}
export type PieChartDescriptionViewName = "_base" | "_local" | "_minimal";
export type PieChartDescriptionView<
  V extends PieChartDescriptionViewName
> = never;
