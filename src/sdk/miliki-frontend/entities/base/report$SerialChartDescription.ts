import { AbstractChartDescription } from "./report$AbstractChartDescription";
import { ChartSeries } from "./report$ChartSeries";
export class SerialChartDescription extends AbstractChartDescription {
  static NAME = "report$SerialChartDescription";
  bandName?: string | null;
  categoryField?: string | null;
  categoryAxisCaption?: string | null;
  valueAxisCaption?: string | null;
  valueAxisUnits?: string | null;
  valueStackType?: any | null;
  series?: ChartSeries | null;
  categoryAxisLabelRotation?: number | null;
}
export type SerialChartDescriptionViewName = "_base" | "_local" | "_minimal";
export type SerialChartDescriptionView<
  V extends SerialChartDescriptionViewName
> = never;
