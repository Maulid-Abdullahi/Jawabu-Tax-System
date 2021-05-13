import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { Report } from "./report$Report";
import { DataSet } from "./report$DataSet";
export class BandDefinition extends BaseUuidEntity {
  static NAME = "report$BandDefinition";
  name?: string | null;
  parentBandDefinition?: BandDefinition | null;
  report?: Report | null;
  childrenBandDefinitions?: BandDefinition | null;
  dataSets?: DataSet | null;
  orientation?: any | null;
  position?: number | null;
}
export type BandDefinitionViewName = "_base" | "_local" | "_minimal";
export type BandDefinitionView<
  V extends BandDefinitionViewName
> = V extends "_base"
  ? Pick<BandDefinition, "id" | "name">
  : V extends "_minimal"
  ? Pick<BandDefinition, "id" | "name">
  : never;
