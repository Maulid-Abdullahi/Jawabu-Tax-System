import { DeviceOwner } from "./miliki_DeviceOwner";
import { SupplierRegistrationFiles } from "./miliki_SupplierRegistrationFiles";
import { SupplierBranch } from "./miliki_SupplierBranch";
import { SupplierContactPersons } from "./miliki_SupplierContactPersons";
import { Manufacturer } from "./miliki_Manufacturer";
import { DeviceModel } from "./miliki_DeviceModel";
export class Supplier extends DeviceOwner {
  static NAME = "miliki_Supplier";
  supplierIdentification?: number | null;
  supCertificateDate?: any | null;
  supCertificateNumber?: string | null;
  additionalInformation?: string | null;
  registrationFiles?: SupplierRegistrationFiles[] | null;
  branches?: SupplierBranch[] | null;
  contactPersons?: SupplierContactPersons[] | null;
  manufacturers?: Manufacturer[] | null;
  deviceModels?: DeviceModel[] | null;
}
export type SupplierViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "supplier-device-view"
  | "supplier-view"
  | "supplier-view-models";
export type SupplierView<V extends SupplierViewName> = V extends "_base"
  ? Pick<
      Supplier,
      | "id"
      | "name"
      | "supplierIdentification"
      | "supCertificateDate"
      | "supCertificateNumber"
      | "additionalInformation"
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
      Supplier,
      | "id"
      | "supplierIdentification"
      | "supCertificateDate"
      | "supCertificateNumber"
      | "additionalInformation"
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
  ? Pick<Supplier, "id" | "name">
  : V extends "supplier-device-view"
  ? Pick<Supplier, "id" | "name" | "deviceModels">
  : V extends "supplier-view"
  ? Pick<
      Supplier,
      | "id"
      | "supplierIdentification"
      | "supCertificateDate"
      | "supCertificateNumber"
      | "additionalInformation"
      | "name"
      | "tin"
      | "email"
      | "phone"
      | "websiteUrl"
      | "physicalAddress"
      | "location"
      | "status"
      | "comment"
      | "branches"
      | "manufacturers"
      | "contactPersons"
    >
  : V extends "supplier-view-models"
  ? Pick<
      Supplier,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "name"
      | "deviceModels"
    >
  : never;
