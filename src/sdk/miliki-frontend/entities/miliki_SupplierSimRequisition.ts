import { StandardEntity } from "./base/sys$StandardEntity";
import { Supplier } from "./miliki_Supplier";
import { SimCard } from "./miliki_SimCard";
import { RequisitionStatus, Priority } from "../enums/enums";
import { Mno } from "./miliki_Mno";
export class SupplierSimRequisition extends StandardEntity {
  static NAME = "miliki_SupplierSimRequisition";
  supplier?: Supplier | null;
  simCards?: SimCard[] | null;
  status?: RequisitionStatus | null;
  mno?: Mno | null;
  quantity?: number | null;
  requestDate?: any | null;
  comment?: string | null;
  priority?: Priority | null;
}
export type SupplierSimRequisitionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "supplierSimRequisition-view";
export type SupplierSimRequisitionView<
  V extends SupplierSimRequisitionViewName
> = V extends "_base"
  ? Pick<
      SupplierSimRequisition,
      "id" | "status" | "quantity" | "requestDate" | "comment" | "priority"
    >
  : V extends "_local"
  ? Pick<
      SupplierSimRequisition,
      "id" | "status" | "quantity" | "requestDate" | "comment" | "priority"
    >
  : V extends "supplierSimRequisition-view"
  ? Pick<
      SupplierSimRequisition,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "status"
      | "quantity"
      | "requestDate"
      | "comment"
      | "priority"
      | "supplier"
      | "simCards"
      | "mno"
    >
  : never;
