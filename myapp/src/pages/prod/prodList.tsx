import React, { Dispatch, useEffect, useState } from 'react'
import { ConnectRC, connect } from 'umi';
import styles from './prodList.less';
import { Table, Button, Form, Input, Pagination, Tooltip, Select } from 'antd';
import { IProdListItem,IProdData } from '@/interfaces/index'
import { EditOutlined,DeleteOutlined,SyncOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import UserModal from '@/components/usermodal/index'

interface IProps {
    getProdList(payload:IProdData):void,
    editProdList(id:number):void,
    prodList:IProdListItem[],
    prodListtotal:number,
}
interface Markdata {
    key: string,
    title: string
}
interface Columns {
    key:string,
    title: string,
    dataIndex: string,
    align:string,
    width:number,
    fixed?:string,
    render?:Function
}
const { Option } = Select;
const prodList: ConnectRC<IProps> = (props) => {
    const { prodList,prodListtotal,editProdList } = props
    const [current] = useState<number>(1)
    const [size] = useState<number>(10)
    const [status, changestatus] = useState<string>('')
    const [prodName] = useState<string>('')
    const [username] = useState<string>('')
    const [flag, setFlag] = useState<boolean>(true)
    const [num, setnum] = useState<number>(0)
    const [form] = Form.useForm();
    const [selectionType] = useState<'checkbox' | 'radio'>('checkbox');
    const coum:Columns[]=[
        {
          key:'1',
          title: '产品名字',
          dataIndex: 'prodName',
          align:'center',
          width:80,
        },
        {
          key:'2',
          title: '商品原价',
          dataIndex: 'oriPrice',
          align:'center',
          width:70,
        },
        {
          key:'3',
          title: '商品现价',
          dataIndex: 'price',
          align:'center',
          width:70,
        },
        {
          key:'4',
          title: '商品库存',
          dataIndex: 'totalStocks',
          align:'center',
          width:70,
        },
        {
          key:'5',
          title: '商品图片',
          dataIndex: 'pic',
          align:'center',
          width:160,
          render: (pic: string) => <img src={pic} alt="" />,
        },
        {
          key:'6',
          title: '状态',
          dataIndex: 'status',
          align:'center',
          render: (text: number) => <span className={text ? styles.normal : styles.forbidden}>{text ? '上架' : '未上架'}</span>,
          width:80,
        },
        {
          key:'7',
          title: '操作',
          fixed: 'right',
          align:'center',
          dataIndex: 'prodId',
          width:150,
          render: (prodId) => <div className={styles.oper}>
              <Button type="primary" onClick={()=>edit(prodId)}><EditOutlined />编辑</Button>
              <Button type="primary" danger onClick={()=>del()}><DeleteOutlined />删除</Button>
          </div>,
        },
      ];
    const [columns, setcolumns] = useState<Object[]>(coum)
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IProdListItem[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setnum(selectedRows.length)
        }
    };
    const mockData: Markdata[] = [
        {
            key: '1',
            title: '产品名字',
        },
        {
            key: '2',
            title: '商品原价',
        },
        {
            key: '3',
            title: '商品现价',
        },
        {
            key: '4',
            title: '商品库存',
        },
        {
            key: '5',
            title: '商品图片',
        },
        {
            key: '6',
            title: '状态',
        }
    ];
    const edit=async (prodId)=>{
        await editProdList(prodId)
        props.history.push(`/prod/prodInfo?prodId=${prodId}`)
    }
    const del=()=>{
        console.log(props);
    }
    const add=()=>{
        props.history.push(`/prod/prodInfo`)
    }
    const alldel=()=>{
        
    }
    const onReset=()=>{
        form.resetFields();
    }
    const changeflag = () => {
        setFlag(!flag)
    }
    const handleChange = (value) => {
        let status = value
        changestatus(status);
    }
    const onFinish=(value)=>{
        console.log(value);
        let payload = { t: +new Date,current,size,prodName:value.username,status:value.status }
        props.getProdList(payload)
    }
    const changepage = (page:number,pageSize:number) => {
        let payload = { t: +new Date,current:page,size:pageSize }
        props.getProdList(payload)
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
                            className={styles.username}
                            name="username"
                        >
                            <Input style={{ width: 160, height:26 }} placeholder='用户名' value={username} />
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
                <div className={styles.primary}>
                    <Button type="primary" onClick={()=>add()}><PlusOutlined />新增</Button>
                    <Button type="primary" disabled={num? false : true} danger onClick={()=>alldel()}><DeleteOutlined />删除</Button>
                </div>
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
            <div>
                <div><span>当前表格已选择 <b>{num}</b> 项</span><span className={styles.clear}>清空</span></div>
                <Table
                    className={styles.table}
                    size='middle'
                    rowKey="prodId"
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    scroll={{ x: 900 }}
                    columns={columns}
                    pagination={false}
                    dataSource={prodList}
                >
                </Table>
            </div>
            <div className={styles.page}>
                <Pagination
                    total={prodListtotal}
                    showTotal={(total) => `共 ${total} 条`}
                    defaultPageSize={size}
                    showSizeChanger
                    onChange={(page,pageSize) => changepage(page,pageSize)}
                    defaultCurrent={current}
                />
            </div>
        </div>
    )
}
const mapStateToProps = (state: any) => {
    console.log('state...', state.prod);
    return {
        prodList: state.prod.prodList,
        prodListtotal: state.prod.prodListtotal,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getProdList: (payload: IProdData) =>
            dispatch({
                type: 'prod/getProdList',
                payload,
            }),
        editProdList: (id: number) =>
            dispatch({
                type: 'prod/editProdList',
                id,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(prodList);