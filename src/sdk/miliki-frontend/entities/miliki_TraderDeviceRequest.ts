import { StandardEntity } from "./base/sys$StandardEntity";
import { Trader } from "./miliki_Trader";
import { DeviceRequestDetails } from "./miliki_DeviceRequestDetails";
import { TraderDeviceStatus } from "../enums/enums";
import { Supplier } from "./miliki_Supplier";
export class TraderDeviceRequest extends StandardEntity {
  static NAME = "miliki_TraderDeviceRequest";
  trader?: Trader | null;
  deviceDetails?: DeviceRequestDetails[] | null;
  status?: TraderDeviceStatus | null;
  supplier?: Supplier | null;
  comment?: string | null;
  totalDevices?: number | null;
}
export type TraderDeviceRequestViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "traderDeviceRequest-status-view"
  | "traderDeviceRequest-view-minimal";
export type TraderDeviceRequestView<
  V extends TraderDeviceRequestViewName
> = V extends "_base"
  ? Pick<TraderDeviceRequest, "id" | "status" | "comment">
  : V extends "_local"
  ? Pick<TraderDeviceRequest, "id" | "status" | "comment">
  : V extends "traderDeviceRequest-status-view"
  ? Pick<TraderDeviceRequest, "id" | "status" | "comment" | "deviceDetails">
  : V extends "traderDeviceRequest-view-minimal"
  ? Pick<
      TraderDeviceRequest,
      "id" | "trader" | "deviceDetails" | "supplier" | "status"
    >
  : never;
