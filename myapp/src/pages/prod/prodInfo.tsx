import React, { Dispatch, useEffect, useState } from 'react'
import { ConnectRC, connect } from 'umi';
import { Form, Input, Button } from 'antd';

const prodInfo = (props) => {
    let {editproddetail}=props
    useEffect(()=>{
        console.log(editproddetail);
        console.log(props.location.query.prodId);
    },[])
    return (
        <div>
            
        </div>
    )
}
const mapStateToProps = (state: any) => {
    console.log('state...', state.prod);
    return {
        editproddetail: state.prod.editproddetail,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        // getProdList: (payload: IProdData) =>
        //     dispatch({
        //         type: 'prod/getProdList',
        //         payload,
        //     }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(prodInfo);