import { StandardEntity } from "./base/sys$StandardEntity";
import { Ticket } from "./miliki_Ticket";
import { User } from "./base/sec$User";
export class TicketMessageLog extends StandardEntity {
  static NAME = "miliki_TicketMessageLog";
  ticket?: Ticket | null;
  comment?: string | null;
  user?: User | null;
}
export type TicketMessageLogViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "ticketMessageLog-view";
export type TicketMessageLogView<
  V extends TicketMessageLogViewName
> = V extends "_base"
  ? Pick<TicketMessageLog, "id" | "comment">
  : V extends "_local"
  ? Pick<TicketMessageLog, "id" | "comment">
  : V extends "_minimal"
  ? Pick<TicketMessageLog, "id" | "comment">
  : V extends "ticketMessageLog-view"
  ? Pick<
      TicketMessageLog,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "comment"
      | "user"
    >
  : never;
