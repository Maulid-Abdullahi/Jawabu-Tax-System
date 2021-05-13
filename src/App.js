import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import {
    OtpProtectedRoute,
    AllowLoginIfTokenPresent,
    ProtectSupplierRoute,
    ChangePasswordIfFirstTimeLogin,
} from '../src/views/pages/protected';
import history from './helpers/routeUtils';
import './scss/style.scss';
import Notifications from 'react-notify-toast';
import { CubaAppProvider } from '@cuba-platform/react-core';
import { initializeApp } from '@cuba-platform/rest';
import { CUBA_URL } from './configs';
import { antdLocaleMapping, messagesMapping } from './i18n/i18nMappings';
import { IntlProvider } from 'react-intl';
import NetworkDetector from './NetworkDetector.jsx';
import 'moment/locale/en-gb';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Otp = React.lazy(() => import('./views/pages/login/otp'));
const ChangePassword = React.lazy(() => import('./views/pages/login/changePassword'));
const forgotPassword = React.lazy(() => import('./views/pages/login/forgotPassword'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const cubaREST = initializeApp({
    storage: window.localStorage,
    name: 'supplier',
    apiUrl: CUBA_URL,
    defaultLocale: 'en',
});

class App extends Component {
    render() {
        return (
            <CubaAppProvider
                cubaREST={cubaREST}
                messagesMapping={messagesMapping}
                antdLocaleMapping={antdLocaleMapping}
            >
                <IntlProvider locale="en" messages={messagesMapping}>
                    <Router history={history}>
                        <Notifications options={{ zIndex: 300, top: '100px' }} />
                        <React.Suspense fallback={loading}>
                            <Switch>
                                <AllowLoginIfTokenPresent
                                    exact
                                    path="/"
                                    name="Login Page"
                                    component={Login}
                                />
                                <OtpProtectedRoute
                                    exact
                                    path="/verify"
                                    name="Otp page"
                                    component={Otp}
                                />
                                <ProtectSupplierRoute exact path="/" component={''} />
                                <ChangePasswordIfFirstTimeLogin
                                    exact
                                    path="/changePassword"
                                    name="Change Password Page"
                                    component={ChangePassword}
                                />{' '}
                                <Route
                                    exact
                                    path="/forgotPassword"
                                    name="Forgot Password Page"
                                    component={forgotPassword}
                                />
                                <Route
                                    exact
                                    path="/register"
                                    name="Register Page"
                                    render={(props) => <Register {...props} />}
                                />
                                <Route
                                    exact
                                    path="/404"
                                    name="Page 404"
                                    render={(props) => <Page404 {...props} />}
                                />
                                <Route
                                    exact
                                    path="/500"
                                    name="Page 500"
                                    render={(props) => <Page500 {...props} />}
                                />
                                <Route
                                    path="/"
                                    name="Home"
                                    render={(props) => <TheLayout {...props} />}
                                />
                            </Switch>
                        </React.Suspense>
                    </Router>
                </IntlProvider>
            </CubaAppProvider>
        );
    }
}

export default NetworkDetector(App);
