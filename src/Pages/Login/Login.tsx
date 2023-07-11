import { Input, Button, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import axios from "axios";
import "./index.css";

interface LoginValues {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const handleLogIn = useCallback(
    (values: LoginValues) => {
      fetch(`http://localhost:63642/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            localStorage.setItem("accessToken", data?.Username);
            localStorage.setItem("userId", data?.Password);
            navigate("/request/carbooking")
          }
        })
        .catch((err) => {
          console.log(err);
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
        onFinish={handleLogIn} // Gọi handleLogIn khi form submit
      >
        {/* Các trường dữ liệu trong form */}
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

        {/* Nút đăng nhập */}
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