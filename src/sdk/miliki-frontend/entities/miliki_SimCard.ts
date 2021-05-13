import { StandardEntity } from "./base/sys$StandardEntity";
import { SupplierSimRequisition } from "./miliki_SupplierSimRequisition";
import { SimcardStatus } from "../enums/enums";
import { Supplier } from "./miliki_Supplier";
export class SimCard extends StandardEntity {
  static NAME = "miliki_SimCard";
  imsi?: string | null;
  phoneNumber?: string | null;
  expiry?: any | null;
  requisition?: SupplierSimRequisition | null;
  status?: SimcardStatus | null;
  supplierAllocated?: Supplier | null;
}
export type SimCardViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "simCard-inventory-view"
  | "simCard-search-view";
export type SimCardView<V extends SimCardViewName> = V extends "_base"
  ? Pick<SimCard, "id" | "imsi" | "phoneNumber" | "expiry" | "status">
  : V extends "_local"
  ? Pick<SimCard, "id" | "imsi" | "phoneNumber" | "expiry" | "status">
  : V extends "_minimal"
  ? Pick<SimCard, "id" | "imsi">
  : V extends "simCard-inventory-view"
  ? Pick<
      SimCard,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "imsi"
      | "phoneNumber"
      | "expiry"
      | "status"
      | "supplierAllocated"
    >
  : V extends "simCard-search-view"
  ? Pick<
      SimCard,
      "id" | "imsi" | "phoneNumber" | "expiry" | "status" | "requisition"
    >
  : never;
