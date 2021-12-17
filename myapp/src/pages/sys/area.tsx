import React, { useEffect } from 'react';
import { Input, Button, Collapse } from 'antd';
import './area.less'
import { CaretRightOutlined } from '@ant-design/icons';
import { connect } from 'umi';



const { Panel } = Collapse;

const Area = (props) => {
    const { dispatch, area } = props;
    useEffect(() => {
        dispatch({
            type: 'area/addressList',
            payload: { t: new Date().getTime(), current: 1, size: 10 }
        })
    }, [])
    const { areaList } = area
    console.log(areaList);
    return (
        <div className='area'>
            <div className='area-search'>
                <Input placeholder="地区关键词" />
                <Button type="primary">
                    新增
                </Button>
            </div>
            <div className='area-conent'>
                <Collapse
                    bordered={false}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    className="site-collapse-custom-collapse"
                >
                    {
                        areaList.map(level => {
                            return (
                                <Panel header={level.areaName} key={level.areaId}>
                                    {
                                        level.children.map(level2 => {
                                            return (
                                                <Collapse
                                                    bordered={false}
                                                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                                >
                                                    <Panel header={level2.areaName} key={level2.areaId} className="site-collapse-custom-panel">
                                                        {
                                                            level2.children&&level2.children.length>0?level2.children.map(level3=>{
                                                                return (
                                                                    <p>{level3.areaName}</p>
                                                                )
                                                            }):null
                                                        }
                                                    </Panel>
                                                </Collapse>
                                            )
                                        })
                                    }
                                </Panel>
                            )
                        })
                    }
                </Collapse>
            </div>
        </div>
    );
}
export default connect(({ area }) => ({ area }))(Area);