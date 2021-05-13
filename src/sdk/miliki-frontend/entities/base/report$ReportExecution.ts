import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { Report } from "./report$Report";
import { User } from "./sec$User";
import { FileDescriptor } from "./sys$FileDescriptor";
export class ReportExecution extends BaseUuidEntity {
  static NAME = "report$ReportExecution";
  createTs?: any | null;
  createdBy?: string | null;
  report?: Report | null;
  reportName?: string | null;
  reportCode?: string | null;
  user?: User | null;
  startTime?: any | null;
  finishTime?: any | null;
  success?: boolean | null;
  cancelled?: boolean | null;
  outputDocument?: FileDescriptor | null;
  params?: string | null;
  errorMessage?: string | null;
  serverId?: string | null;
  executionTimeSec?: any | null;
}
export type ReportExecutionViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "reportExecution.browse";
export type ReportExecutionView<
  V extends ReportExecutionViewName
> = V extends "_base"
  ? Pick<
      ReportExecution,
      | "id"
      | "reportName"
      | "reportCode"
      | "startTime"
      | "finishTime"
      | "success"
      | "cancelled"
      | "params"
      | "errorMessage"
      | "serverId"
      | "executionTimeSec"
    >
  : V extends "_local"
  ? Pick<
      ReportExecution,
      | "id"
      | "reportName"
      | "reportCode"
      | "startTime"
      | "finishTime"
      | "success"
      | "cancelled"
      | "params"
      | "errorMessage"
      | "serverId"
      | "executionTimeSec"
    >
  : V extends "reportExecution.browse"
  ? Pick<
      ReportExecution,
      | "id"
      | "reportName"
      | "reportCode"
      | "startTime"
      | "finishTime"
      | "success"
      | "cancelled"
      | "params"
      | "errorMessage"
      | "serverId"
      | "executionTimeSec"
      | "user"
      | "outputDocument"
    >
  : never;
