import { Component } from 'react';
import './area.less'
import { Input, Button, Tree } from 'antd';
import { connect } from 'umi';
import { IPropsArea } from '@/interfaces';
const gData = [];
class Area extends Component <any> {
    state = {
        gData,
    };
    componentDidMount() {
        this.props.dispatch({
            type: 'area/addressList',
            payload: { t: new Date().getTime(), current: 1, size: 10 }
        })
    }
    render() {
        const { areaList } = this.props.area
        return (
            <div className='area'>
                <div className='area-search'>
                    <Input placeholder="地区关键词" />
                    <Button type="primary">
                        新增
                    </Button>
                </div>
                <div className='area-conent'>
                    <Tree
                        className="draggable-tree"
                        fieldNames={{ title: "areaName", key: "areaId" }}
                        treeData={areaList}
                    />
                </div>
            </div>
        );
    }
}
export default connect(({ area }: IPropsArea) => ({ area }))(Area);