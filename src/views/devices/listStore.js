import { getCubaREST } from '@cuba-platform/react-core';
import { observable, runInAction,toJS } from 'mobx';
import { notify } from 'react-notify-toast';
import { SimCard } from '../../sdk/miliki-frontend/entities/miliki_SimCard';



export const SimcardStore = observable({
    loadedSimcards: [],
    isSimcardsLoading: false,
    
    async fetchSimcards() {
        try {
            this.isSimcardsLoading = true;
            const loadedSimcards = await getCubaREST().searchEntities(SimCard.NAME, {
                // "conditions": [
                //     {
                //         "property":"status",
                //         "operator": "=",
                //         "value": "INACTIVE"
                //     },
                //     {
                //         "property":"currentOwner.id",
                //         "operator": "=",
                //         "value": `${localStorage.getItem('supplier-id')}`
                //     },
                //     {
                //         "property":"serialNumber",
                //         "operator": "startsWith",
                //         "value": `${serialNumber}`
                //     }
                // ]
            } ,{ view: 'device-search-view' });
            runInAction(() => {
                this.isSimcardsLoading = false;
            })
          
            this.loadedSimcards = loadedSimcards;
        } catch (err) {
            notify.show('Error, unable to load simcards', "error");
            this.isSimcardsLoading = false;
        }
       
    },
})


