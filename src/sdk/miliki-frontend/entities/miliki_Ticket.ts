import { StandardEntity } from "./base/sys$StandardEntity";
import { TicketStatus } from "../enums/enums";
import { TicketSubCategory } from "./miliki_TicketSubCategory";
import { Trader } from "./miliki_Trader";
import { Device } from "./miliki_Device";
import { User } from "./base/sec$User";
import { TicketMessageLog } from "./miliki_TicketMessageLog";
export class Ticket extends StandardEntity {
  static NAME = "miliki_Ticket";
  description?: string | null;
  ticketNumber?: string | null;
  status?: TicketStatus | null;
  subCategory?: TicketSubCategory | null;
  trader?: Trader | null;
  device?: Device | null;
  raisedBy?: User | null;
  messageLogs?: TicketMessageLog[] | null;
}
export type TicketViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "ticket-view-all"
  | "ticket-view-minimal";
export type TicketView<V extends TicketViewName> = V extends "_base"
  ? Pick<Ticket, "id" | "description" | "ticketNumber" | "status">
  : V extends "_local"
  ? Pick<Ticket, "id" | "description" | "ticketNumber" | "status">
  : V extends "_minimal"
  ? Pick<Ticket, "id" | "description">
  : V extends "ticket-view-all"
  ? Pick<
      Ticket,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "description"
      | "ticketNumber"
      | "status"
      | "subCategory"
      | "trader"
      | "device"
      | "messageLogs"
    >
  : V extends "ticket-view-minimal"
  ? Pick<
      Ticket,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "description"
      | "ticketNumber"
      | "status"
      | "subCategory"
      | "trader"
      | "device"
      | "messageLogs"
    >
  : never;
