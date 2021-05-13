import { observer, observe } from 'mobx-react';
import React, { Component } from 'react';
import { Form, Input, Button, Select, Icon, Row, Col, DatePicker } from 'antd';
import deviceStore from './deviceStore';
import './devices.scoped.scss';
import { collection, getCubaREST, instance } from '@cuba-platform/react-core';
import { Supplier } from '../../sdk/miliki-frontend/entities/miliki_Supplier';
import { toJS } from 'mobx';

const supplierId = localStorage.getItem('supplier-id');
let detailsData = {}

// const dataCollection = collection(Supplier.NAME, supplierId, {
//     view: 'supplier-view-models',
//     limit: 10,
//     offset: 0,
//     loadImmediately: false,
// });

const deviceInstance = instance(Supplier.NAME, {
    view: 'supplier-view-models',
});
const { Option } = Select;
const { TextArea } = Input;

class DeviceRequisition extends Component {

     state = {
        isModelSelected : true
    }

    componentDidMount() {
        deviceStore.getSupplierDeviceModels();
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, { quantity, deviceModel }) => {
            if (!err) {
                const date = '17-02-2021';
                deviceStore.requisitionDevice(quantity, deviceModel, date);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        function onBlur() {
            console.log('blur');
        }

        function onFocus() {
            console.log('focus');
        }
        function onSearch(val) {
            console.log('search:', val);
        }
        return (
            <div>
                <h1>Device Requisition</h1>
                <h3>Device Details</h3>
                <Form onSubmit={this.handleSubmit} colon={false}>
                    <Row gutter={[16, 16]} type="flex" align="middle">
                        <Col span={8}>
                            <Form.Item label="Device Model" required hasFeedback>
                                {getFieldDecorator('deviceModel', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please select the device Model',
                                        },
                                    ],
                                })(
                                    <Select
                                        placeholder="Select Device Model"
                                        showSearch
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch}
                                        loading={deviceStore.supplierDeviceModelsLoading}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                        onSelect={async (e) => {
                                            deviceInstance.item = deviceStore.supplierDeviceModels.map(
                                                (v) => Object.assign(detailsData, v)
                                            );
                                            this.setState({
                                                isModelSelected:false
                                            })
                                            
                                        }}
                                    >
                                        {deviceStore.supplierDeviceModels !== undefined &&
                                        deviceStore.supplierDeviceModels !== 0 ? (
                                            deviceStore.supplierDeviceModels.map(
                                                (element, index) => {
                                                    return (
                                                        <Option key={index} value={element.id}>
                                                            {element.name}
                                                        </Option>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <Option value="">Not Available</Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Quantity" hasFeedback>
                                {getFieldDecorator('quantity', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter the device quantity',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="number"
                                                style={{ color: 'rgba(0,0,0,.25)' }}
                                            />
                                        }
                                        type="number"
                                        placeholder="e.g 5000"
                                        min="1"
                                        oninput="this.value = 
                                    !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                  { this.state.isModelSelected  ? '' :
                    <Col span={8}>
                    <div>
                        <h5>Manufacturer : {detailsData.manufacturer?.name}</h5>
                        <h5>Model Name : {detailsData?.name}</h5>
                        <h5>Model Type : {detailsData.modelType?.name}</h5>
                    </div>
                </Col>}
                    </Row>

                    <Row gutter={[16, 16]} className="new-submit">
                        <Col span={8} />
                        <Col span={8}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ float: 'right', margin: '0' }}
                                loading={deviceStore.requisitioningDevice}
                            >
                                Request
                            </Button>
                        </Col>
                        <Col span={8} />
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'device_requisition' })(observer(DeviceRequisition));
