import moment from 'moment';
import { Form, Input, Button, Select, Icon, Row, Col, DatePicker } from 'antd';
import { useEffect } from 'react';
import './devices.scoped.scss';
import deviceStore from './deviceStore';

const { Option } = Select;
function SimCardRequisition(props) {
    const { getFieldDecorator } = props.form;
    function handleSubmit(e) {
        e.preventDefault();
        props.form.validateFields((err, { mno, quantity, priority, requestDate }) => {
            if (!err) {
                const formatDate = moment(requestDate).format('YYYY-MM-DD');
                deviceStore.requisitionSimCard(mno, quantity,priority, formatDate);
            }
        });
    }
    useEffect(() => {
        deviceStore.getMno();
    }, []);

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
        <div>
            <h1>SIM Card Requisition</h1>
            <h3>SIM Card Details</h3>
            <Form onSubmit={handleSubmit} colon={false}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item label="Mobile Network Operator(MNO) Name" hasFeedback>
                            {getFieldDecorator('mno', {
                                rules: [{ required: true, message: 'Please select MNO' }],
                            })(
                                <Select
                                    placeholder="Select Mobile Network Operator"
                                    loading={deviceStore.mnoLoading}
                                >
                                    {deviceStore.mno !== undefined && deviceStore.mno !== 0 ? (
                                        deviceStore.mno.map((element, index) => {
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
                        <Form.Item label="Quantity" hasFeedback>
                            {getFieldDecorator('quantity', {
                                rules: [
                                    { required: true, message: 'Please enter the SIM quantity' },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    type="number"
                                    placeholder="e.g 5000"
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Expected Date" required hasFeedback>
                            {getFieldDecorator('requestDate', {
                                rules: [{ required: true, message: 'Please request date' }],
                            })(<DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item label="Comment" required hasFeedback>
                            {getFieldDecorator('comment', {
                                rules: [{ required: true, message: 'Please write a comment' }],
                            })(
                                <Input
                                    prefix={
                                        <Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    type="text"
                                    placeholder="These sim cards are..."
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <div className="certify-submit">
                    <Button type="primary" variant="contained" htmlType="submit">
                        Request
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Form.create({ name: 'sim_requisition' })(SimCardRequisition);
