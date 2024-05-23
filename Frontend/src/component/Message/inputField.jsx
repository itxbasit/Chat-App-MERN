import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Link from '../../Link';


export default function InputField({ conversationId, receiverId, socket, currentUserId }) {
    const token = useSelector((state) => state.token.value)
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        socket.current.emit("sendMessage", {
            senderId: currentUserId,
            receiverId,
            text: values.msg,
          });
        axios.post(`${Link}message`,{
            conversationId: conversationId.current,
            text: values.msg
        }, {
            headers: {
              'token': token
            }
          })
          .then(function(res){
            console.log(res)
            form.resetFields();
          })
          .catch(function(err){
            console.log(err)
          })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);

    };
    return (
        <Form
            form={form}
            name="basic"
            style={{
                width: '100%'
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className='inp-msg' style={{ display: "flex" }}>
                <Form.Item
                    name="msg"
                    rules={[
                        {
                            required: true,
                            message: ""
                        },
                    ]}
                >
                    <Input className='input-msg' type='text' placeholder='Aa' />
                    

                </Form.Item>
                <Form.Item>
                    <Button className='msg-inp-btn' htmlType="submit">
                        <SendOutlinedIcon color='#fff'fontSize=''/>
                    </Button>
                </Form.Item>
            </div>
        </Form>
    )
};