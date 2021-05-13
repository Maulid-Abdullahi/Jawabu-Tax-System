/* eslint-disable no-useless-constructor */
import { toJS } from 'mobx';
import { notify } from 'react-notify-toast';
import { Component } from 'react';
import { Form, Input, Button, Radio,Row,Col,Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { fetchProcessVars } from './inboxstore';
import { getCubaREST } from '@cuba-platform/react-core';
import history from '../../helpers/routeUtils';
import './inbox.scoped.scss';
import { SupplierConsignment } from '../../sdk/miliki-frontend/entities/miliki_SupplierConsignment';
import { restServices } from '../../sdk/miliki-frontend/services';
import axios from 'axios';
import { BASE_URL } from '../../configs';
import { DeviceTransferRequest } from '../../sdk/miliki-frontend/entities/miliki_DeviceTransferRequest';

const token = localStorage.getItem('access_token');
export default class ApproveTransferForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        taskId: '',
        processInstanceId: '',
        from: '',
        to: '',
        status: '',
        checked: '',
        quantity:'',
        devices:[]
    };
    handleChange = (e) => {
        this.setState((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value],
        }));
    };
    onChecked = (e) => {
        this.setState({
            checked: e.target.value,
        });
    };
    async actualMountAsync() {
        const { processInstanceId, id, name } = toJS(this.props.history.location.state.inboxDetail);
        const processVars = await fetchProcessVars(processInstanceId);
        this.setState((prevState) => ({
            ...prevState,
            taskId: id,
            processInstanceId: processInstanceId,
        }));
        const transfer = await getCubaREST().loadEntity(
            DeviceTransferRequest.NAME,
            processVars.transferId,
            {view:'deviceTransferRequest-view'}
        );
        console.log(transfer.devices);
        this.setState((prevState) => ({
            ...prevState,
            from: transfer.from.name,
            to: transfer.to.name,
            status: transfer.status,
            quantity:transfer.totalDevices,
            devices: transfer.devices
        }));
    }
    componentDidMount() {
        this.actualMountAsync();
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const commentJson = JSON.stringify({ comment: `${this.state.comment}` });
        console.log('Comment',commentJson);
        const params = {
            processInstanceId: this.state.processInstanceId,
            taskId: this.state.taskId,
            incomingVariables: commentJson,
            outcome: this.state.checked,
        };
        await restServices.miliki_FrontendBprocService.completeTask(getCubaREST())(params);
        try {
            if (this.state.checked === 'approve') {
                notify.show('Transfer Approved Successfully', 'success', 3000);
            }
            notify.show('Action will be reviewed', 'warning', 3000);
            history.push('/inbox');
        } catch (error) {
            notify.show('An Error has occurred, try again', 'error', 3000);
        }
    };
    columns = [
        {
            title: 'Serial Number',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
        },
        {
            title: 'Device class',
            dataIndex: 'consignment.requisition.device.modelType.name',
            key: 'consignment.requisition.device.modelType.name',
        },
        {
            title: 'Device Model',
            dataIndex: 'consignment.requisition.device.name',
            key: 'consignment.requisition.device.name',
        },
        {
            title: 'Manufacturer',
            dataIndex: 'currentOwner.name',
            key: 'currentOwner.name',
        }
       
    ]
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className="consignment-view-form">
                <h3>Transfer details</h3>
                <Form
                    onSubmit={this.handleSubmit}
                    className="consignment-details"
                    layout="vertical"
                    colon={false}
                >
                    <Input type="hidden" readOnly value={this.state.taskId} />
                    <Input type="hidden" readOnly value={this.state.processInstanceId} />
                    <Row gutter={[16, 16]} style={{justifyContent:'space-between'}}>
                        <Col span={8}>
                            <Form.Item label="From" required>
                                <Input disabled value={this.state.from} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="To" required>
                                <Input disabled value={this.state.to} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Status" required>
                                <Input disabled value={this.state.status} required />
                            </Form.Item>
                       </Col>
                    </Row>
                    <Row gutter={[16, 16]}     >
                        <Col span={12}>
                            <Form.Item label="Quantity" required>
                                <Input disabled value={this.state.quantity} required />
                            </Form.Item>
                        </Col>
                    
                        <Col span={8} style={{ width:'100%'}}  >
                            <Form.Item label="Transfered Device Details" required>
                            <Table
                            dataSource={this.state.devices}
                            columns={this.columns}
                        />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} >
                    <Col span={8} style={{textAlign:'left'}}>
                        <Radio.Group
                            onChange={this.onChecked}
                            value={this.state.checked}
                            name="checked"
                            className="radio-group"
                        >
                            <Radio style={radioStyle} value="approve">
                                Approve
                                    </Radio>
                            <Radio style={radioStyle} value="rejected">
                                Reject
                                {this.state.checked === 'rejected' ? (
                                    <Form.Item label="Comment" required>
                                        <TextArea
                                            value={this.state.comment}
                                            name="comment"
                                            onChange={this.handleChange}
                                            style={{
                                                width: '260px',
                                                height: '100px',
                                                marginBottom: '0',
                                            }}
                                        />
                                    </Form.Item>
                                ) : null}
                                    </Radio>
                        </Radio.Group>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="submit-btn2" disabled={this.state.checked === ''}>
                                Proceed
                                    </Button>
                        </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
