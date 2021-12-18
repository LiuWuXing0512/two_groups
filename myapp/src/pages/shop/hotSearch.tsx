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
  const columns = [
    {
      title: '热搜标题',
      dataIndex: 'title',
    },
    {
      title: '热搜内容',
      dataIndex: 'content',
    },
    {
      title: '录入时间',
      dataIndex: 'recDate',
      sorter: (a: { recDate: number }, b: { recDate: number }) =>
        a.recDate - b.recDate,
    },
    {
      title: '顺序',
      dataIndex: 'seq',
      sorter: (a: { seq: number }, b: { seq: number }) => a.seq - b.seq,
    },
    {
      title: 'status' ? '启用' : '未启用',
      dataIndex: 'status',
      render: (text: any) => {
        return (
          <span className={text ? 'start' : 'noStart'}>
            {text ? '启用' : '未启用'}
          </span>
        );
      },
    },
    {
      title: '操作',
      render: (record: { hotSearchId: React.Key | null | undefined }) => {
        return (
          <div>
            <Button type="primary" onClick={() => headleEdit(record)}>
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
  ];
  useEffect(() => {
    props.hotSearchList();
  }, []);
  // 页码
  const onChange = (pageNumber: number, sizeNumber: any) => {
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
  const onChangeCheck = (
    selectedRowKeys: number[] | string[],
    selectedRows: IRecordsItem[],
  ) => {
    setSelectedRowKeys(selectedRowKeys as number[]);
    setDisabled(!selectedRows.length);
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
    setIsModalVisible(true);
    form.setFieldsValue(item);
    setItem(item);
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
    };
    props.puthotSearchSum(obj);
  };

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

  const [number, setNumber] = useState<{
    value: number;
  }>({
    value: 11,
  });

  const onNumberChange = (value: number) => {
    setNumber({
      value,
    });
  };

  const rowSelection = {
    onChange: onChangeCheck,
  };

  const HandleCancel = () => {
    setModal(false);
  };
  const headleModal = () => {
    setModal(false);
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
            <Form.Item name="status" label="启用状态">
              <Radio.Group>
                <Radio value="0">未启用</Radio>
                <Radio value="1">启用</Radio>
              </Radio.Group>
            </Form.Item>
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
            <Tooltip placement="top" title="显隐">
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
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          rowKey={'hotSearchId'}
          columns={columns}
          loading={loading}
          dataSource={props.records}
        />
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
  );
};

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
