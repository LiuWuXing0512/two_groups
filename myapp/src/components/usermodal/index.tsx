import React, { Dispatch, useEffect, useState } from 'react'
import { Modal, Button, Tooltip, Transfer  } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons'
interface Markdata {
    key:string,
    title:string
}
interface Columns {
    key:string,
    title: string,
    dataIndex: string,
    align?:string,
    width?:number,
    fixed?:string,
    render?:Function
}
interface IProps {
    mockData:Markdata[],
    setcolumns(coum:Columns[]):void,
    coum:Columns[]
}
const UserModal = (props:IProps) => {
    let {coum}=props
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const {mockData} = props
    const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);
    const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const onChange = async(nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys:', nextTargetKeys);
        console.log('direction:', direction);
        console.log('moveKeys:', moveKeys);
        nextTargetKeys.map(ite=>{
            coum=coum.filter(item=>item.key!==ite)
        })
        props.setcolumns(coum)
        setTargetKeys(nextTargetKeys);
    };
    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };
    const onScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };
    return (
        <div>
            <Tooltip title="显隐">
                <Button shape="circle" onClick={showModal} icon={<AppstoreOutlined />} />
            </Tooltip>
            <Modal title="多选" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Transfer
                    dataSource={mockData}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    titles={['显示','隐藏']}
                    onChange={onChange}
                    onSelectChange={onSelectChange}
                    onScroll={onScroll}
                    render={item => item.title}
                />
            </Modal>
        </div>
    )
}

export default UserModal;