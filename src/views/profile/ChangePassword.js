import { React, Component } from 'react';
import { observer } from 'mobx-react';
import { dashboardStore } from '../dashboard/dashboardStore';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import preLoginStore from '../pages/login/preLoginStore';

class ChangePassword extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                preLoginStore.postChangePasswordData(values);
                console.log('Received values of form: ', values);
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
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ width: '300px', margin: '0 auto' }} className="changePasswordForm">
                <h2 style={{ color: ' #da0000' }}>Change Password</h2>
                <Form layout="vertical" onSubmit={this.handleSubmit} className="login-form">
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
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item label="New Password" hasFeedback>
                        {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message: 'Please input your New Password!' }],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="password"
                            />
                        )}
                    </Form.Item>

                    <Button
                        style={{ float: 'right', margin: '0' }}
                        type="primary"
                        htmlType="submit"
                        loading={preLoginStore.isPostChangePasswordLoading}
                    >
                        Update
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(observer(ChangePassword));
