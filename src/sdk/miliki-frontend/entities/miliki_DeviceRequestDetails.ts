import { StandardEntity } from "./base/sys$StandardEntity";
import { Device } from "./miliki_Device";
import { SimCard } from "./miliki_SimCard";
import { TaxRegion } from "./miliki_TaxRegion";
import { TraderDeviceRequest } from "./miliki_TraderDeviceRequest";
import { DeviceRequestDetailsEnum } from "../enums/enums";
export class DeviceRequestDetails extends StandardEntity {
  static NAME = "miliki_DeviceRequestDetails";
  device?: Device | null;
  simCard?: SimCard | null;
  taxRegion?: TaxRegion | null;
  traderDeviceRequest?: TraderDeviceRequest | null;
  status?: DeviceRequestDetailsEnum | null;
}
export type DeviceRequestDetailsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "deviceRequestDetails-view";
export type DeviceRequestDetailsView<
  V extends DeviceRequestDetailsViewName
> = V extends "_base"
  ? Pick<DeviceRequestDetails, "id" | "status">
  : V extends "_local"
  ? Pick<DeviceRequestDetails, "id" | "status">
  : V extends "deviceRequestDetails-view"
  ? Pick<
      DeviceRequestDetails,
      "id" | "status" | "device" | "simCard" | "taxRegion"
    >
  : never;
