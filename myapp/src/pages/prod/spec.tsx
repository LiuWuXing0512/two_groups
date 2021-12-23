import React, { Dispatch, useEffect, useState } from 'react';
import { Tooltip, message, Input, Button, Pagination, Table, Tag } from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  SyncOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { ISpec, IDel, Records, ProdPropValues } from '@/interfaces';
import { ConnectRC, connect, useHistory } from 'umi';
import styles from './spec.less';
const { Column } = Table;
import ModalTab from '../../components/spec/index';
import Edits from '../../components/spec/edit';

interface IProps {
  getSpec: (payload: ISpec) => void;
  getSpecDel: (num: IDel) => void;
  searchs: (val: string) => void;
  dj: () => void;
  records: Records[];
  total: number;
  page: number;
  pageSize: number;
  ProdPropValue: ProdPropValues[];
}
const SpecPage: ConnectRC<IProps> = (props) => {
  const { records, total } = props;
  console.log(props, 'props...');

  // 定义状态
  const [value, search] = useState<string>('');
  const [flag, setflag] = useState<boolean>(false);
  const [editflag, setedit] = useState<boolean>(false);

  // 定义生命周期
  useEffect(() => {
    let payload = { current: 1, size: 10 };
    props.getSpec(payload);
  }, []);

  useEffect(() => {
    // props.getSpecDel(payload)
  });

  //绑定输入框内容
  const searchs = (val: string) => {
    let value = val;
    search(value);
  };

  //搜索数据
  const dj = () => {
    let payload = { current: 1, size: 10, propName: value };
    props.getSpec(payload);
    search('');
  };

  //清空
  const empty = () => {
    search('');
  };

  //刷新更新数据
  const renovate = () => {
    let payload = { current: 1, size: 10 };
    props.getSpec(payload);
  };

  //搜索隐藏
  const move = () => {
    setflag(!flag);
  };

  //分页
  const changPage = (page, pageSize) => {
    let payload = { current: page, size: pageSize };
    props.getSpec(payload);
  };

  //删除
  const del = async (num: IDel) => {
    await props.getSpecDel(num);
    await props.getSpec({ current: 1, size: 10 });
    message.success('删除成功');
  };

  //编辑
  const edit = (record: Records) => {
    setedit(!editflag);
    console.log(record);
    // props.getEdit()
  };

  // render内容
  return (
    <div className={styles.spec}>
      <div className={!flag ? styles.head : styles.yc}>
        <div className={styles.item1}>
          <span style={styles.span}>属性名称</span>
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
          <ModalTab />
        </div>
        <div className={styles.crud_right}>
          <Button
            className={styles.Button}
            icon={<SyncOutlined />}
            onClick={() => renovate()}
          />
          <Button className={styles.Button} icon={<AppstoreOutlined />} />
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

      <div className={styles.main}>
        <Table
          className={styles.table}
          dataSource={records}
          bordered
          pagination={false}
        >
          <Column
            align="center"
            title="序号"
            dataIndex="propId"
            key="firstName"
          />
          <Column
            align="center"
            title="属性名称"
            dataIndex="propName"
            key="lastName"
          />
          <Column
            title="属性值"
            align="center"
            dataIndex=""
            key="age"
            render={(records) => (
              <>
                {records.prodPropValues.map(
                  (tag: {
                    valueId: React.Key | null | undefined;
                    propValue:
                      | boolean
                      | React.ReactChild
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => (
                    <Tag color="blue" key={tag.valueId}>
                      {tag.propValue}
                    </Tag>
                  ),
                )}
              </>
            )}
          />
          <Column
            align="center"
            title="操作"
            dataIndex=""
            key="propId"
            render={(record) => (
              <div>
                <Edits record={record} editflag={editflag} />
                <Button onClick={() => edit(record)}>编辑</Button>&emsp;
                <Button onClick={() => del(record.propId)}>删除</Button>
              </div>
            )}
          />
        </Table>
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
    records: state.spec.records,
    total: state.spec.total,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getSpec: (payload: ISpec) =>
      dispatch({
        type: 'spec/getSpec',
        payload,
      }),

    getSpecDel: (payload: IDel) =>
      dispatch({
        type: 'spec/getSpecDel',
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecPage);
