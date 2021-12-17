import { HotSearchState } from '@/models/hotSearch';
import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import { Button, Pagination, Table, Tooltip } from 'antd';
import HotSearchHeader from '@/components/hotSearch/HotSearchHeader';
import {
  SyncOutlined,
  AppstoreOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styles from './hotSearch.less';
import { IRecordsItem } from '@/interfaces';

interface IProps extends HotSearchState {
  hotSearchList: () => void;
}

const HotSearch: ConnectRC<IProps> = (props) => {
  const [Disabled, setDisabled] = useState<boolean>(true);

  const [flag, setFlag] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
    },
    {
      title: 'content',
      dataIndex: 'content',
    },
    {
      title: 'recDate',
      dataIndex: 'recDate',
    },
    {
      title: 'status' ? '启用' : '未启用',
      dataIndex: 'status',
      render:(text)=>{
        return <span className={text?'start':'noStart'}>{text?  '启用' : '未启用'}</span>
      }
    },
    {
      title: 'seq',
      dataIndex: 'seq',
    },
    {
      title: '操作',
      render: (record) => {
        return (
          <div key={record.hotSearchId}>
            <Button  type="primary" onClick={() => headleSum(record)}>删除</Button>
            <Button type="primary" danger>
              编辑
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    props.hotSearchList();
  }, []);

  function onChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }

  const headleSum = (item) => {
    console.log('shanc', item);
  };
  const onChangeCheck =  (selectedRowKeys: React.Key[], selectedRows: IRecordsItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }

  return <div className="hotSearch">
      <HotSearchHeader flag={flag} />
      <div className="main">
        <div className={styles.mainTop}>
          <div className="topLeft">
            <Button type="primary">+新增</Button>
            <Button type="primary" danger disabled={Disabled}>
              批量删除
            </Button>
          </div>
          <div className={styles.topRight}>
            <Tooltip placement="top" title="刷新">
              <Button>
                <SyncOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="显隐">
              <Button>
                <AppstoreOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="搜索">
              <Button>
                <SearchOutlined onClick={() => setFlag(!flag)} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="bottom">
        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: onChangeCheck,
          }}
          loading={loading}
          columns={columns}
          dataSource={props.records}
        />
        <Pagination
          showQuickJumper
          defaultCurrent={2}
          showSizeChanger={true}
          total={10}
          onChange={onChange}
        />
      </div>
    </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotSearch);
