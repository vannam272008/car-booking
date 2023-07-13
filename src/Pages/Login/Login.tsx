import { Input, Button, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import request from "../../Utils/request";
import "./index.css";

interface LoginValues {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const handleLogIn = useCallback(
    (values: LoginValues) => {
      request
        .post("/user/login", values)
        .then((response) => {
          const data = response.data;
          if (data) {
            localStorage.setItem("Data", data?.Data);
            if (data.Success == false) {
              message.error(data.Message);
            }else{
              navigate("/request/carbooking");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [navigate]
  );

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
        onFinish={handleLogIn}
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
