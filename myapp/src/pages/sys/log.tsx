import React, { Dispatch, useState, useEffect } from 'react'
import { Form, Input, Button, Table, Pagination, Tooltip } from 'antd';
import { ConnectRC, connect, useHistory } from 'umi';
import { ISysLogData, ISysLogItem } from '@/interfaces';
import { SyncOutlined, SearchOutlined } from '@ant-design/icons'
import UserModal from '@/components/usermodal/index'
import styles from './log.less';
interface IProps {
    getSyslog(payload: ISysLogData): void,
    syslogList: ISysLogItem[],
    syslogpages: number,
    syslogtotal: number,
}
interface Markdata {
    key: string,
    title: string
}
const Syslog: ConnectRC<IProps> = (props) => {
    const { syslogList, syslogpages, syslogtotal } = props
    const [current] = useState<number>(1)
    const [username, setusername] = useState<string>('')
    const [operation, setoperation] = useState<string>('')
    const [size] = useState<number>(10)
    const [flag, setFlag] = useState<boolean>(true)
    const [num, setnum] = useState<number>(0)
    const [form] = Form.useForm();
    const onFinish = (value) => {
        let payload = { t: +new Date, current, size, username: value.username, operation: value.operation }
        props.getSyslog(payload)
    }
    const onReset = () => {
        form.resetFields();
    }
    const changeflag = () => {
        setFlag(!flag)
    }
    const mockData: Markdata[] = [
        {
            key: '1',
            title: '用户名',
        },
        {
            key: '2',
            title: '用户操作',
        },
        {
            key: '3',
            title: '请求方法',
        },
        {
            key: '4',
            title: '请求参数',
        },
        {
            key: '5',
            title: '执行时长(毫秒)',
        },
        {
            key: '6',
            title: 'IP地址',
        },
        {
            key: '7',
            title: '创建时间',
        },
    ];
    const coum = [
        {
            key: '1',
            title: '用户名',
            align: 'center',
            dataIndex: 'username'
        },
        {
            key: '2',
            title: '用户操作',
            align: 'center',
            dataIndex: 'operation'
        },
        {
            key: '3',
            title: '请求方法',
            align: 'center',
            dataIndex: 'method'
        },
        {
            key: '4',
            title: '请求参数',
            align: 'center',
            dataIndex: 'params'
        },
        {
            key: '5',
            title: '执行时长(毫秒)',
            align: 'center',
            dataIndex: 'time'
        },
        {
            key: '6',
            title: 'IP地址',
            align: 'center',
            dataIndex: 'ip'
        },
        {
            key: '7',
            title: '创建时间',
            align: 'center',
            dataIndex: 'createDate'
        },
    ];
    const [columns, setcolumns] = useState<Object[]>(coum)
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ISysLogItem[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setnum(selectedRows.length)
        }
    };
    const changepage = (page: number, pageSize: number) => {
        let payload = { t: +new Date, current: page, size: pageSize }
        props.getSyslog(payload)
    }
    const [selectionType] = useState<'checkbox' | 'radio'>('checkbox');
    useEffect(() => {
        let payload = { t: +new Date, current, size }
        props.getSyslog(payload)
    }, [])
    return (
        <div>
            {
                flag ?
                    <div className={styles.topsearch}>
                        <Form
                            form={form}
                            className={styles.formbasic}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            // layout='horizontal'
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label='用户名'
                                className={styles.nickname}
                                name="username"
                            >
                                <Input style={{ width: 140, height: 26 }} placeholder='用户名' value={username} />
                            </Form.Item>
                            <Form.Item
                                label='用户操作'
                                className={styles.nickname}
                                name="operation"
                            >
                                <Input style={{ width: 160, height: 26 }} placeholder='用户操作' value={operation} />
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
                    <UserModal mockData={mockData} setcolumns={setcolumns} coum={coum}/>
                    <Tooltip title="搜索">
                        <Button shape="circle" icon={<SearchOutlined />} onClick={changeflag} />
                    </Tooltip>
                </div>
            </div>
            <div className='count'>
                <div><span>当前表格已选择 <b>{num}</b> 项</span><span className={styles.clear}>清空</span></div>
                <Table
                    size='middle'
                    rowKey="id"
                    scroll={{ y: 3000 }}
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    pagination={false}
                    dataSource={syslogList}
                >
                </Table>
            </div>
            <div className={styles.page}>
                <Pagination
                    total={syslogtotal}
                    showTotal={(total) => `共 ${total} 条`}
                    defaultPageSize={size}
                    onChange={(page, pageSize) => changepage(page, pageSize)}
                    defaultCurrent={current}
                />
            </div>
        </div>
    )
}
const mapStateToProps = (state: any) => {
    console.log('state...', state.sys);
    return {
        syslogList: state.sys.syslogList,
        syslogtotal: state.sys.syslogtotal,
        syslogpages: state.sys.syslogpages
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getSyslog: (payload: ISysLogData) =>
            dispatch({
                type: 'sys/getSyslog',
                payload,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Syslog);
