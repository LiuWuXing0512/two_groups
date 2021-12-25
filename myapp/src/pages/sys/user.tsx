import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Tooltip, Space, Modal, Form, Checkbox, Radio, Row, Col, message } from 'antd';
import { SearchOutlined, DeleteOutlined, PlusOutlined, RedoOutlined, AppstoreFilled, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { connect, ConnectRC } from 'umi'
import { IPropsUser } from '@/interfaces';
import { addUser, delUser } from '@/services';
import "./user.less"


const columns: any = [
    {
        title: '用户名',
        key: 'username',
        dataIndex: 'username',
        render: (text: string) => <a>{text}</a>,
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
        render: (text: number) => {
            return <span>{text == 1 ? '正常' : '禁用'}</span>
        }
    },
    {
        title: "操作",
        render: () => (
            <Space size="middle">
                <Button type="primary">
                    <EditOutlined />
                    编辑
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
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};
const user: ConnectRC<any> = (props) => {
    const userRecords = props.user.userList.records
    const roleRecords = props.user.roleList.records
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [text, updateText] = useState('')
    const [checkNum, setCheckNum] = useState(0);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);
    useEffect(() => {
        props.dispatch({
            type: "user/roleList",
            payload: { t: new Date().getTime(), current: 1, size: 10 }
        })
        props.dispatch({
            type: "user/userList",
            payload: { t: new Date().getTime(), current: 1, size: 10 }
        })
        form.validateFields(['nickname']);
    }, [checkNick])
    const onSelectChange = (selectedRowKeys: any) => {
        console.log(selectedRowKeys);

        setCheckNum(selectedRowKeys.length)
        setSelectedRowKeys(selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hanldClick = () => {
        props.dispatch({
            type: "user/userList",
            payload: { t: new Date().getTime(), current: 1, size: 10, username: text }
        })
    }
    const clearUserLength = () => {
        setSelectedRowKeys([]);
        setCheckNum(0);
    }
    const hasSelected = checkNum > 0;

    const handleOk = async () => {
        setConfirmLoading(true);
        setVisible(false);
        setConfirmLoading(false);

        try {
            const values = await form.validateFields();
            const { email, mobile, password, roleIdList, status, username } = values;
            await addUser({
                email,
                mobile,
                password,
                roleIdList,
                status,
                t: new Date().getTime(),
                username,
            })
            message.success('添加成功');
            props.dispatch({
                type: "user/userList",
                payload: { t: new Date().getTime(), current: 1, size: 10 }
            })
        } catch (errorInfo) {
            message.success('添加失败');
        };
    }
    function confirm() {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: `确定删除用户{}`,
            okText: '确认',
            cancelText: '取消',
            async onOk() {
                await delUser(selectedRowKeys as any)
                props.dispatch({type: "user/userList",payload: { t: new Date().getTime(), current: 1, size: 10 }})
            },
        });
    }
    return (
        <div className='user'>
            <div className='userSearch'>
                <span>用户名&emsp;</span>
                <Input placeholder='用户名' value={text} onChange={e => updateText(e.target.value)} />&emsp;
                <Button type="primary" onClick={hanldClick} icon={<SearchOutlined />}>
                    搜索
                </Button>&emsp;
                <Button onClick={() => updateText("")} icon={<DeleteOutlined />} >
                    清空
                </Button>
            </div>
            <div className='rbac'>
                <div className='user-button'>
                    <Button type="primary" onClick={() => setVisible(true)} icon={<PlusOutlined />}>
                        新增
                    </Button>&emsp;
                    <Button type="primary" onClick={confirm} disabled={!hasSelected} danger>
                        批量删除
                    </Button>
                </div>
                <div className='user-button'>
                    <Tooltip title="刷新">
                        <Button shape="circle" onClick={()=>{props.dispatch({type: "user/userList",payload: { t: new Date().getTime(), current: 1, size: 10 }})}} className='icon-button' icon={<RedoOutlined />} />
                    </Tooltip>&emsp;
                    <Tooltip title="显示">
                        <Button shape="circle" className='icon-button' icon={<AppstoreFilled />} />
                    </Tooltip>&emsp;
                    <Tooltip title="搜索">
                        <Button shape="circle" className='icon-button' icon={<SearchOutlined />} />
                    </Tooltip>
                </div>
            </div>
            {/* 用户表格 */}
            <div className='user-Table'>
                <div>
                    <div>当前表格以选择 <b>{checkNum}</b> 项 <a onClick={clearUserLength}>清空</a></div>
                </div>
                <div className="prodListBottom">
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={userRecords}
                        bordered={true}
                        rowKey="userId"
                        pagination={{ pageSize: 10, total: props.user.userList.total }}
                    />
                </div>
            </div>
            {/* 新增弹出框 */}
            <Modal
                title="新增"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setVisible(false)} >取消</Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        确定
                    </Button>,]}
            >
                <Form form={form} name="dynamic_rule">
                    <Form.Item
                        {...formItemLayout}
                        name="username"
                        label="用户名"
                    >
                        <Input placeholder="登录账号" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="password"
                        label="密码"
                    >
                        <Input type='password' placeholder="密码" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="cfgpassword"
                        label="确认密码"
                    >
                        <Input type='password' placeholder="确认密码" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="email"
                        label="邮箱"
                    >
                        <Input placeholder="邮箱" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="mobile"
                        label="手机号"
                    >
                        <Input placeholder="手机号" />
                    </Form.Item>
                    <Form.Item name="roleIdList" label="Checkbox.Group">
                        <Checkbox.Group>
                            <Row>
                                {
                                    roleRecords && roleRecords.length > 0 ? roleRecords.map(item => {
                                        return (<Col span={8} key={item.roleId}>
                                            <Checkbox value={item.roleId} style={{ lineHeight: '32px' }}>
                                                {item.roleName}
                                            </Checkbox>
                                        </Col>)
                                    }) : null
                                }
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item name="status" label="状态">
                        <Radio.Group>
                            <Radio value={0}>禁用</Radio>
                            <Radio value={1}>正常</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default connect(({ user }: Iuser) => ({ user }))(user);