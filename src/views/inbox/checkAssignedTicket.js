/* eslint-disable no-useless-constructor */
import React from 'react';
import { runInAction, toJS } from 'mobx';
import { notify } from 'react-notify-toast';
import { Component } from 'react';
import { Form, Input, Button, Radio, Row, Col, Table } from 'antd';
import { fetchProcessVars } from './inboxstore';
import { getCubaREST } from '@cuba-platform/react-core';
import history from '../../helpers/routeUtils';
import './inbox.scoped.scss';
import { restServices } from '../../sdk/miliki-frontend/services';
import { Ticket } from '../../sdk/miliki-frontend/entities/miliki_Ticket';
import { Technician } from '../../sdk/miliki-frontend/entities/miliki_Technician';
import { collection, instance } from '@cuba-platform/react-core';
import { Select } from 'antd';
import { observer } from 'mobx-react';
import { TechnicianUser } from '../../sdk/miliki-frontend/entities/miliki_TechnicianUser';
import '../technician/tickets/viewticket.scss';

import { ticketStore } from '../technician/tickets/ticketStore';
import moment from 'moment';
import ResolveButtons from './resolveButtons';

const { TextArea } = Input;
ticketStore.repairLevel = [
    { id: 'LEVEL_1', name: 'LEVEL_1' },
    { id: 'LEVEL_2', name: 'LEVEL_2' },
    { id: 'LEVEL_3', name: 'LEVEL_3' },
    { id: 'LEVEL_4', name: 'LEVEL_4' },
    { id: 'LEVEL_5', name: 'LEVEL_5' },
];

const token = localStorage.getItem('access_token');
const { Option } = Select;

const dataCollection = collection(TechnicianUser.NAME, {
    view: 'technicianUser-view',
    limit: 10,
    filter: {
        conditions: [
            {
                property: 'supplier.id',
                operator: '=',
                value: `${localStorage.getItem('supplier-id')}`,
            },
        ],
    },
    offset: 0,
    loadImmediately: true, // false by default
});
const technicianInstance = instance(TechnicianUser.NAME, {
    view: 'technicianUser-view',
});

class checkAssignedTicket extends Component {
    constructor(props) {
        super(props);
        this.state = { SelectedRepairLevel: '' };
        this.OnSelectLevel = this.OnSelectLevel.bind(this);
    }

    state = {
        taskId: '',
        processInstanceId: '',
        raisedBy: '',
        category: '',
        description: '',
        checked: '',
        technician: '',
        assignee: '',
        ticketNo: '',
        device: '',
        repairLevel: '',
        subject: '',
        assigner: '',
        taxpayerName: '',
        createdby: '',
        timecreated: '',
        ticketId: '',
        deviceId: '',
    };

