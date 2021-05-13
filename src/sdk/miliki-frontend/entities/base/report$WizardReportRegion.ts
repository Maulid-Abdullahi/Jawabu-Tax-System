import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { ReportData } from "./report$WizardReportData";
import { RegionProperty } from "./report$WizardReportRegionProperty";
import { EntityTreeNode } from "./report$WizardReportEntityTreeNode";
export class ReportRegion extends BaseUuidEntity {
  static NAME = "report$WizardReportRegion";
  reportData?: ReportData | null;
  isTabulatedRegion?: boolean | null;
  regionProperties?: RegionProperty | null;
  regionPropertiesRootNode?: EntityTreeNode | null;
  orderNum?: any | null;
  bandNameFromReport?: string | null;
  name?: string | null;
  nameForBand?: string | null;
  nameForHeaderBand?: string | null;
}
export type ReportRegionViewName = "_base" | "_local" | "_minimal";
export type ReportRegionView<V extends ReportRegionViewName> = never;
