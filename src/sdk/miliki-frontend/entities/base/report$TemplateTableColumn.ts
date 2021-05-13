import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class TemplateTableColumn extends BaseUuidEntity {
  static NAME = "report$TemplateTableColumn";
  key?: string | null;
  caption?: string | null;
  position?: number | null;
}
export type TemplateTableColumnViewName = "_base" | "_local" | "_minimal";
export type TemplateTableColumnView<
  V extends TemplateTableColumnViewName
> = never;
