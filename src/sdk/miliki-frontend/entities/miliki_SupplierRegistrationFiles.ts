import { StandardEntity } from "./base/sys$StandardEntity";
import { FileDescriptor } from "./base/sys$FileDescriptor";
import { RegistrationFile } from "./miliki_RegistrationFile";
import { Supplier } from "./miliki_Supplier";
export class SupplierRegistrationFiles extends StandardEntity {
  static NAME = "miliki_SupplierRegistrationFiles";
  file?: FileDescriptor | null;
  type?: RegistrationFile | null;
  supplier?: Supplier | null;
}
export type SupplierRegistrationFilesViewName = "_base" | "_local" | "_minimal";
export type SupplierRegistrationFilesView<
  V extends SupplierRegistrationFilesViewName
> = never;
