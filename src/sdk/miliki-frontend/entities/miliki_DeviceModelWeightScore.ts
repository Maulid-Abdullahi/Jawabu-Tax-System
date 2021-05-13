import { StandardEntity } from "./base/sys$StandardEntity";
import { DeviceModelScoreStatus } from "../enums/enums";
import { DeviceModel } from "./miliki_DeviceModel";
import { DeviceModelCategoryScore } from "./miliki_DeviceModelCategoryScore";
export class DeviceModelWeightScore extends StandardEntity {
  static NAME = "miliki_DeviceModelWeightScore";
  status?: DeviceModelScoreStatus | null;
  comment?: string | null;
  deviceModel?: DeviceModel | null;
  deviceModelId?: any | null;
  score?: any | null;
  categoryScores?: DeviceModelCategoryScore[] | null;
}
export type DeviceModelWeightScoreViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "deviceModelWeightScore-view-manufacturer";
export type DeviceModelWeightScoreView<
  V extends DeviceModelWeightScoreViewName
> = V extends "_base"
  ? Pick<
      DeviceModelWeightScore,
      "id" | "score" | "status" | "comment" | "deviceModelId"
    >
  : V extends "_local"
  ? Pick<
      DeviceModelWeightScore,
      "id" | "status" | "comment" | "deviceModelId" | "score"
    >
  : V extends "_minimal"
  ? Pick<DeviceModelWeightScore, "id" | "score" | "status">
  : V extends "deviceModelWeightScore-view-manufacturer"
  ? Pick<
      DeviceModelWeightScore,
      | "id"
      | "status"
      | "comment"
      | "deviceModelId"
      | "score"
      | "deviceModel"
      | "categoryScores"
    >
  : never;
