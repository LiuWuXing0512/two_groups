import React, { Dispatch, useEffect, useState } from 'react'
import { Modal, Button, Tooltip, Transfer  } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons'
import { connect } from 'umi';

interface Markdata {
    key:string,
    title:string
}
const UserModal = () => {
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
    const mockData:Markdata[] = [
        {
            key:'1',
            title: '用户昵称',
        },
        {
            key: '2',
            title: '用户头像',
        },
        {
            key: '3',
            title: '状态',
        },
        {
            key: '4',
            title: '注册时间',
        },
    ];
    const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);
    const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const onChange = (nextTargetKeys, direction, moveKeys) => {
        console.log('targetKeys:', nextTargetKeys);
        console.log('direction:', direction);
        console.log('moveKeys:', moveKeys);
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
                    titles={['隐藏', '显示']}
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