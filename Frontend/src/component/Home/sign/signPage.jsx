import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Link from '../../../Link';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';
import { setToken } from '../../../ReduxStore/setting';
import { useNavigate } from 'react-router-dom';


export default function App({ btnHead, signUp }) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onFinish = (values) => {
        if (signUp) {
            axios.post(`${Link}SignUp/register`, {
                username: values.username,
                email: values.email,
                password: values.password
            })
                .then(function (res) {
                    toast.success(`${res?.data?.message}`)
                    navigate('/signIn')
                })
                .catch(function (err) {
                    toast.error(`${err?.response?.data?.message}`)
                })
        }
        else {
            axios.post(`${Link}SignIn`, {
                username: values.username,
                password: values.password
            })
                .then(function (res) {
                    Cookies.set('token', res?.data?.token)
                    dispatch(setToken({ value: res?.data?.token }));
                })
                .catch(function (err) {
                    toast.error(`${err?.response?.data?.message}`)
                })
        }
        console.log('Success:', values);
        form.resetFields()
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="center-container">
            <Form
                name="basic"
                style={{
                    maxWidth: 600,
                    width: '100%'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon form-icon-color" />} placeholder='Name' />
                </Form.Item>

                {signUp &&
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input prefix={<EmailOutlinedIcon fontSize='12' className="site-form-item-icon form-icon-color" />} placeholder='Email' type='email' />
                    </Form.Item>
                }

                {signUp && <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            pattern: /(?=[A-Za-z0-9@#$%^&+.!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+.!=])(?=.{8,}).*$/,
                            message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined color='#E9813B' className="site-form-item-icon form-icon-color" />} placeholder='Passowrd' />
                </Form.Item>
                }

                {!signUp && <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined color='#E9813B' className="site-form-item-icon form-icon-color" />} placeholder='Passowrd' />
                </Form.Item>
                }

                {signUp &&
                    <Form.Item
                        name="confirm_password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(''));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder='Re-type password'
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeOutlined style={{ color: 'silver', position: "absolute", right: "2%" }} />
                                ) : (
                                    <EyeInvisibleOutlined style={{ color: 'silver', position: "absolute", right: "2%" }} />
                                )
                            }
                            prefix={<LockOutlined color='#E9813B' className="site-form-item-icon form-icon-color" />} />
                    </Form.Item>
                }

                <Form.Item>
                    <Button className='btn-login hove' type="primary" htmlType="submit">
                        {btnHead}
                    </Button>
                </Form.Item>
            </Form>
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
        </div>
    );
}
