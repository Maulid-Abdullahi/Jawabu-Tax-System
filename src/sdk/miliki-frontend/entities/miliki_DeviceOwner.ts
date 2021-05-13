import { NamedEntity } from "./NamedEntity";
export class DeviceOwner extends NamedEntity {
  static NAME = "miliki_DeviceOwner";
  tin?: string | null;
  email?: string | null;
  phone?: string | null;
  websiteUrl?: string | null;
  physicalAddress?: string | null;
  location?: string | null;
  status?: string | null;
  comment?: string | null;
}
export type DeviceOwnerViewName = "_base" | "_local" | "_minimal";
export type DeviceOwnerView<V extends DeviceOwnerViewName> = V extends "_base"
  ? Pick<
      DeviceOwner,
      | "id"
      | "name"
      | "tin"
      | "email"
      | "phone"
      | "websiteUrl"
      | "physicalAddress"
      | "location"
      | "status"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      DeviceOwner,
      | "id"
      | "tin"
      | "email"
      | "phone"
      | "websiteUrl"
      | "physicalAddress"
      | "location"
      | "status"
      | "comment"
      | "name"
    >
  : V extends "_minimal"
  ? Pick<DeviceOwner, "id" | "name">
  : never;
