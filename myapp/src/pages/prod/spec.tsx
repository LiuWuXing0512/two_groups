import React, { Dispatch, useEffect, useState } from 'react';
import { Tooltip, Input, Button, Pagination, Table, Tag } from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  SyncOutlined,
  AppstoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ISpec, IDel, Records, ProdPropValues } from '@/interfaces';
import { ConnectRC, connect, useHistory } from 'umi';
import styles from './spec.less';
const { Column, ColumnGroup } = Table;
import ModalModalTab from '../../components/spec/index';

interface IProps {
  getSpec: (payload: ISpec) => void;
  getSpecDel: (num: IDel) => void;
  searchs: (val: string) => void;
  dj: () => void;
  records: Records[];
  total: number;
  ProdPropValue: ProdPropValues[];
}
const SpecPage: ConnectRC<IProps> = (props) => {
  const { records, total } = props;
  console.log(props, 'props...');

  // 定义状态
  const history = useHistory();
  const [value, search] = useState<string>('');

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
    console.log('隐藏');
  };

  //分页
  const changPage = () => {
    console.log();
    let payload = { current: 1, size: 10 };
    props.getSpec(payload);
  };

  //删除
  const del = async (num: IDel) => {
    await props.getSpecDel(num);
    await props.getSpec({ current: 1, size: 10 });
  };

  // render内容
  return (
    <div className={styles.spec}>
      <div className={styles.head}>
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
          <ModalModalTab />
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
                <Button>编辑</Button>&emsp;
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
          onChange={() => changPage()}
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
