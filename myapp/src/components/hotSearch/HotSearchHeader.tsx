import { HotSearchState } from '@/models/hotSearch';
import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import { Form, Input, Button, Select } from 'antd';
import './hotSearchHeader.less'
const { Option } = Select;

interface IProps {
    hotSearchList: (payload:IFrom) => void;
    flag:boolean;
}

const HotSearchHeader: ConnectRC<IProps> = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values: IFrom) => {
    props.hotSearchList(values)
  };

  const onReset = () => {
    form.resetFields();
  };

    console.log('props...', props);
  return (
    <div className="hotSearchHeader">
      {
        props.flag? <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="title" label="热搜标题">
          <Input placeholder="热搜标题" />
        </Form.Item>
        <Form.Item name="content" label="热搜内容">
          <Input placeholder="热搜内容" />
        </Form.Item>
        <Form.Item name="status" label="启用状态">
          <Select placeholder="启用状态" allowClear>
            <Option value="0">未启用</Option>
            <Option value="1">启用</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.gender !== currentValues.gender
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button htmlType="button" onClick={onReset}>
            清空
          </Button>
        </Form.Item>
      </Form>:null
      }
    </div>
  );
};

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 24  },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 10 },
};

export interface IFrom {
  title: string;
  content: string;
  status: string | number;
}

const mapStateToProps = ({ hotSearch }: { hotSearch: HotSearchState }) => {
  return {
    ...hotSearch,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    hotSearchList: (payload:IFrom) =>
      dispatch({
        type: 'hotSearch/hotSearchList',
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotSearchHeader);
