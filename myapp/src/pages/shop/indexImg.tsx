import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import { Form, Input, Button, Select,} from 'antd';
import { EditOutlined, DeleteOutlined,} from '@ant-design/icons';
interface IProps { }

const IndexImg: ConnectRC<IProps> = (props) => {
  const { Option } = Select;

  return (<div className="indexImg">
    <Form.Item name="gender" label="启用状态">
      <Select
        placeholder="Select a option and change input text above"
        // onChange={this.onGenderChange}
        allowClear
      >
        <Option value="male">正常</Option>
        <Option value="female">禁止</Option>
      </Select>
    </Form.Item>
  </div>);
};

const mapStateToProps = ({ indexImg }) => {
  return {
    ...indexImg,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getIndexImg: () => {

    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexImg);
