import React, { useEffect } from 'react';
import { Input, Button, Collapse } from 'antd';
import './area.less'
import { CaretRightOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect, ConnectRC } from 'umi';
import { IaddressList, IPropsArea } from '@/interfaces';

const { Panel } = Collapse;

const Area: ConnectRC<IPropsArea> = (props) => {
    const { dispatch } = props;
    useEffect(() => {
        dispatch({
            type: 'area/addressList',
            payload: { t: new Date().getTime(), current: 1, size: 10 }
        })
    }, [])
    const { areaList } = props.area
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
                    collapsible="header"
                >
                    {
                        areaList.map(level => {
                            return (
                                <Panel header={level.areaName} key={level.areaId} extra={<p>
                                    <a><EditOutlined />修改</a>&emsp;<a><DeleteOutlined />删除</a>
                                </p>}>
                                    {
                                        (level.children as IaddressList[]).map(level2 => {
                                            return (
                                                <Collapse
                                                    bordered={false}
                                                    collapsible="header"
                                                    className="site-collapse-custom-collapse level2"
                                                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                                                >
                                                    <Panel header={level2.areaName} key={level.areaId} extra={<p>
                                                        <a><EditOutlined />修改</a>&emsp;<a><DeleteOutlined />删除</a>
                                                    </p>}>
                                                        {
                                                            level2.children && level2.children.length > 0 ? level2.children.map(level3 => {
                                                                return (
                                                                    <div className='level3'>
                                                                        <div>{level3.areaName}</div>
                                                                        <div><a><EditOutlined />修改</a>&emsp;<a><DeleteOutlined />删除</a></div>
                                                                    </div>
                                                                )
                                                            }) : null
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
export default connect(({ area }: IPropsArea) => ({ area }))(Area);