    OnSelectLevel(value) {
        // console.log('value>>>>>>>>>>>>>>>>>>>',value)
        if (value === 'LEVEL_3','LEVEL_1','LEVEL_2','LEVEL_4','LEVEL_5') {
            runInAction(() => {
                ticketStore.disableButton = false;
                ticketStore.selectedMessage = [];
                ticketStore.selectedMessage.push(value);
            });
        } else {
            runInAction(() => {
                ticketStore.disableButton = true;
            });
        }
    }

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
            ticketId: processVars.ticketId,
        }));
        const transfer = await getCubaREST().loadEntity(Ticket.NAME, processVars.ticketId, {
            view: 'ticket-view-all',
        });

        console.log('transfer', transfer);

        this.setState((prevState) => ({
            ...prevState,
            //raisedBy: transfer.raisedBy._entityName,
            category: transfer.subCategory.category.ticketClass,
            description: transfer.description,
            status: transfer.status,
            ticketNo: transfer.ticketNumber,
            device: transfer.device.serialNumber,
            deviceId: transfer.device.id,
            repairLevel: transfer.version,
            assigner: transfer.updatedBy,
            taxpayerName: transfer.trader.name,
            subject: transfer.subCategory.category.description,
            timecreated: transfer.createTs,
            createdby: transfer.createdBy,
        }));
        ticketStore.resolveButtonData.push({
            processInstanceId: this.state.processInstanceId,
            taskId: this.state.taskId,
            ticketId: this.state.ticketId,
            category: this.state.category,
            deviceId: this.state.deviceId,
        });

        ticketStore.getMessages(processVars.ticketId);
    }
    componentDidMount() {
        this.actualMountAsync();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let messagedata = {
            processInstanceId: this.state.processInstanceId,
            comment: toJS(this.state.message[0]),
            createdBy: 'admin',
            createTs: Date.now(),
            user: {id: `${localStorage.getItem('supplier-id')}`},
        };
       
        ticketStore.messages.push(messagedata);
        ticketStore.sendMessage(messagedata, this.state.ticketId);
    };

    render() {
        let messageData = toJS(ticketStore.messages);
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
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
            <div className="consignment-view-form">
                <Form
                    onSubmit={this.handleSubmit}
                    className="consignment-details"
                    layout="vertical"
                    colon={false}
                >
                    <div className="pageTitles">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className="text">
                                <h3 style={{ color: 'red' }}>
                                    <Input
                                        style={{
                                            fontWeight: 'bold',
                                            color: '#DA0000',
                                            fontSize: '20px',
                                        }}
                                        size="large"
                                        disabled
                                        value={this.state.ticketNo}
                                        required
                                    />
                                </h3>
                                <h4 style={{ color: '#DC3545', marginTop: '30px' }}>
                                    Ticket Information
                                </h4>
                            </div>
                            <div className="buttons">
                                <div className="consignment-view-form">
                                    <form>
                                        <div className="pageTitles">
                                            <ResolveButtons data={this.state} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="ticketViewContainer">
                            <div className="detailsPanel">
                                <Col span={30}>
                                    <div className="details">
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Status : </h5>
                                            <h6
                                                className="ticketData"
                                                style={{ marginLeft: 'auto' }}
                                            >
                                                <Input
                                                    style={{ color: '#A9A9A9' }}
                                                    disabled
                                                    value={this.state.category}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Help Type :</h5>
                                            <h6 className="ticketData">
                                                <Input
                                                    style={{ color: '#A9A9A9' }}
                                                    disabled
                                                    value={this.state.description}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Repair Level :</h5>
                                            <h6 className="ticketData">
                                                <Select
                                                    size="default"
                                                    showSearch
                                                    disabled = {ticketStore.disableLevel}
                                                    onFocus={onFocus}
                                                    onBlur={onBlur}
                                                    onSearch={onSearch}
                                                    // onSelect={console.log('this.state.value',this.state.value)}
                                                    onChange={this.OnSelectLevel}
                                                    // loading={traderStore.isTaxRegionLoading}
                                                    style={{ width: 180 }}
                                                    placeholder="Select repair level"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        option.props.children
                                                            .toLowerCase()
                                                            .indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {ticketStore.repairLevel !== undefined &&
                                                    ticketStore.repairLevel !== 0 &&
                                                    ticketStore.repairLevel !== 0 ? (
                                                        ticketStore.repairLevel.map(
                                                            (element, index) => {
                                                                return (
                                                                    <Option
                                                                        key={index}
                                                                        value={element.id}
                                                                    >
                                                                        {element.name}
                                                                    </Option>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <Option value="">Not Available</Option>
                                                    )}
                                                </Select>
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Subject :</h5>
                                            <h6 className="ticketData">
                                                <Input
                                                    style={{ color: '#A9A9A9' }}
                                                    disabled
                                                    value={this.state.subject}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Assigner :</h5>
                                            <h6 className="ticketData">
                                                <Input
                                                    style={{ color: '#A9A9A9' }}
                                                    disabled
                                                    value={this.state.assigner}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>TaxPayer Name :</h5>
                                            <h6 className="ticketData">
                                                <Input
                                                    style={{ color: '#A9A9A9' }}
                                                    disabled
                                                    value={this.state.taxpayerName}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Device SerialNo : </h5>
                                            <h6 className="ticketData">
                                                <Input
                                                    style={{ color: '#A9A9A9' }}
                                                    disabled
                                                    value={this.state.device}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Created By :</h5>
                                            <h6 className="ticketData">
                                                <Input
                                                    style={{ color: '#A9A9A9' }}
                                                    disabled
                                                    value={this.state.createdby}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                        <Row className="detailRow">
                                            {' '}
                                            <h5>Created Time :</h5>
                                            <h6 className="ticketData">
                                                <Input
                                                    style={{ color: '#A9A9A9' }}
                                                    disabled
                                                    value={this.state.timecreated}
                                                    required
                                                />
                                            </h6>
                                        </Row>
                                    </div>
                                </Col>
                            </div>
                            <div className="messagesPanel" disabled={!ticketStore.disableButton}>
                                {!messageData || messageData.length === 0 ? (
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            paddingTop: '20%',
                                            paddingBottom: '36%',
                                            margin: '0 auto',
                                        }}
                                    >
                                        Messages not available
                                    </p>
                                ) : (
                                    <div className="messageContainer" >
                                        {messageData.map((message) => {
                                            return <Messsage message={message} />;
                                        })}
                                    </div>
                                )}

                                <div className="messageInput" disabled={!ticketStore.disableButton}>
                                    <Form.Item>
                                        <TextArea
                                           disabled={!ticketStore.disableButton}
                                            v-model={this.state.message}
                                            name="message"
                                            className="msgInput"
                                            placeholder="Enter message"
                                            onChange={this.handleChange}
                                            allowClear
                                        />
                                    </Form.Item>
                                    <Button
                                    disabled={!ticketStore.disableButton}
                                        style={{
                                            width: '20%',
                                            paddingTop: '1%',
                                            paddingBottom: '1.5%',
                                            backgroundColor: '#BF0A30',
                                            color: 'white',
                                            float: 'right',
                                            height: '40px',
                                        }}
                                        htmlType="submit"
                                    >
                                        <p
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Reply
                                        </p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}
class Messsage extends Component {
    render() {
        const { comment, createTs, createdBy, user } = this.props.message;

        return (
            <div className="message" >
                <div
              
                    className="messageHeader"
                    style={{
                        backgroundColor:
                        ''
                      //`${localStorage.getItem('supplier-id')}` === `${localStorage.getItem('user-id')}`
                                ? '#3598dc'
                                : '#f1f5f8',
                    }}
                >
                    <h6>
                        {' '}
                        {!createTs
                            ? 'Not Available'
                            : `${moment(createTs).format('MMMM Do YYYY, h:mm:ss a')}`}
                    </h6>

                    <h6>
                        {' '}
                        {!createdBy
                            ? 'Not Available'
                            : `${
                                  createdBy === 'admin'
                                      ? `${localStorage.getItem('supplier-email')}`
                                      : createdBy
                              }`}
                    </h6>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '2%',
                    }}
                >
                    <h6 style={{ color: '#3598dc' }}>Comment:</h6>
                    <h6>{!comment ? 'Not Available' : `${comment}`}</h6>
                </div>
            </div>
        );
    }
}

export default observer(checkAssignedTicket);
