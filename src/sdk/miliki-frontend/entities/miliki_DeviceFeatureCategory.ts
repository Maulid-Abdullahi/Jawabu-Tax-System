import { StandardEntity } from "./base/sys$StandardEntity";
import { DeviceFeatureType } from "../enums/enums";
import { DeviceType } from "./miliki_DeviceType";
import { DeviceFeatureSubCategory } from "./miliki_DeviceFeatureSubCategory";
export class DeviceFeatureCategory extends StandardEntity {
  static NAME = "miliki_DeviceFeatureCategory";
  description?: string | null;
  featureType?: DeviceFeatureType | null;
  deviceClass?: DeviceType | null;
  features?: DeviceFeatureSubCategory[] | null;
}
export type DeviceFeatureCategoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "deviceFeatureCategory-view-all";
export type DeviceFeatureCategoryView<
  V extends DeviceFeatureCategoryViewName
> = V extends "_base"
  ? Pick<DeviceFeatureCategory, "id" | "description" | "featureType">
  : V extends "_local"
  ? Pick<DeviceFeatureCategory, "id" | "description" | "featureType">
  : V extends "_minimal"
  ? Pick<DeviceFeatureCategory, "id" | "description">
  : V extends "deviceFeatureCategory-view-all"
  ? Pick<
      DeviceFeatureCategory,
      "id" | "description" | "featureType" | "deviceClass" | "features"
    >
  : never;
