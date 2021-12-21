import React, { Dispatch, useEffect, useState } from 'react'
import { ConnectRC, connect, useHistory } from 'umi';
import styles from './prodList.less';
import { Table, Button, Form, Input, Pagination, Modal, Radio, Tooltip } from 'antd';
import { IProdListItem,IProdData } from '@/interfaces/index'
import { EditOutlined,DeleteOutlined,SyncOutlined, SearchOutlined } from '@ant-design/icons'
import UserModal from '@/components/usermodal/index'

interface IProps {
    getProdList(payload:IProdData):void,
    prodList:IProdListItem[]
}
interface Markdata {
    key: string,
    title: string
}
const prodList: ConnectRC<IProps> = (props) => {
    const { prodList } = props
    const [current] = useState<number>(1)
    const [size] = useState<number>(10)
    const [status, changestatus] = useState<string>('')
    const [prodName, changenickName] = useState<string>('')
    const [username,setusername] = useState<string>('')
    const [operation,setoperation] = useState<string>('')
    const [flag, setFlag] = useState<boolean>(true)
    const [num, setnum] = useState<number>(0)
    const [form] = Form.useForm();
    const [selectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const columns = [
        {
          title: '产品名字',
          dataIndex: 'prodName',
          width:80,
        },
        {
          title: '商品原价',
          dataIndex: 'oriPrice',
          width:70,
        },
        {
          title: '商品现价',
          dataIndex: 'price',
          width:70,
        },
        {
          title: '商品库存',
          dataIndex: 'totalStocks',
          width:70,
        },
        {
          title: '商品图片',
          dataIndex: 'pic',
          width:160,
          render: (pic: string) => <img src={pic} alt="" />,
        },
        {
          title: '状态',
          dataIndex: 'status',
          width:80,
        },
        {
          title: '操作',
          fixed: 'right',
          width:150,
          render: () => <div className={styles.oper}>
              <Button type="primary" onClick={()=>edit()}><EditOutlined />编辑</Button>
              <Button type="primary" danger onClick={()=>del()}><DeleteOutlined />删除</Button>
          </div>,
        },
      ];
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IProdListItem[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        //   setnum(selectedRows.length)
        }
    };
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
    const edit=()=>{

    }
    const del=()=>{
        
    }
    const onReset=()=>{
        form.resetFields();
    }
    const changeflag = () => {
        setFlag(!flag)
    }
    const onFinish=(value)=>{
        let payload = { t: +new Date,current,size,username:value.username,operation:value.operation }
        // props.getSyslog(payload)
    }
    useEffect(()=>{
        let payload = { t: +new Date, current, size, prodName, status  }
        props.getProdList(payload)
    },[])
    return (
        <div className={styles.topsearch}>
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
                            <Input style={{ width: 140 }} placeholder='用户名' value={username} />
                        </Form.Item>
                        <Form.Item
                            label='用户操作'
                            className={styles.nickname}
                            name="operation"
                        >
                            <Input style={{ width: 140 }} placeholder='用户操作' value={operation} />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
                    <UserModal mockData={mockData} />
                    <Tooltip title="搜索">
                        <Button shape="circle" icon={<SearchOutlined />} onClick={changeflag} />
                    </Tooltip>
                </div>
            </div>
            <div>
                <div><span>当前表格已选择 <b>{num}</b> 项</span><span className={styles.clear}>清空</span></div>
                <Table
                    className={styles.table}
                    align='center'
                    size='middle'
                    rowKey="prodId"
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    scroll={{ x: 900 }}
                    columns={columns}
                    // pagination={false}
                    dataSource={prodList}
                >
                </Table>
            </div>
        </div>
    )
}
const mapStateToProps = (state: any) => {
    console.log('state...', state.prod);
    return {
        prodList: state.prod.prodList,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getProdList: (payload: IProdData) =>
            dispatch({
                type: 'prod/getProdList',
                payload,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(prodList);