import React, { Dispatch, useEffect, useState } from 'react';
import { Iprod, Record } from '@/interfaces';
import { ConnectRC, connect } from 'umi';
// 引入样式
import styles from "./prodTag.less";
import { Form, Input, Button, Select, Table, Tag, Space, Tooltip, Pagination } from 'antd';
import { DeleteOutlined, SearchOutlined, AppstoreAddOutlined, SyncOutlined, EditOutlined } from '@ant-design/icons';

// 验证mapdistoprops的接口
interface IProps {
    getprod: (payload: Iprod) => void,
    records: Record[]
}

const prodTag: ConnectRC<IProps> = (props) => {
    const { records } = props
    const { Option } = Select;

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };


    const [form] = Form.useForm();

    // 确认
    const onFinish = (values: any) => {
        console.log(values);
        // 重新请求数据
        props.getprod({
            current,
            size,
            title:values.title,
            status:values.status
        })

    };

    // 清空
    const onReset = () => {
        form.resetFields();
    };

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            align: 'center' as 'center'
        },
        {
            title: '标签名称',
            dataIndex: 'title',
            key: 'title',
            align: 'center' as 'center'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center' as 'center',
            render: (status: number) => (<Tag color="blue">{status ? '正常' : '禁止'}</Tag>)
        },
        {
            title: '默认类型',
            key: 'isDefault',
            dataIndex: 'isDefault',
            align: 'center' as 'center',
            render: (isDefault: number) => (<Tag color="blue">{isDefault ? '默认类型' : '自定义类型'}</Tag>)
        },
        {
            title: '排序',
            key: 'seq',
            dataIndex: 'seq',
            align: 'center' as 'center'
        },
        {
            title: '操作',
            align: 'center' as 'center',
            render: () => (
                <>
                    <Button type="primary" onClick={edit} style={{ marginRight: 8 + 'px' }}> <EditOutlined /> 修改</Button>
                    <Button type="primary" onClick={del} danger> <DeleteOutlined /> 删除</Button>
                </>
            ),
        }
    ];

    // 修改
    const edit = () => {
        console.log('2222222222222')
    }

    //删除
    const del = () => {
        console.log('11111111111111');

    }

    // 定义状态
    const [flag, setflag] = useState<Boolean>(true);

    //点击搜索按钮，搜索组件显示隐藏
    const hiddeForm = () => {
        setflag(!flag)
    }

    //定义的变量名   方法       改变的值的类型  current的初始值为1
    const [current,setchange ] = useState<number>(1);
    const [size, setchanges] = useState<number>(10);

    function onShowSizeChange(current:number, pageSize:number) {
        console.log(current, pageSize);
      
        // 定义的方法，当这个方法改变的时候，重新赋值
        setchange(current)
        setchanges(pageSize)

        // 重新请求数据
        props.getprod({
            current:current,
            size:pageSize,
        })
    }

    // 定义生命周期
    useEffect(() => {
        props.getprod({
            current: current,
            size: size,
        })

    }, []);

    // 事件处理函数

    // render内容
    return (<div className='prodTag'>

        {/* 搜索组件 */}
        {
            flag ? <Form form={form} onFinish={onFinish} className={styles.from}>
                {/* 标签 */}
                <Form.Item name="title" label="标签名称" className={styles.fromtitle}>
                    <Input placeholder='标签名称' className={styles.input} />
                </Form.Item>
                {/* 状态 */}
                <Form.Item name="status" label=" 状 态 " className={styles.fromtitle}>
                    <Select
                        placeholder="状态"
                        allowClear
                        className={styles.input}
                    >
                        <Option value="1">正常</Option>
                        <Option value="0">禁用</Option>
                    </Select>
                </Form.Item>

                {/* 按钮 */}
                <Form.Item {...tailLayout} className={styles.fromtitle}>
                    <Button type="primary" htmlType="submit" className={styles.btn}>
                        <SearchOutlined />搜索
                    </Button>
                    <Button htmlType="button" onClick={onReset} className={styles.btn}>
                        <DeleteOutlined />清空
                    </Button>
                </Form.Item>

            </Form> : ''
        }

        <div className={styles.opt}>
            {/* 新增 一系列操作*/}
            <Button type="primary" style={{ marginBottom: 8 + 'px' }} >+ 新增</Button>
            <div>
                <Tooltip title="刷新">
                    <Button shape="circle" icon={<SyncOutlined />} style={{ marginRight: 8 + 'px' }} />
                </Tooltip>

                <Tooltip title="显隐">
                    <Button shape="circle" icon={<AppstoreAddOutlined />} style={{ marginRight: 8 + 'px' }} />
                </Tooltip>

                <Tooltip title="搜索">
                    <Button shape="circle" icon={<SearchOutlined />} style={{ marginRight: 8 + 'px' }} onClick={hiddeForm} />
                </Tooltip>
            </div>

        </div>


        {/* 表格 */}
        <Table bordered={true} columns={columns} dataSource={records} pagination={false} />

        <Pagination
            className={styles.page}
            total={records.length}
            showSizeChanger
            showQuickJumper
            onShowSizeChange={onShowSizeChange}
            showTotal={total => `Total ${total} items`}
        />,

    </div>)
}

const mapStateToProps = (state: any) => {
    console.log(state.prod, 'ddddddddddddddddddd');
    return {
        records: state.prod.records
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getprod: (payload: Iprod) => dispatch({
            type: 'prod/getprod',
            payload
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(prodTag);