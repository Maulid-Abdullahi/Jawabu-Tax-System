import { StandardEntity } from "./base/sys$StandardEntity";
import { Supplier } from "./miliki_Supplier";
import { DeviceModel } from "./miliki_DeviceModel";
export class SupplierModels extends StandardEntity {
  static NAME = "miliki_SupplierModels";
  supplier?: Supplier | null;
  model?: DeviceModel | null;
  licenceNumber?: string | null;
  dateIssued?: string | null;
}
export type SupplierModelsViewName = "_base" | "_local" | "_minimal";
export type SupplierModelsView<
  V extends SupplierModelsViewName
> = V extends "_base"
  ? Pick<SupplierModels, "id" | "licenceNumber" | "dateIssued">
  : V extends "_local"
  ? Pick<SupplierModels, "id" | "licenceNumber" | "dateIssued">
  : never;
