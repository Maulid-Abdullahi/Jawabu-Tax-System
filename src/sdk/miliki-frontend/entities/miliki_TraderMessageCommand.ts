import { DeviceCommands } from "./miliki_DeviceCommands";
import { TraderMessageCmdLink } from "./miliki_TraderMessageCmdLink";
export class TraderMessageCommand extends DeviceCommands {
  static NAME = "miliki_TraderMessageCommand";
  message?: string | null;
  devices?: TraderMessageCmdLink[] | null;
}
export type TraderMessageCommandViewName = "_base" | "_local" | "_minimal";
export type TraderMessageCommandView<
  V extends TraderMessageCommandViewName
> = V extends "_base"
  ? Pick<
      TraderMessageCommand,
      "id" | "description" | "message" | "type" | "command" | "status"
    >
  : V extends "_local"
  ? Pick<
      TraderMessageCommand,
      "id" | "message" | "description" | "type" | "command" | "status"
    >
  : V extends "_minimal"
  ? Pick<TraderMessageCommand, "id" | "description">
  : never;
