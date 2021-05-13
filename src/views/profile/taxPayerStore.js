import { observable, runInAction, toJS } from 'mobx';
import { BASE_URL } from '../../configs';
import axios from 'axios';
import history from '../../helpers/routeUtils';
import { notify } from 'react-notify-toast';

export const taxPayerStore = observable({
    loggedInTaxPayerDetails: [],
    editFormField: false,
    isTaxPayerDetailsLoading: true,
    
    TechData:{},

    // async getData() {
    //     this.isTaxPayerDetailsLoading = true;
    //     const userData = await userDetails();
    //     if (userData.isTechnician === true) {
    //         console.log(userData);
    //         this.TechData = userData;
           
    //     }
      
    //     return userData.supplier;
       
    // },
    

    async getDataDetails() {
        try {
            this.isTaxPayerDetailsLoading = true;
            this.TechData = await userDetails();
            console.log(toJS(this.TechData));

            runInAction(() => {
                this.isTaxPayerDetailsLoading = false;
            });
            
        } catch (error) {
            notify.show('Error, unable to load user details', 'error');
            runInAction(() => {
                this.isTaxPayerDetailsLoading = false;
            });
        }
    },
});

async function userDetails() {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(
        `${BASE_URL}/app/rest/v2/services/miliki_UserParentService/getUserInfo`,
            { type:'supplier'},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}
