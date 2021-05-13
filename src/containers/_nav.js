import React from 'react';
import CIcon from '@coreui/icons-react';
const roles = localStorage.getItem('roles');

export const supplierNav = [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
    },
    {
        _tag: 'CSidebarNavItem',
        className: 'new-task',
        name: 'New Task',
        to: '/new-task',
        icon: <CIcon name="cib-addthis" customClasses="c-sidebar-nav-icon" />,
    },
    {
        _tag: 'CSidebarNavItem',
        className: 'Inbox',
        name: 'Inbox',
        to: '/inbox',
        icon: <CIcon name="cil-inbox" customClasses="c-sidebar-nav-icon" />,
    },
    {
        _tag: 'CSidebarNavDivider',
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Device Management'],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Devices',
        route: '/device',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Device Model Certification',
                to: '/device/onboarding',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Device Requisition',
                to: '/device/requisition',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Device Transfer',
                to: '/device/transfer',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Device Inventory',
                to: '/device/inventory',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
        ],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Reports',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Ticket Inventory',
                to: '/ticket/inventory',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Modal Reports',
                to: '/report/modal',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'SIM Card Reports',
                to: '/report/simcard',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Requisitioned Devices',
                to: '/device/requisitions',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Requisitioned Sim Cards',
                to: '/sim/requisitions',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
        ],
    },
    {
        _tag: 'CSidebarNavDivider',
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Sim Cards Management'],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'SIM Cards',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'SIM Card Requisition',
                to: '/sim/requisition',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'SIM Cards Inventory',
                to: '/sim/inventory',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Requisitioned SIM Cards',
                to: '/sim/requisitions',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
        ],
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Technician Management'],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Technicians',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Create Technician',
                to: '/technician/onboard',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Technicians List',
                to: '/technician/technicians',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            },
        ],
    },
];
export const technicianNav = [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
    },
    {
        _tag: 'CSidebarNavItem',
        className: 'new-task',
        name: 'New Task',
        to: '/new-task',
        icon: <CIcon name="cib-addthis" customClasses="c-sidebar-nav-icon" />,
    },
    {
        _tag: 'CSidebarNavTitle',
        _children: ['Tax Payer Management'],
    },

    {
        _tag: 'CSidebarNavItem',
        className: 'Inbox',
        name: 'Inbox',
        to: '/inbox',
        icon: <CIcon name="cil-inbox" customClasses="c-sidebar-nav-icon" />,
    },
    {
        _tag: 'CSidebarNavDivider',
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Tax Payers',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Create Tax Payer',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
                to: '/trader/onboarding',
            },
        ],
    },
    {
        _tag: 'CSidebarNavDropdown',
        name: 'Help Desk',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Tickets',
                icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
                to: '/ticket/tickets',
            },
            // {
            //     _tag: 'CSidebarNavItem',
            //     name: 'Tickets',
            //     icon: <CIcon name="cil-caret-right" customClasses="c-sidebar-nav-icon" />,
            //     to: '/ticket/viewticket',
            // },
        ],
    },
];
