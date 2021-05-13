import React from 'react';

const DeviceModelOnboarding = React.lazy(() => import('./views/devices/deviceModelOnboarding'));
const DeviceRequisition = React.lazy(() => import('./views/devices/deviceRequisition'));
const DeviceRequisitions = React.lazy(() => import('./views/devices/requisitionedDevices.tsx'));
const DeviceTransfer = React.lazy(() => import('./views/devices/deviceTransfer'));
const SimCardRequisition = React.lazy(() => import('./views/devices/simCardRequisition'));
const SimCardRequisitions = React.lazy(() => import('./views/devices/simList'));
const NewTask = React.lazy(() => import('./views/tasks/new-task'));
const NewTechnician = React.lazy(() => import('./views/users/CreateTechnician'));
const Technicians = React.lazy(() => import('./views/users/ListTechnicians'));
const Inbox = React.lazy(() => import('./views/inbox/inbox'));
const InboxDetails = React.lazy(() => import('./views/inbox/inboxDetails'));
const Dashboard = React.lazy(() => import('./views/dashboard/dashboardC'));
const Success = React.lazy(() => import('./views/successComponent'));
const SimcardSuccess = React.lazy(() => import('./views/simcardSuccess'));
const DeviceInventory = React.lazy(() => import('./views/devices/Inventory'));
const SimcardInventory = React.lazy(() => import('./views/devices/simcardInventory'));
const TicketInventory = React.lazy(() => import('./views/devices/ticketInventory'));
const ModalReport = React.lazy(() => import('./views/reports/modelReports'));
const SimcardReport = React.lazy(() => import('./views/reports/simcardReports'));

const TraderOnboarding = React.lazy(() => import('../src/views/technician/traderOnboarding'));
const repairRequest = React.lazy(() => import('./views/technician/repairRequest'));
const SuccessC = React.lazy(() => import('./views/technician/success'));
const ExtendedRepairRequest = React.lazy(() => import('../src/views/technician/extendedRepairReq'));

const Ticket = React.lazy(() => import('../src/views/technician/tickets/Ticket'));
const ViewTicket = React.lazy(() => import('../src/views/technician/tickets/viewTickets'));

const ChangePassword = React.lazy(() => import('../src/views/profile/ChangePassword'));
const Profile = React.lazy(() => import('../src/views/profile/Profile'));
const ProfileDashboard = React.lazy(() => import('../src/views/profile/ProfileDashboard'));
const CheckAssignedTicket = React.lazy(() => import('../src/views/inbox/checkAssignedTicket'));

const ForgotPassword = React.lazy(() => import('../src/views/pages/login/forgotPassword'));

const roles = localStorage.getItem('roles');
let role = 'supplier';
if (roles) {
    role = roles.includes('TechnicianRestApiUser') ? 'technician' : 'supplier';
}

let checkAuthorization = function (route, routeRole) {
   // console.log(route);
    // if (routeRole != role) {
    //     return '/dashboard';
    // }

    return route;
};

