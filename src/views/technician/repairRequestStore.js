import { getCubaREST } from '@cuba-platform/react-core';
import { observable, runInAction } from 'mobx';
import { notify } from 'react-notify-toast';
import { Technician } from '../../sdk/miliki-frontend/entities/miliki_Technician';

export const technicianStore = observable({
    dataSource:[],
    techniciansLoading :false,
    async getTechnicians() {
        try {
            this.techniciansLoading = true;
            await getCubaREST().loadEntities(Technician.NAME, { view: 'technician-view' }).then((technicians) => {
               this.dataSource = technicians;
            });
        } catch (error) {
            notify.show('Error, unable to load repaire modules', "error");
        }
        runInAction(() => {
            this.techniciansLoading = false;
        })

    }
})
