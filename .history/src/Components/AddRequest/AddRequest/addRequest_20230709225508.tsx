import React from 'react';
import MenuAdd from '../MenuAdd/menuAdd';
import RequestLayout from '../../RequestLayout';
import { Col, Input, Row, Form, Select, DatePicker, Radio, RadioChangeEvent, Upload, Button } from 'antd';
import './addRequest.css'
import { DeleteOutlined, DragOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

function AddRequest(): JSX.Element {

    const profile = false;

    const futureTime = moment().add(24, 'hours');


    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-request'>
                    <MenuAdd />
                    <div className='page-content'>
                        <div className='table-request'>
                            <h2 className='title-request'>CAR BOOKING REQUEST</h2>
                            <div className='table-content'>
                                <Form className='form-add-request'>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Applicant"
                                                name="Applicant"
                                                rules={[
                                                    {
                                                        required: true,
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                                initialValue="Bang Minh Nuyen" // Giá trị mặc định
                                            >
                                                <Input readOnly className='cursor-notallow-applicant' />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Dapartment"
                                                name="Department"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Select something!',
                                                    },
                                                ]}
                                                initialValue="1"
                                                labelCol={{ span: 24 }}
                                            >

                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    filterOption={(inputValue, option) =>
                                                        option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                    }
                                                >
                                                    <Option value="1" >
                                                        Nghiên cứu R&D                                                    </Option>
                                                    <Option value="2">
                                                        IT/ Technical                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="User"
                                                name="User"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Select something!',
                                                    },
                                                ]}
                                                initialValue="1"
                                                labelCol={{ span: 24 }}
                                            >
                                                <Select
                                                    showSearch
                                                    optionFilterProp="children"
                                                    filterOption={(inputValue, option) =>
                                                        option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                    }
                                                >
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
                                            <Form.Item
                                                label="Moblie"
                                                name="Mobile"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Mobile" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Cost Center"
                                                name="CostCenter"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Cost Center" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Total passengers"
                                                name="Totalpassengers"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Total passengers" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Usage time from"
                                                name="Usagetimefrom"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Usage time from" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                                initialValue={moment()} // Giá trị mặc định là thời gian hiện tại
                                            >
                                                <DatePicker showTime placeholder='From date time' style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Usage time to"
                                                name="Usagetimeto"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Usage time to" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                                initialValue={futureTime} // Giá trị mặc định là thời gian sau 24 giờ
                                            >
                                                <DatePicker showTime placeholder='To date time' style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Pick time"
                                                name="Picktime"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Pick time" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                                initialValue={moment()} // Giá trị mặc định là thời gian hiện tại
                                            >
                                                <DatePicker showTime placeholder='Pick time' style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Pick location"
                                                name="Picklocation"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Pick location" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Destination "
                                                name="Destination"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Destination" is required'

                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6} className='col-request'>
                                            <Form.Item
                                                label="Reason"
                                                name="Reason"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: ' "Reason" is required'
                                                    },
                                                ]}
                                                labelCol={{ span: 24 }}
                                            >
                                                <Input></Input>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
    ////////////////////////////
                    </div>
                </div>
            )
            }
        </RequestLayout >
    );
}

export default AddRequest;