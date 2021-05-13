import React, { Component } from 'react';
import { Form, Icon, Input, Divider, Button } from 'antd';
import { Table, Row, Col } from 'antd';
import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { traderStore, addContactDetails, columns } from './traderOnboardingStore';
import './technician.scoped.scss';
import '../../scss/custom-antd.css';

class ContactDetails extends Component {
    handleContactDetails = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {     
            // the rest remains the same...
            if (!err) {
                console.log(values);
                traderStore.addContact(values);
                this.props.form.resetFields(['firstName', 'lastName', 'phone', 'email']);    
                this.props.onButtonClick(this.state.value);    
            }
             
            
        });
    };
    handleButton = (ev) => {};
    componentDidMount = () => {
        addContactDetails.fetchContactDetails();
    };
    constructor() {
        super();
        this.state = { value: '' };
        this.onChange = this.onChange.bind(this);
        this.add = this.handleContactDetails.bind(this);
    }
    onChange(e) {
        this.setState({ value: e.target.value });
        
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form colon={false}>
                    <div>
                        <Row gutter={[16, 16]}>
                            <div>
                                {' '}
                                <Typography>
                                    <h3
                                        style={{
                                            padding: '10px',
                                            textAlign: 'left',
                                            fontWeight: '600',
                                            fontSize: '20px',
                                            letterSpacing: '0px',
                                            color: '#DC3545',
                                            backgroundColor: '#F5F5F5',
                                            textTransform: 'capitalize',
                                            opacity: '1',
                                        }}
                                    >
                                        Contact Person
                                    </h3>
                                </Typography>
                            </div>

                            <Col span={6}>
                                <Form.Item label="First Name" firstname={{ width: '20px' }}>
                                    {getFieldDecorator('firstName', {
                                        rules: [
                                            {
                                                required:true,
                                                message: 'Please input your First Name!',
                                            },
                                        ],
                                    })(
                                        <Input
                                           v-model={this.state.value}
                                            onChange={this.onChange}
                                            size="large"
                                            placeholder="Joe Doe"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Last Name" lastname={{ width: '20px' }}>
                                    {getFieldDecorator('lastName', {
                                        rules: [
                                            {
                                                required:true,
                                                message: 'Please input your Last Name!',
                                            },
                                        ],
                                    })(
                                        <Input
                                        v-model={this.state.value}
                                            onChange={this.onChange}
                                            size="large"
                                            placeholder="Joe Doe"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Phone Number" contactPhone={{ width: '20px' }}>
                                    {getFieldDecorator('phone', {
                                        rules: [
                                            {
                                                required:true,
                                                message: 'Phone number required!',
                                            },
                                        ],
                                    })(
                                        <Input
                                        v-model={this.state.value}
                                            onChange={this.onChange}
                                            size="large"
                                            placeholder="07698696890"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Email"
                                    className="inputName"
                                    email2={{ width: '20px' }}
                                >
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {
                                                required:true,
                                                type: 'email',
                                                message: 'proper email required',
                                            },
                                        ],
                                    })(
                                        <Input
                                        v-model={this.state.value}
                                            onChange={this.onChange}
                                            size="large"
                                            placeholder="Joedoe@gmail.com"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            {' '}
                            <Col span={5}>
                                {' '}
                                <div className="device-model order-number ">
                                    <Button
                                         disabled={!this.state.value}
                                        loading={traderStore.addContactData}
                                        type="primary"
                                        variant="contained"
                                        color="primary"
                                        htmlType="submit"
                                        className="login-form"
                                        //onClick={this.add}
                                        onClick={this.handleContactDetails}
                                        submit={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginBottom: '1%',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Icon
                                            type="plus"
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                color: 'white',
                                            }}
                                        />
                                        Add Contact Person
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className="containers">
                            {' '}
                            <div>
                                <Table
                                    className="deviceListTable"
                                    Rowkey="id"
                                    onRowClick={(record, index) =>
                                        addContactDetails.onViewItem(record)
                                    }
                                    loading={traderStore.isSearchLoading}
                                    dataSource={traderStore.vatNumberResponse.contactPersons}
                                    columns={columns}
                                />
                            </div>
                        </Row>
                    </div>
                </Form>
            </div>
        );
    }
}
export default Form.create()(observer(ContactDetails));
