import React, { Dispatch, useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import styles from './login.less';
import { ILoginForm } from '@/interfaces';
import { ConnectRC, connect, useHistory } from 'umi';

const baseURL = 'http://82.156.36.178:8085';
interface IProps {
  login: (payload: ILoginForm) => void;
}
const LoginPage: ConnectRC<IProps> = (props) => {
  // 定义状态
  const [uuid, setUuid] = useState<string>('');
  const history = useHistory();

  // 定义生命周期
  useEffect(() => {
    headleUuid();
  }, []);

  const headleUuid = () => {
    let uuid = uuidv4();
    setUuid(uuid);
  };

  // 事件处理函数
  const onFinish = async (values: Omit<ILoginForm, 't' | 'sessionUUID'>) => {
    const loginForm: ILoginForm = {
      t: +new Date(),
      sessionUUID: uuid,
      ...values,
    };
    try {
      await props.login(loginForm);
      let redirect = history.location.search.split('=')[1];
      history.replace(redirect ? decodeURIComponent(redirect) : '/');
    } catch (e: any) {
      message.error(e.toString());
    }
  };

  // render内容
  return (
    <div className={styles.login}>
      <h2>电商运营后台</h2>
      <Form
          name="basic"
          wrapperCol={{ offset: 7, span: 10 }}
          initialValues={{
          principal: 'admin',
          credentials: '123456',
          imageCode: '',
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="principal"
          className={styles.ant_row_user_pwd}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="账号" />
        </Form.Item>

        <Form.Item
          name="credentials"
          className={styles.ant_row_user_pwd}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item
          className="ant-row-captcha"
          name="imageCode"
          rules={[{ required: true, message: 'Please input your imageCode!' }]}
        >
          <div className={styles.captchaItem}>
            <Input placeholder="验证码" />
            <img
              onClick={() => headleUuid()}
              className={styles.captcha}
              src={`${baseURL}/captcha.jpg?uuid=${uuid}`}
              alt=""
            />
          </div>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          登陆
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    login: (payload: ILoginForm) =>
      dispatch({
        type: 'user/login',
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
