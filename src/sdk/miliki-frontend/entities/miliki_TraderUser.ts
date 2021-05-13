import { User } from "./base/sec$User";
import { Trader } from "./miliki_Trader";
export class TraderUser extends User {
  static NAME = "miliki_TraderUser";
  trader?: Trader | null;
}
export type TraderUserViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "traderUser-view";
export type TraderUserView<V extends TraderUserViewName> = V extends "_base"
  ? Pick<
      TraderUser,
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
      TraderUser,
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
  ? Pick<TraderUser, "id" | "login" | "name">
  : V extends "traderUser-view"
  ? Pick<
      TraderUser,
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
      | "trader"
      | "userRoles"
    >
  : never;
