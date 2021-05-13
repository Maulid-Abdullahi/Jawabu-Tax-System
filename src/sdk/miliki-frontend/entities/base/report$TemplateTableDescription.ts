import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { TemplateTableBand } from "./report$TemplateTableBand";
export class TemplateTableDescription extends BaseUuidEntity {
  static NAME = "report$TemplateTableDescription";
  templateTableBands?: TemplateTableBand | null;
}
export type TemplateTableDescriptionViewName = "_base" | "_local" | "_minimal";
export type TemplateTableDescriptionView<
  V extends TemplateTableDescriptionViewName
> = never;
