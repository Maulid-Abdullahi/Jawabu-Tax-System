import { StandardEntity } from "./base/sys$StandardEntity";
import { DeviceDocument } from "./miliki_DeviceInvoice";
export class DeviceInvoiceItem extends StandardEntity {
  static NAME = "miliki_DeviceInvoiceItem";
  invoice?: DeviceDocument | null;
  currency?: string | null;
  name?: string | null;
  quantiy?: number | null;
  price?: any | null;
  taxLabel?: string | null;
}
export type DeviceInvoiceItemViewName = "_base" | "_local" | "_minimal";
export type DeviceInvoiceItemView<
  V extends DeviceInvoiceItemViewName
> = V extends "_base"
  ? Pick<
      DeviceInvoiceItem,
      "id" | "name" | "currency" | "quantiy" | "price" | "taxLabel"
    >
  : V extends "_local"
  ? Pick<
      DeviceInvoiceItem,
      "id" | "currency" | "name" | "quantiy" | "price" | "taxLabel"
    >
  : V extends "_minimal"
  ? Pick<DeviceInvoiceItem, "id" | "name">
  : never;
