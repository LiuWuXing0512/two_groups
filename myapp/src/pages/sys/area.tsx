import React, { useEffect, useState } from 'react';
import './area.less'
import { Input, Button, Tree, Modal, Form, Cascader } from 'antd';
import { connect, ConnectRC } from 'umi';
import { IPropsArea } from '@/interfaces';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};


const Area: ConnectRC<any> = (props) => {
    const { areaList } = props.area
    useEffect(() => {
        props.dispatch({
            type: 'area/addressList',
            payload: { t: new Date().getTime(), current: 1, size: 10 }
        })
    }, [])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        console.log("aaaa");
        let obj = {
            t: new Date().getTime(),
            areaId: 0,
            areaName: "西二旗", 
            parentId: 659006000002,
            level: null
        }
        setIsModalVisible(false);
    };
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log(values);
    };
    function onChange(value: any) {
        console.log(value);
    }
    return (
        <div className='area'>
            <Modal title="新增" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={[
                <Button key="back" onClick={() => setIsModalVisible(false)} >取消</Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    确定
                </Button>,]}>
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="note" label="地区名称" >
                        <Input />
                    </Form.Item>
                    <Form.Item label="上级地区" >
                        <Cascader
                            defaultValue={['河北省', '石家庄', '市辖区']}
                            expandTrigger="hover"
                            fieldNames={{ label: 'areaName', value: 'areaName' }}
                            options={areaList}
                            onChange={onChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <div className='area-search'>
                <Input placeholder="地区关键词" />
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                    新增
                </Button>
            </div>
            <div className='area-conent'>
                <Tree
                    className="draggable-tree"
                    fieldNames={{ title: "areaName", key: "areaId" }}
                    treeData={areaList}
                />
            </div>
        </div>
    );
}
export default connect(({ area }: IPropsArea) => ({ area }))(Area);