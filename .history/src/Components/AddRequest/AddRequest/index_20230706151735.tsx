import React from 'react';
import MenuAdd from '../MenuAdd';
import RequestLayout from '../../RequestLayout';
import { Col, Input, Row } from 'antd';
import { Form } from 'react-router-dom';


function AddRequest(): JSX.Element {
    const profile = false;

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-request'>
                    <MenuAdd />
                    <div className='page-content'>
                        <div className='table-request'>
                            <h2 className='title-request'>CAR BOOKING REQUEST</h2>
                            <div className='table-content'>
                                <Row className='row-request'>
                                    <Form>
                                        <Form.Item>
                                            <Input></Input>
                                        </Form.Item>
                                        <Col span={6} className='col-request'>

                                        </Col>
                                    </Form>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </RequestLayout>
    );
}

export default AddRequest;