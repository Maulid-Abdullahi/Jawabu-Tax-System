import { StandardEntity } from "./base/sys$StandardEntity";
import { Supplier } from "./miliki_Supplier";
import { DeviceTransferStatus } from "../enums/enums";
import { Device } from "./miliki_Device";
export class DeviceTransferRequest extends StandardEntity {
  static NAME = "miliki_DeviceTransferRequest";
  from?: Supplier | null;
  to?: Supplier | null;
  status?: DeviceTransferStatus | null;
  comments?: string | null;
  devices?: Device[] | null;
  totalDevices?: number | null;
}
export type DeviceTransferRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "deviceTransferRequest-view";
export type DeviceTransferRequestView<
  V extends DeviceTransferRequestViewName
> = V extends "_base"
  ? Pick<DeviceTransferRequest, "id" | "from" | "to" | "status" | "comments">
  : V extends "_local"
  ? Pick<DeviceTransferRequest, "id" | "status" | "comments">
  : V extends "_minimal"
  ? Pick<DeviceTransferRequest, "id" | "from" | "to">
  : V extends "deviceTransferRequest-view"
  ? Pick<
      DeviceTransferRequest,
      "id" | "status" | "comments" | "from" | "to" | "devices" | "totalDevices"
    >
  : never;
