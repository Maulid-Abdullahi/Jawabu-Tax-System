import { User } from "./base/sec$User";
import { Supplier } from "./miliki_Supplier";
export class SupplierUser extends User {
  static NAME = "miliki_SupplierUser";
  supplier?: Supplier | null;
  isTechnician?: boolean | null;
}
export type SupplierUserViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "supplierUser-view"
  | "supplierUser-view-transfer";
export type SupplierUserView<V extends SupplierUserViewName> = V extends "_base"
  ? Pick<
      SupplierUser,
      | "id"
      | "login"
      | "name"
      | "isTechnician"
      | "loginLowerCase"
      | "password"
      | "passwordEncryption"
      | "firstName"
      | "lastName"
      | "middleName"
      | "position"
      | "email"
      | "language"
      | "timeZone"
      | "timeZoneAuto"
      | "active"
      | "changePasswordAtNextLogon"
      | "groupNames"
      | "ipMask"
      | "sysTenantId"
    >
  : V extends "_local"
  ? Pick<
      SupplierUser,
      | "id"
      | "isTechnician"
      | "login"
      | "loginLowerCase"
      | "password"
      | "passwordEncryption"
      | "name"
      | "firstName"
      | "lastName"
      | "middleName"
      | "position"
      | "email"
      | "language"
      | "timeZone"
      | "timeZoneAuto"
      | "active"
      | "changePasswordAtNextLogon"
      | "groupNames"
      | "ipMask"
      | "sysTenantId"
    >
  : V extends "_minimal"
  ? Pick<SupplierUser, "id" | "login" | "name">
  : V extends "supplierUser-view"
  ? Pick<
      SupplierUser,
      | "id"
      | "isTechnician"
      | "login"
      | "loginLowerCase"
      | "password"
      | "passwordEncryption"
      | "name"
      | "firstName"
      | "lastName"
      | "middleName"
      | "position"
      | "email"
      | "language"
      | "timeZone"
      | "timeZoneAuto"
      | "active"
      | "changePasswordAtNextLogon"
      | "groupNames"
      | "ipMask"
      | "sysTenantId"
      | "supplier"
      | "userRoles"
    >
  : V extends "supplierUser-view-transfer"
  ? Pick<
      SupplierUser,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "login"
      | "name"
      | "supplier"
      | "isTechnician"
    >
  : never;
