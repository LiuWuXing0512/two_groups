import React,{Dispatch,useState,useEffect} from 'react'
import { Form, Input, Button, Table, Pagination, Modal, Radio, Tooltip } from 'antd';
import { ConnectRC, connect, useHistory } from 'umi';
import { ISysLogData } from '@/interfaces';
import { SyncOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons'
import UserModal from '@/components/usermodal/index'
import styles from './log.less';
interface IProps {
    getSyslog(payload:ISysLogData):void
}
interface Markdata {
    key: string,
    title: string
}
const Syslog:ConnectRC<IProps> = (props) => {
    const [current] = useState<number>(1)
    const [size] = useState<number>(10)
    const [flag, setFlag] = useState<boolean>(true)
    const onFinish=()=>{

    }
    const onReset=()=>{

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
    useEffect(()=>{
        let payload={
            t: +new Date,
            current,
            size
        }
        props.getSyslog(payload)
    })
    return (
        <div>
            {
                flag ?
                <div className={styles.topsearch}>
                    <Form
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
                            name="nickName"
                        >
                            <Input placeholder='用户名' value={'nickName'} />
                        </Form.Item>
                        <Form.Item
                            label='用户操作'
                            className={styles.nickname}
                            name="nickName"
                        >
                            <Input placeholder='用户操作' value={'nickName'} />
                        </Form.Item>
                        <Form.Item className={styles.operation} wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                清空
                            </Button>
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
                    <UserModal mockData={mockData} />
                    <Tooltip title="搜索">
                        <Button shape="circle" icon={<SearchOutlined />} onClick={changeflag} />
                    </Tooltip>
                </div>
            </div>
            <div className='count'>
                {/* <Table
                    size='middle'
                    rowKey="userId"
                    columns={columns}
                    pagination={false}
                    dataSource={records}
                >
                </Table> */}
            </div>
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
        getSyslog: (payload: ISysLogData) =>
            dispatch({
                type: 'sys/getSyslog',
                payload,
            }),
        // getModal: (userId: string) =>
        //     dispatch({
        //         type: 'member/getModal',
        //         userId,
        //     }),
        // changeStatus: (payload: IChangeStatus) =>
        //     dispatch({
        //         type: 'member/changeStatus',
        //         payload,
        //     }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Syslog);