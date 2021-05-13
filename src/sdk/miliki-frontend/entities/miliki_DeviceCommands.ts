import { StandardEntity } from "./base/sys$StandardEntity";
import {
  DeviceCommandListEnum,
  DeviceCommandTypeEnum,
  DeviceCommandStatus
} from "../enums/enums";
export class DeviceCommands extends StandardEntity {
  static NAME = "miliki_DeviceCommands";
  description?: string | null;
  type?: DeviceCommandListEnum | null;
  command?: DeviceCommandTypeEnum | null;
  status?: DeviceCommandStatus | null;
}
export type DeviceCommandsViewName = "_base" | "_local" | "_minimal";
export type DeviceCommandsView<
  V extends DeviceCommandsViewName
> = V extends "_base"
  ? Pick<DeviceCommands, "id" | "description" | "type" | "command" | "status">
  : V extends "_local"
  ? Pick<DeviceCommands, "id" | "description" | "type" | "command" | "status">
  : V extends "_minimal"
  ? Pick<DeviceCommands, "id" | "description">
  : never;
