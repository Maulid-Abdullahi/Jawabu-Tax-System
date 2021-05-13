import { observable, runInAction } from 'mobx';
import { BASE_URL } from '../../configs';
import axios from 'axios';
import history from '../../helpers/routeUtils';
import { notify } from 'react-notify-toast';
import { Device } from '../../sdk/miliki-frontend/entities/miliki_Device';
import { SimCard } from '../../sdk/miliki-frontend/entities/miliki_SimCard';
import { getCubaREST } from '@cuba-platform/react-core';

export const traderStore = observable({
    vatNumberResponse: [],
    addContactData: false,
    isSearchLoading: false,
    IsaddDeviceSimcardData: false,
    addedDeviceSimcardData: [],

    addContact(value) {
        try {
            console.log('ututuu', value);
            traderStore.addContactData = true;
            runInAction(() => {
                this.vatNumberResponse.contactPersons.push(value);
            });
        } catch (e) {
            notify.show('Error, Please search VAT or PIN', 'error');
        }
        runInAction(() => {
            traderStore.addContactData = false;
        });
    },

    addDeviceSimcard(value) {
        try {
            console.log('ututuu', value);
            traderStore.IsaddDeviceSimcardData = true;
            runInAction(() => {
                this.addedDeviceSimcardData.push(value);
            });
        } catch (e) {
            notify.show('Error', 'error');
        }
        runInAction(() => {
            traderStore.IsaddDeviceSimcardData = false;
        });
    },

    setVatNumberResponse(vatNumberResponse) {
        runInAction(() => {
            this.vatNumberResponse = vatNumberResponse;
        });
    },

    async searchByVatNumber(value) {
        try {
            this.isSearchLoading = true;
            const vatNumberResponse = await searchTraderByVatNo(value);
            console.log('*****', vatNumberResponse);
            this.setVatNumberResponse(vatNumberResponse);
            runInAction(() => {
                this.isSearchLoading = false;
            });
            return {
                id: vatNumberResponse.id,
                tin: vatNumberResponse.tin,
                phone: vatNumberResponse.phone,
                email: vatNumberResponse.email,
                region: vatNumberResponse.taxRegion.name,
                regionid: vatNumberResponse.taxRegion.id,
                website: vatNumberResponse.websiteUrl,
                location: vatNumberResponse.location,
                name: vatNumberResponse.name,
                physicalAddress: vatNumberResponse.physicalAddress,
            };
        } catch (e) {
            notify.show('Error, Please search correct VAT or PIN', 'error');
        }
    },
});

export const deviceStore = observable({
    isSubmittingLoading: false,

    isTaxRegionLoading: false,
    isNewTaxRegion: false,
    taxRegions: [],

    isDevicesLoading: false,
    devices: [],
    selectedDevice: -1,

    isSimcardsLoading: false,
    value: '',
    simcards: [],
    selectedSimcard: -1,

    onNewTaxRegion(v) {
        console.log('Changed tax region' + v.target.checked);
        console.log(this);
        this.isNewTaxRegion = v.target.checked;
    },

    setSelectedDevice(device) {
        try {
            this.isDevicesLoading = true;
            runInAction(() => {
                this.selectedDevice = device;
                this.isDevicesLoading = false;
            });
        } catch (e) {
            notify.show('Error, unable to load devices', 'error');
        }
    },

    setSelectedSimcard(simcard) {
        runInAction(() => {
            this.selectedSimcard = simcard;
        });
    },

    async fetchDevices(serialNumber) {
        try {
            this.isDevicesLoading = true;
            const loadedDevices = await getCubaREST().searchEntities(
                Device.NAME,
                {
                    conditions: [
                        {
                            property: 'status',
                            operator: '=',
                            value: 'INACTIVE',
                        },
                        {
                            property: 'currentOwner.id',
                            operator: '=',
                            value: `${localStorage.getItem('supplier-id')}`,
                        },
                        {
                            property: 'serialNumber',
                            operator: 'startsWith',
                            value: `${serialNumber}`,
                        },
                    ],
                },
                { view: 'device-search-view' }
            );
            runInAction(() => {
                this.isDevicesLoading = false;
            });

            this.devices = loadedDevices;
        } catch (err) {
            notify.show('Error, unable to load devices', 'error');
            this.isDevicesLoading = false;
        }
    },

    async fetchSimcards(imsi) {
        try {
            this.isSimcardsLoading = true;
            const loadedSimcards = await getCubaREST().searchEntities(
                SimCard.NAME,
                {
                    conditions: [
                        {
                            property: 'status',
                            operator: '=',
                            value: 'INACTIVE',
                        },
                        {
                            property: 'imsi',
                            operator: 'startsWith',
                            value: `${imsi}`,
                        },
                    ],
                },
                { view: 'simCard-search-view' }
            );
            runInAction(() => {
                this.isSimcardsLoading = false;
            });
            this.simcards = loadedSimcards;
        } catch (error) {
            notify.show('Error, unable to load simcards', 'error');
            // this.isSimcardsLoading = false;
        }
    },

    async fetchTaxRegions() {
        this.isTaxRegionLoading = true;
        const taxRegionsResponse = await fetchTaxRegions();
        runInAction(() => {
            this.taxRegions = taxRegionsResponse.data;
            this.isTaxRegionLoading = false;
        });
    },
});

