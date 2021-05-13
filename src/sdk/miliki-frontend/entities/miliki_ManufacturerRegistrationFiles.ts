import { StandardEntity } from "./base/sys$StandardEntity";
import { Manufacturer } from "./miliki_Manufacturer";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { RegistrationFile } from "./miliki_RegistrationFile";
export class ManufacturerRegistrationFiles extends StandardEntity {
  static NAME = "miliki_ManufacturerRegistrationFiles";
  manufacturer?: Manufacturer | null;
  file?: FileDescriptor | null;
  type?: RegistrationFile | null;
}
export type ManufacturerRegistrationFilesViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type ManufacturerRegistrationFilesView<
  V extends ManufacturerRegistrationFilesViewName
> = V extends "_base"
  ? Pick<ManufacturerRegistrationFiles, "id" | "type">
  : V extends "_minimal"
  ? Pick<ManufacturerRegistrationFiles, "id" | "type">
  : never;
