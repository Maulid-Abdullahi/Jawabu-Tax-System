import { DeviceOwner } from "./miliki_DeviceOwner";
import { Country } from "./miliki_Country";
import { ManufacturerRegistrationFiles } from "./miliki_ManufacturerRegistrationFiles";
import { ManufacturerContactPersons } from "./miliki_ManufacturerContactPersons";
import { Supplier } from "./miliki_Supplier";
import { DeviceModel } from "./miliki_DeviceModel";
export class Manufacturer extends DeviceOwner {
  static NAME = "miliki_Manufacturer";
  registration_date?: any | null;
  country?: Country | null;
  certificateNumber?: string | null;
  certificationDate?: any | null;
  manufacturerRegistrationFiles?: ManufacturerRegistrationFiles[] | null;
  contactPersons?: ManufacturerContactPersons[] | null;
  suppliers?: Supplier[] | null;
  deviceModels?: DeviceModel[] | null;
}
export type ManufacturerViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "manufacturer-view"
  | "manufacturer-view_all";
export type ManufacturerView<V extends ManufacturerViewName> = V extends "_base"
  ? Pick<
      Manufacturer,
      | "id"
      | "name"
      | "registration_date"
      | "certificateNumber"
      | "certificationDate"
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
      Manufacturer,
      | "id"
      | "registration_date"
      | "certificateNumber"
      | "certificationDate"
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
  ? Pick<Manufacturer, "id" | "name">
  : V extends "manufacturer-view"
  ? Pick<
      Manufacturer,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "registration_date"
      | "certificateNumber"
      | "certificationDate"
      | "name"
      | "tin"
      | "email"
      | "phone"
      | "websiteUrl"
      | "physicalAddress"
      | "location"
      | "status"
      | "comment"
      | "country"
      | "contactPersons"
    >
  : V extends "manufacturer-view_all"
  ? Pick<
      Manufacturer,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "registration_date"
      | "certificateNumber"
      | "certificationDate"
      | "name"
      | "tin"
      | "email"
      | "phone"
      | "websiteUrl"
      | "physicalAddress"
      | "location"
      | "status"
      | "comment"
      | "country"
      | "manufacturerRegistrationFiles"
      | "contactPersons"
      | "suppliers"
    >
  : never;
