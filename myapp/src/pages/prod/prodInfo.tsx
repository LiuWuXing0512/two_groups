import React, { Dispatch, useEffect, useState } from 'react'
import { ConnectRC, connect } from 'umi';
import { Form, Input, Button, Upload, Radio, Select, Menu, Dropdown, Space, Checkbox  } from 'antd';
import ImgCrop from 'antd-img-crop';

interface imgUpload {
    uid: string,
    name: string,
    status: string,
    url: string
}
const prodInfo = (props) => {
    let { editproddetail } = props
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const [fileList, setFileList] = useState<string[]>([]);
    const [value, setValue] = React.useState(1);
    const { Option } = Select;
    const plainOptions = ['Apple', 'Pear', 'Orange'];
    const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
              1st menu item
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
              2nd menu item
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer">
              3rd menu item
            </a>
          </Menu.Item>
        </Menu>
      );
    const ChangeRadio = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const Changebox = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        console.log(image);

    };
    useEffect(() => {
        console.log(editproddetail);
        console.log(props.location.query.prodId);
    }, [])
    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                >
                    <ImgCrop rotate>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 5 && '+ Upload'}
                        </Upload>
                   i </ImgCrop>
                </Form.Item>
                <Form.Item
                    label="状态"
                    name="username"
                >
                    <Radio.Group onChange={ChangeRadio} value={value}>
                        <Radio value={1}>上架</Radio>
                        <Radio value={2}>下架</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="产品分类"
                    name="username"
                >
                    <Input.Group compact>
                        <Select defaultValue="Option1" style={{ width: '50%' }}>
                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                        </Select>
                    </Input.Group>
                </Form.Item>

                <Form.Item
                    label="产品分组"
                    name="password"
                >
                    <Dropdown overlay={menu} placement="topCenter">
                        <Button>topCenter</Button>
                    </Dropdown>
                </Form.Item>
                <Form.Item
                    label="产品名称"
                    name="password"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="产品卖点"
                    name="password"
                >
                    <textarea name="" id="" cols={30} rows={2}></textarea>
                </Form.Item>
                <Form.Item
                    label="配送方式"
                    name="password"
                >
                    <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={Changebox} />
                </Form.Item>
                <Form.Item
                    label="运费设置"
                    name="password"
                >
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button>bottomCenter</Button>
                    </Dropdown>
                </Form.Item>
                <Form.Item
                    label="商品规格"
                    name="password"
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
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