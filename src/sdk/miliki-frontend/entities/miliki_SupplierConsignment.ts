import { StandardEntity } from "./base/sys$StandardEntity";
import { SupplierDeviceRequisition } from "./miliki_SupplierDeviceRequisition";
import { ConsignmentStatus } from "../enums/enums";
import { Device } from "./miliki_Device";
export class SupplierConsignment extends StandardEntity {
  static NAME = "miliki_SupplierConsignment";
  requisition?: SupplierDeviceRequisition | null;
  startSerial?: number | null;
  status?: ConsignmentStatus | null;
  deviceQuantity?: number | null;
  orderNumber?: string | null;
  shipmentDate?: any | null;
  devices?: Device[] | null;
}
export type SupplierConsignmentViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "supplierConsignment-view";
export type SupplierConsignmentView<
  V extends SupplierConsignmentViewName
> = V extends "_base"
  ? Pick<
      SupplierConsignment,
      | "id"
      | "startSerial"
      | "status"
      | "deviceQuantity"
      | "orderNumber"
      | "shipmentDate"
    >
  : V extends "_local"
  ? Pick<
      SupplierConsignment,
      | "id"
      | "startSerial"
      | "status"
      | "deviceQuantity"
      | "orderNumber"
      | "shipmentDate"
    >
  : V extends "supplierConsignment-view"
  ? Pick<
      SupplierConsignment,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "startSerial"
      | "status"
      | "deviceQuantity"
      | "orderNumber"
      | "shipmentDate"
      | "requisition"
    >
  : never;
