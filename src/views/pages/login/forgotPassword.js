import { React, Component } from 'react';
import { observer } from 'mobx-react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import loginBackground from './miliki-bg.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import preLoginStore from './preLoginStore';

class ForgotPassword extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                preLoginStore.postForgotPasswordData(values.username);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={changePasswordStyle}>
                <div
                    className="changePasswordForm"
                    style={{ width: '300px', margin: '0 auto', height: '100vh', paddingTop: '10%' }}
                >
                    <h2 style={{ color: ' #da0000' }}>Forgot Password</h2>
                    <h6 style={{ color: ' #002868', marginTop: '8%', letterSpacing: '1px' }}>
                        Have you forgot your password?<br></br>No worries,just enter your email
                        address and we will send you a new password to the email you have entered.
                    </h6>
                    <Form
                        style={{ marginTop: '15%', width: '280px' }}
                        layout="vertical"
                        onSubmit={this.handleSubmit}
                        className="login-form"
                    >
                        <Form.Item label="Enter your Email Address">
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: 'Please enter your email' },
                                    {
                                        type: 'email',
                                        message: "oops! looks like you've entered an invalid email",
                                    },
                                ],
                            })(
                                <Input
                                    prefix={
                                        <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    style={{ width: '280px', height: '40px' }}
                                    type="email"
                                    placeholder="person@company.com"
                                    className="textfield"
                                    autoFocus
                                />
                            )}
                        </Form.Item>
                        <Link to="/">
                            <Button style={{ float: 'left', margin: '0' }}>Back</Button>
                        </Link>

                        <Button
                            style={{ float: 'right', margin: '0' }}
                            type="primary"
                            htmlType="submit"
                            loading={preLoginStore.isPostForgotPasswordLoading}
                        >
                            Reset Password
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
const changePasswordStyle = {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: '100%',
    backgroundSize: 'cover',
    height: '100vh',
    backgroundImage: `url(${loginBackground})`,
};

export default Form.create()(observer(ForgotPassword));
