import React from 'react';
import { Form, Select, Input, Checkbox,Icon, Button } from 'antd';
import { Row, Col, message } from 'antd';
import { Typography } from 'antd';
import { observer } from 'mobx-react';
import { traderStore, postData, deviceStore } from './traderOnboardingStore';
import './technician.scoped.scss';

const { Option } = Select;


class TraderOnboarding extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("values",values);

                // postData();

            }
        });

    };
    render() {
        const { getFieldDecorator } = this.props.form;
        function onChange(value) {
            console.log(`selected ${value}`);
        }

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
            <div className="mainContainer">

                <Form onSubmit={this.handleSubmit} colon={false}>
                    <div>
                        <h1 style={{
                            textAlign: "left",
                            fontSize: "26px",
                            letterSpacing: "0px",
                            color: "#002868",
                            textTransform: "capitalize",
                            opacity: "1",
                            fontWeight: "600",
                        }}>Electronic Cash Register</h1>
                    </div>
                    <br />

                    <Row>
                        <div>
                            {' '}
                            <Typography>
                                <h3 style={{
                                    padding: "10px",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    fontSize: "20px",
                                    letterSpacing: "0px",
                                    color: "#DC3545",
                                    backgroundColor: "#F5F5F5",
                                    textTransform: "capitalize",
                                    opacity: "1",
                                }}>Device Information</h3>
                            </Typography>

                        </div>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item label="Manufacturer" required tin={{ width: '20px' }}>
                                {getFieldDecorator(
                                    'manufacturer',
                                    {}
                                )(
                                    <Input
                                        size="large"
                                        placeholder="Incotext"
                                        disabled={true}
                                    ></Input>
                                )}
                            </Form.Item>
                        </Col>

                        <Col span={8}>

                            <Form.Item label="Supplier" required businessname={{ width: '20px' }}>
                                {getFieldDecorator(
                                    'supplier',
                                    {}
                                )(
                                    <Input
                                        size="large"
                                        placeholder="Pergamon"
                                        disabled={true}
                                    />
                                )}
                            </Form.Item>

                        </Col>

                        <Col span={8}>

                            <Form.Item label="Device Serial Nimber" required email={{ width: '20px' }}>
                                {getFieldDecorator('sNO', {
                                    // rules: [
                                    //     {
                                    //         type: 'email',
                                    //         message: 'Invalid email',
                                    //     },
                                    // ],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="12345"
                                        disabled={true}
                                    />
                                )}
                            </Form.Item>

                        </Col>
                    </Row>

                    <br />
                    <Row gutter={[16, 16]}>
                        <Col span={8}>

                            <Form.Item label="Device Type" required region={{ width: '20px' }}>
                                {getFieldDecorator(
                                    'deviceType',
                                    {}
                                )(
                                    <Input
                                        size="large"
                                        placeholder="Electronic Cash Register"
                                        disabled={true}
                                    />
                                )}
                            </Form.Item>

                        </Col>

                        <Col span={8}>


                            <Form.Item label="Model" required model={{ width: '20px' }}>
                                {getFieldDecorator(
                                    'model',
                                    {}
                                )(
                                    <Input
                                        size="large"
                                        placeholder="133F"
                                        disabled={true}
                                    />
                                )}
                            </Form.Item>

                        </Col>

                        <Col span={8}>


                            <Form.Item label="Simcard" required simcard={{ width: '20px' }}>
                                {getFieldDecorator(
                                    'simcard',
                                    {}
                                )(
                                    <Input
                                        size="large"
                                        placeholder="Safaricom"
                                        disabled={true}
                                    />
                                )}
                            </Form.Item>

                        </Col>
                    </Row>

                    <br />
                    <Row gutter={[16, 16]}>

                    <Col span={8}>
                            <div>
                                <Form.Item name="devicess" label="Select Problem" required>
                                    {getFieldDecorator('devicess', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Select Problem',
                                            },
                                        ],
                                    })(
                                        <Select
                                            size="large"
                                            showSearch
                                            placeholder="Select a Device"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            onSearch={onSearch}
                                            loading={deviceStore.isDevicesLoading}
                                            filterOption={(input, option) =>
                                                option.props.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                            onSelect={(e) => {
                                                this.displayDevice(e);
                                            }}
                                        >
                                            {deviceStore.devices.map((eve, index) => (
                                                <Option key={eve} value={index}>
                                                    {eve['_instanceName']}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Problem Description" required description={{ width: '20px' }}>
                                {getFieldDecorator(
                                    'description',
                                    {}
                                )(
                                    <Input
                                        size="large"
                                        placeholder="The devices works for...."
                                        disabled={true}
                                    />
                                )}
                            </Form.Item>

                        </Col>

                        <Col span={8}>

                            <Form.Item label="Reported By" required reported={{ width: '20px' }}>
                                {getFieldDecorator('reported', {
                                    // rules: [{
                                    //     required: true,
                                    //     message: 'Phone number required!'
                                    // }],
                                })(
                                    <Input
                                        size="large"
                                        placeholder="Joe Doe"
                                        disabled={true}
                                    ></Input>
                                )}
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <div>
                            {' '}
                            <Typography>
                                <h3  style = {{
                                     padding:"10px",
                                     textAlign: "left",
                                     fontWeight: "600",
                                     fontSize:"20px",
                                     letterSpacing: "0px",
                                     color: "#DC3545",
                                     backgroundColor: "#F5F5F5",
                                     textTransform: "capitalize",
                                     opacity: "1",
                                }}>Technician Information</h3>
                            </Typography>
                        </div>

                        <Col span={8}>
                            <div>
                                <Form.Item name="problem" label="Select Problem" required>
                                    {getFieldDecorator('problem', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Select Problem Required!!',
                                            },
                                        ],
                                    })(
                                        <Select
                                            size="large"
                                            showSearch
                                            placeholder="Hardware, Keyboard"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            onSearch={onSearch}
                                            loading={deviceStore.isDevicesLoading}
                                            filterOption={(input, option) =>
                                                option.props.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                            onSelect={(e) => {
                                                this.displayDevice(e);
                                            }}
                                        >
                                            {deviceStore.devices.map((eve, index) => (
                                                <Option key={eve} value={index}>
                                                    {eve['_instanceName']}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div style={{paddingLeft:'40px'}}>
                            <Form.Item label="Problem Description" required description={{ width: '20px' }}>
                                {getFieldDecorator(
                                    'description',
                                    {}
                                )(
                                    <Input
                                        size="large"
                                        placeholder="The devices works for...."
                                        disabled={true}
                                    />
                                )}
                            </Form.Item>
                            </div>
                        </Col>
                    </Row>      
                    <Row>
                        <Col span={5}>
                            <div className="device-type">
                                <br />
                                <Form.Item label="Are Spare Parts Required?">
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: deviceStore.isNewTaxRegion,
                                    })(
                                        <Checkbox onChange={(v) => deviceStore.onNewTaxRegion(v)}>
                                           YES
                                        </Checkbox>
                                    )}
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div style={{paddingLeft:'178px'}}>
                                <Form.Item  label="Spare Parts">
                                    {getFieldDecorator(
                                        'Spareparts',
                                        {}
                                    )(
                                        <Select
                                            size="large"
                                            showSearch
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            onSearch={onSearch}
                                            loading={traderStore.isTaxRegionLoading}
                                            style={{ width: 300 }}
                                            placeholder="Select Spare Parts"
                                            optionFilterProp="children"
                                            disabled={!deviceStore.isNewTaxRegion}
                                            filterOption={(input, option) =>
                                                option.props.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {deviceStore.taxRegions.map((e, i) => (
                                                <Option key={i} value={e.id}>
                                                    {e['_instanceName']}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                                </div>
                        </Col>
                    </Row>

                    <Row>
                        <div>
                            {' '}
                            <Typography>
                                <h3  style = {{
                                     padding:"10px",
                                     textAlign: "left",
                                     fontWeight: "600",
                                     fontSize:"20px",
                                     letterSpacing: "0px",
                                     color: "#DC3545",
                                     backgroundColor: "#F5F5F5",
                                     textTransform: "capitalize",
                                     opacity: "1",
                                }}>Test Feedback</h3>
                            </Typography>
                        </div>

                        <Col span={8}>
                            <div>
                                <Form.Item name="results" label="Test Results" required>
                                    {getFieldDecorator('results', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Test Results Required!!',
                                            },
                                        ],
                                    })(
                                        <Select
                                            size="large"
                                            showSearch
                                            placeholder="working, Not working.."
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            onSearch={onSearch}
                                            loading={deviceStore.isDevicesLoading}
                                            filterOption={(input, option) =>
                                                option.props.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                            onSelect={(e) => {
                                                this.displayDevice(e);
                                            }}
                                        >
                                            {deviceStore.devices.map((eve, index) => (
                                                <Option key={eve} value={index}>
                                                    {eve['_instanceName']}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </div>
                        </Col>
                 
                    </Row>
                    {/* <br />
                    <AssignDevice ref={this.deviceRef} />
                    <ContactDetails ref={this.contactRef} /> */}
                    <div className="certify-submit">
                        <Button
                            type="primary"
                            variant="contained"
                            htmlType="submit"
                            loading={deviceStore.isSubmittingLoading}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>

            </div>
        );
    }
}

export default Form.create()(observer(TraderOnboarding));
