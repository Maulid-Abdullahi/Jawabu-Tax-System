import React, { useState } from 'react';
import { collection, injectMainStore } from '@cuba-platform/react-core';
import { observer } from 'mobx-react';
import { Skeleton } from 'antd';
import { DataTable } from '@cuba-platform/react-ui';
import { SupplierDeviceRequisition } from '../../sdk/miliki-frontend/entities/miliki_SupplierDeviceRequisition';

const deviceRequisitionsStore = collection<SupplierDeviceRequisition>(
    SupplierDeviceRequisition.NAME,
    { view: 'supplierDeviceRequisition-view' }
);

function RequisitionedDevices(props: any) {
     if (deviceRequisitionsStore.status === 'LOADING')
         return (
             <>
                 <Skeleton active />
             </>
         );
    const fields = ['supplier', 'device', 'quantity', 'fulfilled', 'dueDate', 'status'];
     return (
         <>
             <h1>Requisitioned Devices</h1>
             <DataTable
                 dataCollection={deviceRequisitionsStore}
                 fields={fields}
                 enableFiltersOnColumns={['dueDate']}
                 rowSelectionMode='multi'
             />
         </>
     );
}

export default injectMainStore(observer(RequisitionedDevices));
