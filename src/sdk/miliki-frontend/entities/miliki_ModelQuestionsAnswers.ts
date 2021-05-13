import { BaseUuidEntity } from "./base/sys$BaseUuidEntity";
import { DeviceModel } from "./miliki_DeviceModel";
import { DeviceFeatureSubCategory } from "./miliki_DeviceFeatureSubCategory";
export class ModelQuestionsAnswers extends BaseUuidEntity {
  static NAME = "miliki_ModelQuestionsAnswers";
  model?: DeviceModel | null;
  modelId?: any | null;
  question?: DeviceFeatureSubCategory | null;
  questionId?: any | null;
  answer?: boolean | null;
  comment?: string | null;
  weightedScore?: any | null;
  authorityScore?: any | null;
  updateTs?: any | null;
  updatedBy?: string | null;
  createTs?: any | null;
  createdBy?: string | null;
}
export type ModelQuestionsAnswersViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "modelQuestionsAnswers-view"
  | "modelQuestionsAnswers-view-category";
export type ModelQuestionsAnswersView<
  V extends ModelQuestionsAnswersViewName
> = V extends "_base"
  ? Pick<
      ModelQuestionsAnswers,
      | "id"
      | "modelId"
      | "questionId"
      | "answer"
      | "comment"
      | "weightedScore"
      | "authorityScore"
    >
  : V extends "_local"
  ? Pick<
      ModelQuestionsAnswers,
      | "id"
      | "modelId"
      | "questionId"
      | "answer"
      | "comment"
      | "weightedScore"
      | "authorityScore"
    >
  : V extends "modelQuestionsAnswers-view"
  ? Pick<
      ModelQuestionsAnswers,
      | "id"
      | "modelId"
      | "questionId"
      | "answer"
      | "comment"
      | "weightedScore"
      | "authorityScore"
      | "model"
      | "question"
    >
  : V extends "modelQuestionsAnswers-view-category"
  ? Pick<
      ModelQuestionsAnswers,
      | "id"
      | "modelId"
      | "questionId"
      | "answer"
      | "comment"
      | "weightedScore"
      | "authorityScore"
      | "model"
      | "question"
    >
  : never;
