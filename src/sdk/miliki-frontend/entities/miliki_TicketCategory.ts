import { StandardEntity } from "./base/sys$StandardEntity";
import { TicketClass } from "../enums/enums";
export class TicketCategory extends StandardEntity {
  static NAME = "miliki_TicketCategory";
  title?: string | null;
  description?: string | null;
  ticketClass?: TicketClass | null;
}
export type TicketCategoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "ticketCategory-view";
export type TicketCategoryView<
  V extends TicketCategoryViewName
> = V extends "_base"
  ? Pick<TicketCategory, "id" | "title" | "description" | "ticketClass">
  : V extends "_local"
  ? Pick<TicketCategory, "id" | "title" | "description" | "ticketClass">
  : V extends "_minimal"
  ? Pick<TicketCategory, "id" | "title">
  : V extends "ticketCategory-view"
  ? Pick<
      TicketCategory,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "title"
      | "description"
      | "ticketClass"
    >
  : never;
