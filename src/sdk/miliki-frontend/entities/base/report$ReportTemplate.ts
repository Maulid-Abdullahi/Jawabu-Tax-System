import { StandardEntity } from "./sys$StandardEntity";
import { Report } from "./report$Report";
export class ReportTemplate extends StandardEntity {
  static NAME = "report$ReportTemplate";
  report?: Report | null;
  reportOutputType?: any | null;
  code?: string | null;
  groovy?: boolean | null;
  custom?: boolean | null;
  alterable?: boolean | null;
  customDefinition?: string | null;
  customDefinedBy?: any | null;
  outputNamePattern?: string | null;
  name?: string | null;
  content?: any | null;
}
export type ReportTemplateViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "template.edit";
export type ReportTemplateView<
  V extends ReportTemplateViewName
> = V extends "_base"
  ? Pick<
      ReportTemplate,
      | "id"
      | "code"
      | "name"
      | "customDefinition"
      | "custom"
      | "alterable"
      | "reportOutputType"
      | "groovy"
      | "customDefinedBy"
      | "outputNamePattern"
      | "content"
    >
  : V extends "_local"
  ? Pick<
      ReportTemplate,
      | "id"
      | "reportOutputType"
      | "code"
      | "groovy"
      | "custom"
      | "alterable"
      | "customDefinition"
      | "customDefinedBy"
      | "outputNamePattern"
      | "name"
      | "content"
    >
  : V extends "_minimal"
  ? Pick<
      ReportTemplate,
      "id" | "code" | "name" | "customDefinition" | "custom" | "alterable"
    >
  : V extends "template.edit"
  ? Pick<
      ReportTemplate,
      | "id"
      | "reportOutputType"
      | "code"
      | "groovy"
      | "custom"
      | "alterable"
      | "customDefinition"
      | "customDefinedBy"
      | "outputNamePattern"
      | "name"
      | "content"
      | "report"
    >
  : never;
