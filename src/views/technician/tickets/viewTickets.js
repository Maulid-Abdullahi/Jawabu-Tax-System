import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, Spin } from 'antd';
import './viewticket.scss';
import { observer } from 'mobx-react';
import { ticketStore } from './ticketStore';
import { toJS } from 'mobx';
import moment from 'moment';

const { TextArea } = Input;

class ViewTicket extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        ticketStore.getTicket(this.props.location.state.ticketId);
        ticketStore.getMessages(this.props.location.state.ticketId);
    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            let messagedata = {
                comment: values.message,
                createdBy: 'admin',
                createTs: Date.now(),
                user: { id: `${localStorage.getItem('user-id')}` },
            };
            if (!err) {
                ticketStore.messages.push(messagedata);
                ticketStore.sendMessage(values.message, `${this.props.location.state.ticketId}`);
            }
        });
    };

    render() {
        const data = toJS(ticketStore.ticketData);
        const messageData = toJS(ticketStore.messages);
        const { getFieldDecorator } = this.props.form;

        if (ticketStore.ticketsDataIsLoading)
            return (
                <>
                    <Spin />
                </>
            );
        return (
            <Form onSubmit={this.handleSubmit}>
                <div className="pageTitles">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="text">
                            <h3 style={{ color: '#002868', fontWeight: 'bold' }}>
                                {!data || !data.ticketNumber
                                    ? 'Not Available'
                                    : `${data.ticketNumber}`}
                            </h3>
                            <h4 style={{ color: '#DC3545', marginTop: '30px' }}>
                                Ticket Information
                            </h4>
                        </div>
                        {/* <div className="buttons">
                            <Button type="primary" size="default" style={{ marginRight: '10px' }}>
                                Resolve
                            </Button>
                            <Button type="danger" size="default">
                                Unresolve
                            </Button>
                        </div> */}
                    </div>
                    <div className="ticketViewContainer">
                        <div className="detailsPanel">
                            <Col span={30}>
                                <div className="details">
                                    <Row className="detailRow">
                                        {' '}
                                        <h5>Status : </h5>
                                        <h6 className="ticketData" style={{ marginLeft: 'auto' }}>
                                            {!data || !data.status
                                                ? 'Not Available'
                                                : `${data.status}`}
                                        </h6>
                                    </Row>
                                    <Row className="detailRow">
                                        {' '}
                                        <h5>Help Type :</h5>
                                        <h6 className="ticketData">
                                            {' '}
                                            {!data
                                                ? 'Not Available'
                                                : `${data.subCategory.category._instanceName}`}
                                        </h6>
                                    </Row>
                                    <Row className="detailRow">
                                        {' '}
                                        <h5>Subject :</h5>
                                        <h6 className="ticketData">
                                            {' '}
                                            {!data
                                                ? 'Not Available'
                                                : `${data.subCategory._instanceName}`}
                                        </h6>
                                    </Row>
                                    <Row className="detailRow">
                                        {' '}
                                        <h5>Device Serial Number :</h5>
                                        <h6 className="ticketData">
                                            {' '}
                                            {!data ||
                                            data.device === null ||
                                            data.device === undefined
                                                ? 'Not Available'
                                                : `${data.device.serialNumber}`}
                                        </h6>
                                    </Row>
                                    <Row className="detailRow">
                                        {' '}
                                        <h5>Date Reported :</h5>
                                        <h6 className="ticketData">
                                            {' '}
                                            {!data
                                                ? 'Not Available'
                                                : `${moment(data.createTs).format(
                                                      'MMMM Do YYYY, h:mm:ss a'
                                                  )}`}
                                        </h6>
                                    </Row>
                                    <Row className="detailRow">
                                        {' '}
                                        <h5>Reported By :</h5>
                                        <h6 className="ticketData">
                                            {' '}
                                            {!data ? 'Not Available' : `${data.createdBy}`}
                                        </h6>
                                    </Row>
                                </div>
                            </Col>
                        </div>
                        <div className="messagesPanel">
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
                                <div className="messageContainer">
                                    {messageData.map((message) => {
                                        return <Messsage message={message} />;
                                    })}
                                </div>
                            )}

                            <div className="messageInput">
                                <Form.Item>
                                    {getFieldDecorator('message', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '',
                                            },
                                        ],
                                    })(
                                        <TextArea
                                            className="msgInput"
                                            placeholder="Enter message"
                                            allowClear
                                        />
                                    )}
                                </Form.Item>

                                <Button
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
        );
    }
}

export default Form.create()(observer(ViewTicket));

class Messsage extends Component {
    render() {
        const { comment, createTs, createdBy, user } = this.props.message;
        return (
            <div className="message">
                <div
                    className="messageHeader"
                    style={{
                        backgroundColor:
                            `${localStorage.getItem('user-id')}` === user.id
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
                                      ? `${localStorage.getItem('supplier-name')}`
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
