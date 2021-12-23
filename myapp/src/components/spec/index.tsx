import React, { Dispatch, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import { Modal, Button, message, Space } from 'antd';
import { Records, ISpec } from '@/interfaces';

interface IProps {
  getAdd: (payload: Records) => void;
  getSpec: (payload: ISpec) => void;
}
const ModalTab = (props: IProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Attribute, setInp] = useState('');
  const [values, setValue] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  //弹框确认
  const handleOk = async () => {
    if (!Attribute || !values) {
      message.error(`不能为空`);
    } else {
      await props.getAdd({
        propName: Attribute,
        prodPropValues: [{ valueId: 0, propValue: values }],
        rule: 0,
      });
      await props.getSpec({ current: 1, size: 10 });
      message.success('添加成功');
      setIsModalVisible(false);
      setInp('');
      setValue('');
    }
  };

  //弹框关闭
  const handleCancel = () => {
    setIsModalVisible(false);
    setInp('');
    setValue('');
  };

  const ChangeOne = (aaa: React.SetStateAction<string>) => {
    setInp(aaa);
  };

  const ChangeTwo = (bbb: React.SetStateAction<string>) => {
    setValue(bbb);
  };

  const add = (e: any) => {
    const btn = document.querySelector('.btn');
    const td = document.querySelector('.text');
    if (btn) {
      if (!btn.previousElementSibling.value != '') {
        console.log('kong');
      } else {
        const parent = td?.innerHTML;
        console.log(parent);

        const inp = document.createElement('input');
        td?.insertBefore(inp, btn);
      }
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        新增
      </Button>
      <Modal
        title="新增"
        width="870px"
        visible={isModalVisible}
        okText="确定"
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
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
                <Button className="btn" onClick={(e) => add(e)}>
                  +
                </Button>
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
    getAdd: (payload: Records) =>
      dispatch({
        type: 'spec/getAdd',
        payload,
      }),

    getSpec: (payload: ISpec) =>
      dispatch({
        type: 'spec/getSpec',
        payload,
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalTab);