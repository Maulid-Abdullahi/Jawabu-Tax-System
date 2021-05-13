import { StandardEntity } from "./base/sys$StandardEntity";
import { Supplier } from "./miliki_Supplier";
import { SupplierConsignment } from "./miliki_SupplierConsignment";
import { DeviceModel } from "./miliki_DeviceModel";
import { RequisitionStatus } from "../enums/enums";
export class SupplierDeviceRequisition extends StandardEntity {
  static NAME = "miliki_SupplierDeviceRequisition";
  supplier?: Supplier | null;
  requisitionNumber?: string | null;
  consignments?: SupplierConsignment[] | null;
  device?: DeviceModel | null;
  quantity?: number | null;
  fulfilled?: number | null;
  dueDate?: any | null;
  status?: RequisitionStatus | null;
}
export type SupplierDeviceRequisitionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "supplierDeviceRequisition-view";
export type SupplierDeviceRequisitionView<
  V extends SupplierDeviceRequisitionViewName
> = V extends "_base"
  ? Pick<
      SupplierDeviceRequisition,
      | "id"
      | "requisitionNumber"
      | "device"
      | "quantity"
      | "fulfilled"
      | "dueDate"
      | "status"
    >
  : V extends "_local"
  ? Pick<
      SupplierDeviceRequisition,
      | "id"
      | "requisitionNumber"
      | "quantity"
      | "fulfilled"
      | "dueDate"
      | "status"
    >
  : V extends "_minimal"
  ? Pick<SupplierDeviceRequisition, "id" | "requisitionNumber" | "device">
  : V extends "supplierDeviceRequisition-view"
  ? Pick<
      SupplierDeviceRequisition,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "requisitionNumber"
      | "quantity"
      | "fulfilled"
      | "dueDate"
      | "status"
      | "supplier"
      | "device"
    >
  : never;
