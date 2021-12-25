import React, { Dispatch, useEffect, useState } from 'react';
import { ICon, IConfigitem, IDelt } from '@/interfaces';
import { ConnectRC, connect } from 'umi';
import {
  Tooltip,
  message,
  Input,
  Button,
  Table,
  Divider,
  Pagination,
} from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  SyncOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
7;
import styles from '../prod/spec.less';
import ConfigModal from '@/components/config/index';
import UserModal from '@/components/usermodal/index';

interface IProps {
  getConfig: (payload: ICon) => void;
  data: IConfigitem[];
  getConfigDel: (num: number[]) => void;
  total: number;
  getPage: (payload: ICon) => void;
  getConfigId: (payload: number) => void;
}
interface markRule {
  key:string;
  title:string;
}
const ConfigPage: ConnectRC<IProps> = (props) => {
  const { data, total } = props;
  console.log(props, 'props....');
  const [value, search] = useState<string>('');
  const [flag, setisFalg] = useState<boolean>(false);
  const [hasSelected, setflag] = useState<Boolean>(false);
  const [num, setnum] = useState<Number>(0);
  const [id, setId] = useState<number>(0);

  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>(
    'checkbox',
  );

  useEffect(() => {
    props.getConfig({ current: 1, size: 10 });
  }, []);

  const qwe:markRule[]=[{key:'1',title:'参数名'},{key:'2',title:'参数值'},{key:'3',title:'备注'}]

  //搜索数据
  const dj = () => {
    let payload = { current: 1, size: 10, paramKey: value };
    props.getConfig(payload);
    search('');
  };

  //绑定输入框内容
  const searchs = (val: string) => {
    let value = val;
    search(value);
  };

  //清空
  const empty = () => {
    search('');
  };

  //刷新数据
  const renovate = () => {
    props.getConfig({ current: 1, size: 10 });
  };

  //平移
  const move = () => {
    setisFalg(!flag);
  };

  const start = () => {
    console.log('的说法');
  };

  //删除
  const del = async (num) => {
    await props.getConfigDel([num]);
    await props.getConfig({ current: 1, size: 10 });
    message.success('删除成功');
  };

  //编辑
  const edit = async (id) => {
    setId(id);
    setflag(true);
    await props.getConfigId(id);
  };

  //清空
  const clear = () => {
    setflag(false);
  };

  //分页
  const changPage = (page, pageSize) => {
    let payload = { current: page, size: pageSize };
    props.getConfig(payload);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IConfigitem[]) => {
      setnum(selectedRows.length);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
  };

  const columns = [
    {
      key:'1',
      title: '序号',
      dataIndex: 'id',
      align: 'center',
    },
    {
      key:'2',
      title: '参数名',
      dataIndex: 'paramKey',
      align: 'center',
    },
    {
      key:'3',
      title: '参数值',
      dataIndex: 'paramValue',
      align: 'center',
    },
    {
      key:'4',
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
    },
    {
      key:'5',
      title: '操作',
      align: 'center',
      dataIndex: 'id',

      render: (data) => (
        <div>
          <Button type="primary" onClick={() => edit(data)}>
            编辑
          </Button>
          &emsp;
          <Button type="primary" danger onClick={() => del(data)}>
            删除
          </Button>
        </div>
      ),
    },
  ];
  const [array, setColumns] = useState<object[]>(columns);

  // render内容
  return (
    <div className={styles.spec}>
      <div className={!flag ? styles.head : styles.yc}>
        <div className={styles.item1}>
          <span style={styles.span}>参数名</span>
          <Input
            className={styles.input}
            onChange={(e) => searchs(e.target.value)}
            value={value}
            placeholder="Basic usage"
          />
        </div>
        <div className={styles.ttc}>
          <Button
            className={styles.Button}
            type="primary"
            icon={<SearchOutlined />}
            size="large"
            onClick={() => dj()}
          >
            搜索
          </Button>

          <Button
            className={styles.Button}
            icon={<DeleteOutlined />}
            size="large"
            onClick={() => empty()}
          >
            清空
          </Button>
        </div>
      </div>

      <div className={styles.crud__menu}>
        <div className={styles.crud_left}>
          <ConfigModal
            id={id}
            edit={edit}
            setflag={setflag}
            hasSelected={hasSelected}
          />
          &emsp;&emsp;
          <Button
            type="primary"
            onClick={() => start()}
            disabled={num ? false : true}
            danger={true}
          >
            批量删除
          </Button>
        </div>
        <div className={styles.crud_right}>
          <Button
            className={styles.Button}
            icon={<SyncOutlined />}
            onClick={() => renovate()}
          />
          <UserModal coum={columns} setcolumns={setColumns} mockData={qwe} />
          <Tooltip title="搜索">
            <Button
              className={styles.Button}
              type="dashed"
              shape="circle"
              icon={<SearchOutlined />}
              size="large"
              onClick={() => move()}
            />
          </Tooltip>
        </div>
      </div>

      <div className="main">
        <div>
          {/* <ConfigEdit/> */}
          <div style={{ marginBottom: 16 }}>
            <div className={styles.header}>
              <span>当前表格已选 {num} 项</span>
              <Button type="link" onClick={() => clear()}>
                清空
              </Button>
            </div>
            <span style={{ marginLeft: 8 }}></span>
          </div>
          <Divider />
          <Table
            className={styles.table}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            dataSource={data}
            pagination={false}
            columns={array}
          ></Table>
        </div>
        {/* 分页 */}
        <Pagination
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 条`}
          onChange={(page, pageSize) => changPage(page, pageSize)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log('state...', state);
  return {
    data: state.config.RootObject.records,
    total: state.config.RootObject.total,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getConfig: (payload: ICon) =>
      dispatch({
        type: 'config/getConfig',
        payload,
      }),
    getConfigDel: (payload: number[]) =>
      dispatch({
        type: 'config/getConfigDel',
        payload,
      }),
    getConfigId: (payload: number) =>
      dispatch({
        type: 'config/getConfigId',
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage);
