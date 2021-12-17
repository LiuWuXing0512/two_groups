import React, { Component, Dispatch, useEffect, useState } from 'react'
import { Form, Input, Button,Table,Pagination,Modal,Radio  } from 'antd';
import { Select } from 'antd';
import { IMemberData,IMemberList,IChangeStatus } from '@/interfaces';
import { ConnectRC, connect, useHistory } from 'umi';
import styles from './user.less';
interface IProps {
    getMemberList(payload:IMemberData):void,
    changeStatus(payload:IChangeStatus):void,
    getModal(userId:string):void,
    records:IMemberList[],
    total:number,
    modalObj:IMemberList
}

const { Option } = Select;
const UserPage: ConnectRC<IProps>=(props)=>{
    const {records,total,modalObj,changeStatus}=props
    const [form] = Form.useForm();
    const [status,changestatus]=useState<string>('')
    const [nickName,changenickName]=useState<string>('')
    const [current]=useState<number>(1)
    const [size]=useState<number>(10)
    const onFinish = (values: any) => {
        let nickName=values.nickName
        changenickName(nickName);
        let payload={current,size,nickName,status}
        props.getMemberList(payload)
    };
    const onReset = () => {
        let status=''
        changestatus(status);
        let nickName=''
        changenickName(nickName);
    };
    const handleChange=(value) => {
        let status=value
        changestatus(status);
    }
    const edit=(userId)=>{
        props.getModal(userId)
        setIsModalVisible(true);
        console.log(userId);
    }
    const changepage=(current)=>{
        let payload={current,size,nickName,status}
        props.getMemberList(payload)
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const [value, setValue] = React.useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        console.log(modalObj.status,e.target.value);
        
        // modalObj.status = e.target.value
    };
    const columns = [
        {
          title: '用户昵称',
          dataIndex: 'nickName',
        },
        {
            title: '用户头像',
            dataIndex: 'pic',
            render:(text:string)=><img src={text}/>
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: (text: number) => <a>{text?'正常' : '禁用'}</a>,
        },
        {
          title: '注册时间',
          dataIndex: 'userRegtime',
        },
        {
            title: '操作',
            dataIndex: 'userId',
            render: (userId:string) => <a onClick={()=>edit(userId)}>编辑</a>,
        },
      ];
    useEffect(() => {
        let payload={current,size,nickName,status}
        props.getMemberList(payload)
    }, []);
    return (<div>
                <div className='topsearch'>
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
                            label='用户昵称'
                            className={styles.nickname}
                            name="nickName"
                        >
                            <Input placeholder='用户昵称' value={nickName}/>
                        </Form.Item>
                        <div className={styles.status}>
                            <span>状态：</span>
                            <Select defaultValue={status} style={{ width: 120 }} onChange={handleChange}>
                                <Option value="1">正常</Option>
                                <Option value="0">禁用</Option>
                            </Select>
                        </div>

                        <Form.Item className={styles.operation} wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                清空
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='count'>
                    <Table
                        size='middle'
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
                                defaultPageSize={10}
                                onChange={(current)=>changepage(current)}
                                defaultCurrent={1}
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
                        <Input placeholder='用户昵称' value={modalObj.nickName} disabled/>
                    </Form.Item>
                    <div>
                        <span>状态：</span>
                        <Radio.Group onChange={onChange} value={modalObj.status}>
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
        records:state.member.records,
        total:state.member.total,
        modalObj:state.member.modalObj
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getMemberList: (payload: IMemberData) =>
            dispatch({
                type: 'member/getMemberList',
                payload,
            }),
        getModal:(userId:string)=>
            dispatch({
                type: 'member/getModal',
                userId,
            }),
        changeStatus:(payload:IChangeStatus)=>
            dispatch({
                type: 'member/getModal',
                payload,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
