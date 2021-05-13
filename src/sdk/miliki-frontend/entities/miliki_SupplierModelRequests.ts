import { StandardEntity } from "./base/sys$StandardEntity";
import { SupplierModelRequestStatus } from "../enums/enums";
import { DeviceModel } from "./miliki_DeviceModel";
import { Supplier } from "./miliki_Supplier";
export class SupplierModelRequests extends StandardEntity {
  static NAME = "miliki_SupplierModelRequests";
  ticket?: string | null;
  status?: SupplierModelRequestStatus | null;
  model?: DeviceModel | null;
  supplier?: Supplier | null;
  comment?: string | null;
}
export type SupplierModelRequestsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "supplierModelRequests-view";
export type SupplierModelRequestsView<
  V extends SupplierModelRequestsViewName
> = V extends "_base"
  ? Pick<SupplierModelRequests, "id" | "ticket" | "status" | "comment">
  : V extends "_local"
  ? Pick<SupplierModelRequests, "id" | "ticket" | "status" | "comment">
  : V extends "supplierModelRequests-view"
  ? Pick<
      SupplierModelRequests,
      "id" | "ticket" | "status" | "comment" | "model" | "supplier"
    >
  : never;