export const Supplierroutes = [
    { path: '/dashboard', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    {
        path: checkAuthorization('/device/onboarding', 'supplier'),
        name: 'Device Model Onboarding',
        component: DeviceModelOnboarding,
        exact: true,
    },
    {
        path: checkAuthorization('/device/requisition', 'supplier'),
        name: 'Supplier Device Requisition',
        component: DeviceRequisition,
        exact: true,
    },
    {
        path: checkAuthorization('/device/requisitions', 'supplier'),
        name: 'Requisitioned Devices',
        component: DeviceRequisitions,
        exact: true,
    },
    {
        path: checkAuthorization('/device/transfer', 'supplier'),
        name: 'Device Transfer',
        component: DeviceTransfer,
        exact: true,
    },
    {
        path: checkAuthorization('/device/inventory', 'supplier'),
        name: 'Inventory',
        component: DeviceInventory,
        exact: true,
    },
    {
        path: checkAuthorization('/report/modal', 'supplier'),
        name: 'ModalReport',
        component: ModalReport,
        exact: true,
    },
    {
        path: checkAuthorization('/report/simcard', 'supplier'),
        name: 'ModalReport',
        component: SimcardReport,
        exact: true,
    },
    {
        path: checkAuthorization('/sim/inventory', 'supplier'),
        name: 'SimcardInventory',
        component: SimcardInventory,
        exact: true,
    },
    {
        path: checkAuthorization('/ticket/inventory', 'supplier'),
        name: 'TicketInventory',
        component: TicketInventory,
        exact: true,
    },
    {
        path: checkAuthorization('/sim/requisition', 'supplier'),
        name: 'Sim Card Requisition',
        component: SimCardRequisition,
        exact: true,
    },
    {
        path: checkAuthorization('/sim/requisitions', 'supplier'),
        name: 'Requisitioned Sim Cards',
        component: SimCardRequisitions,
        exact: true,
    },
    {
        path: checkAuthorization('/technician/onboard', 'supplier'),
        name: 'New Technician',
        component: NewTechnician,
        exact: true,
    },
    {
        path: checkAuthorization('/technician/technicians', 'supplier'),
        name: 'Technicians',
        component: Technicians,
        exact: true,
    },
    {
        path: checkAuthorization('/new-task', 'supplier'),
        name: 'New Task',
        component: NewTask,
        exact: true,
    },
    {
        path: checkAuthorization('/inbox', 'supplier'),
        name: 'Inbox',
        component: Inbox,
        exact: true,
    },
    {
        path: checkAuthorization('/inbox/:id', 'supplier'),
        name: 'Inbox details',
        component: InboxDetails,
        exact: true,
    },
    {
        path: checkAuthorization('/okay', 'supplier'),
        name: 'Successful',
        component: Success,
        exact: true,
    },
    {
        path: checkAuthorization('/simcardSuccess', 'supplier'),
        name: 'Successful',
        component: SimcardSuccess,
        exact: true,
    },

    {
        path: checkAuthorization('/trader/repairRequest', 'supplier'),
        name: 'Repair Request',
        component: repairRequest,
        exact: true,
    },
    {
        path: checkAuthorization('/success', 'supplier'),
        name: 'Successful',
        component: SuccessC,
        exact: true,
    },
    {
        path: checkAuthorization('/trader/repairInformation', 'supplier'),
        name: 'Repair Information',
        component: ExtendedRepairRequest,
        exact: true,
    },
    {
        path: checkAuthorization('/profile/changePassword', 'supplier'),
        name: 'Change Password',
        component: ChangePassword,
        exact: true,
    },
];

export const Techroutes = [
    { path: '/dashboard', exact: true, name: 'Home' },
    {
        path: checkAuthorization('/dashboard', 'technician'),
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: checkAuthorization('/inbox', 'technician'),
        name: 'Inbox',
        component: Inbox,
        exact: true,
    },
    {
        path: checkAuthorization('/inbox/:id', 'technician'),
        name: 'Inbox details',
        component: InboxDetails,
        exact: true,
    },
    {
        path: checkAuthorization('/okay', 'technician'),
        name: 'Successful',
        component: Success,
        exact: true,
    },
    { path: '/dashboard', exact: true, name: 'Home' },
    //{ path: '/dashboard', name: 'Dashboard', component: Dashboard, exact: true },

    {
        path: checkAuthorization('/new-task', 'technician'),
        name: 'New Task',
        component: NewTask,
        exact: true,
    },

    {
        path: checkAuthorization('/trader/repairRequest', 'technician'),
        name: 'Repair Request',
        component: repairRequest,
        exact: true,
    },
    {
        path: checkAuthorization('/checkAssignedTicket/:id', 'technician'),
        name: 'Repair Request',
        component: CheckAssignedTicket,
        exact: true,
    },

    {
        path: checkAuthorization('/ticket/tickets', 'technician'),
        name: 'Ticket Ticket',
        component: Ticket,
        exact: true,
    },
    {
        path: checkAuthorization('/ticket/viewticket/:id', 'technician'),
        name: 'View Ticket',
        component: ViewTicket,
        exact: true,
    },
    {
        path: checkAuthorization('/success', 'technician'),
        name: 'Successful',
        component: SuccessC,
        exact: true,
    },
    {
        path: checkAuthorization('/trader/onboarding', 'technician'),
        name: 'Tax Payer Onboarding',
        component: TraderOnboarding,
        exact: true,
    },
    {
        path: checkAuthorization('/trader/repairInformation', 'technician'),
        name: 'Repair Information',
        component: ExtendedRepairRequest,
        exact: true,
    },
    {
        path: checkAuthorization('/technician/changepassword', 'technician'),
        name: 'ChangePassword',
        component: ChangePassword,
        exact: true,
    },

    {
        path: checkAuthorization('/technician/profileInfo', 'technician'),
        name: 'Profile ',
        component: Profile,
        exact: true,
    },
    {
        path: checkAuthorization('/technician/profile', 'technician'),
        name: ' ProfileDashboard ',
        component: ProfileDashboard,
        exact: true,
    },
    {
        path: checkAuthorization('/profile/changePassword', 'technician'),
        name: 'Change Password',
        component: ChangePassword,
        exact: true,
    },
];

// export default routes;
