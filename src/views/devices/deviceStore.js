import { getCubaREST } from '@cuba-platform/react-core';
import { observable, runInAction, toJS} from 'mobx';
import { notify } from 'react-notify-toast';
import { Device } from '../../sdk/miliki-frontend/entities/miliki_Device';
import { DeviceModel } from '../../sdk/miliki-frontend/entities/miliki_DeviceModel';
import { DeviceType } from '../../sdk/miliki-frontend/entities/miliki_DeviceType';
import { Manufacturer } from '../../sdk/miliki-frontend/entities/miliki_Manufacturer';
import { Mno } from '../../sdk/miliki-frontend/entities/miliki_Mno';
import { Supplier } from '../../sdk/miliki-frontend/entities/miliki_Supplier';
import { restServices } from '../../sdk/miliki-frontend/services';
import history from '../../helpers/routeUtils'; 
import { SimCard } from '../../sdk/miliki-frontend/entities/miliki_SimCard';

let loadedManufacturers;
let loadedDeviceTypes;
let loadedDeviceModels;
let loadedMno;
const supplierId = localStorage.getItem('supplier-id');
export default observable({
    datasource: [],
    devicesLoading: false,
    mno: [],
    mnoLoading: false,
    suppliers: [],
    suppliersLoading: false,
    manufacturers: [],
    manufacturersLoading: false,
    manufacturerId: '',
    deviceTypeId: '',
    deviceTypes: [],
    deviceTypesLoading: false,
    deviceModels: [],
    deviceModelsLoading: false,
    supplierDeviceModels: [],
    supplierDeviceModelsLoading: false,
    transfering: false,
    requisitioningSimCard: false,
    requisitioningDevice: false,
    requestingCertification: false,
    curentlySelected: {},

    deviceInventory:[],
    simcardInventory:[],
    ticketInventory:[],

    async getAssignTicket() {
        try {
            this.devicesLoading = true;
            const loadedDevices = await getCubaREST().searchEntities(Device.NAME,{
                "conditions": [
                    {
                        "property": "currentOwner.id",
                        "operator": "=",
                        "value": `${localStorage.getItem('supplier-id')}`
                    },
                ]
            },{ view: 'device-inventory-view' });
            runInAction(() => {
                this.devicesLoading = false;
            })
           // console.log('loadedDevices',loadedDevices);
            this.ticketInventory = loadedDevices;
        } catch (error) {
            notify.show('Error, unable to load devices', "error");
            this.devicesLoading = false;
        }
    },

    async getDevices() {
        try {
            this.devicesLoading = true;
            const loadedDevices = await getCubaREST().searchEntities(Device.NAME,{
                "conditions": [
                    {
                        "property": "currentOwner.id",
                        "operator": "=",
                        "value": `${localStorage.getItem('supplier-id')}`
                    },
                ]
            },{ view: 'device-inventory-view' });
            runInAction(() => {
                this.devicesLoading = false;
            })
            this.deviceInventory = loadedDevices;
        } catch (error) {
            notify.show('Error, unable to load devices', "error");
            this.devicesLoading = false;
        }
    },

    async getSimcards() {
        try {
            this.devicesLoading = true;
            const loadedSimcard = await getCubaREST().loadEntities(SimCard.NAME,{view: 'simCard-inventory-view' });
            runInAction(() => {
                this.devicesLoading = false;
            })
            this.simcardInventory = loadedSimcard;
        } catch (error) {
            notify.show('Error, unable to load simcards', "error");
            this.devicesLoading = false;
        }
    },



   
    async getDevicesToTransfer(modelId) {
        try {
            this.devicesLoading = true;
            const loadedDevices = await getCubaREST().searchEntities(Device.NAME, {
                "conditions": [
                    {
                        "property": "currentOwner.id",
                        "operator": "=",
                        "value": `${localStorage.getItem('supplier-id')}`
                    },
                    {
                        "property": "status",
                        "operator": "=",
                        "value": "INACTIVE"
                    },
                    {
                        "property": "model.id",
                        "operator": "=",
                        "value": `${modelId}`
                    }
                ]
            } ,{ view: 'device-view-trader' });
            runInAction(() => {
                this.devicesLoading = false;
            })
            this.datasource = loadedDevices;
        } catch (error) {
            notify.show('Error, unable to load devices', "error");
            this.devicesLoading = false;
        }
    },
    async getSuppliers() {
        try {
            this.suppliersLoading = true;
            const loadedSuppliers = await getCubaREST().loadEntities(Supplier.NAME, { view: 'supplier-view' });
            runInAction(() => {
                this.suppliersLoading = false;
            })
            this.suppliers = loadedSuppliers;
        } catch (error) {
            notify.show('Error, unable to load Suppliers', "error");
        }
    },
    async getManufacturers() {
        try {
            this.manufacturersLoading = true;
           loadedManufacturers = await getCubaREST().loadEntities(Manufacturer.NAME, { view: 'manufacturer-view' });
            runInAction(() => {
                this.manufacturersLoading = false;
            })
            this.manufacturers = loadedManufacturers;
            return loadedManufacturers;
        } catch (error) {
            notify.show('Error, unable to load Manufacturers', "error");
            runInAction(() => {
                this.manufacturersLoading = false;
            })
        }
    },
    async getDeviceTypes() {
        try {
            this.deviceTypesLoading = true;
            loadedDeviceTypes = await getCubaREST().loadEntities(DeviceType.NAME, { view: '_local' });
            runInAction(() => {
                this.deviceTypesLoading = false;
            })
            this.deviceTypes = loadedDeviceTypes;
            return loadedDeviceTypes;
        } catch (error) {
            notify.show('Error, unable to load Device Types', "error");
            runInAction(() => {
                this.deviceTypesLoading = false;
            })
        }
    },

    setManufacturerId(id) {
        this.manufacturerId = id;
        this.getDeviceTypes();
    },
    setDeviceTypeId(id) {
        this.deviceTypeId = id; 
        this.getDeviceModels();
     
    },
    async getDeviceModels() {
        try {
            this.deviceModelsLoading = true;
            // TODO to remove or group condition to only approved
            loadedDeviceModels = await getCubaREST().searchEntities(DeviceModel.NAME, {
                "conditions": [
                    {
                        "property": "manufacturer.id",
                        "operator": "=",
                        "value": `${this.manufacturerId}`
                    },
                    {
                        "property": "modelType.id",
                        "operator": "=",
                        "value": `${this.deviceTypeId }`
                    },
                    {
                        "group": "OR",
                        "conditions": [
                            {
                                "property": "status",
                                "operator": "=",
                                "value": "APPROVED"
                            },
                            {
                                "property": "status",
                                "operator": "=",
                                "value": "IN_PROGRESS"
                            }
                        ]
                    }
                ]
            }, { view: 'deviceModel-view' });
            this.deviceModels = loadedDeviceModels;
            runInAction(() => {
                this.deviceModelsLoading = false;
            })
            
        } catch (error) {
            notify.show('Error, unable to load Device Models', "error");
            runInAction(() => {
                this.deviceModelsLoading = false;
            })
        }
    },
    async getSupplierDeviceModels() {
        try {
            this.supplierDeviceModelsLoading = true;
            const loadedSupplierDeviceModels = await getCubaREST().loadEntity(Supplier.NAME,supplierId, { view: 'supplier-view-models' });
            runInAction(() => {
                this.supplierDeviceModelsLoading = false;
            })
            this.supplierDeviceModels = loadedSupplierDeviceModels.deviceModels;
        } catch (error) {
            runInAction(() => {
                this.supplierDeviceModelsLoading = false;
            })
        }
    },
    async requestModelCertification(supplierId, deviceModel,props) {
        try {
            this.requestingCertification = true;
            const params = {
                wrapper: {
                    supplierId: `${supplierId}`,
                    modelId: `${deviceModel}`
                }
            }
            await restServices.miliki_SupplierService.requestModelCertification(getCubaREST())(params);
            runInAction(() => {
                this.requestingCertification = false;
            })
            notify.show('Supplier Device Certification Successful', "success", 3000);
            props.form.resetFields();
        } catch (error) {
            notify.show('Supplier Device Certification Error', "error", 3000);
            console.error(error);
            runInAction(() => {
                this.requestingCertification = false;
            })
        }
      
    },
    async getMno() {
        try {
            this.mnoLoading = true;
            loadedMno = await getCubaREST().searchEntities(Mno.NAME,{
                "conditions": [
                    {
                        "property":"status",
                        "operator": "=",
                        "value": "APPROVED"
                    }
                ]
            },{ view: 'mno-view' });
            this.mno = loadedMno;
            runInAction(() => {
                this.mnoLoading = false;
            })
        } catch (error) {
            notify.show('Error, unable to load Mobile Network Operators', "error");
            runInAction(() => {
                this.mnoLoading = false;
            })
        } 
    },
    async requisitionSimCard(mno, quantity, requestDate) {
        try {
            this.requisitioningSimCard = true;
            const params = {
                processKey: 'supplier-sim-requisition',
                incomingVariables: `{\"mno\":${mno},\"qty\":${quantity}, \"requestDate\":${requestDate}}`
            }
            await restServices.miliki_FrontendBprocService.startProcessByKey(getCubaREST())(params);
            notify.show('Sim Card requisition successful', 'success', 3000);
            runInAction(() => {
                this.requisitioningSimCard = false;
                history.push("/simcardSuccess");
                
            })
        } catch (error) {
            notify.show('An Error has occurred', 'error', 3000);
            runInAction(() => {
                this.requisitioningSimCard = false;
            })
        }
        
    },
    async requisitionDevice(quantity, deviceModel,date) {
        try {
            this.requisitioningDevice = true;
            const params = {
                processKey: 'supplier-device-importation',
                incomingVariables: `{\"quantity\":${quantity},\"dueDate\":${date}, \"deviceModel\":${deviceModel}}`
            }
            const requisitionRequest = await restServices.miliki_FrontendBprocService.startProcessByKey(getCubaREST())(params);
            runInAction(() => {
                this.requisitioningDevice = false;
            })
            const requisitionRequestJson = JSON.parse(requisitionRequest);
            localStorage.setItem('requisition-key', requisitionRequestJson.businessKey)
            notify.show('Device Requisition Success', "success", 3000);
            history.push('/okay');
        } catch (error) {
            notify.show('An Error has occurred', 'error', 3000);
            runInAction(() => {
                this.requisitioningDevice = false;
            })
        }
    },
    async transferDevice(dataToSend) {
        try {
            this.transfering = true;
            const params = {
                processKey: 'new-device-transfer',
                incomingVariables: {
                    'json': dataToSend,
                }
            }
            await restServices.miliki_FrontendBprocService.startProcessByKey(getCubaREST())(params);
            notify.show('Transfer Successful', 'success', 3000);
            runInAction(() => {
                this.transfering = false;
            })
            history.push('/inbox');
        } catch (error) {
            notify.show('An Error has occurred', 'error', 3000);
            runInAction(() => {
                this.transfering = false;
            })
        }
    }
})
