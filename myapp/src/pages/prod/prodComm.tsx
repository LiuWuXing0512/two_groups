import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import {Form,Select,Input,Button}from 'antd';
import {SearchOutlined,DeleteOutlined} from '@ant-design/icons';
// 引入样式
import styles from "./prodTag.less";


// 验证props的类型
interface IProps {

}

const prodList: ConnectRC<IProps> = (props) => {
    // 定义状态
    const [flag, setflag] = useState<Boolean>(true);
    const [form] = Form.useForm();
    const { Option } = Select;
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    // 搜索框确认
    const onFinish = (values: any) => {
        console.log(values);
        // 重新请求数据
        

    };

    // 清空
    const onReset = () => {
        form.resetFields();
    };

    return (
        <div className='prodList'>
            {/* 搜索组件 */}
            {
                flag ? <Form form={form} onFinish={onFinish} className={styles.from}>
                    {/* 标签 */}
                    <Form.Item name="title" label="商品名" className={styles.fromtitle}>
                        <Input placeholder='商品名' className={styles.input} />
                    </Form.Item>
                    {/* 状态 */}
                    <Form.Item name="status" label="审核状态 " className={styles.fromtitle}>
                        <Select
                            placeholder="状态"
                            allowClear
                        >
                            <Option value={1}>正常</Option>
                            <Option value={0}>禁用</Option>
                        </Select>
                    </Form.Item>

                    {/* 按钮 */}
                    <Form.Item {...tailLayout} >
                        <Button type="primary" htmlType="submit" className={styles.btn}>
                            <SearchOutlined />搜索
                        </Button>
                        <Button htmlType="button" onClick={onReset} className={styles.btn}>
                            <DeleteOutlined />清空
                        </Button>
                    </Form.Item>

                </Form> : ''
            }
        </div>
    )
}

const mapStateToProps = (state: any) => {

}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(prodList)
