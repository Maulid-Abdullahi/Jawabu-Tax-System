import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { TemplateTableColumn } from "./report$TemplateTableColumn";
export class TemplateTableBand extends BaseUuidEntity {
  static NAME = "report$TemplateTableBand";
  bandName?: string | null;
  position?: number | null;
  columns?: TemplateTableColumn | null;
}
export type TemplateTableBandViewName = "_base" | "_local" | "_minimal";
export type TemplateTableBandView<V extends TemplateTableBandViewName> = never;
