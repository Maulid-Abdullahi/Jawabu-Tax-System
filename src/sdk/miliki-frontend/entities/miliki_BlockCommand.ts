import { DeviceCommands } from "./miliki_DeviceCommands";
import { Device } from "./miliki_Device";
export class BlockCommand extends DeviceCommands {
  static NAME = "miliki_BlockCommand";
  devices?: Device[] | null;
}
export type BlockCommandViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "blockCommand-view";
export type BlockCommandView<V extends BlockCommandViewName> = V extends "_base"
  ? Pick<BlockCommand, "id" | "description" | "type" | "command" | "status">
  : V extends "_local"
  ? Pick<BlockCommand, "id" | "description" | "type" | "command" | "status">
  : V extends "_minimal"
  ? Pick<BlockCommand, "id" | "description">
  : V extends "blockCommand-view"
  ? Pick<
      BlockCommand,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "description"
      | "type"
      | "command"
      | "status"
      | "devices"
    >
  : never;
