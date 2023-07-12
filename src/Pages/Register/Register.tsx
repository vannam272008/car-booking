import { Input, Button, Form, Radio, InputNumber } from "antd";
import "./index.css";

const Register = () => {

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

                    <Form.Item name="gender" label="Gender" rules={[
                        {
                            required: true,
                            message: "Please select your gender!",
                        },
                    ]}>
                        <Radio.Group>
                            <Radio value="female">Female</Radio>
                            <Radio value="male">Male</Radio>
                            <Radio value="other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="age"
                        label="Age"
                        rules={[
                            {
                                required: true,
                                type: "number",
                                min: 0,
                                max: 99,
                                message: "Age must be a number between 0 and 99",
                            },
                        ]}
                    >
                        <InputNumber placeholder="Age" />
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
