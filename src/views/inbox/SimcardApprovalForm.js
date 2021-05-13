/* eslint-disable no-useless-constructor */
import { toJS } from 'mobx';
import { notify } from 'react-notify-toast';
import { Component } from 'react';
import { Form, Input, Button, Radio, Row,Col } from 'antd';
import { fetchProcessVars } from './inboxstore';
import { getCubaREST } from '@cuba-platform/react-core';
import { DeviceModel } from '../../sdk/miliki-frontend/entities/miliki_DeviceModel';
import history from '../../helpers/routeUtils';
import './inbox.scoped.scss';
import TextArea from 'antd/lib/input/TextArea';
import { restServices } from '../../sdk/miliki-frontend/services';
import { SupplierSimRequisition } from '../../sdk/miliki-frontend/entities/miliki_SupplierSimRequisition';

export default class SimcardApprovalForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        checked: '',
        deviceModel: '',
        quantity: '',
        dueDate: '',
        ticketNo: '',
        taskId: '',
        processInstanceId: '',
        comment: '',
        status:'',
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
       console.log('processVars****',processVars)
        this.setState((prevState) => ({
            ...prevState,
            taskId: id,
            mno: processVars.mno,
            processInstanceId: processInstanceId,
            quantity: processVars.qty,
            dueDate: processVars.dueDate,
            ticketNo: processVars.ticketNo,
        }));
       if (name === 'Approve SIM Cards') {
            getCubaREST()
                .loadEntity(SupplierSimRequisition.NAME, processVars.requisitionId,{
                    view:'supplierSimRequisition-view'})
                .then((mno) => {
                    //console.log('mnoo',mno);
                    this.setState((prevState) => ({
                        ...prevState,
                        mno: mno.mno.name,
                        status: mno.status,
                    }));
                });
        }
    }
    componentDidMount() {
        this.actualMountAsync();
    }
    handleSubmit = async(e) => {
        e.preventDefault();
        const commentJson = JSON.stringify({ comment: `${this.state.comment}` });
        const params = {
            processInstanceId: this.state.processInstanceId,
            taskId: this.state.taskId,
            incomingVariables: commentJson,
            outcome: this.state.checked,
        };
        await restServices.miliki_FrontendBprocService.completeTask(getCubaREST())(params);
        try {
                if (this.state.checked === 'approve') {
                    notify.show('Requisition Approved Successfully', 'success', 3000);
                }
                notify.show('Action will be reviewed', 'warning', 3000);
            history.push('/inbox');
        } catch (error) {
            notify.show('Error Approving requisition, try again', 'error', 3000);
        }
    };
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <div className="requisition-approval-form">
                <h3>Simcard Requisition Details</h3>
                <Form
                    onSubmit={this.handleSubmit}
                    className="requisition-details"
                    layout="vertical"
                    colon={false}
                >
                    <Input type="hidden" readOnly value={this.state.taskId} />
                    <Input type="hidden" readOnly value={this.state.processInstanceId} />
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item label="Mobile Network" required>
                                <Input disabled value={this.state.mno} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Quantity" required>
                                <Input disabled value={this.state.quantity} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Status" required>
                                <Input disabled value={this.state.status} required />
                            </Form.Item>
                       </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item label="Ticket Number" required>
                                <Input disabled value={this.state.ticketNo} required />
                            </Form.Item>
                        </Col>
                        <Col span={8}></Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Radio.Group
                            onChange={this.onChecked}
                            value={this.state.checked}
                            name="checked"
                            className="radio-group"
                        >
                            <Radio style={radioStyle} value="approve">
                                Approve
                                    </Radio>
                            <Radio style={radioStyle} value="reject">
                                Reject
                                {this.state.checked === 'reject' ? (
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
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit-btn2"
                                disabled={this.state.checked === ''}
                            >
                                Submit
                                    </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div>
        )
    }
}
