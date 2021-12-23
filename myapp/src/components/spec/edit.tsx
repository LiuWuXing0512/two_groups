import React, { Dispatch, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import { Modal, Button, message, Space } from 'antd';
import { Records, ISpec } from '@/interfaces';

interface IProps {
  getEdit: (payload: Records) => void;
  getSpec: (payload: ISpec) => void;
}
const Edits = (props: any) => {
  const [Attribute, setInp] = useState('');
  const [values, setValue] = useState('');
  const { editflag } = props;
  console.log(props);

  //弹框确认
  const handleOk = async () => {
    if (!Attribute || !values) {
      message.error(`不能为空`);
    } else {
      await props.getEdit({
        propName: Attribute,
        prodPropValues: [{ valueId: 0, propValue: values }],
        rule: 0,
      });
    }
  };

  //弹框关闭
  const handleCancel = () => {
    setInp('');
    setValue('');
  };

  const ChangeOne = (aaa: React.SetStateAction<string>) => {
    setInp(props.record.propName);
  };

  const ChangeTwo = (bbb: React.SetStateAction<string>) => {
    setValue(props.record.prodPropValues[0].propValue);
  };

  return (
    <div>
      <Modal
        title="修改"
        width="870px"
        visible={editflag}
        okText="确定"
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={true}
      >
        <table
          width="850px"
          height="150px"
          border="1"
          cellspacing="0"
          cellpadding="0"
        >
          <thead>
            <tr>
              <td>属性名称</td>
              <td>属性值</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  onChange={(e) => ChangeOne(e.target.value)}
                  value={Attribute}
                  type="text"
                />
              </td>
              <td className="text">
                <input
                  onChange={(e) => ChangeTwo(e.target.value)}
                  value={values}
                  type="text"
                />

                <Button className="btn">+</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getSpec: (payload: ISpec) =>
      dispatch({
        type: 'spec/getSpec',
        payload,
      }),

    getEdit: (payload: Records) =>
      dispatch({
        type: 'spec/getEdit',
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edits);
