import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { EntityTreeNode } from "./report$WizardReportEntityTreeNode";
export class RegionProperty extends BaseUuidEntity {
  static NAME = "report$WizardReportRegionProperty";
  entityTreeNode?: EntityTreeNode | null;
  orderNum?: any | null;
  name?: string | null;
  localizedName?: string | null;
  hierarchicalName?: string | null;
  hierarchicalNameExceptRoot?: string | null;
  hierarchicalLocalizedName?: string | null;
  hierarchicalLocalizedNameExceptRoot?: string | null;
}
export type RegionPropertyViewName = "_base" | "_local" | "_minimal";
export type RegionPropertyView<V extends RegionPropertyViewName> = never;
