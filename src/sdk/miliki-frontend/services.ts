import { CubaApp, FetchOptions } from "@cuba-platform/rest";

export type miliki_ChangePasswordService_changePassword_params = {
  changePasswordWrapper: any;
};

export type miliki_DeviseService_blockDevice_params = {
  deviceId: string;
  block: any;
};

export type miliki_DeviseService_deadOnArrivalUpdate_params = {
  wrapper: any;
};

export type miliki_FirstTimeChangePasswordService_firstTimeChangePassword_params = {
  firstTimeChangePassword: any;
};

export type miliki_FrontendBprocService_completeAssignmentTask_params = {
  processInstanceId: string;
  taskId: string;
  assignee: string;
  isReassign: any;
  completeTask: any;
};

export type miliki_FrontendBprocService_completeTask_params = {
  processInstanceId: string;
  taskId: string;
  incomingVariables: string;
  outcome: string;
};

export type miliki_FrontendBprocService_getProcessVariables_params = {
  processInstanceId: string;
};

export type miliki_FrontendBprocService_startProcessByKey_params = {
  processKey: string;
  incomingVariables: string;
};

export type miliki_ManufacturerService_createNewModelWithCheckList_params = {
  modelWrapper: any;
};

export type miliki_SupplierService_requestModelCertification_params = {
  wrapper: any;
};

export type miliki_TicketService_replyTicket_params = {
  ticketId: string;
  message: string;
};

export type miliki_TraderService_getTraderByTin_params = {
  vatNo: string;
};

export type miliki_UserParentService_getUserInfo_params = {
  type: string;
};

export type miliki_UserParentService_getUserInfoMobile_params = {
  type: string;
};

export type miliki_UserTasksService_getUserTasksByProcessKey_params = {
  processKey: string;
};

export type miliki_UserTasksService_getUserTasksByStatus_params = {
  taskStatus: string;
};

export var restServices = {
  miliki_ChangePasswordService: {
    changePassword: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_ChangePasswordService_changePassword_params
    ) => {
      return cubaApp.invokeService(
        "miliki_ChangePasswordService",
        "changePassword",
        params,
        fetchOpts
      );
    }
  },
  miliki_DeviseService: {
    blockDevice: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_DeviseService_blockDevice_params
    ) => {
      return cubaApp.invokeService(
        "miliki_DeviseService",
        "blockDevice",
        params,
        fetchOpts
      );
    },
    deadOnArrivalUpdate: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_DeviseService_deadOnArrivalUpdate_params
    ) => {
      return cubaApp.invokeService(
        "miliki_DeviseService",
        "deadOnArrivalUpdate",
        params,
        fetchOpts
      );
    },
    getQuestions: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "miliki_DeviseService",
        "getQuestions",
        {},
        fetchOpts
      );
    }
  },
  miliki_FirstTimeChangePasswordService: {
    firstTimeChangePassword: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_FirstTimeChangePasswordService_firstTimeChangePassword_params
    ) => {
      return cubaApp.invokeService(
        "miliki_FirstTimeChangePasswordService",
        "firstTimeChangePassword",
        params,
        fetchOpts
      );
    }
  },
  miliki_FrontendBprocService: {
    completeAssignmentTask: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_FrontendBprocService_completeAssignmentTask_params
    ) => {
      return cubaApp.invokeService(
        "miliki_FrontendBprocService",
        "completeAssignmentTask",
        params,
        fetchOpts
      );
    },
    completeTask: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_FrontendBprocService_completeTask_params
    ) => {
      return cubaApp.invokeService(
        "miliki_FrontendBprocService",
        "completeTask",
        params,
        fetchOpts
      );
    },
    getProcessVariables: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_FrontendBprocService_getProcessVariables_params
    ) => {
      return cubaApp.invokeService(
        "miliki_FrontendBprocService",
        "getProcessVariables",
        params,
        fetchOpts
      );
    },
    getStarterProcesses: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "miliki_FrontendBprocService",
        "getStarterProcesses",
        {},
        fetchOpts
      );
    },
    startProcessByKey: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_FrontendBprocService_startProcessByKey_params
    ) => {
      return cubaApp.invokeService(
        "miliki_FrontendBprocService",
        "startProcessByKey",
        params,
        fetchOpts
      );
    }
  },
  miliki_ManufacturerService: {
    createNewModelWithCheckList: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => (
      params: miliki_ManufacturerService_createNewModelWithCheckList_params
    ) => {
      return cubaApp.invokeService(
        "miliki_ManufacturerService",
        "createNewModelWithCheckList",
        params,
        fetchOpts
      );
    }
  },
  miliki_SupplierService: {
    requestModelCertification: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_SupplierService_requestModelCertification_params
    ) => {
      return cubaApp.invokeService(
        "miliki_SupplierService",
        "requestModelCertification",
        params,
        fetchOpts
      );
    }
  },
  miliki_TicketService: {
    replyTicket: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_TicketService_replyTicket_params
    ) => {
      return cubaApp.invokeService(
        "miliki_TicketService",
        "replyTicket",
        params,
        fetchOpts
      );
    }
  },
  miliki_TraderService: {
    getTraderByTin: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_TraderService_getTraderByTin_params
    ) => {
      return cubaApp.invokeService(
        "miliki_TraderService",
        "getTraderByTin",
        params,
        fetchOpts
      );
    }
  },
  miliki_UserParentService: {
    getUserInfo: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_UserParentService_getUserInfo_params
    ) => {
      return cubaApp.invokeService(
        "miliki_UserParentService",
        "getUserInfo",
        params,
        fetchOpts
      );
    },
    getUserInfoMobile: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_UserParentService_getUserInfoMobile_params
    ) => {
      return cubaApp.invokeService(
        "miliki_UserParentService",
        "getUserInfoMobile",
        params,
        fetchOpts
      );
    }
  },
  miliki_UserTasksService: {
    getUserTasks: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "miliki_UserTasksService",
        "getUserTasks",
        {},
        fetchOpts
      );
    },
    getUserTasksByProcessKey: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_UserTasksService_getUserTasksByProcessKey_params
    ) => {
      return cubaApp.invokeService(
        "miliki_UserTasksService",
        "getUserTasksByProcessKey",
        params,
        fetchOpts
      );
    },
    getUserTasksByStatus: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => (
      params: miliki_UserTasksService_getUserTasksByStatus_params
    ) => {
      return cubaApp.invokeService(
        "miliki_UserTasksService",
        "getUserTasksByStatus",
        params,
        fetchOpts
      );
    }
  }
};
