import { StandardEntity } from "./base/sys$StandardEntity";
import { Device } from "./miliki_Device";
import { DeviceAppliedTax } from "./miliki_DeviceAppliedTax";
export class DeviceDocument extends StandardEntity {
  static NAME = "miliki_DeviceInvoice";
  device?: Device | null;
  briefDescription?: string | null;
  appliedTax?: DeviceAppliedTax[] | null;
  traderSystemDocNo?: string | null;
  efdDocNumber?: string | null;
  invoiceType?: string | null;
  docDate?: any | null;
  tinOfBuyer?: string | null;
  buyerDetails?: string | null;
  amountUSD?: any | null;
  amountLocal?: any | null;
  documentType?: string | null;
  relatedInvoice?: string | null;
  exchangeRate?: any | null;
  total?: any | null;
}
export type DeviceDocumentViewName = "_base" | "_local" | "_minimal";
export type DeviceDocumentView<
  V extends DeviceDocumentViewName
> = V extends "_base"
  ? Pick<
      DeviceDocument,
      | "id"
      | "briefDescription"
      | "traderSystemDocNo"
      | "efdDocNumber"
      | "invoiceType"
      | "docDate"
      | "tinOfBuyer"
      | "buyerDetails"
      | "amountUSD"
      | "amountLocal"
      | "documentType"
      | "relatedInvoice"
      | "exchangeRate"
      | "total"
    >
  : V extends "_local"
  ? Pick<
      DeviceDocument,
      | "id"
      | "briefDescription"
      | "traderSystemDocNo"
      | "efdDocNumber"
      | "invoiceType"
      | "docDate"
      | "tinOfBuyer"
      | "buyerDetails"
      | "amountUSD"
      | "amountLocal"
      | "documentType"
      | "relatedInvoice"
      | "exchangeRate"
      | "total"
    >
  : never;
