import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { ReportInputParameter } from "./report$ReportInputParameter";
import { BandDefinition } from "./report$BandDefinition";
export class DataSet extends BaseUuidEntity {
  static NAME = "report$DataSet";
  name?: string | null;
  useExistingView?: boolean | null;
  viewName?: string | null;
  text?: string | null;
  type?: any | null;
  jsonSourceType?: any | null;
  jsonSourceText?: string | null;
  jsonPathQuery?: string | null;
  jsonSourceInputParameter?: ReportInputParameter | null;
  entityParamName?: string | null;
  listEntitiesParamName?: string | null;
  bandDefinition?: BandDefinition | null;
  linkParameterName?: string | null;
  dataStore?: string | null;
  processTemplate?: boolean | null;
}
export type DataSetViewName = "_base" | "_local" | "_minimal";
export type DataSetView<V extends DataSetViewName> = never;
