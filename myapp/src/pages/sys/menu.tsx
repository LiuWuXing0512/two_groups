import React from 'react';
import { Table, Space, Button } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { connect, ConnectRC } from "umi"
import { useEffect } from "react"
import { IPropsMenu } from '@/interfaces';
const columns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    {
        title: '图标', dataIndex: 'icon', key: 'age', render: (text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => (
            <i>{text}</i>
        )
    },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '排序号', dataIndex: 'orderNum', key: 'xu' },
    { title: '菜单URL', dataIndex: 'url', key: 'url' },
    { title: '授权标识', dataIndex: 'perms', key: 'flag' },
    {
        title: '操作',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a>编辑</a>
                <a>删除</a>
            </Space>
        ),
    },
];

const menu: ConnectRC<any> = (props) => {
    const { menuList } = props.menu
    console.log(menuList);
    useEffect(() => {
        props.dispatch({
            type: 'menu/meunTable',
            payload: { t: new Date().getTime() }
        })
    }, [])
    return (
        <div>
            <Button type="primary">新增</Button>
            <Table
                columns={columns}
                dataSource={menuList}
                rowKey={record => record.menuId}
                expandable={{
                    expandIcon: ({ expanded, onExpand, record }) =>
                        expanded ? (
                            <DownOutlined style={{ marginRight: '10px' }} onClick={e => onExpand(record, e)} />
                        ) : (
                            <RightOutlined style={{ marginRight: '10px' }} onClick={e => onExpand(record, e)} />
                        )
                }}
            />
        </div>
    );
}

export default connect(({ menu }: IPropsMenu) => ({ menu }))(menu);