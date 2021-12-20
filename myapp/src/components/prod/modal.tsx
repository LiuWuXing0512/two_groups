import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import { Form, Radio, Input,Button } from 'antd';
import { Iaddprod,Iprod } from '@/interfaces'
import styles from './modal.less'

interface IProps {
    handleCancel:()=>void,
    handleOk:()=>void,
    addProd:(payload:Iaddprod)=>void
    getprod:(payload:Iprod)=>void
    current:number,
    size:number
}

const AddModal: ConnectRC<IProps> = (props) => {
    
    const { handleCancel,handleOk } =props

    const onFinish = (values: any) => {
        console.log('Success:', values);
        // 添加数据的请求
        props.addProd({
            title:values.title,
            status:values.status,
            style:values.status,
            seq:values.seq
        })
        const { current , size }=props
        // 添加完数据从新请求
        props.getprod({
            current,size
        })
        handleOk()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    

    return (
        <div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelAlign='right'
            >

                <Form.Item 
                    label="标签名字"
                    name="title"
                    rules={[{ required: true, message: '标签名称不能为空' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="status" label="状态">
                    <Radio.Group>
                        <Radio value={0}>正常</Radio>
                        <Radio value={1}>禁用</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="style" label="列表样式">
                    <Radio.Group>
                        <Radio value={0}>一列一个</Radio>
                        <Radio value={1}>一列两个</Radio>
                        <Radio value={2}>一列三个</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="排序"
                    name="seq" 
                >
                    <Input/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 18, span: 24 }}>
                    <Button type="primary" onClick={handleCancel} style={{marginRight:'5px'}}>
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

const mapStateToProps = (state:any) => {
    // console.log(state.prod,'=============================================');
    return {
        current:state.prod.current,
        size:state.prod.size
    }
}


const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        addProd: (payload: Iaddprod) => dispatch({
            type: 'prod/addProd',
            payload
        }),
        getprod:(payload:Iprod)=>dispatch({
            type:'prod/getprod',
            payload
        })

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)
