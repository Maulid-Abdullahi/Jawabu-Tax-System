import { StandardEntity } from "./base/sys$StandardEntity";
import { Device } from "./miliki_Device";
import { DeviceOwner } from "./miliki_DeviceOwner";
export class DeviceMovement extends StandardEntity {
  static NAME = "miliki_DeviceMovement";
  device?: Device | null;
  from?: DeviceOwner | null;
  to?: DeviceOwner | null;
  status?: string | null;
  narration?: string | null;
}
export type DeviceMovementViewName = "_base" | "_local" | "_minimal";
export type DeviceMovementView<
  V extends DeviceMovementViewName
> = V extends "_base"
  ? Pick<DeviceMovement, "id" | "status" | "narration">
  : V extends "_local"
  ? Pick<DeviceMovement, "id" | "status" | "narration">
  : never;
