import React, { useState } from 'react';
import './devices.scoped.scss';
import { collection, injectMainStore } from '@cuba-platform/react-core';
import { Device } from '../../sdk/miliki-frontend/entities/miliki_Device';
import { observer } from 'mobx-react';
import { Spin } from 'antd';
import { DataTable } from '@cuba-platform/react-ui';
import { DeviceModel } from '../../sdk/miliki-frontend/entities/miliki_DeviceModel';

const deviceStore = collection<Device>(Device.NAME, { view: '_local'});

function DeviceTransfer(props: any) {
  const fields = ['serialNumber', 'status'];
  if (deviceStore.status === 'LOADING') return (<><Spin/></>);

  return (
      <>
          <DataTable
              dataCollection={deviceStore}
        fields={fields}
              enableFiltersOnColumns={['serialNumber']}
          />
      </>
  );
}

export default injectMainStore(observer(DeviceTransfer));
