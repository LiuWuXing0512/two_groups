import { HotSearchState } from '@/models/hotSearch';
import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import { Form, Input, Button, Space, Radio, InputNumber } from 'antd';
import { IRecordsItem } from '@/interfaces';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface IProps {
  flag: boolean;
  addhotSearch: (payload: IRecordsItem) => void;
  headleModal: () => void;
}

const AddhotSearch: ConnectRC<IProps> = (props) => {
  const [form] = Form.useForm();

  const [status, setStatus] = useState<number>(0);

  const [number, setNumber] = useState<{
    value: number;
  }>({
    value: 0,
  });

  const onNumberChange = (value: number) => {
    setNumber({
      value,
    });
  };

  const validatePrimeNumber = (number: number) => {
    if (number <= 0) {
      setNumber({
        value: 0,
      });
    }
  };
  const onFinish = (values: any) => {
    console.log(values);
    const obj = {
      ...form.getFieldsValue(),
      seq: number.value,
      status,
    };
    props.addhotSearch(obj);
    const load = setTimeout(() => {
      clearTimeout(load);
      props.headleModal();
      form.resetFields();
    }, 1000);
  };

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setStatus(e.target.value);
  };

  console.log('props...', props);
  return (
    <div className="addhotSearch">
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="title" label="热搜标题">
          <Input placeholder="热搜标题" />
        </Form.Item>
        <Form.Item name="content" label="热搜内容">
          <Input placeholder="热搜内容" />
        </Form.Item>
        <Form.Item label="顺序">
          <InputNumber min={0} value={number.value} onChange={onNumberChange} />
        </Form.Item>
        {/* <Form.Item name="status" label="启用状态"> */}
        <div style={{ display: 'flex',justifyContent:'center' }}>
          <span>状态：</span>
          <Radio.Group onChange={onChange} value={status}>
            <Space direction="vertical">
              <Radio value={0}>未启用</Radio>
              <Radio value={1}>启用</Radio>
            </Space>
          </Radio.Group>
        </div>
        {/* </Form.Item> */}
        <Form.Item {...tailLayout}>
          <Button
            htmlType="button"
            onClick={() => {
              props.headleModal();
              form.resetFields();
              setNumber({
                value: 0,
              });
            }}
          >
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ hotSearch }: { hotSearch: HotSearchState }) => {
  return {
    ...hotSearch,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addhotSearch: (payload: IRecordsItem) => {
      dispatch({
        type: 'hotSearch/addhotSearch',
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddhotSearch);
