import { StandardEntity } from "./base/sys$StandardEntity";
import { DeviceModelWeightScore } from "./miliki_DeviceModelWeightScore";
import { DeviceModelQuestions } from "./miliki_DeviceModelQuestions";
export class DeviceModelCategoryScore extends StandardEntity {
  static NAME = "miliki_DeviceModelCategoryScore";
  modelScore?: DeviceModelWeightScore | null;
  modelScoreId?: any | null;
  category?: DeviceModelQuestions | null;
  categoryId?: any | null;
  weightScore?: any | null;
}
export type DeviceModelCategoryScoreViewName = "_base" | "_local" | "_minimal";
export type DeviceModelCategoryScoreView<
  V extends DeviceModelCategoryScoreViewName
> = V extends "_base"
  ? Pick<
      DeviceModelCategoryScore,
      "id" | "modelScoreId" | "categoryId" | "weightScore"
    >
  : V extends "_local"
  ? Pick<
      DeviceModelCategoryScore,
      "id" | "modelScoreId" | "categoryId" | "weightScore"
    >
  : never;
