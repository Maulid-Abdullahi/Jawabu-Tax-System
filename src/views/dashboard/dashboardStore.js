import { runInAction } from 'mobx';
import axios from 'axios';
import { BASE_URL } from '../../configs';

const token = localStorage.getItem('access_token');
export class DashboardStore {
    constructor() {
       // makeAutoObservable(this);
    }

    isUserDetailsLoading = false;

    userDetails = [];

    userInfo = [];

    fetchUserInfo = async () => {
        this.isUserDetailsLoading = true;
        const response = await this.apiFetchUserInfo();
        this.userInfo = response.data;
        runInAction(() => {
            this.isUserDetailsLoading = false;
        });
    };

    apiFetchUserInfo = async () => {
        const response = await axios.post(
            `${BASE_URL}/app/rest/v2/services/miliki_UserParentService/getUserInfo`,
            { type: 'trader' },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    };
}
export const dashboardStore = new DashboardStore();
