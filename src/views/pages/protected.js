import React from 'react';
import { Redirect } from 'react-router-dom';
import preLoginStore from './login/preLoginStore';

// Class to check if correlationId is present, otherwise redirect to login
class OtpProtectedRoute extends React.Component {
    render() {
        const Component = this.props.component;
        const isAlreadyAuthenticated = localStorage.getItem('access_token');
        const isCorrelationId = localStorage.getItem('correlationId');

        if (isAlreadyAuthenticated) {
            return (
                <Redirect
                    to={{
                        pathname: '/dashboard',
                    }}
                />
            );
        } else {
            return isCorrelationId ? <Component /> : <Redirect to={{ pathname: '/' }} />;
        }
    }
}

class ProtectSupplierRoute extends React.Component {
    render() {
        const Component = this.props.component;
        const roles = localStorage.getItem('roles');
        const isAlreadyAuthenticated = localStorage.getItem('access_token');

        return isAlreadyAuthenticated && roles.includes('SupplierRestApiUser') ? (
            <Redirect
                to={
                    ({
                        pathname: '/dashboard',
                    },
                    {
                        pathname: '/new-task',
                    },
                    {
                        pathname: '/inbox',
                    },
                    {
                        pathname: '/device/onboarding',
                    },
                    {
                        pathname: '/device/requisition',
                    },
                    {
                        pathname: '/device/transfer',
                    },
                    {
                        pathname: '/sim/requisition',
                    },
                    {
                        pathname: '/device/requisitions',
                    },
                    {
                        pathname: '/sim/requisitions',
                    },
                    {
                        pathname: '/technician/onboard',
                    },
                    {
                        pathname: '/technician/technicians',
                    })
                }
            />
        ) : (
            <Component />
        );
    }
}

// Class to check if user is logged in already and prevent duplicate login
class AllowLoginIfTokenPresent extends React.Component {
    render() {
        const Component = this.props.component;
        const isAlreadyAuthenticated = localStorage.getItem('access_token');
        const isFirstTimeLogin = localStorage.getItem('isFirstTimeLogin');

        return isAlreadyAuthenticated && isFirstTimeLogin === false ? (
            <Redirect to={{ pathname: '/dashboard' }} />
        ) : (
            <Component {...localStorage.clear()} />
        );
    }
}

class ChangePasswordIfFirstTimeLogin extends React.Component {
    render() {
        const Component = this.props.component;
        const isAlreadyAuthenticated = localStorage.getItem('access_token');
        const status = localStorage.getItem('status');

        return preLoginStore.isfirstTimeLogin && isAlreadyAuthenticated && status === 410 ? (
            <Redirect to={{ pathname: '/changePassword' }} />
        ) : (
            <Component />
        );
    }
}

export {
    OtpProtectedRoute,
    AllowLoginIfTokenPresent,
    ProtectSupplierRoute,
    ChangePasswordIfFirstTimeLogin,
};
