import React from 'react';
import MenuAdd from '../MenuAdd';
import RequestLayout from '../../RequestLayout';
import { Col, Input, Row, Form, Select } from 'antd';


function AddRequest(): JSX.Element {
    const profile = false;
    const { Option } = Select;


    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-request'>
                    <MenuAdd />
                    <div className='page-content'>
                        <div className='table-request'>
                            <h2 className='title-request'>CAR BOOKING REQUEST</h2>
                            <div className='table-content'>
                                <Form>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <label>Applicant <span className='required'>*</span></label>
                                            <Form.Item
                                                name="Applicant"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}>
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <label>Department <span className='required'>*</span></label>
                                            <Form.Item
                                                name="Department"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Select something!',
                                                    },
                                                ]}
                                                initialValue="1"
                                            >
                                                <Select>
                                                    <Option value="1">
                                                        Nghiên cứu R&D                                                    </Option>
                                                    <Option value="2">
                                                        IT/ Technical                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <label>User <span className='required'>*</span></label>
                                            <Form.Item
                                                name="User"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Select something!',
                                                    },
                                                ]}
                                                initialValue="1"
                                            >
                                                <Select>
                                                    <Option value="1">
                                                        bangnm@o365.vn, Developer
                                                    </Option>
                                                    <Option value="2">
                                                        bu.test5@o365.vn, Tài xế
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <label>Mobile <span className='required'>*</span></label>
                                            <Form.Item
                                                name="Mobile"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}>
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <label>Applicant <span className='required'>*</span></label>
                                            <Form.Item
                                                name="Applicant"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}>
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </RequestLayout>
    );
}

export default AddRequest;