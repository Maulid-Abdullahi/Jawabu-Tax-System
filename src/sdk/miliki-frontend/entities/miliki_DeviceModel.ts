import { NamedEntity } from "./NamedEntity";
import { DeviceType } from "./miliki_DeviceType";
import { ModelStatus } from "../enums/enums";
import { ModelQuestionsAnswers } from "./miliki_ModelQuestionsAnswers";
import { Manufacturer } from "./miliki_Manufacturer";
import { Supplier } from "./miliki_Supplier";
export class DeviceModel extends NamedEntity {
  static NAME = "miliki_DeviceModel";
  modelType?: DeviceType | null;
  price?: any | null;
  description?: string | null;
  status?: ModelStatus | null;
  weight?: any | null;
  firmware?: string | null;
  checklistAnswers?: ModelQuestionsAnswers[] | null;
  manufacturer?: Manufacturer | null;
  suppliers?: Supplier[] | null;
  certificateNumber?: string | null;
  certificateDate?: any | null;
}
export type DeviceModelViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "deviceModel-manufacturer-view-minimal"
  | "deviceModel-view"
  | "deviceModel-view-minimal";
export type DeviceModelView<V extends DeviceModelViewName> = V extends "_base"
  ? Pick<
      DeviceModel,
      | "id"
      | "name"
      | "price"
      | "description"
      | "status"
      | "weight"
      | "firmware"
      | "certificateNumber"
      | "certificateDate"
    >
  : V extends "_local"
  ? Pick<
      DeviceModel,
      | "id"
      | "price"
      | "description"
      | "status"
      | "weight"
      | "firmware"
      | "certificateNumber"
      | "certificateDate"
      | "name"
    >
  : V extends "_minimal"
  ? Pick<DeviceModel, "id" | "name">
  : V extends "deviceModel-manufacturer-view-minimal"
  ? Pick<
      DeviceModel,
      | "id"
      | "price"
      | "description"
      | "status"
      | "weight"
      | "firmware"
      | "certificateNumber"
      | "certificateDate"
      | "name"
      | "manufacturer"
    >
  : V extends "deviceModel-view"
  ? Pick<
      DeviceModel,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "price"
      | "description"
      | "status"
      | "weight"
      | "firmware"
      | "certificateNumber"
      | "certificateDate"
      | "name"
      | "modelType"
      | "manufacturer"
      | "checklistAnswers"
    >
  : V extends "deviceModel-view-minimal"
  ? Pick<
      DeviceModel,
      | "id"
      | "price"
      | "description"
      | "status"
      | "weight"
      | "firmware"
      | "certificateNumber"
      | "certificateDate"
      | "name"
      | "modelType"
      | "manufacturer"
      | "suppliers"
    >
  : never;
