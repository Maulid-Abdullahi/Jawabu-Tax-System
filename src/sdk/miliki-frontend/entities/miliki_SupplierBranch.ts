import { StandardEntity } from "./base/sys$StandardEntity";
import { Supplier } from "./miliki_Supplier";
export class SupplierBranch extends StandardEntity {
  static NAME = "miliki_SupplierBranch";
  location?: string | null;
  supplier?: Supplier | null;
}
export type SupplierBranchViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "supplierBranch-view";
export type SupplierBranchView<
  V extends SupplierBranchViewName
> = V extends "_base"
  ? Pick<SupplierBranch, "id" | "location">
  : V extends "_local"
  ? Pick<SupplierBranch, "id" | "location">
  : V extends "supplierBranch-view"
  ? Pick<SupplierBranch, "id" | "location">
  : never;
