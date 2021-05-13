import { StandardEntity } from "./base/sys$StandardEntity";
import { User } from "./base/sec$User";
export class Otp extends StandardEntity {
  static NAME = "miliki_Otp";
  otp?: string | null;
  user?: User | null;
  redeemed?: boolean | null;
  expiryDate?: any | null;
  otpAttempts?: number | null;
}
export type OtpViewName = "_base" | "_local" | "_minimal" | "otp-view";
export type OtpView<V extends OtpViewName> = V extends "_base"
  ? Pick<Otp, "id" | "otp" | "redeemed" | "expiryDate" | "otpAttempts">
  : V extends "_local"
  ? Pick<Otp, "id" | "otp" | "redeemed" | "expiryDate" | "otpAttempts">
  : V extends "otp-view"
  ? Pick<Otp, "id" | "otp" | "redeemed" | "expiryDate" | "otpAttempts" | "user">
  : never;
