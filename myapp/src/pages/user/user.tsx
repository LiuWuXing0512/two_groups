import React, { Component, Dispatch, useEffect, useState } from 'react'
import { Form, Input, Button, Table, Pagination, Modal, Radio, Tooltip, Select } from 'antd';
import { IMemberData, IMemberList, IChangeStatus } from '@/interfaces';
import { ConnectRC, connect, useHistory } from 'umi';
import styles from './user.less';
import { SyncOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons'
import UserModal from '@/components/usermodal/index'
interface IProps {
    getMemberList(payload: IMemberData): void,
    changeStatus(payload: IChangeStatus): void,
    getModal(userId: string): void,
    records: IMemberList[],
    total: number,
    modalObj: IMemberList
}
interface Markdata {
    key: string,
    title: string
}
const { Option } = Select;
const UserPage: ConnectRC<IProps> = (props) => {
    const { records, total, modalObj, changeStatus } = props
    const [status, changestatus] = useState<string>('')
    const [nickName, changenickName] = useState<string>('')
    const [current] = useState<number>(1)
    const [size] = useState<number>(10)
    const [value, setValue] = React.useState(1)
    const [flag, setFlag] = useState<boolean>(true)
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        let nickName = values.nickName
        changenickName(nickName);
        let payload = { current, size, nickName, status }
        props.getMemberList(payload)
    };
    const onReset = () => {
        form.resetFields();
    };
    const handleChange = (value) => {
        let status = value
        changestatus(status);
    }
    const edit = async (userId, item) => {
        await props.getModal(userId)
        setValue(item.status)
        setIsModalVisible(true);
    }
    const changepage = (page: number, pageSize: number) => {
        let payload = { current: page, size: pageSize, nickName, status }
        props.getMemberList(payload)
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        let payloads = {
            nickName: modalObj.nickName,
            status: value,
            t: +new Date,
            userId: modalObj.userId,
        }
        props.changeStatus(payloads)
        setIsModalVisible(false);
        let payload = { current, size, nickName, status }
        props.getMemberList(payload)
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const changeflag = () => {
        setFlag(!flag)
    }
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value)
    };
    const coum = [
        {
            key: '1',
            align: 'center',
            title: '用户昵称',
            width: 160,
            dataIndex: 'nickName',
        },
        {
            key: '2',
            align: 'center',
            title: '用户头像',
            width: 160,
            dataIndex: 'pic',
            render: (text: string) => <img src={text} />
        },
        {
            key: '3',
            align: 'center',
            title: '状态',
            width: 160,
            dataIndex: 'status',
            render: (text: number) => <span className={text ? styles.normal : styles.forbidden}>{text ? '正常' : '禁用'}</span>,
        },
        {
            key: '4',
            align: 'center',
            title: '注册时间',
            width: 160,
            dataIndex: 'userRegtime',
        },
        {
            key: '5',
            align: 'center',
            title: '操作',
            width: 160,
            dataIndex: 'userId',
            render: (userId: string, item: IMemberList) => <Button type="primary" onClick={() => edit(userId, item)}><EditOutlined />编辑</Button>,
        },
    ];
    const [columns, setcolumns] = useState<Object[]>(coum)
    const mockData: Markdata[] = [
        {
            key: '1',
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
    useEffect(() => {
        let payload = { current, size, nickName, status }
        props.getMemberList(payload)
    }, []);
    return (<div>{
        flag ?
            <div className={styles.topsearch}>
                <Form
                    className={styles.formbasic}
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    // layout='horizontal'
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label='用户昵称'
                        className={styles.nickname}
                        name="nickName"
                    >
                        <Input style={{ width: 160, height: 26 }} placeholder='用户昵称' value={nickName} />
                    </Form.Item>
                    <Form.Item
                        label='状态'
                        className={styles.status}
                        name="status"
                    >
                        <Select style={{ width: 120 }} placeholder="状态" onChange={handleChange}>
                            <Option value="1">正常</Option>
                            <Option value="0">禁用</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className={styles.operation} wrapperCol={{ offset: 8, span: 16 }}>
                        <div className={styles.operation}> 
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                清空
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div> : <div></div>
    }
        <div className={styles.oper}>
            <div></div>
            <div className={styles.operright}>
                <Tooltip title="刷新">
                    <Button shape="circle" icon={<SyncOutlined />} />
                </Tooltip>
                <UserModal mockData={mockData} setcolumns={setcolumns} coum={coum} />
                <Tooltip title="搜索">
                    <Button shape="circle" icon={<SearchOutlined />} onClick={changeflag} />
                </Tooltip>
            </div>
        </div>
        <div className='count'>
            <Table
                size='middle'
                rowKey="userId"
                columns={columns}
                pagination={false}
                dataSource={records}
            >
            </Table>
            {
                props.records && <div className={styles.page}>
                    <Pagination
                        total={total}
                        showTotal={(total) => `共 ${total} 条`}
                        defaultPageSize={size}
                        onChange={(page, pageSize) => changepage(page, pageSize)}
                        defaultCurrent={current}
                    />
                </div>
            }
        </div>
        <Modal title="修改" width='50%' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>
                <span>用户头像</span>
                <img className={styles.modalimg} src={modalObj.pic} alt="" />
            </p>
            <Form.Item label='用户昵称' >
                <Input placeholder='用户昵称' style={{ width: 240 }} value={modalObj.nickName} disabled />
            </Form.Item>
            <div>
                <span>状态：</span>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={0}>禁用</Radio>
                    <Radio value={1}>正常</Radio>
                </Radio.Group>
            </div>
        </Modal>
    </div>
    )
}

const mapStateToProps = (state: any) => {
    console.log('state...', state.member.records);
    return {
        records: state.member.records,
        total: state.member.total,
        modalObj: state.member.modalObj
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getMemberList: (payload: IMemberData) =>
            dispatch({
                type: 'member/getMemberList',
                payload,
            }),
        getModal: (userId: string) =>
            dispatch({
                type: 'member/getModal',
                userId,
            }),
        changeStatus: (payload: IChangeStatus) =>
            dispatch({
                type: 'member/changeStatus',
                payload,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
