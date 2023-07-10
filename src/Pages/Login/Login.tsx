import { Input, Button, Form } from "antd";
import { Link } from "react-router-dom";
import "./index.css";

const Login = () => {

  return (
    <div className="login-page">
      <h2>Login to your account</h2>
      <br />
      <Form
        className="login-form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Type your username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Type your password" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" id="btn-login">
            Log In
          </Button>
          <Link to={`/register`} style={{ textDecoration: "none" }}>
            <Button type="primary" htmlType="submit" id="btn-register">
              Register
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
