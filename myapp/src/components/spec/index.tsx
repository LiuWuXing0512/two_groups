import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect, useHistory } from 'umi';
import { Modal, Button, Table,Input} from 'antd';
const { Column} = Table;
export const ModalTab = (props: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  //弹框关闭
  const handleOk = (props: any) => {
    setIsModalVisible(false);
  };

  //弹框确认
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        新增
      </Button>
      <Modal
        title="新增"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table bordered>
        <Column
            align="center"
            title="属性新增"
            dataIndex="propId"
            key="firstName"
          />
           <Column
            align="center"
            title="属性值"
            dataIndex="propId"
            key="firstName"
          />
        </Table>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModalTab);
