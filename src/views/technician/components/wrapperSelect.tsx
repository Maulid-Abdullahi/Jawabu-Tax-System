import React from 'react';
import { Form, Select, Input, Col, Row } from 'antd';
import { Device } from '../../../sdk/miliki-frontend/entities/miliki_Device';
import { collection, getCubaREST, instance } from '@cuba-platform/react-core';
import '../technician.scoped.scss';
import { observer } from 'mobx-react';


const dataCollection = collection<Device>(Device.NAME, {
    view: 'device-search-view',
    // sort: 'identificationNumber',
    // filter: {conditions: [{property: 'name', operator: "contains", value: 'Ro'}]},
    limit: 10,
    offset: 0,
    loadImmediately: false, // false by default
});

const deviceInstance = instance<Device>(Device.NAME, {
     view: 'device-search-view',
});
const { Option } = Select;
const { TextArea } = Input;

function WrapperSelect(props: any) {
    const { getFieldDecorator } = props.form;

    

    return (
        <Row>
            <Col span={6}>
                <div className="device-model order-number">
                    <Form.Item label=" Assign Device" required>
                        {getFieldDecorator('devicess', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Select Device',
                                },
                            ],
                        })(
                            <Select
                                size="large"
                                showSearch
                                placeholder="Search Device"
                                optionFilterProp="children"
                                onSearch={(v) => {
                                    dataCollection.filter = {
                                        conditions: [
                                            {
                                                property: 'serialNumber',
                                                operator: 'contains',
                                                value: v,
                                            },
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
                                        ],
                                    };
                                    dataCollection.load();
                                }}
                                loading={dataCollection.status === 'LOADING'}
                                onSelect={async (e: any) => {
                                    deviceInstance.item = dataCollection.items.find(
                                        (v) => v === e
                                    );
                                }}
                            >
                                {dataCollection.items.map((eve, index) => (
                                    <Option value={eve.id}>{eve['_instanceName']}</Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                </div>
            </Col>
            <Col span={9} className="checkBox">
                <TextArea
                    disabled
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    className="textarea"
                    style={{ fontWeight: 'bold' }}
                    value={
                        deviceInstance.item === undefined
                            ? ''
                            : `Manufacturer: ${JSON.stringify(
                                  deviceInstance.item?.model?.manufacturer// .name
                              )},
                                        Model Type: ${JSON.stringify(
                                            deviceInstance.item?.model?.modelType//.name
                                        )},
                                        Status: ${JSON.stringify(deviceInstance.item.status)}`
                    }
                ></TextArea>
            </Col>
        </Row>
    );
}

export default observer(WrapperSelect);
