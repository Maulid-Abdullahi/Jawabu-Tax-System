import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class ScreenProfilerEvent extends BaseUuidEntity {
  static NAME = "sys$ScreenProfilerEvent";
  eventTs?: any | null;
  screen?: string | null;
  user?: string | null;
  clientTime?: number | null;
  serverTime?: number | null;
  networkTime?: number | null;
  totalTime?: number | null;
  serverTimeSec?: any | null;
  clientTimeSec?: any | null;
  networkTimeSec?: any | null;
  totalTimeSec?: any | null;
}
export type ScreenProfilerEventViewName = "_base" | "_local" | "_minimal";
export type ScreenProfilerEventView<
  V extends ScreenProfilerEventViewName
> = never;
