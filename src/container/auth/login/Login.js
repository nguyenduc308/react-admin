import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import '../auth.scss';
import { LOGIN_REQUEST } from '../../../store/constants/auth';
import { useUnAuth } from '../../../shared/hooks/useUnAuth';

const Login = () => {
    useUnAuth();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const onFinish = ({ email, password }) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                email,
                password,
            },
        });
    };
    return (
        <div className="form-auth">
            <Form form={form} name="horizontal_login" onFinish={onFinish}>
                <h3 className="text-center">Đăng nhập</h3>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: false,
                            message: 'Vui lòng nhập email',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: false,
                            message: 'Vui lòng nhập password',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                false
                                // !form.isFieldsTouched(true) ||
                                // form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Log in
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    );
};
export default Login;
