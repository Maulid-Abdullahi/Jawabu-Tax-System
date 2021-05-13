import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class EntityTreeNode extends BaseUuidEntity {
  static NAME = "report$WizardReportEntityTreeNode";
  name?: string | null;
  localizedName?: string | null;
  parent?: EntityTreeNode | null;
  children?: EntityTreeNode | null;
  nodeDepth?: number | null;
  nodeChildrenDepth?: number | null;
  hierarchicalName?: string | null;
  hierarchicalLocalizedName?: string | null;
  hierarchicalNameExceptRoot?: string | null;
  hierarchicalLocalizedNameExceptRoot?: string | null;
}
export type EntityTreeNodeViewName = "_base" | "_local" | "_minimal";
export type EntityTreeNodeView<V extends EntityTreeNodeViewName> = never;
