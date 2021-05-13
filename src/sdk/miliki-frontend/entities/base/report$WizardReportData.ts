import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { EntityTreeNode } from "./report$WizardReportEntityTreeNode";
import { Report } from "./report$Report";
import { ReportGroup } from "./report$ReportGroup";
import { ReportRegion } from "./report$WizardReportRegion";
export class ReportData extends BaseUuidEntity {
  static NAME = "report$WizardReportData";
  name?: string | null;
  entityTreeRootNode?: EntityTreeNode | null;
  generatedReport?: Report | null;
  group?: ReportGroup | null;
  reportType?: any | null;
  templateFileName?: string | null;
  outputNamePattern?: string | null;
  outputFileType?: any | null;
  reportRegions?: ReportRegion[] | null;
}
export type ReportDataViewName = "_base" | "_local" | "_minimal";
export type ReportDataView<V extends ReportDataViewName> = never;
