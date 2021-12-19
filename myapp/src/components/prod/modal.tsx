import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import { Form, Radio, Input,Button } from 'antd';
import { Iaddprod } from '@/interfaces'

interface IProps {
    handleCancel:()=>void
}

const AddModal: ConnectRC<IProps> = (props) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const { handleCancel } =props

    return (
        <div>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="status" label="状态">
                    <Radio.Group>
                        <Radio value="0">正常</Radio>
                        <Radio value="1">禁用</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="style" label="列表样式">
                    <Radio.Group>
                        <Radio value="0">一列一个</Radio>
                        <Radio value="1">一列两个</Radio>
                        <Radio value="2">一列三个</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" onClick={handleCancel}>
                        取消
                    </Button>
                    <Button type="primary" htmlType="submit">
                        确认
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)
