import React, { Dispatch, useEffect, useState } from 'react';
import { Iprod, Record, Dprod, Eprod } from '@/interfaces';
import { ConnectRC, connect } from 'umi';
// 引入样式
import styles from "./prodTag.less";
import { Form, Input, Button, Select, Table, Tag, Tooltip, Pagination, Modal, Alert, Radio } from 'antd';
import { DeleteOutlined, SearchOutlined, AppstoreAddOutlined, SyncOutlined, EditOutlined } from '@ant-design/icons';
// 引入封装的组件
import AddModal from '@/components/prod/modal'
// import EditModal from '@/components/prod/edit'


// 验证mapDispatchToProps，mapStateToProps的接口
interface IProps {
    getprod: (payload: Iprod) => void,
    records: Record[],
    total: number,
    delProd: (payload: Dprod) => void,
    getProdEdit: (payload: Dprod) => void,
    edititem: Eprod,
    editProd: (payload: Eprod) => void
}

const prodTag: ConnectRC<IProps> = (props) => {
    // 定义状态
    const [flag, setflag] = useState<Boolean>(true);
    //定义的变量名   方法       改变的值的类型  current的初始值为1
    const [current, setchange] = useState<number>(1);
    const [size, setchanges] = useState<number>(10);
    // 弹框
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isdelectVisible, setIsdelectVisible] = useState(false)
    const [iseditVisible, setIsedittVisible] = useState(false)
    const [ischoseVisible, setIschoseVisible] = useState(false)
    // 删除存id
    const [delid, setid] = useState(0)

    // 从props上传参
    const { records, total, edititem } = props

    // 定义生命周期
    useEffect(() => {
        props.getprod({
            current: current,
            size: size,
        })

    }, []);

    const { Option } = Select;

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const [form] = Form.useForm();
    const [forms] = Form.useForm();

    // 搜索框确认
    const onFinish = (values: any) => {
        console.log(values);
        // 重新请求数据
        props.getprod({
            current,
            size,
            title: values.title,
            status: values.status
        })

    };

    // 清空
    const onReset = () => {
        form.resetFields();
    };

    // table表格的渲染
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            align: 'center' as 'center',
            sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
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
            render: (status: number) => (<Tag color={status ? 'processing' : 'error'}>{status ? '正常' : '禁止'}</Tag>)
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
            dataIndex: 'id',
            // render: (row) => (
            //     <>
            //         <Button type="primary" onClick={() => { edit(row) }} style={{ marginRight: 8 + 'px' }}> <EditOutlined /> 修改</Button>
            //         <Button type="primary" onClick={() => { del(row.id) }} danger> <DeleteOutlined /> 删除{row.id}</Button>
            //     </>
            // ),
            render: (id) => (
                <>
                    <Button type="primary" onClick={() => { edit(id) }} style={{ marginRight: 8 + 'px' }}> <EditOutlined /> 修改</Button>
                    <Button type="primary" onClick={() => { del(id) }} danger> <DeleteOutlined /> 删除{id}</Button>
                </>
            ),
        }
    ];

    // 新增
    const showModal = () => {
        setIsModalVisible(true);
    };

    // 修改
    // const edit =  (item) => {
    //     setIsedittVisible(true)
    //     forms.setFieldsValue(item)
    //     console.log(forms.getFieldsValue);   
    // }
    const edit = async (id) => {
        await props.getProdEdit(id)
        setIsedittVisible(true);
    }

    useEffect(() => {
        forms.setFieldsValue(edititem)
    }, [edititem]);

    //删除
    const del = (id) => {
        setIsdelectVisible(true)
        setid(id)
    }


    //点击搜索按钮，搜索组件显示隐藏
    const hiddeForm = () => {
        setflag(!flag)
    }

    function onShowSizeChange(current: number, pageSize: number) {
        console.log(current, pageSize);
        // 定义的方法，当这个方法改变的时候，重新赋值
        setchange(current)
        setchanges(pageSize)
        // 重新请求数据
        props.getprod({
            current: current,
            size: pageSize,
        })
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };


    const handleCancel = () => {
        // 新增
        setIsModalVisible(false);
        // 删除
        setIsdelectVisible(false);
        // 编辑
        setIsedittVisible(false);
        // 显隐
        setIschoseVisible(false)
    };

    const onOk = () => {
        // 获取当前的id
        console.log(delid, '要删除的id');
        // 发送删除请求
        props.delProd({ id: delid })
        // 关闭弹框
        setIsdelectVisible(false)
    }

    // 分页的api，接收两个参数
    function onChange(pageNumber, pageSize) {
        console.log('Page当前页: ', pageNumber);
        console.log('一页几条:', pageSize);
        // 重新请求数据
        props.getprod({
            current: pageNumber,
            size: pageSize,
        })

    }

    const Chose = () => {
        setIschoseVisible(true)
    }

    // 修改完成后，打印修改的数据
    const onEdit = (values: any) => {
        // console.log(values,'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
        props.editProd({
            ...edititem,
            ...values
        })
        // 重新请求数据
        props.getprod({
            current,
            size,
        })
        // 同时关闭弹框
        setIsedittVisible(false);
    }


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
                        <Option value={1}>正常</Option>
                        <Option value={0}>禁用</Option>
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
            <Button type="primary" style={{ marginBottom: 8 + 'px' }} onClick={showModal}>+ 新增</Button>
            <div>
                <Tooltip title="刷新">
                    <Button shape="circle" icon={<SyncOutlined />} style={{ marginRight: 8 + 'px' }} />
                </Tooltip>

                <Tooltip title="显隐">
                    <Button shape="circle" icon={<AppstoreAddOutlined />} style={{ marginRight: 8 + 'px' }} onClick={Chose} />
                </Tooltip>

                <Tooltip title="搜索">
                    <Button shape="circle" icon={<SearchOutlined />} style={{ marginRight: 8 + 'px' }} onClick={hiddeForm} />
                </Tooltip>
            </div>

        </div>


        {/* 表格 */}
        <Table bordered={true} columns={columns} dataSource={records} pagination={false} rowKey='id' />

        {/* 分页 */}
        <Pagination
            className={styles.page}
            total={total}
            showSizeChanger
            showQuickJumper
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            showTotal={total => `共 ${total} 条`}
        />

        {/* 点击新增，出现的弹框 */}
        <Modal title="新增"
            width={'50%'}
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <AddModal
                handleCancel={handleCancel}
                handleOk={handleOk} />
        </Modal>

        {/* 点击编辑，出现编辑提示框 */}
        <Modal title="修改"
            width={'50%'}
            visible={iseditVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                form={forms}
                onFinish={onEdit}
                autoComplete="off"
                labelAlign='right'
            >

                <Form.Item
                    label="标签名字"
                    name='title'
                    rules={[{ required: true, message: '标签名称不能为空' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="status" label="状态">
                    <Radio.Group>
                        <Radio value={1}>正常</Radio>
                        <Radio value={0}>禁用</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item name="style" label="列表样式">
                    <Radio.Group>
                        <Radio value={0}>一列一个</Radio>
                        <Radio value={1}>一列两个</Radio>
                        <Radio value={2}>一列三个</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="排序"
                    name="seq"
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 18, span: 24 }}>
                    <Button onClick={handleCancel} style={{ marginRight: '5px' }}>
                        取消
                    </Button>
                    <Button type="primary" htmlType="submit">
                        确认
                    </Button>
                </Form.Item>

            </Form>

        </Modal>


        {/* 点击删除，出现删除提示框 */}
        <Modal title="提示"
            width={'50%'}
            visible={isdelectVisible}
            onCancel={handleCancel}
            onOk={onOk}
            okText="确认"
            cancelText="取消"
        >
            <Alert message="确定进行删除操作" banner />

        </Modal>

        {/* 点击显隐藏，出现弹框 */}
        <Modal title="多 选"
            width={'50%'}
            visible={ischoseVisible}
            onCancel={handleCancel}
            footer={null}
        >

        </Modal>


    </div>)
}

const mapStateToProps = (state: any) => {
    // console.log(state.prod, 'ddddddddddddddddddd');
    return {
        records: state.prod.records,
        total: state.prod.total,
        edititem: state.prod.edit
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getprod: (payload: Iprod) => dispatch({
            type: 'prod/getprod',
            payload
        }),
        delProd: (payload: Dprod) => dispatch({
            type: 'prod/delProd',
            payload
        }),
        getProdEdit: (payload: Dprod) => dispatch({
            type: 'prod/getProdEdit',
            payload
        }),
        editProd: (payload: Eprod) => dispatch({
            type: 'prod/editProd',
            payload
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(prodTag);