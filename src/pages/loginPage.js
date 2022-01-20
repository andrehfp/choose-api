import { Form, Input, Button, Row, Col, Tabs } from "antd";
import { useContext } from "react";
import UserContext from "../store/user-context";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

function LoginPage() {
  const userCtx = useContext(UserContext);
  let navigate = useNavigate();

  const onLoginHandler = (values) => {
    if(userCtx.logIn(values.username, values.password)){
      navigate("/favorites");
    }
  };

  const onSignUpHandler = (values) => {
    userCtx.signUp(values.username, values.password);
    navigate("/favorites");
  };

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Login" key="1">
          <Form
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onLoginHandler}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Row gutter={4}>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Log In
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Sign Up" key="2">
          <Form
            name="signup"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSignUpHandler}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Row gutter={4}>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </>
  );
}

export default LoginPage;
