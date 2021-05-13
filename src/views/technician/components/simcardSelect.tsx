import React from 'react';
import { Form, Select, Input, Col,Row } from 'antd';
import { SimCard } from '../../../sdk/miliki-frontend/entities/miliki_SimCard';
import { collection, getCubaREST, instance } from '@cuba-platform/react-core';
import { observer } from 'mobx-react';
import '../technician.scoped.scss';
import { deviceStore } from '../traderOnboardingStore';
import cubaREST from '../../../cuba';

const dataCollection = collection<SimCard>(SimCard.NAME, {
    view: 'simCard-search-view',
    limit: 10,
    offset: 0,
    loadImmediately: false, // false by default
});
const simcardInstance = instance<SimCard>(SimCard.NAME, {
     //view: 'simCard-search-view',
});
const { Option } = Select;
const { TextArea } = Input;



function SimcardSelect(props: any) {
    const { getFieldDecorator } = props.form;

    return (
        <Row>
        <Col span={6}>
            <div className="device-model order-number">
        <Form.Item label=" Assign Simcard" required>
            {getFieldDecorator('simcards', {
                rules: [
                    {
                        required: true,
                        message: 'Select Simcard',
                    },
                ],
            })(
                <Select
                    size="large"
                    showSearch
                    placeholder="Search Simcard"
                    optionFilterProp="children"
                    onSearch={(v) => {
                        dataCollection.filter = {
                            conditions: [
                                {
                                    property: 'status',
                                    operator: '=',
                                    value: 'INACTIVE',
                                },
                                
                            ],
                        };
                        dataCollection.load();
                    }}
                    loading={dataCollection.status === 'LOADING'}
                    onSelect={async (e: any) => {
                        simcardInstance.item = dataCollection.items.find((v) => v.id === e);
                    }}
                >
                    {dataCollection.items.map((eve, index) => (
                        <Option value={eve.id}>{eve['imsi']}</Option>
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
                style = {{fontWeight:'bold'}}
                value={
                    simcardInstance.item === undefined
                        ? ''
                        : `Imsi: ${JSON.stringify(
                              simcardInstance.item.imsi
                          )},
                                        Phone Number: ${JSON.stringify(
                                            simcardInstance.item.phoneNumber
                                        )},
                                        Status: ${JSON.stringify(simcardInstance.item.status)}`
                }
            ></TextArea>
             </Col>
        </Row>
        
    );
}

export default observer(SimcardSelect);
