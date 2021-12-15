import React, { Component, Dispatch } from 'react'
import { Form, Input, Button } from 'antd';
import { Select } from 'antd';
import { IMemberData } from '@/interfaces';
import { ConnectRC, connect, useHistory } from 'umi';

interface IProps {
    getMemberList(payload:IMemberData):void
}

const { Option } = Select;
class UserPage extends Component<IProps>{
    onFinish = (values: any) => {
        console.log('Success:', values);
    };
    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    onReset = () => {
        console.log(this.props,'props......');
        this.props.getMemberList({current:2,size:10})
        // form.resetFields();
    };
    handleChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        return (
            <div>
                <div className='topsearch'>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        // layout='horizontal'
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Select defaultValue="" style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    console.log('state...', state);
    return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getMemberList: (payload: IMemberData) =>
            dispatch({
                type: 'member/getMemberList',
                payload,
            }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
