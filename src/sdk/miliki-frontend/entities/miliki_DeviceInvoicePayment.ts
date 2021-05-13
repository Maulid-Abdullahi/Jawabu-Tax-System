import { StandardEntity } from "./base/sys$StandardEntity";
import { DeviceZReport } from "./miliki_DeviceZReport";
import { DeviceDocument } from "./miliki_DeviceInvoice";
export class DeviceInvoicePayment extends StandardEntity {
  static NAME = "miliki_DeviceInvoicePayment";
  type?: string | null;
  zReport?: DeviceZReport | null;
  amount?: any | null;
  invoice?: DeviceDocument | null;
  currency?: string | null;
}
export type DeviceInvoicePaymentViewName = "_base" | "_local" | "_minimal";
export type DeviceInvoicePaymentView<
  V extends DeviceInvoicePaymentViewName
> = V extends "_base"
  ? Pick<DeviceInvoicePayment, "id" | "type" | "amount" | "currency">
  : V extends "_local"
  ? Pick<DeviceInvoicePayment, "id" | "type" | "amount" | "currency">
  : never;
