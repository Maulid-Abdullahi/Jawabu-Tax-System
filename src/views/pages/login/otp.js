import React from 'react';
import './login.scss';
import { Form, Icon, Input, Button, Checkbox, Row, Typography } from 'antd';
import { observer } from 'mobx-react';
import preLoginStore from './preLoginStore';
import loginBackground from './miliki-bg.png';

const { Title } = Typography;
class Otp extends React.Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, { otpCode }) => {
            if (!err) {
                preLoginStore.getBearerToken(otpCode);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-container" id="login">
                <Row
                    type="flex"
                    justify="center"
                    align="middle"
                    style={({ minHeight: '100vh' }, loginStyle)}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form" layout="vertical">
                        <img
                            src="logos/miliki-logo-small.png"
                            alt="main-logo"
                            className="login-logo"
                        />
                        <div className="page-titles">
                            <Title level={3}> Enter OTP</Title>
                            <Title level={4}>Kindly Enter 4 digit OTP recieved in your email</Title>
                        </div>
                        <Form.Item label="OTP" hasFeedback>
                            {getFieldDecorator('otpCode', {
                                rules: [{ required: true, message: 'Please enter your otp code' }],
                            })(
                                <Input
                                    prefix={
                                        <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    type="number"
                                    placeholder="e.g 1234"
                                    className="textfield"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Row type="flex" justify="center" align="middle">
                                <Button type="primary" htmlType="submit" className="textfield" loading={preLoginStore.isGetTokenLoading}>
                                    Login
                                </Button>
                            </Row>
                            <Row type="flex" justify="center" align="middle" className="resend-otp">
                                <Button type="primary" className="textfield" loading={preLoginStore.isGetTokenLoading}>
                                    Resend OTP
                                </Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </Row>
            </div>
        );
    }
}
const loginStyle = {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: '100%',
    backgroundSize: 'cover',
    height: '100vh',
    backgroundImage: `url(${loginBackground})`,
};

export default Form.create({ name: 'normal_login' })(observer(Otp));
