import React, { Component } from 'react';
import { Input, Button, Collapse } from 'antd';
import './area.less'
import { CaretRightOutlined } from '@ant-design/icons';
import {getAreaList} from "@/services"



const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;



class componentName extends Component {
    async componentDidMount(){
        let res = await getAreaList({t:1639547655698,current:1,size:10})
        console.log("asdadadas++++++",res);
        
    }
    render() {
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
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="site-collapse-custom-collapse"
                    >
                        <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="2" className="site-collapse-custom-panel">
                            <p>{text}</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3" className="site-collapse-custom-panel">
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        );
    }
}

export default componentName;