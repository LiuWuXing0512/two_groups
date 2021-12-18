import React, { Dispatch, useEffect, useState } from 'react';
import { Tooltip, Input, Button, Pagination, Table, Tag, Space } from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  SyncOutlined,
  AppstoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ISpec, RootObject, Record, ProdPropValue } from '@/interfaces';
import { ConnectRC, connect, useHistory } from 'umi';
import styles from './spec.less';
const { Column, ColumnGroup } = Table;

interface IProps {
  getSpec: (payload: ISpec) => void;
  searchs: (val: string) => void;
  dj: () => void;
  records: Record[];
  ProdPropValue: ProdPropValue[];
}
const SpecPage: ConnectRC<IProps> = (props) => {
  const { records } = props;
  // 定义状态
  const history = useHistory();
  const [value, search] = useState<string>('');
  // 定义生命周期
  useEffect(() => {
    let payload = { current: 1, size: 10, propName: '' };
    props.getSpec(payload);
  }, []);

  useEffect(() => {});

  const searchs = (val) => {
    let value = val;
    search(value);
  };

  const dj = () => {
    let payload = { current: 1, size: 10, propName: value };
    props.getSpec(payload);
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
          >
            清空
          </Button>
        </div>
      </div>
      <div className={styles.crud__menu}>
        <div className={styles.crud_left}>
          <Button className={styles.Button} icon={<PlusOutlined />}>
            新增
          </Button>
        </div>
        <div className={styles.crud_right}>
          <Button className={styles.Button} icon={<SyncOutlined />} />
          <Button className={styles.Button} icon={<AppstoreOutlined />} />
          <Tooltip title="search">
            <Button
              className={styles.Button}
              type="dashed"
              shape="circle"
              icon={<SearchOutlined />}
              size="large"
            />
          </Tooltip>
        </div>
      </div>

      <div className="main">
        <Table dataSource={records} bordered pagination={false}>
          <Column title="序号" dataIndex="" key="firstName" />
          <Column title="属性名称" dataIndex="propName" key="lastName" />
          <Column
            title="属性值"
            dataIndex=""
            key="age"
            render={(records) => (
              <>
                {records.prodPropValues.map((tag) => (
                  <Tag color="blue" key={tag.valueId}>
                    {tag.propValue}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title="操作"
            dataIndex="address"
            key="address"
            render={(propId: number) => (
              <div>
                <Button>删除</Button>
                <Button>编辑</Button>
              </div>
            )}
          />
        </Table>
        {/* 分页 */}
        <Pagination
          total={2}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 条`}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log('state...', state);
  return {
    records: state.spec.records,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getSpec: (payload: ISpec) =>
      dispatch({
        type: 'spec/getSpec',
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecPage);
