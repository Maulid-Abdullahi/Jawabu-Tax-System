import { BaseIntegerIdEntity } from "./base/sys$BaseIntegerIdEntity";
import { DeviceFeatureCategory } from "./miliki_DeviceFeatureCategory";
import { DeviceFeatureSubCategory } from "./miliki_DeviceFeatureSubCategory";
import { ModelQuestionsAnswers } from "./miliki_ModelQuestionsAnswers";
export class FeatureCategoryAnswerRow extends BaseIntegerIdEntity {
  static NAME = "miliki_FeatureCategoryAnswerRow";
  categoryFeature?: DeviceFeatureCategory | null;
  comment?: string | null;
  manufacturerScore?: any | null;
  feature?: DeviceFeatureSubCategory | null;
  approve?: boolean | null;
  answer?: ModelQuestionsAnswers | null;
}
export type FeatureCategoryAnswerRowViewName = "_base" | "_local" | "_minimal";
export type FeatureCategoryAnswerRowView<
  V extends FeatureCategoryAnswerRowViewName
> = never;
