import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { Report } from "./report$Report";
export class ReportInputParameter extends BaseUuidEntity {
  static NAME = "report$ReportInputParameter";
  report?: Report | null;
  type?: any | null;
  name?: string | null;
  localeNames?: string | null;
  alias?: string | null;
  position?: number | null;
  entityMetaClass?: string | null;
  lookup?: boolean | null;
  lookupJoin?: string | null;
  lookupWhere?: string | null;
  enumerationClass?: string | null;
  screen?: string | null;
  required?: boolean | null;
  defaultValue?: string | null;
  parameterClassName?: string | null;
  transformationScript?: string | null;
  validationScript?: string | null;
  validationOn?: boolean | null;
  predefinedTransformation?: any | null;
  hidden?: boolean | null;
  defaultDateIsCurrent?: boolean | null;
  locName?: string | null;
}
export type ReportInputParameterViewName = "_base" | "_local" | "_minimal";
export type ReportInputParameterView<
  V extends ReportInputParameterViewName
> = V extends "_base"
  ? Pick<ReportInputParameter, "id" | "locName">
  : V extends "_minimal"
  ? Pick<ReportInputParameter, "id" | "locName">
  : never;
