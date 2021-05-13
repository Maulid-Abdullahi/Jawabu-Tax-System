import { DeviceOwner } from "./miliki_DeviceOwner";
import { TaxRegion } from "./miliki_TaxRegion";
import { TraderContactPersons } from "./miliki_TraderContactPersons";
import { Device } from "./miliki_Device";
import { TraderDeviceRequest } from "./miliki_TraderDeviceRequest";
export class Trader extends DeviceOwner {
  static NAME = "miliki_Trader";
  vatNo?: string | null;
  taxRegion?: TaxRegion | null;
  contactPersons?: TraderContactPersons[] | null;
  devices?: Device[] | null;
  deviceRequests?: TraderDeviceRequest[] | null;
}
export type TraderViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "trader-view"
  | "trader-view-minimal";
export type TraderView<V extends TraderViewName> = V extends "_base"
  ? Pick<
      Trader,
      | "id"
      | "name"
      | "vatNo"
      | "tin"
      | "email"
      | "phone"
      | "websiteUrl"
      | "physicalAddress"
      | "location"
      | "status"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      Trader,
      | "id"
      | "vatNo"
      | "name"
      | "tin"
      | "email"
      | "phone"
      | "websiteUrl"
      | "physicalAddress"
      | "location"
      | "status"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<Trader, "id" | "name">
  : V extends "trader-view"
  ? Pick<
      Trader,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "vatNo"
      | "name"
      | "tin"
      | "email"
      | "phone"
      | "websiteUrl"
      | "physicalAddress"
      | "location"
      | "status"
      | "comment"
      | "taxRegion"
      | "contactPersons"
      | "devices"
    >
  : V extends "trader-view-minimal"
  ? Pick<
      Trader,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "vatNo"
      | "name"
      | "tin"
      | "email"
      | "phone"
      | "websiteUrl"
      | "physicalAddress"
      | "location"
      | "status"
      | "comment"
      | "taxRegion"
    >
  : never;
