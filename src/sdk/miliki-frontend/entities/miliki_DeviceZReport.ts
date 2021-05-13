import { StandardEntity } from "./base/sys$StandardEntity";
import { Device } from "./miliki_Device";
import { DeviceAppliedTax } from "./miliki_DeviceAppliedTax";
import { DeviceInvoicePayment } from "./miliki_DeviceInvoicePayment";
export class DeviceZReport extends StandardEntity {
  static NAME = "miliki_DeviceZReport";
  device?: Device | null;
  zNumber?: any | null;
  dateOfGeneration?: any | null;
  taxInvoiceCount?: number | null;
  creditNotesCount?: number | null;
  debitNoteCount?: number | null;
  totalAmountUSD?: any | null;
  totalAmountLocal?: any | null;
  total?: any | null;
  exchangeRate?: any | null;
  dailyTaxes?: DeviceAppliedTax[] | null;
  dailyPayments?: DeviceInvoicePayment[] | null;
}
export type DeviceZReportViewName = "_base" | "_local" | "_minimal";
export type DeviceZReportView<
  V extends DeviceZReportViewName
> = V extends "_base"
  ? Pick<
      DeviceZReport,
      | "id"
      | "zNumber"
      | "dateOfGeneration"
      | "taxInvoiceCount"
      | "creditNotesCount"
      | "debitNoteCount"
      | "totalAmountUSD"
      | "totalAmountLocal"
      | "total"
      | "exchangeRate"
    >
  : V extends "_local"
  ? Pick<
      DeviceZReport,
      | "id"
      | "zNumber"
      | "dateOfGeneration"
      | "taxInvoiceCount"
      | "creditNotesCount"
      | "debitNoteCount"
      | "totalAmountUSD"
      | "totalAmountLocal"
      | "total"
      | "exchangeRate"
    >
  : never;
