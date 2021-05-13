import { StandardEntity } from "./base/sys$StandardEntity";
import { RegistrationFileType } from "../enums/enums";
export class RegistrationFile extends StandardEntity {
  static NAME = "miliki_RegistrationFile";
  documentName?: string | null;
  type?: RegistrationFileType | null;
}
export type RegistrationFileViewName = "_base" | "_local" | "_minimal";
export type RegistrationFileView<
  V extends RegistrationFileViewName
> = V extends "_base"
  ? Pick<RegistrationFile, "id" | "documentName" | "type">
  : V extends "_local"
  ? Pick<RegistrationFile, "id" | "documentName" | "type">
  : V extends "_minimal"
  ? Pick<RegistrationFile, "id" | "documentName">
  : never;
