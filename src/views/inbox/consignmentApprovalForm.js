/* eslint-disable no-useless-constructor */
import { toJS } from 'mobx';
import { notify } from 'react-notify-toast';
import { Component } from 'react';
import { Form, Input, Button,Row,Col} from 'antd';
import { fetchProcessVars } from './inboxstore';
import { getCubaREST } from '@cuba-platform/react-core';
import history from '../../helpers/routeUtils';
import './inbox.scoped.scss';
import { SupplierConsignment } from '../../sdk/miliki-frontend/entities/miliki_SupplierConsignment';
import { restServices } from '../../sdk/miliki-frontend/services';

export default class ConsignmentApprovalForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        taskId: '',
        processInstanceId: '',
        deviceQuantity: '',
        orderNumber: '',
        shipmentDate: '',
        startSerial: '',
        endSerial:'',
        status: '',
    };
    handleChange = (e) => {
        this.setState((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value],
        }));
    };
    async actualMountAsync() {
        const { processInstanceId, id, name } = toJS(this.props.history.location.state.inboxDetail);
        const processVars = await fetchProcessVars(processInstanceId);
        this.setState((prevState) => ({
            ...prevState,
            taskId: id,
            processInstanceId: processInstanceId,
            quantity: processVars.quantity,
            dueDate: processVars.dueDate,
            ticketNo: processVars.ticketNo,
        }));
            const consignment = await getCubaREST().loadEntity(
                SupplierConsignment.NAME,
                processVars.consignmentId,
                '_local'
            );
            this.setState((prevState) => ({
                ...prevState,
                orderNumber: consignment.orderNumber,
                deviceQuantity: consignment.deviceQuantity,
                shipmentDate: consignment.shipmentDate,
                startSerial: consignment.startSerial,
                status: consignment.status,
            }));
    }
    componentDidMount() {
        this.actualMountAsync();
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const commentJson = JSON.stringify({ comment: `${this.state.comment}` });
        const params = {
            processInstanceId: this.state.processInstanceId,
            taskId: this.state.taskId,
            incomingVariables: commentJson,
            outcome: 'approved',
        };
        await restServices.miliki_FrontendBprocService.completeTask(getCubaREST())(params);
        try {
            notify.show('Request Successful', 'warning', 3000);
            history.push('/inbox');
        } catch (error) {
            notify.show('An Error has occurred, try again', 'error', 3000);
        }
    };
    render() {
        return (
            <div className="consignment-view-form">
                <h3>Consignment details</h3>
                <Form
                    onSubmit={this.handleSubmit}
                    className="consignment-details"
                    layout="vertical"
                    colon={false}
                >
                    <Input type="hidden" readOnly value={this.state.taskId} />
                    <Input type="hidden" readOnly value={this.state.processInstanceId} />
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item label="Consignment Number" required>
                                <Input disabled value={this.state.orderNumber} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Consignment Name" required>
                                <Input disabled value={this.state.orderNumber} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Order Number" required>
                                <Input disabled value={this.state.orderNumber} required />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item label="Ordered Quantity" required>
                                <Input
                                    disabled
                                    value={this.state.deviceQuantity}
                                    required
                                    className="oqty"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Delivered Quantity" required>
                                <Input
                                    disabled
                                    value={this.state.deviceQuantity}
                                    required
                                    className="dqty"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Device Serial Number Range" required>
                                <div className="serial-range-container">
                                    <p> From:</p>
                                    <Input disabled value={this.state.startSerial} required />

                                    <p> To:</p>
                                    <Input
                                        disabled
                                        value={this.state.startSerial + this.state.deviceQuantity}
                                        required
                                    />
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item label="Device Model" required>
                                <Input disabled value={this.state.deviceModel} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Device Type" required>
                                <Input disabled value={this.state.deviceModel} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Status" required>
                                <Input disabled value={this.state.status} required />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="submit-btn">
                                Proceed
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        );
    }
}
