import { HotSearchState, IPage } from '@/models/hotSearch';
import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import {
  Button,
  Pagination,
  Table,
  Tooltip,
  Modal,
  Form,
  Input,
  Space,
  Transfer,
  Radio,
  InputNumber,
} from 'antd';
import HotSearchHeader from '@/components/hotSearch/HotSearchHeader';
import {
  SyncOutlined,
  AppstoreOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import styles from './hotSearch.less';
import { IRecordsItem } from '@/interfaces';
import AddhotSearch from '@/components/hotSearch/AddhotSearch';

interface IProps extends HotSearchState {
  hotSearchList: () => void;
  hotSearchSum: (payload: number[]) => void;
  hotPage: (payload: IPage) => void;
  puthotSearchSum: (payload: IRecordsItem) => void;
}

const HotSearch: ConnectRC<IProps> = (props) => {
  // 批量删除状态
  const [Disabled, setDisabled] = useState<boolean>(true);
  // 搜索隐藏显示
  const [flag, setFlag] = useState<boolean>(true);
  // 加载
  const [loading, setLoading] = useState<boolean>(false);
  // 显示隐藏
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 回显表单
  let [form] = Form.useForm();
  // 保存要修改的数据
  const [Item, setItem] = useState<IRecordsItem>({} as IRecordsItem);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [editStatus, setEditStatus] = useState<number>(0);
  const operator = [
    {
      title: '操作',
      render: (record: { hotSearchId: React.Key | null | undefined }) => {
        return (
          <div>
            <Button
              style={{ marginRight: '5px' }}
              type="primary"
              onClick={() => headleEdit(record)}
            >
              <EditOutlined />
              编辑
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => headleSum([record.hotSearchId])}
            >
              <DeleteOutlined />
              删除
            </Button>
          </div>
        );
      },
    },
  ]
  useEffect(() => {
    props.hotSearchList();
  }, []);
  // 页码
  const onChange = (pageNumber: number, sizeNumber: number) => {
    props.hotPage({
      size: sizeNumber,
      current: pageNumber ? pageNumber : 1,
    });
  };
  // 删除
  const headleSum = (info) => {
    headleLoading();
    props.hotSearchSum(info);
  };
  // 多选
  const onChangeCheck = (selectedRowKeys: number[]) => {
    console.log(selectedRowKeys, 'selectedRows...124');

    setSelectedRowKeys(selectedRowKeys as number[]);
    setDisabled(!selectedRowKeys.length);
  };

  const validatePrimeNumber = (number: number) => {
    if (number <= 0) {
      setNumber({
        value: 0,
      });
    }
  };
  // 编辑
  const headleEdit = (item) => {
    console.log(item);

    setIsModalVisible(true);
    // 回显
    form.setFieldsValue(item);
    setItem(item);
    setEditStatus(item.status);
    setNumber({
      value: item.seq,
    });
  };
  // 点击确定
  const handleOk = () => {
    setIsModalVisible(false);
    const obj = {
      ...Item,
      ...form.getFieldsValue(),
      seq: number.value,
      status: editStatus,
    };
    props.puthotSearchSum(obj);
  };
  // 取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // table懒加载
  const headleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  // 顺序数据
  const [number, setNumber] = useState<{
    value: number;
  }>({
    value: 11,
  });
  // 加减顺序
  const onNumberChange = (value: number) => {
    setNumber({
      value,
    });
  };

  const rowSelection = {
    onChange: onChangeCheck,
    selectedRowKeys,
  };
  // 取消modal一切操作
  const HandleCancel = () => {
    setModal(false);
  };
  // 关闭modal
  const headleModal = () => {
    setModal(false);
  };
  // 编辑 radio选项
  const onChangeEdit = (e) => {
    console.log('radio checked', e.target.value);
    setEditStatus(e.target.value);
  };

  const [transfer, setTransfer] = useState<boolean>(false);
  const [columnsData,seColumnsData] = useState(columns)
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [TargetselectedKeys, setTargetSelectedKeys] = useState<string[]>([]);
  useEffect(() => {
    setTargetKeys(columnsData.map(v=>v.key))
  }, []);
  const onTargetChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
    seColumnsData(columns.filter(v=>nextTargetKeys.indexOf(v.key)!==-1));
    // const item=
    // console.log(item,'189');
    
  };

  const onTargetSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setTargetSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <div className="hotSearch">
      <HotSearchHeader flag={flag} />
      <div className="main">
        <Modal
          title="编辑"
          visible={isModalVisible}
          cancelText="取消"
          okText="确定"
          centered
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            {...layout}
            initialValues={form}
            form={form}
            name="control-hooks"
          >
            <Form.Item name="title" label="热搜标题">
              <Input placeholder="热搜标题" />
            </Form.Item>
            <Form.Item name="content" label="热搜内容">
              <Input placeholder="热搜内容" />
            </Form.Item>
            <Form.Item label="顺序">
              <InputNumber
                min={0}
                value={number.value}
                onChange={onNumberChange}
              />
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span>状态：</span>
              <Radio.Group onChange={onChangeEdit} value={editStatus}>
                <Space direction="vertical">
                  <Radio value={0}>未启用</Radio>
                  <Radio value={1}>启用</Radio>
                </Space>
              </Radio.Group>
            </div>
          </Form>
        </Modal>
        <Modal
          title="新增"
          visible={modal}
          footer={null}
          onCancel={HandleCancel}
        >
          <AddhotSearch headleModal={headleModal} />
        </Modal>

        <div className={styles.mainTop}>
          <div className="topLeft">
            <Button
              style={{ marginRight: '10px' }}
              type="primary"
              onClick={() => {
                setModal(true);
              }}
            >
              +新增
            </Button>
            <Button
              type="primary"
              onClick={() => {
                headleSum(selectedRowKeys);
              }}
              danger
              disabled={Disabled}
            >
              批量删除
            </Button>
          </div>
          <div className={styles.topRight}>
            <Tooltip placement="top" title="刷新">
              <Button onClick={headleLoading}>
                <SyncOutlined />
              </Button>
            </Tooltip>
            <Tooltip
              placement="top"
              onClick={() => {
                setTransfer(!transfer);
              }}
              title="显隐"
            >
              <Button>
                <AppstoreOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="搜索">
              <Button onClick={() => setFlag(!flag)}>
                <SearchOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="bottom">
        <Modal
          title="多选"
          footer={null}
          visible={transfer}
          onOk={()=>setTransfer(!transfer)}
          onCancel={()=>setTransfer(!transfer)}
        >
          <Transfer
            dataSource={columns}
            titles={['隐藏', '显示']}
            targetKeys={targetKeys}
            selectedKeys={TargetselectedKeys}
            onChange={(onTargetChange)}
            onSelectChange={onTargetSelectChange}
            render={(item) => item.title}
          />
        </Modal>
        <div style={{ margin: '10px 0' }}>
          <span style={{ marginRight: '10px' }}>
            当前表格已选择 {selectedRowKeys.length} 项
          </span>
          <span style={{ color: 'blue' }} onClick={() => onChangeCheck([])}>
            清空
          </span>
        </div>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          rowKey={'hotSearchId'}
          columns={[...columnsData,...operator]}
          loading={loading}
          dataSource={props.records}
          pagination={false}
        />
        <div className={styles.paginationTotal}>
          <span style={{ marginRight: '10px' }}> 共{props.total}条</span>
          <Pagination
            showQuickJumper
            current={props.current}
            defaultCurrent={props.current ? props.current : 1}
            showSizeChanger={true}
            total={props.total}
            pageSize={props.size}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

