import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react';

// routes config
import { Supplierroutes, Techroutes } from '../routes';
import preLoginStore from '../views/pages/login/preLoginStore';

const roles = localStorage.getItem('roles');

let routes = [...Supplierroutes, ...Techroutes];
const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
);

const TheContent = () => {
    return (
        <main className="c-main">
            <CContainer fluid>
                <Suspense fallback={loading}>
                    <Switch>
                        {routes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={(props) =>
                                        localStorage.getItem('access_token') ? (
                                            <CFade>
                                                <route.component {...props} />
                                            </CFade>
                                        ) : (
                                            <CFade>
                                                <Redirect to={{ pathname: '/' }} />
                                            </CFade>
                                        )
                                    }
                                />
                            ) : null;
                        })}
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </Suspense>
            </CContainer>
        </main>
    );
};

export default React.memo(TheContent);
