import { StandardEntity } from "./base/sys$StandardEntity";
import { Device } from "./miliki_Device";
import { TraderMessageCommand } from "./miliki_TraderMessageCommand";
export class TraderMessageCmdLink extends StandardEntity {
  static NAME = "miliki_TraderMessageCmdLink";
  device?: Device | null;
  traderMessage?: TraderMessageCommand | null;
}
export type TraderMessageCmdLinkViewName = "_base" | "_local" | "_minimal";
export type TraderMessageCmdLinkView<
  V extends TraderMessageCmdLinkViewName
> = never;
