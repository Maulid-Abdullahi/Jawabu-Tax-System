import { StandardEntity } from "./base/sys$StandardEntity";
import { DeviceFeatureCategory } from "./miliki_DeviceFeatureCategory";
export class DeviceFeatureSubCategory extends StandardEntity {
  static NAME = "miliki_DeviceFeatureSubCategory";
  description?: string | null;
  category?: DeviceFeatureCategory | null;
  commentRequired?: boolean | null;
  score?: number | null;
}
export type DeviceFeatureSubCategoryViewName = "_base" | "_local" | "_minimal";
export type DeviceFeatureSubCategoryView<
  V extends DeviceFeatureSubCategoryViewName
> = V extends "_base"
  ? Pick<
      DeviceFeatureSubCategory,
      "id" | "description" | "commentRequired" | "score"
    >
  : V extends "_local"
  ? Pick<
      DeviceFeatureSubCategory,
      "id" | "description" | "commentRequired" | "score"
    >
  : V extends "_minimal"
  ? Pick<DeviceFeatureSubCategory, "id" | "description">
  : never;
