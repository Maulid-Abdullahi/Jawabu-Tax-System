import { StandardEntity } from "./base/sys$StandardEntity";
export class DeviceModelQuestions extends StandardEntity {
  static NAME = "miliki_DeviceModelQuestions";
  title?: string | null;
  hasChild?: boolean | null;
  parent?: DeviceModelQuestions | null;
}
export type DeviceModelQuestionsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "deviceModelQuestions-view";
export type DeviceModelQuestionsView<
  V extends DeviceModelQuestionsViewName
> = V extends "_base"
  ? Pick<DeviceModelQuestions, "id" | "title" | "hasChild">
  : V extends "_local"
  ? Pick<DeviceModelQuestions, "id" | "title" | "hasChild">
  : V extends "_minimal"
  ? Pick<DeviceModelQuestions, "id" | "title">
  : V extends "deviceModelQuestions-view"
  ? Pick<DeviceModelQuestions, "id" | "title" | "hasChild" | "parent">
  : never;
