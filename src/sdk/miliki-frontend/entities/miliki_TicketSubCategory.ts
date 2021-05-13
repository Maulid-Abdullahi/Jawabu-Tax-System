import { StandardEntity } from "./base/sys$StandardEntity";
import { TicketCategory } from "./miliki_TicketCategory";
import { TicketTenantType } from "../enums/enums";
export class TicketSubCategory extends StandardEntity {
  static NAME = "miliki_TicketSubCategory";
  title?: string | null;
  description?: string | null;
  category?: TicketCategory | null;
  tenantType?: TicketTenantType | null;
}
export type TicketSubCategoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "ticketSubCategory-view";
export type TicketSubCategoryView<
  V extends TicketSubCategoryViewName
> = V extends "_base"
  ? Pick<TicketSubCategory, "id" | "title" | "description" | "tenantType">
  : V extends "_local"
  ? Pick<TicketSubCategory, "id" | "title" | "description" | "tenantType">
  : V extends "_minimal"
  ? Pick<TicketSubCategory, "id" | "title">
  : V extends "ticketSubCategory-view"
  ? Pick<
      TicketSubCategory,
      "id" | "title" | "description" | "tenantType" | "category"
    >
  : never;
