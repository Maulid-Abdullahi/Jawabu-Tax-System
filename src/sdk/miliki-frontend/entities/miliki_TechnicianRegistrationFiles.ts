import { StandardEntity } from "./base/sys$StandardEntity";
import { Technician } from "./miliki_Technician";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { RegistrationFile } from "./miliki_RegistrationFile";
export class TechnicianRegistrationFiles extends StandardEntity {
  static NAME = "miliki_TechnicianRegistrationFiles";
  technician?: Technician | null;
  file?: FileDescriptor | null;
  type?: RegistrationFile | null;
}
export type TechnicianRegistrationFilesViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type TechnicianRegistrationFilesView<
  V extends TechnicianRegistrationFilesViewName
> = V extends "_base"
  ? Pick<TechnicianRegistrationFiles, "id" | "type">
  : V extends "_minimal"
  ? Pick<TechnicianRegistrationFiles, "id" | "type">
  : never;
