import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DynamicFormOutlinedIcon from '@mui/icons-material/DynamicFormOutlined';
import Link from '../../../Link';
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux';
import axios from 'axios';
import Overlay from '../../../overlay';

export default function App({ profile, changePass, verify, data, username, userEmail, userBio, userAbout, userContact}) {
    const [count, setCount] = useState(0)
    const [form] = Form.useForm();
    const [ freeze, setFreeze ] = useState(false)

    const token = useSelector((state) => state.token.value)
    const onFinish = (values) => {

        if (verify && count == 0) {
            setFreeze(true)
            axios.post(`${Link}verify/verifyEmail`, {
                email: values.email
            }, 
            {
                headers: {
                    'token': token,
                }
            })
            .then(function(res){
                toast.success(res.data.message)
                setCount(1);
                setFreeze(false)
            })
            .catch(function (err) {
                toast.error(err?.response?.data?.message)
                setFreeze(false)
            })    
        }
        else if (verify && count == 1) {
            setFreeze(true)
            axios.post(`${Link}verify/verifyOTP`, {
                email: values.email,
                otp: values.OTP
            }, 
            {
                headers: {
                    'token': token,
                }
            })
            .then(function(res){
                toast.success(res.data.message)
                setCount(0);
                setFreeze(false)
                form.resetFields()
            })
            .catch(function (err) {
                toast.error(err?.response?.data?.message)
                setFreeze(false)
            })
        }
        else if (profile) {
            setFreeze(true)
            axios.post(`${Link}about`, values, {
                headers: {
                    'token': token,
                }
            })
                .then(function (res) {
                    toast.success(res.data.message)
                    form.resetFields()
                    setFreeze(false)
                })
                .catch(function (err) {
                    toast.error(err?.response?.data?.message)
                    setFreeze(false)
                })
        }
        else if (changePass) {
            setFreeze(true)
            axios.put(`${Link}update`, {
                old_password: values.old_password,
                password: values.password
            }, {
                headers: {
                    'token': token,
                }
            })
                .then(function (res) {
                    toast.success(res?.data?.message)
                    setFreeze(false)
                    form.resetFields()
                    
                })
                .catch(function (err) {
                    toast.error(err?.response?.data?.message)
                    setFreeze(false)
                })
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={profile ? "center-container" : ""}>
            <Form
                name="basic"
                style={{
                    maxWidth: 320,
                    width: '100%',
                    padding: "0 20px"
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                {profile &&
                    <Form.Item
                        name="username"
                        initialValue={username}
                    >
                        <Input defaultValue={username} placeholder='Name' disabled />
                    </Form.Item>
                }

                {profile &&
                    <Form.Item
                        name="contact"
                        initialValue={userContact}
                    >
                        <Input defaultValue={userContact} placeholder='Contact number' type='number' />
                    </Form.Item>
                }

                {profile &&
                    <Form.Item
                        name="bio"
                        initialValue={userBio}
                    >
                        <Input defaultValue={userBio} placeholder='Bio' />
                    </Form.Item>

                }

                {profile &&
                    <Form.Item
                        name="about"
                        initialValue={userAbout}
                    >
                        <Input.TextArea defaultValue={userAbout} minLength={50} maxLength={70} placeholder='about' />
                    </Form.Item>

                }
                {
                    changePass &&
                    <Form.Item
                        name="old_password"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined color='#E9813B' className="site-form-item-icon form-icon-color" />} placeholder='Old Passowrd' />
                    </Form.Item>
                }

                {changePass &&
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                pattern: /(?=[A-Za-z0-9@#$%^&+.!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+.!=])(?=.{8,}).*$/,
                                message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined color='#E9813B' className="site-form-item-icon form-icon-color" />} placeholder='New Passowrd' />
                    </Form.Item>
                }

                {changePass &&
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
                {
                    verify &&
                    <Form.Item
                        name="email"
                        initialValue={userEmail}
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input prefix={<EmailOutlinedIcon fontSize='12' className="site-form-item-icon form-icon-color" />} placeholder='Email' type='email' defaultValue={userEmail} disabled />
                    </Form.Item>
                }
                {
                    verify && count == 1 &&
                    <Form.Item
                        name="OTP"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input prefix={<DynamicFormOutlinedIcon fontSize='12' className="site-form-item-icon form-icon-color" />} placeholder='6 digit otp' type='number' />
                    </Form.Item>
                }

                <Form.Item>
                    <Button className='btn-login hove' type="primary" htmlType="submit">
                        {(profile || changePass) &&
                            "save"
                        }
                        {
                            verify &&
                            "Request for otp"
                        }
                    </Button>
                </Form.Item>
            </Form>
            <Toaster
                position="top-left"
                reverseOrder={false}
            />
            {
                freeze &&
                <Overlay />
            }
        </div>
    );
}
