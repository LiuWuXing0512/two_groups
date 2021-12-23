import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import { Form, Radio, Input,Button } from 'antd';
import { Eprod } from '@/interfaces/index'

interface IProps{
    handleCancel:()=>void,
    edit:Eprod
}

const EditModal:ConnectRC<IProps>=(props)=>{
    const [form] = Form.useForm();
    const {handleCancel,edit}=props 

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const edit=()=> {
        Form.setFieldsValue(edit)
    }
    
    return (
        <div>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelAlign='right'
            >
  
                <Form.Item 
                    label="标签名字"
                    name='title'
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

const mapStateToProps=(state:any)=>{
    console.log(state.prod.edit,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    return{
        edit:state.prod.edit,
        
    }
    
    
}

const mapDispatchToProps=(dispatch:Dispatch<any>)=>{

}

export default connect(mapStateToProps,mapDispatchToProps)(EditModal)