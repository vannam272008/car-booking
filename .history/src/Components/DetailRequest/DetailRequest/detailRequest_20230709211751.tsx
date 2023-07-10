import React, { useState } from 'react';
import { Row, Col, Radio, RadioChangeEvent } from 'antd';
import Comment from '../Comments/comment';
import MenuRequest from '../Menu/menu';
import RequestLayout from '../../RequestLayout';
import "./detailRequest.css";

function DetailRequest(): JSX.Element {

    //Data information detail request
    const requestCode: string = '2023OPS-CAR-0704-001';
    const createdAt: string = '04/07/2023 09:33 AM';
    const status: string = 'Waiting for Approval';

    //Data table detail request
    const Applicant: string = 'Bang Minh Nguyen';
    const Department: string = 'Kiem thu Testing';
    const User: string = 'bangnm@o365.vn, Developer';
    const Mobile: string = '0382187648';
    const CostCenter: string = '1001';
    const Totalpassengers: string = '2';
    const Usagetimefrom: string = '04/07/2023 09:36 AM - 04/07/2023 10:36 AM';
    const Picktime: string = '04/07/2023 09:36 AM';
    const Destination: string = 'Vung Tau';
    const Picklocation: string = 'TP.Ho Chi Minh'
    const Reason: string = 'Cong tac'

    //Setup select-adio Yes or No
    const [value, setValue] = useState(2);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    //Data Approver
    const Approver1: string = 'Approver 1';
    const Approver2: string = 'Approver 2';

    const profile = false;


    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-detail-request'>
                    <MenuRequest />
                    <div className='info-detail-request'>
                        <div className='info-basic-detail-request'>
                            <p>Request Code: {requestCode}</p>
                            <p>Created at: {createdAt}</p>
                            <p>Status: {status}</p>
                        </div>
                        <div className='main-detail-request'>
                            <h2 className='title-request'>CAR BOOKING REQUEST</h2>
                            <div className='table-content'>
                                <Row className='row-request'>
                                    <Col span={6} className='col-request'>
                                        <label>Applicant <span className='required'>*</span></label>
                                        <div>{Applicant}</div>
                                    </Col>
                                    <Col span={6} className='col-request'>
                                        <label>Department <span className='required'>*</span></label>
                                        <div>{Department}</div>
                                    </Col>
                                    <Col span={6} className='col-request'>
                                        <label>User <span className='required'>*</span></label>
                                        <div>{User}</div>
                                    </Col>
                                    <Col span={6} className='col-request'>
                                        <label>Mobile <span className='required'>*</span></label>
                                        <div>{Mobile}</div>
                                    </Col>
                                </Row>
                                <Row className='row-request'>
                                    <Col span={6} className='col-request'>
                                        <label>Cost Center <span className='required'>*</span></label>
                                        <div>{CostCenter}</div>
                                    </Col>
                                    <Col span={6} className='col-request'>
                                        <label>Total passengers <span className='required'>*</span></label>
                                        <div>{Totalpassengers}</div>
                                    </Col>
                                    <Col span={6} className='col-request'>
                                        <label>Usage time from <span className='required'>*</span></label>
                                        <div>{Usagetimefrom}</div>
                                    </Col>
                                    <Col span={6} className='col-request'></Col>
                                </Row>
                                <Row className='row-request'>
                                    <Col span={6} className='col-request'>
                                        <label>Pick time <span className='required'>*</span></label>
                                        <div>{Picktime}</div>
                                    </Col>
                                    <Col span={6} className='col-request'>
                                        <label>Pick location <span className='required'>*</span></label>
                                        <div>{Picklocation}</div>
                                    </Col>
                                    <Col span={6} className='col-request'>
                                        <label>Destination <span className='required'>*</span></label>
                                        <div>{Destination}</div>
                                    </Col>
                                    <Col span={6} className='col-request'>
                                        <label>Reason <span className='required'>*</span></label>
                                        <div>{Reason}</div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='attention-radio'>
                            <p>Chú ý: Trường hợp Phòng Hành Chính không đủ xe để đáp ứng yêu cầu điều xe của bộ phận, Phòng Hành Chính đề nghị sắp xếp phương tiện khác thay thế (thuê xe ngoài, hoặc dùng thẻ taxi, Grab,...) và chi phí sẽ hạch toán theo bộ phận yêu cầu.</p>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={1}>Yes</Radio>
                                <Radio value={2}>No</Radio>
                            </Radio.Group>
                        </div>
                        <div className='Attachment'>
                            <b>Attachment(s)</b>
                        </div>
                        <div className='approvers:'>
                            <p>Approvers:</p>
                            <Row>
                                <Col span={8} className='approver'>
                                    <label>Approver</label>
                                    <div>{Approver1}</div>
                                </Col>
                                <Col span={8} className='approver'>
                                    <label>Pho phong IT</label>
                                    <div>{Approver2}</div>
                                </Col>
                                <Col span={8}></Col>
                            </Row>
                        </div>
                        <Comment />
                    </div>
                </div>
            )}
        </RequestLayout>

    );
}

export default DetailRequest;
