import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Tooltip, Space } from 'antd';
import { SearchOutlined, DeleteOutlined, PlusOutlined, RedoOutlined, AppstoreFilled, EditOutlined } from '@ant-design/icons';
import { connect, ConnectRC } from 'umi'
import { IPropsUser } from '@/interfaces';
import "./user.less"


const columns: any = [   /**/
    {
        title: '用户名',
        key: 'username',
        dataIndex: 'username',
    },
    {
        title: '邮箱',
        key: 'email',
        dataIndex: 'email',
    },
    {
        title: '手机号',
        key: 'mobile',
        dataIndex: 'mobile',
    },
    {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
    },
    {
        title: "操作",
        render: () => (
            <Space size="middle">
                <Button type="primary">
                    <EditOutlined />
                    修改
                </Button>
                <Button type="primary" danger>
                    <DeleteOutlined />
                    删除
                </Button>
            </Space>
        ),
        align: "center",
        width: 200,
    },
];


interface Iuser {
    user: IPropsUser
}


const user: ConnectRC<any> = (props) => {
    const { records } = props.user.userList
    const [selectedRowKeys, setSelectedRowKeys] = useState(records)
    useEffect(() => {
        props.dispatch({
            type: "user/userList",
            payload: { t: new Date().getTime(), current: 1, size: 10 }
        })
    }, [])
    const onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys({ selectedRowKeys });
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <div className='user'>
            <div className='userSearch'>
                <span>用户名&emsp;</span>
                <Input placeholder='用户名' />&emsp;
                <Button type="primary" icon={<SearchOutlined />}>
                    搜索
                </Button>&emsp;
                <Button icon={<DeleteOutlined />} >
                    清空
                </Button>
            </div>
            <div className='rbac'>
                <div className='user-button'>
                    <Button type="primary" icon={<PlusOutlined />}>
                        新增
                    </Button>&emsp;
                    <Button type="primary" disabled danger>
                        批量删除
                    </Button>
                </div>
                <div className='user-button'>
                    <Tooltip title="刷新">
                        <Button shape="circle" className='icon-button' icon={<RedoOutlined />} />
                    </Tooltip>&emsp;
                    <Tooltip title="显示">
                        <Button shape="circle" className='icon-button' icon={<AppstoreFilled />} />
                    </Tooltip>&emsp;
                    <Tooltip title="搜索">
                        <Button shape="circle" className='icon-button' icon={<SearchOutlined />} />
                    </Tooltip>
                </div>
            </div>

            <div className='user-Table'>
                <div>
                    <div>当前表格以选择 <b>0</b> 项 <a >清空</a></div>

                </div>
                <div className="prodListBottom">
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={records}
                        bordered={true}
                        rowKey="userId"
                        pagination={{ pageSize: 5 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default connect(({ user }: Iuser) => ({ user }))(user);