import { observable, runInAction, toJS } from 'mobx';
import { BASE_URL, BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } from '../../../configs';
import { notify } from 'react-notify-toast';
import history from '../../../helpers/routeUtils';
import axios from 'axios';
import { getCubaREST } from '@cuba-platform/react-core';
import { errorMonitor } from 'stream';
import { Supplierroutes, Techroutes } from '../../../routes';

export default observable({
    isCorrelationIdLoading: false,
    isGetTokenLoading: false,
    isGetUserInfoLoading: false,
    isRoles: [],
    isRoutes: [],

    async getCorrelationId(username, password) {
        try {
            this.isCorrelationIdLoading = true;
            const correlationIdResponse = await axios.post(
                `${BASE_URL}/app/rest/v2/oauth/send-token`,
                {
                    username: username,
                    password: password,
                    scope: 'supplier',
                },
                {
                    auth: {
                        username: BASIC_AUTH_USERNAME,
                        password: BASIC_AUTH_PASSWORD,
                    },
                }
            );
            if (correlationIdResponse.data.access_token) {
                console.log('correlationIdResponse', correlationIdResponse.data.access_token);
                this.getUserInformation(correlationIdResponse.data.access_token);
                localStorage.setItem('access_token', correlationIdResponse.data.access_token);
                localStorage.setItem('expiry_in', correlationIdResponse.data.expires_in);
                localStorage.setItem('expiry_date', correlationIdResponse.data.expiry_date);
                localStorage.setItem('roles', correlationIdResponse.data.roles);
                getCubaREST().restApiToken = correlationIdResponse.data.access_token;
                localStorage.setItem('isFirstTimeLogin', false);
                console.log('correlationIdResponse', correlationIdResponse);
                notify.show('Login Success', 'success', 2500);
                history.push('/new-task');
            } else {
                localStorage.setItem('correlationId', correlationIdResponse.data.correlationId);
                notify.show('Login Success, Enter Otp', 'success', 2500);
                history.push('/verify');
            }
        } catch (error) {
            error?.response?.data?.message
                ? notify.show(error.response.data.message, 'error')
                : notify.show('connection failure', 'error');
        }
        runInAction(() => {
            this.isCorrelationIdLoading = false;
        });
    },

    async getBearerToken(otp) {
        let getTokenresponse;
        try {
            this.isGetTokenLoading = true;
            getTokenresponse = await axios.post(
                `${BASE_URL}/app/rest/v2/oauth/verify-token`,
                {
                    correlationId: localStorage.getItem('correlationId'),
                    otpCode: otp,
                },
                {
                    auth: {
                        username: BASIC_AUTH_USERNAME,
                        password: BASIC_AUTH_PASSWORD,
                    },
                }
            );
            localStorage.setItem('access_token', getTokenresponse.data.access_token);
            localStorage.setItem('expiryDate', getTokenresponse.data.expires_in);
            this.getUserInformation(getTokenresponse.data.access_token);
            localStorage.setItem('roles', getTokenresponse.data.roles);
            getCubaREST().restApiToken = getTokenresponse.data.access_token;
            notify.show('Successful, Welcome', 'success', 2000);
            history.push('/dashboard');
        } catch (error) {
            if (error.response.status === 410) {
                localStorage.setItem('access_token', error.response.data.access_token);
                localStorage.setItem('status', error.response.status);
                localStorage.setItem('roles', error.response.data.roles);
                this.getUserInformation(error.response.data.access_token);
                getCubaREST().restApiToken = error.response.data.access_token;
                notify.show('You need to change your password', 'success', 2000);
                localStorage.setItem('isFirstTimeLogin', true);

                history.push('/changePassword');
            }
            notify.show('Otp Error, try again', 'error');
            runInAction(() => {
                this.isGetTokenLoading = false;
            });
            return;
        }
    },
    async postChangePasswordData(values) {
        const data = {
            changePasswordWrapper: {
                oldPass: values.oldPassword,
                newPassword: values.confirmPassword,
            },
        };

        try {
            this.isPostChangePasswordLoading = true;

            await axios.post(
                `${BASE_URL}/app/rest/v2/services/miliki_ChangePasswordService/changePassword`,

                data,

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                }
            );
            runInAction(() => {
                this.isPostChangePasswordLoading = false;
            });
            notify.show('Change Password successful', 'success');
            localStorage.setItem('isFirstTimeLogin', false);
            this.getUserInformation(`${localStorage.getItem('access_token')}`);
            history.push('/dashboard');
        } catch (error) {
            // notify.show(error.response.data.message, 'error');
            notify.show('Ooops! Something went wrong', 'error');
            runInAction(() => {
                this.isPostChangePasswordLoading = false;
            });
        }
    },
    
    async postForgotPasswordData(data) {
        try {
            this.isPostForgotPasswordLoading = true;
            await axios.post(`${BASE_URL}/app/rest/v2/forgot/password`, {
                username: `${data}`,
            });
            notify.show('Reset Password Successful, Please check your Email', 'success');
            history.push('/');
            runInAction(() => {
                this.isPostForgotPasswordLoading = false;
            });
        } catch (error) {
            notify.show('Error,Please verify your email', 'error');
            runInAction(() => {
                this.isPostForgotPasswordLoading = false;
            });
        }
    },

    async getUserInformation(accessToken) {
        const getUserInfoResponse = await axios.post(
            `${BASE_URL}/app/rest/v2/services/miliki_UserParentService/getUserInfo`,
            {
                type: 'supplier',
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        try {
            localStorage.setItem('user-id', getUserInfoResponse.data.id);
            localStorage.setItem('supplier-id', getUserInfoResponse.data.supplier.id);
            localStorage.setItem('supplier-name', getUserInfoResponse.data.supplier.name);
            localStorage.setItem('technician-email', getUserInfoResponse.data.email);
            localStorage.setItem('technician-name', getUserInfoResponse.data.lastName);
            localStorage.setItem('supplier-email', getUserInfoResponse.data.email);
            localStorage.setItem('IsTechnician', getUserInfoResponse.data.isTechnician);

            console.log(' getUserInfoResponse', getUserInfoResponse);
        } catch (error) {
            console.log('Error getting user info:', error);
        }
        return getUserInfoResponse;
    },
});
