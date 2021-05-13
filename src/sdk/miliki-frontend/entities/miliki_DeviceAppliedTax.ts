import { StandardEntity } from "./base/sys$StandardEntity";
import { DeviceZReport } from "./miliki_DeviceZReport";
import { DeviceDocument } from "./miliki_DeviceInvoice";
export class DeviceAppliedTax extends StandardEntity {
  static NAME = "miliki_DeviceAppliedTax";
  hsCodeVerified?: boolean | null;
  zReport?: DeviceZReport | null;
  label?: string | null;
  rate?: any | null;
  taxableAmount?: any | null;
  currency?: string | null;
  taxAmount?: any | null;
  deviceDocument?: DeviceDocument | null;
}
export type DeviceAppliedTaxViewName = "_base" | "_local" | "_minimal";
export type DeviceAppliedTaxView<
  V extends DeviceAppliedTaxViewName
> = V extends "_base"
  ? Pick<
      DeviceAppliedTax,
      | "id"
      | "label"
      | "hsCodeVerified"
      | "rate"
      | "taxableAmount"
      | "currency"
      | "taxAmount"
    >
  : V extends "_local"
  ? Pick<
      DeviceAppliedTax,
      | "id"
      | "hsCodeVerified"
      | "label"
      | "rate"
      | "taxableAmount"
      | "currency"
      | "taxAmount"
    >
  : V extends "_minimal"
  ? Pick<DeviceAppliedTax, "id" | "label">
  : never;
