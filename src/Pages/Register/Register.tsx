import { Input, Button, Form, Radio, message, DatePicker } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import request from "../../Utils/request";

interface RegisterValues {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    sex: Boolean;
    birthday: Date;
    password: string;
}

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = useCallback(
        (values: RegisterValues) => {
            request
                .post("/user/register", values)
                .then((response) => {
                    const data = response.data;
                    if (data) {
                        if (data.Success == false) {
                            message.error('You have not successfully registered an account!!!');
                        } else {
                            message.success('You have successfully registered an account!!!');
                            navigate("/user/login");
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
        <>
            <div className="register-page">
                <h2>Register your account</h2>
                <Form className="register-form"
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    onFinish={handleRegister}
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                    >
                        <Input placeholder="Type your email " />
                    </Form.Item>

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
                        label="Firstname"
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: "Please input your firstname!",
                            },
                        ]}
                    >
                        <Input placeholder="Type your firstname" />
                    </Form.Item>

                    <Form.Item
                        label="Lastname"
                        name="lastname"
                        rules={[
                            {
                                required: true,
                                message: "Please input your lastname!",
                            },
                        ]}
                    >
                        <Input placeholder="Type your lastname" />
                    </Form.Item>

                    <Form.Item
                        name="sex"
                        label="Sex"
                        rules={[
                            {
                                required: true,
                                message: "Please select your gender!",
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value={false}>Female</Radio>
                            <Radio value={true}>Male</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="birthday"
                        label="Birthday"
                        rules={[
                            {
                                required: true,
                                message: "Please select your birthday!",
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                            {
                                min: 6,
                                message: "Password must be at least 6 characters",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Type your password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords that you entered do not match!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm your password " />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Register;