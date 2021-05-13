import { User } from "./base/sec$User";
import { Manufacturer } from "./miliki_Manufacturer";
export class ManufacturerUser extends User {
  static NAME = "miliki_ManufacturerUser";
  manufacturer?: Manufacturer | null;
}
export type ManufacturerUserViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "manufacturerUser-view";
export type ManufacturerUserView<
  V extends ManufacturerUserViewName
> = V extends "_base"
  ? Pick<
      ManufacturerUser,
      | "id"
      | "login"
      | "name"
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
      ManufacturerUser,
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
    >
  : V extends "_minimal"
  ? Pick<ManufacturerUser, "id" | "login" | "name">
  : V extends "manufacturerUser-view"
  ? Pick<
      ManufacturerUser,
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
      | "manufacturer"
      | "userRoles"
    >
  : never;
