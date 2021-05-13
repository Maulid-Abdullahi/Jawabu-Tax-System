import { getCubaREST } from '@cuba-platform/react-core';
import { observable, runInAction,toJS } from 'mobx';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { BASE_URL } from '../../configs';
import history from '../../helpers/routeUtils';
import { restServices } from '../../sdk/miliki-frontend/services';
import { Technician } from '../../sdk/miliki-frontend/entities/miliki_Technician';
import { TechnicianRegistrationFiles } from '../../sdk/miliki-frontend/entities/miliki_TechnicianRegistrationFiles';

const token = localStorage.getItem('access_token');
let fileResponse;
let technicianOnboardResponse;
let regFilesResponse;

function refreshPage() {
    window.location.reload();
}

export const technicianStore = observable({
    dataSource: [],
    technicianRegistrationFiles: [],
    techniciansLoading :false,

    uploadedFiles: [],
    

    async getTechnicians() {
        try {
            this.techniciansLoading = true;
            await getCubaREST().loadEntities(Technician.NAME, { view: 'technician-view' }).then((technicians) => {
               this.dataSource = technicians;
            });
        } catch (error) {
            notify.show('Error, unable to load technicians', "error");
        }
        runInAction(() => {
            this.techniciansLoading = false;
        })

    },
    async onboardTechnician(dataToSend) {
        try {
            this.transfering = true;
            const params = {
                processKey: 'new-technician-onboarding',
                incomingVariables: {
                    'json': dataToSend,
                }
            }
            technicianOnboardResponse = await restServices.miliki_FrontendBprocService.startProcessByKey(getCubaREST())(params);
            localStorage.removeItem('file-id');
            notify.show('Technician Onboarded succesfully', "success", 3000);
            history.push('/technician/technicians');
            refreshPage();

        } catch (error) {
            notify.show('Failed to onboard Technician,Kindly check if Technician exist', 'error', 3000);
        }
    }, 
    async getTechnicianRegistrationFiles() {
        try {
            regFilesResponse = await getCubaREST().loadEntities(TechnicianRegistrationFiles.NAME, { view: '_base' })
            this.technicianRegistrationFiles = regFilesResponse;
            console.log('reg files>>>>>>',toJS(this.technicianRegistrationFiles.type) );
        } catch (error) {
            notify.show('Unable to get registration files', 'error', 1000);
        }
    }
})