export const columns = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
];

export const column2 = [
    // {
    //     title: 'Network',
    //     dataIndex: 'simcards.mno',
    //     key: 'simcards.mno',
    // },
    // {
    //     title: 'Model Type',
    //     dataIndex: 'devices.model.modelType.name',
    //     key: 'devices.model.modelType.name',
    // },
    {
        title: 'Serial Number',
        dataIndex: 'devices.serialNumber',
        key: 'devices.serialNumber',
    },
    {
        title: 'Phone Number',
        dataIndex: 'simcards.phoneNumber',
        key: 'simcards.phoneNumber',
    },
    {
        title: 'Simcard',
        dataIndex: 'simcards.imsi',
        key: 'simcards.imsi',
    },
    {
        title: 'Tax Regions',
        dataIndex: 'Regions.name',
        key: 'Regions.name',
    },
];

export const addContactDetails = observable({
    isContactDetailsLoading: false,
    contacts: [],
    selectedContact: {},

    async fetchContactDetails() {
        this.isContactDetailsLoading = true;
        this.contacts = await fetchContactDetails();
        runInAction(() => {
            this.isContactDetailsLoading = false;
        });
    },
    onViewItem(itemData) {
        this.selectedContact = itemData;
    },
});
async function fetchTaxRegions() {
    const token = localStorage.getItem('access_token');

    const resp = await axios.get(`${BASE_URL}/app/rest/v2/entities/miliki_TaxRegion`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // console.log(resp);
    return resp;
}

async function fetchContactDetails() {
    const token = localStorage.getItem('access_token');

    const trResp = await axios.get(
        `${BASE_URL}/app/rest/v2/entities/miliki_Trader?view=trader-view`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return trResp.data[0].contactPersons;
}
async function searchTraderByVatNo(vatNo) {
    try {
        traderStore.isSearchLoading = true;
        const token = localStorage.getItem('access_token');
        // console.log('Searching trader', vatNo);
        const response = await axios.get(
            `${BASE_URL}/app/rest/v2/services/miliki_TraderService/getTraderByTin?vatNo=` + vatNo,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log('responses++', response.data.data);
        return response.data.data;
    } catch (ex) {
        notify.show('Error, Please check your connection', 'error');
    }
    runInAction = () => {
        traderStore.isSearchLoading = false;
    };
}
function refreshPage() {
    window.location.reload();
}

export async function postData(values) {
    const devices = Array.from(traderStore.addedDeviceSimcardData, (data) => {
        var request = {
            device: {
                id: data?.devices?.id,
            },
            simCard: {
                id: data?.simcards?.id,
            },
            taxRegion: {
                id: `${data?.Regions?.id == undefined  ? values.regionid : data.Regions.id}`,
            },
        };

        return request;
    });
    const data = {
        trader: {
            id: values.taxpayerid,
            name: values.businessname,
            tin: values.tin,
            vatNo: values.vatNo,
            email: values.email,
            phone: values.phone,
            websiteUrl: values.website,
            physicalAddress: values.physicalAddress,
            location: values.location,

            taxRegion: {
                id: values.regionid,
            },
            contactPersons: traderStore.vatNumberResponse.contactPersons,
        },
        deviceDetails: devices,
        supplier:{
            id:`${localStorage.getItem("supplier-id")}`
        }
    };

    var d = JSON.stringify(data);

    try {
        deviceStore.isSubmittingLoading = true;
        const token = localStorage.getItem('access_token');
        const devResp = await axios.post(
            `${BASE_URL}/app/rest/v2/services/miliki_FrontendBprocService/startProcessByKey`,
            {
                processKey: 'new-trader-onboarding',
                incomingVariables: {
                    json: d,
                },
            },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('post trader data', devResp);

        history.push('/success');
        refreshPage();
    } catch (error) {
        notify.show(error.response.data.message, 'error');
    }
    runInAction(() => {
        deviceStore.isSubmittingLoading = false;
    });
}
