import React, { Dispatch, useState, useEffect } from 'react';
import { ConnectRC, connect } from 'umi';
import { Modal, Button, message, Form, Input, Checkbox } from 'antd';
import { IConfigitem, ICon } from '@/interfaces';

interface IProps {
  getConfigAdd: (payload: IConfigitem) => void;
  getConfig: (payload: ICon) => void;
  id: number;
  setflag(flag: boolean): void;
  // edit: () => void;
}
const ConfigModal = (props: any) => {
  console.log(props, 'zizujian...');
  const { id, hasSelected, edit } = props;
  const { paramKey, paramValue, remark } = props.editObj;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Attribute1, setInp1] = useState<string>('');
  const [Attribute2, setInp2] = useState<string>('');
  const [Attribute3, setInp3] = useState<string>('');

  const showModal = () => {
    setIsModalVisible(true);
    props.setflag(true);
    setInp1('');
    setInp2('');
    setInp3('');
  };
  
  //弹框确认
  const handleOk = async () => {
    if (!hasSelected) {
      if (Attribute1 == '' || Attribute2 == '' || Attribute3 == '') {
        message.error('添加失败');
      } else {
        await props.getConfigAdd({
          paramKey: Attribute1,
          paramValue: Attribute2,
          remark: Attribute3,
        });
        message.success('添加成功');
        setIsModalVisible(false);
        props.setflag(false);
        setInp1('');
        setInp2('');
        setInp3('');
        let payload = { current: 1, size: 10 };
        await props.getConfig(payload);
      }
    } else {
      await props.getConfigTj({
        id: id,
        paramKey: Attribute1,
        paramValue: Attribute2,
        remark: Attribute3,
      });
      message.success('修改成功');
      setIsModalVisible(false);
      props.setflag(false);
      setInp1('');
      setInp2('');
      setInp3('');
      let payload = { current: 1, size: 10 };
      await props.getConfig(payload);
    }
  };

  //弹框关闭
  const handleCancel = () => {
    setInp1('');
    setInp2('');
    setInp3('');
    setIsModalVisible(false);
    props.setflag(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  //输入框
  const setValue1 = (value) => {
    setInp1(value);
    console.log(value, '参数名');
  };

  const setValue2 = (value) => {
    setInp2(value);
  };

  const setValue3 = (value) => {
    setInp3(value);
  };

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        新增
      </Button>
      <Modal
        title={id ? '修改' : '新增'}
        width="700px"
        visible={id ? hasSelected : isModalVisible}
        okText="确定"
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="参数名"
            name="paramKey"
            rules={[{ message: 'Please input your username!' }]}
          >
            <Input
              onChange={(e) => setValue1(e.target.value)}
              value={Attribute1}
              placeholder="参数名"
            />
          </Form.Item>

          <Form.Item
            label="参数值"
            name="paramValue"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              onChange={(e) => setValue2(e.target.value)}
              value={Attribute2}
              placeholder="参数值"
            />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              onChange={(e) => setValue3(e.target.value)}
              value={Attribute3}
              placeholder="备注"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    editObj: state.config.editObj,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getConfigAdd: (payload: IConfigitem) =>
      dispatch({
        type: 'config/getConfigAdd',
        payload,
      }),

    getConfig: (payload: ICon) =>
      dispatch({
        type: 'config/getConfig',
        payload,
      }),
    getConfigTj: (payload: IConfigitem) =>
      dispatch({
        type: 'config/getConfigTj',
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigModal);
