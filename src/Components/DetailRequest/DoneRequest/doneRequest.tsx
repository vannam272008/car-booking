import { Col, Row, Form, Select, Button, Radio, RadioChangeEvent } from 'antd';
import Input from 'rc-input';
import React, { useState } from 'react';
import './doneRequest.css'

const { Option } = Select;

function DoneRequest() {

    const [checkFeedback, setCheckFeedback] = useState<boolean>(true);

    const onChange = (e: RadioChangeEvent) => {
        setCheckFeedback(e.target.value);
    };
    // console.log(allowFillOn);
    return (
        <div>
            <div className='done-request-feedback-title'>Section for Administration enter feedback vehicle type</div>
            <div className='done-request-feedback'>
                <Form className='form-add-request '>
                    <Radio.Group onChange={onChange} value={checkFeedback} style={{ width: '100%' }}>
                        <Radio value={true}>1. Company vehicle</Radio>
                        <Row className='row-request'>
                            <Col span={6} className='col-request'>
                                <Form.Item
                                    label="Driver"
                                    name="Driver"
                                    labelCol={{ span: 24 }}
                                >
                                    <Select
                                        disabled={!checkFeedback}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(inputValue, option) =>
                                            option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                        }
                                    >
                                        <Option value="male">male</Option>
                                        <Option value="female">female</Option>
                                        <Option value="other">other</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6} className='col-request'>
                                <Form.Item
                                    label="Mobile"
                                    name="Mobile"
                                    rules={[

                                        {
                                            pattern: /^[0-9]*$/,
                                            message: 'Mobile must be a number',
                                        },
                                    ]}
                                    labelCol={{ span: 24 }}
                                >
                                    <Input disabled={!checkFeedback} type='text' inputMode='numeric' name='Mobile' />
                                </Form.Item>
                            </Col>
                            <Col span={6} className='col-request'>
                                <Form.Item
                                    label="Car plate"
                                    name="Carplate"
                                    rules={[
                                        {
                                            pattern: /^[0-9]*$/,
                                            message: 'Car plate must be a number',
                                        },
                                    ]}
                                    labelCol={{ span: 24 }}
                                >
                                    <Input disabled={!checkFeedback} type='text' inputMode='numeric' name='Carplate' />
                                </Form.Item>
                            </Col>
                            <Col span={6} className='col-request'>
                                <Form.Item
                                    label="Rotation"
                                    name="Rotation"
                                    labelCol={{ span: 24 }}
                                >
                                    <Select
                                        disabled={!checkFeedback}
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(inputValue, option) =>
                                            option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                        }
                                    >
                                        <Option value="male">male</Option>
                                        <Option value="female">female</Option>
                                        <Option value="other">other</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Radio value={false}>2. Rented car, taxi</Radio>
                        <Row className='row-request'>
                            <Col span={12} className='col-request'>
                                <Form.Item
                                    label="Reason"
                                    name="Reason"
                                    labelCol={{ span: 24 }}
                                >
                                    <Input disabled={checkFeedback} type='text' name='Reason'></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Radio.Group>
                    <Row className='row-request'>
                        <Col span={18} className='col-request'>
                            <Form.Item
                                label="Note"
                                name="Note"
                                labelCol={{ span: 24 }}
                            >
                                <Input type='text' name='Note'></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18}></Col>
                        <Col span={6}>
                            <Form.Item>
                                <Button className='done-request-feedback-btn'>Submit</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default DoneRequest;