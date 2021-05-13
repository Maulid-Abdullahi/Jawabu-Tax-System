import React, { useState } from 'react';
import { collection, injectMainStore } from '@cuba-platform/react-core';
import { observer } from 'mobx-react';
import { Skeleton } from 'antd';
import { DataTable } from '@cuba-platform/react-ui';
import { SupplierSimRequisition } from '../../sdk/miliki-frontend/entities/miliki_SupplierSimRequisition';

const simRequisitionStore = collection<SupplierSimRequisition>(SupplierSimRequisition.NAME, {
    view: '_local',
});

function RequisitionedSimCards(props: any) {
     if (simRequisitionStore.status === 'LOADING')
         return (
             <>
                 <Skeleton active />
             </>
         );
      const fields = ['supplier', 'simCards', 'status', 'mno', 'quantity', 'requestDate','comment'];
    return (
        <>
            <h1>Requisitioned Sim Cards</h1>
            <DataTable
                dataCollection={simRequisitionStore}
                fields={fields}
                enableFiltersOnColumns={['requestDate']}
                rowSelectionMode="multi"
            />
        </>
    );
}

export default injectMainStore(observer(RequisitionedSimCards));
