import { StandardEntity } from "./sys$StandardEntity";
import { ReportGroup } from "./report$ReportGroup";
import { ReportTemplate } from "./report$ReportTemplate";
import { BandDefinition } from "./report$BandDefinition";
import { ReportInputParameter } from "./report$ReportInputParameter";
import { ReportValueFormat } from "./report$ReportValueFormat";
import { ReportScreen } from "./report$ReportScreen";
import { Role } from "./sec$Role";
export class Report extends StandardEntity {
  static NAME = "report$Report";
  name?: string | null;
  localeNames?: string | null;
  code?: string | null;
  group?: ReportGroup | null;
  defaultTemplate?: ReportTemplate | null;
  reportType?: any | null;
  description?: string | null;
  xml?: string | null;
  rolesIdx?: string | null;
  screensIdx?: string | null;
  inputEntityTypesIdx?: string | null;
  restAccess?: boolean | null;
  sysTenantId?: string | null;
  templates?: ReportTemplate[] | null;
  system?: boolean | null;
  rootBandDefinition?: BandDefinition | null;
  bands?: BandDefinition | null;
  inputParameters?: ReportInputParameter | null;
  valuesFormats?: ReportValueFormat | null;
  reportScreens?: ReportScreen | null;
  roles?: Role | null;
  validationScript?: string | null;
  validationOn?: boolean | null;
  locName?: string | null;
}
export type ReportViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "report.edit"
  | "report.view"
  | "report.withTemplates";
export type ReportView<V extends ReportViewName> = V extends "_base"
  ? Pick<
      Report,
      | "id"
      | "locName"
      | "name"
      | "localeNames"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
    >
  : V extends "_local"
  ? Pick<
      Report,
      | "id"
      | "name"
      | "localeNames"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
      | "locName"
    >
  : V extends "_minimal"
  ? Pick<Report, "id" | "locName" | "name" | "localeNames">
  : V extends "report.edit"
  ? Pick<
      Report,
      | "id"
      | "name"
      | "localeNames"
      | "code"
      | "reportType"
      | "description"
      | "xml"
      | "rolesIdx"
      | "screensIdx"
      | "inputEntityTypesIdx"
      | "restAccess"
      | "sysTenantId"
      | "system"
      | "locName"
      | "templates"
      | "defaultTemplate"
      | "group"
    >
  : V extends "report.view"
  ? Pick<
      Report,
      | "id"
      | "name"
      | "localeNames"
      | "code"
      | "description"
      | "reportType"
      | "group"
    >
  : V extends "report.withTemplates"
  ? Pick<Report, "id" | "locName" | "name" | "localeNames" | "templates">
  : never;
