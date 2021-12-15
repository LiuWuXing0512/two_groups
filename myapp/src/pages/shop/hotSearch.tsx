import { HotSearchState } from '@/models/hotSearch';
import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import { Button, Pagination,Tooltip, Descriptions } from 'antd';
import HotSearchHeader from '@/components/hotSearch/HotSearchHeader';

interface IProps {
  hotSearchList: () => void;
}

const HotSearch: ConnectRC<IProps> = (props) => {
  useEffect(() => {
    props.hotSearchList();
  }, []);

  return (
    <div className="hotSearch">
      <HotSearchHeader />
      <div className="main">
        <div className="mainTop">
          <div className="topLeft">
            <Button type="primary">+新增</Button>
            <Button type="primary" danger disabled>
              批量删除
            </Button>
          </div>
          <div className="topRight">
          <Tooltip placement="top" title={text}>
        <Button>Top</Button>
      </Tooltip>
          </div>
        </div>
      </div>
      <div className="bottom">
        <Descriptions
          title="Responsive Descriptions"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
          <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
          <Descriptions.Item label="time">18:00:00</Descriptions.Item>
          <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
          <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
          <Descriptions.Item label="Official">$60.00</Descriptions.Item>
          <Descriptions.Item label="Config Info">
            Data disk type: MongoDB
          </Descriptions.Item>
        </Descriptions>
        <Pagination defaultCurrent={6} total={500} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ hotSearch }: { hotSearch: HotSearchState }) => {
  return {
    hotSearch,
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
