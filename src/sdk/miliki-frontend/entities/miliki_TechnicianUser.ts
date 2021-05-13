import { SupplierUser } from "./miliki_SupplierUser";
import { Technician } from "./miliki_Technician";
export class TechnicianUser extends SupplierUser {
  static NAME = "miliki_TechnicianUser";
  technician?: Technician | null;
}
export type TechnicianUserViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "supplierUser-view"
  | "technicianUser-view";
export type TechnicianUserView<
  V extends TechnicianUserViewName
> = V extends "_base"
  ? Pick<
      TechnicianUser,
      | "id"
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
      | "isTechnician"
    >
  : V extends "_local"
  ? Pick<
      TechnicianUser,
      | "id"
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
      | "isTechnician"
    >
  : V extends "_minimal"
  ? Pick<TechnicianUser, "id" | "login">
  : V extends "supplierUser-view"
  ? Pick<
      TechnicianUser,
      | "id"
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
      | "isTechnician"
      | "userRoles"
      | "supplier"
    >
  : V extends "technicianUser-view"
  ? Pick<
      TechnicianUser,
      | "id"
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
      | "isTechnician"
      | "technician"
      | "supplier"
    >
  : never;
