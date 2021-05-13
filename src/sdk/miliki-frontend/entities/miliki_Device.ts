import { StandardEntity } from "./base/sys$StandardEntity";
import { DeviceModel } from "./miliki_DeviceModel";
import { SupplierConsignment } from "./miliki_SupplierConsignment";
import { DeviceOwner } from "./miliki_DeviceOwner";
import { SimCard } from "./miliki_SimCard";
import { TaxRegion } from "./miliki_TaxRegion";
import { DeviceStatus } from "../enums/enums";
import { DeviceTransferRequest } from "./miliki_DeviceTransferRequest";
import { Trader } from "./miliki_Trader";
import { DeviceKey } from "./miliki_DeviceKey";
import { BlockCommand } from "./miliki_BlockCommand";
export class Device extends StandardEntity {
  static NAME = "miliki_Device";
  serialNumber?: string | null;
  latitude?: any | null;
  longitude?: any | null;
  model?: DeviceModel | null;
  consignment?: SupplierConsignment | null;
  currentOwner?: DeviceOwner | null;
  simCard?: SimCard | null;
  taxRegion?: TaxRegion | null;
  status?: DeviceStatus | null;
  deviceTransferRequests?: DeviceTransferRequest[] | null;
  fiscalized?: Trader | null;
  deviceKey?: DeviceKey | null;
  blockCommands?: BlockCommand[] | null;
}
export type DeviceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "current-owner-device-view"
  | "device-inventory-view"
  | "device-search-view"
  | "device-view-trader"
  | "device-view-trader-minimal";
export type DeviceView<V extends DeviceViewName> = V extends "_base"
  ? Pick<Device, "id" | "serialNumber" | "latitude" | "longitude" | "status">
  : V extends "_local"
  ? Pick<Device, "id" | "serialNumber" | "latitude" | "longitude" | "status">
  : V extends "_minimal"
  ? Pick<Device, "id" | "serialNumber">
  : V extends "current-owner-device-view"
  ? Pick<
      Device,
      | "id"
      | "serialNumber"
      | "latitude"
      | "longitude"
      | "status"
      | "currentOwner"
    >
  : V extends "device-inventory-view"
  ? Pick<
      Device,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "serialNumber"
      | "latitude"
      | "longitude"
      | "status"
      | "model"
      | "simCard"
      | "fiscalized"
    >
  : V extends "device-search-view"
  ? Pick<Device, "id" | "serialNumber" | "latitude" | "longitude" | "status">
  : V extends "device-view-trader"
  ? Pick<
      Device,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "serialNumber"
      | "latitude"
      | "longitude"
      | "status"
      | "simCard"
      | "taxRegion"
      | "fiscalized"
      | "currentOwner"
      | "model"
    >
  : V extends "device-view-trader-minimal"
  ? Pick<
      Device,
      | "id"
      | "serialNumber"
      | "latitude"
      | "longitude"
      | "status"
      | "fiscalized"
      | "currentOwner"
    >
  : never;