const columns = [
  {
    title: '热搜标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '热搜内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '录入时间',
    dataIndex: 'recDate',
    key: 'recDate',
    sorter: (a: { recDate: number }, b: { recDate: number }) =>
      a.recDate - b.recDate,
  },
  {
    title: '顺序',
    dataIndex: 'seq',
    key: 'seq',
    sorter: (a: { seq: number }, b: { seq: number }) => a.seq - b.seq,
  },
  {
    title: 'status' ? '启用' : '未启用',
    dataIndex: 'status',
    key: 'status',
    render: (text: any) => {
      return (
        <span className={text ? 'start' : 'noStart'}>
          {text ? '启用' : '未启用'}
        </span>
      );
    },
  },

];

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 24 },
};

const mapStateToProps = ({ hotSearch }: { hotSearch: HotSearchState }) => {
  return {
    ...hotSearch,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    hotSearchList: () =>
      dispatch({
        type: 'hotSearch/hotSearchList',
      }),
    hotSearchSum: (payload: number[]) => {
      dispatch({
        type: 'hotSearch/hotSearchSum',
        payload,
      });
    },
    hotPage: (payload: IPage) => {
      dispatch({
        type: 'hotSearch/hotPage',
        payload,
      });
    },
    puthotSearchSum: (payload: IRecordsItem) => {
      dispatch({
        type: 'hotSearch/puthotSearchSum',
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotSearch);
