import { StandardEntity } from "./base/sys$StandardEntity";
import { Device } from "./miliki_Device";
export class DeviceKey extends StandardEntity {
  static NAME = "miliki_DeviceKey";
  device?: Device | null;
  serialNumber?: string | null;
  aesKey?: string | null;
  csr?: string | null;
  signaturePublicKey?: string | null;
}
export type DeviceKeyViewName = "_base" | "_local" | "_minimal";
export type DeviceKeyView<V extends DeviceKeyViewName> = V extends "_base"
  ? Pick<
      DeviceKey,
      "id" | "serialNumber" | "aesKey" | "csr" | "signaturePublicKey"
    >
  : V extends "_local"
  ? Pick<
      DeviceKey,
      "id" | "serialNumber" | "aesKey" | "csr" | "signaturePublicKey"
    >
  : never;
