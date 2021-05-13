/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { Form, Button, Select, Row, Col } from 'antd';
import './devices.scoped.scss';
import { observer } from 'mobx-react';
import deviceStore from './deviceStore';

const { Option } = Select;
const supplierId = localStorage.getItem('supplier-id');
class DeviceCertification extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        deviceStore.getManufacturers();
        deviceStore.getDeviceTypes();
    }
    state = {
        deviceModel: ''
    }
    handleDeviceModelChange = (value) => {
        this.setState({ deviceModel: value });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                deviceStore.requestModelCertification(supplierId, this.state.deviceModel, this.props);
            }
            this.setState({ deviceModel: '' });
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <h1>Device Model Certification</h1>
                <h3  >Device Details</h3>
                <Form onSubmit={this.handleSubmit} colon={false}>
                    <Row gutter={[16, 16]} type="flex" align="middle">
                        <Col span={8}>
                            <Form.Item label="Manufacturer" required hasFeedback>
                                {getFieldDecorator(
                                    'manufacturer',
                                    {}
                                )(
                                    <Select
                                        placeholder="Select Device Manufacturer"
                                        className="select"
                                        loading={deviceStore.manufacturersLoading}
                                        onSelect={(id) => {
                                            deviceStore.setManufacturerId(id);
                                        }}
                                    >
                                        {deviceStore.manufacturers !== undefined &&
                                            deviceStore.manufacturers !== 0 ? (
                                                deviceStore.manufacturers.map((element, index) => {
                                                    return (
                                                        <Option key={index} value={element.id}>
                                                            {element.name}
                                                        </Option>
                                                    );
                                                })
                                            ) : (
                                                <Option value="">Not Available</Option>
                                            )}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Device Type" required hasFeedback>
                                {getFieldDecorator(
                                    'deviceType',
                                    {}
                                )(
                                    <Select
                                        placeholder="Select Device Type"
                                        className="select"
                                        loading={deviceStore.deviceTypesLoading}
                                        onSelect={(id) => {
                                            deviceStore.setDeviceTypeId(id);
                                            this.setState({ deviceModel: '' })
                                        }}
                                    >
                                        {deviceStore.deviceTypes !== undefined &&
                                            deviceStore.deviceTypes !== 0 ? (
                                                deviceStore.deviceTypes.map((element, index) => {
                                                    return (
                                                        <Option key={index} value={element.id}>
                                                            {element.name}
                                                        </Option>
                                                    );
                                                })
                                            ) : (
                                                <Option value="">Not Available</Option>
                                            )}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Device Model" required>
                                <Select
                                    placeholder="Select Device Model"
                                    className="select"
                                    loading={deviceStore.deviceModelsLoading}
                                    value={this.state.deviceModel}
                                    onChange={this.handleDeviceModelChange}
                                    required
                                >
                                    {deviceStore.deviceModels !== undefined &&
                                        deviceStore.deviceModels !== 0 ? (
                                            deviceStore.deviceModels.map((element, index) => {
                                                return (
                                                    <Option key={index} value={element.id} required>
                                                        {element.name}
                                                    </Option>
                                                );
                                            })
                                        ) : (
                                            <Option value="">Not Available</Option>
                                        )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="certify-submit">
                        <Button
                            type="primary"
                            variant="contained"
                            htmlType="submit"
                            loading={deviceStore.requestingCertification}
                            disabled={deviceStore.requestingCertification}
                        >
                            Request
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default Form.create({ name: 'device_certification' })(observer(DeviceCertification));
