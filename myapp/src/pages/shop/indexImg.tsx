import React, { Dispatch, useEffect, useState } from 'react';
import { ConnectRC, connect } from 'umi';
import {} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
interface IProps {}

const IndexImg: ConnectRC<IProps> = (props) => {

  return <div className="indexImg">

  </div>;
};

const mapStateToProps = ({ indexImg }) => {
  return {
    ...indexImg,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getIndexImg:()=>{
      
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexImg);
