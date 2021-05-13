import { NamedEntity } from "./NamedEntity";
export class DeviceType extends NamedEntity {
  static NAME = "miliki_DeviceType";
  description?: string | null;
}
export type DeviceTypeViewName = "_base" | "_local" | "_minimal";
export type DeviceTypeView<V extends DeviceTypeViewName> = V extends "_base"
  ? Pick<DeviceType, "id" | "name" | "description">
  : V extends "_local"
  ? Pick<DeviceType, "id" | "description" | "name">
  : V extends "_minimal"
  ? Pick<DeviceType, "id" | "name">
  : never;
