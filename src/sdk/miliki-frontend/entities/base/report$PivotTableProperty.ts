import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class PivotTableProperty extends BaseUuidEntity {
  static NAME = "report$PivotTableProperty";
  name?: string | null;
  caption?: string | null;
  function?: string | null;
  hidden?: boolean | null;
  type?: any | null;
}
export type PivotTablePropertyViewName = "_base" | "_local" | "_minimal";
export type PivotTablePropertyView<
  V extends PivotTablePropertyViewName
> = never;
