import React from 'react';
import MenuAdd from '../MenuAdd';
import RequestLayout from '../../RequestLayout';
import { Col, Input, Row, Form } from 'antd';


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
                                <Form>
                                    <label>Applicant <span className='required'>*</span></label>
                                    <Row className='row-request'>
                                        <Col span={6} className='col-request'>
                                            <Form.Item>

                                                <Input></Input>
                                            </Form.Item>
                                            <Col />

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