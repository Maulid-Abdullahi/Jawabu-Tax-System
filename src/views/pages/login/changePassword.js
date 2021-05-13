import { React, Component } from 'react';
import { observer } from 'mobx-react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import loginBackground from './miliki-bg.png';
import preLoginStore from './preLoginStore';
import { BrowserRouter as Link } from 'react-router-dom';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                preLoginStore.postChangePasswordData(values);
                console.log(values);
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('The two passwords do not match!');
        } else {
            callback();
        }
    };

    render() {
        if (!localStorage.getItem('access_token')) {
            return (
                <p
                    style={{
                        fontSize: '150%',
                        textAlign: 'center',
                        paddingTop: '16%',
                        color: 'red',
                    }}
                >
                    Please Log in to Change Password
                </p>
            );
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="vertical" onSubmit={this.handleSubmit} className="login-form">
                <div style={changePasswordStyle}>
                    <h2 style={{ color: ' #133c75', textAlign: 'center', paddingTop: '3%' }}>
                        For security reasons, you must change your password when you log in for the
                        first time
                    </h2>
                    <div
                        className="changePasswordForm"
                        style={{
                            width: '300px',
                            margin: '0 auto',
                            height: '100vh',
                            paddingTop: '10%',
                        }}
                    >
                        <h2 style={{ color: ' #da0000' }}>Change Password</h2>

                        <Form.Item label="Current Password" hasFeedback>
                            {getFieldDecorator('oldPassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your Current Password',
                                    },
                                ],
                            })(
                                <Input.Password
                                    type="password"
                                    prefix={
                                        <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    placeholder="password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="New Password" hasFeedback>
                            {getFieldDecorator('newPassword', {
                                rules: [
                                    { required: true, message: 'Please input your New Password!' },
                                ],
                            })(
                                <Input.Password
                                    prefix={
                                        <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    type="password"
                                    placeholder="password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Confirm New Password" hasFeedback>
                            {getFieldDecorator('confirmPassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please Confirm your new Password!',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(
                                <Input.Password
                                    prefix={
                                        <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                                    }
                                    type="password"
                                    placeholder="password"
                                />
                            )}
                        </Form.Item>

                        <Button
                            style={{ float: 'right' }}
                            type="primary"
                            htmlType="submit"
                            loading={preLoginStore.isPostChangePasswordLoading}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </Form>
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

export default Form.create()(observer(ChangePassword));
