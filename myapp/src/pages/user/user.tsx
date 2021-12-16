import React, { Component, Dispatch, useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd';
import { Select } from 'antd';
import { IMemberData } from '@/interfaces';
import { ConnectRC, connect, useHistory } from 'umi';

interface IProps {
    getMemberList(payload:IMemberData):void
}

const { Option } = Select;
const UserPage: ConnectRC<IProps>=(props)=>{
    const [form] = Form.useForm();
    const [status,changestatus]=useState<string>('')
    const [nickName,changenickName]=useState<string>('')
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        let status=''
        changestatus(status);
        let nickName=''
        changenickName(nickName);
        console.log(status,nickName);
        
    };
    const handleChange=(value) => {
        let status=value
        changestatus(status);
        console.log(status,nickName);
    }
    useEffect(() => {
        let payload={current:1,size:10,nickName:'We',status:'1'}
        props.getMemberList(payload)
    }, []);
    return (<div>
                <div className='topsearch'>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        // layout='horizontal'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label='用户昵称'
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder='用户昵称' value={nickName}/>
                        </Form.Item>
                        <span>状态：</span>
                        <Select defaultValue={status} style={{ width: 120 }} onChange={handleChange}>
                            <Option value="1">正常</Option>
                            <Option value="0">禁用</Option>
                        </Select>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
    )
}

const mapStateToProps = (state: any) => {
    console.log('state...', state.member.records);
    return {
        records:state.member.records
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getMemberList: (payload: IMemberData) =>
            dispatch({
                type: 'member/getMemberList',
                payload,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
