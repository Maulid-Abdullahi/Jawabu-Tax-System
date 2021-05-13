import React from 'react';
import {
    CBadge,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CImg,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { logout } from '.././helpers/loginStatus';
const roles = localStorage.getItem('roles');

const TheHeaderDropdown = () => {
    return (
        <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <p style={{ color: '#002868', margin: '0px' }}>
                    {roles?.includes('SupplierRestApiUser')
                        ? localStorage.getItem('supplier-email')
                        : localStorage.getItem('technician-email')}
                </p>
                <div className="c-avatar">
                    <CIcon name="cil-user" className="mfe-2" />
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem header tag="div" color="light" className="text-center">
                    <strong>Account</strong>
                </CDropdownItem>

                <CDropdownItem
                    className="profile"
                    style={{ textDecoration: 'none' }}
                    to="/technician/profile"
                >
                    <CIcon name="cil-user" className="mfe-2" />
                    Profile
                </CDropdownItem>
                <CDropdownItem onClick={logout}>
                    <CIcon name="cil-lock-locked" className="mfe-2" />
                    Logout
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default TheHeaderDropdown;
