import { CUBA_URL } from './configs';
import { CubaAppProvider } from '@cuba-platform/react-core';
import { initializeApp } from '@cuba-platform/rest';

const cubaREST = initializeApp({
    name: "supplier",
    apiUrl: CUBA_URL,
    storage: window.localStorage,
    defaultLocale: "en",
});
cubaREST.restApiToken = localStorage.getItem('access_token');


export default cubaREST;
