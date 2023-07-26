import React, { useEffect, useState } from 'react';
import { Row, Col, Radio, RadioChangeEvent } from 'antd';
import DoneRequest from '../DoneRequest/doneRequest';
import Comment from '../Comments/comment';
import MenuRequest from '../Menu/menu';
import RequestLayout from '../../RequestLayout';
import request from "../../../Utils/request";
import "./detailRequest.css";
import { useParams } from 'react-router';
import { changeFormatDatePostRequest } from '../../../Utils/formatDate';
import { FileTextOutlined } from '@ant-design/icons';

function DetailRequest(): JSX.Element {

    //Data information detail request
    // const requestCode: string = '2023OPS-CAR-0704-001';
    // const createdAt: string = '04/07/2023 09:33 AM';
    // const status: string = 'Waiting for Approval';

    //Data table detail request
    // const Applicant: string = 'Bang Minh Nguyen';
    // const Department: string = 'Kiem thu Testing';
    // const User: string = 'bangnm@o365.vn, Developer';
    // const Mobile: string = '0382187648';
    // const CostCenter: string = '1001';
    // const Totalpassengers: string = '2';
    // const Usagetimefrom: string = '04/07/2023 09:36 AM - 04/07/2023 10:36 AM';
    // const Picktime: string = '04/07/2023 09:36 AM';
    // const Destination: string = 'Vung Tau';
    // const Picklocation: string = 'TP.Ho Chi Minh'
    // const Reason: string = 'Cong tac'

    //Get Api
    const [detailData, setDetailData] = useState<any>({});
    const [attachmentData, setAttachmentData] = useState<any[]>([])
    const [workflowData, setWorkflowData] = useState<any>({})

    //Data Approver
    // const Approver1: string = 'Approver 1';
    // const Approver2: string = 'Approver 2';

    const profile = false;

    const { requestId } = useParams();


    useEffect(() => {
        const getDetailRequest = async () => {
            const endpoint = "/request/Id=" + requestId;
            await request.get(endpoint).then((res) => {
                setDetailData(res.data.Data);
            }
            );
        }
        const getAttachmentsRequest = async () => {
            const endpoint = "/request/attachment/requestId=" + requestId;
            await request.get(endpoint).then((res) => {
                setAttachmentData(res.data.Data);
            }
            );
        }
        const getWokflowRequest = async () => {
            const endpoint = "/request/workflow/requestId=" + requestId;
            await request.get(endpoint).then((res) => {
                setWorkflowData(res.data.Data);
            }
            );
        }
        getWokflowRequest();
        getAttachmentsRequest();
        getDetailRequest();

    }, [requestId])

    const [value, setValue] = useState(!detailData.ApplyNote);


    //Setup select-adio Yes or No
    const onChange = (e: RadioChangeEvent) => {
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    // console.log(attachmentData);


    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-detail-request'>
                    <MenuRequest requestStatus={detailData.Status} requestCode={detailData.RequestCode} />
                    <div className='info-detail-request'>
                        <div className='info-basic-detail-request'>
                            <p>Request Code: {detailData.RequestCode}</p>
                            <p>Created at: {detailData.Created}</p>
                            <p>Status: {detailData.Status}</p>
                        </div>
                        <div className='main-detail-request'>
                            <h2 className='title-detail-request'>CAR BOOKING REQUEST</h2>
                            <div className='content-detail-request'>
                                <Row className='row-detail-request'>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Applicant <span className='required'>*</span></label>
                                        <div>{detailData.SenderUser ? detailData.SenderUser.FullName : ""}</div>
                                    </Col>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Department <span className='required'>*</span></label>
                                        <div>{detailData.Department ? detailData.Department.Name : ""}</div>
                                    </Col>
                                    <Col span={6} className='col-detail-request'>
                                        <label>User <span className='required'>*</span></label>
                                        <div>{detailData.SenderUser ? detailData.SenderUser.FullName : ""} </div>
                                    </Col>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Mobile <span className='required'>*</span></label>
                                        <div>{detailData.Mobile}</div>
                                    </Col>
                                </Row>
                                <Row className='row-request'>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Cost Center <span className='required'>*</span></label>
                                        <div>{detailData.CostCenter}</div>
                                    </Col>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Total passengers <span className='required'>*</span></label>
                                        <div>{detailData.TotalPassengers}</div>
                                    </Col>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Usage time from <span className='required'>*</span></label>
                                        <div>{changeFormatDatePostRequest(detailData.UsageFrom)}</div>
                                    </Col>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Usage time to <span className='required'>*</span></label>
                                        <div>{changeFormatDatePostRequest(detailData.UsageTo)}</div>
                                    </Col>
                                </Row>
                                <Row className='row-request'>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Pick time <span className='required'>*</span></label>
                                        <div>{changeFormatDatePostRequest(detailData.PickTime)}</div>
                                    </Col>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Pick location <span className='required'>*</span></label>
                                        <div>{detailData.PickLocation}</div>
                                    </Col>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Destination <span className='required'>*</span></label>
                                        <div>{detailData.Destination}</div>
                                    </Col>
                                    <Col span={6} className='col-detail-request'>
                                        <label>Reason <span className='required'>*</span></label>
                                        <div>{detailData.Reason}</div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='attention-detail-request'>
                            <p>Chú ý: Trường hợp Phòng Hành Chính không đủ xe để đáp ứng yêu cầu điều xe của bộ phận, Phòng Hành Chính đề nghị sắp xếp phương tiện khác thay thế (thuê xe ngoài, hoặc dùng thẻ taxi, Grab,...) và chi phí sẽ hạch toán theo bộ phận yêu cầu.</p>
                            <Radio.Group onChange={onChange} value={value}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </div>
                        <DoneRequest />
                        <div className='Attachment'>
                            <b>Attachment(s)</b>
                            <div>
                                {Array.isArray(attachmentData) ? (
                                    attachmentData.map((attachment: { Id: number; Path: string; }) => (
                                        <div key={attachment.Id} className='approver'>
                                            <span><FileTextOutlined /> </span>
                                            <span>{attachment.Path.substring(39)} </span>
                                            <span>{detailData.SenderUser ? detailData.SenderUser.FullName : ""}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div>No attachment data available.</div>
                                )}
                            </div>
                        </div>
                        <div className='list-approvers'>
                            <p>Approvers:</p>
                            <Row>
                                {Array.isArray(workflowData) ? (
                                    workflowData.map((approverData: { Id: number; FullName: string; User: { Id: number; FullName: string } }) => (
                                        <Col key={approverData.Id} span={8} className='approver'>
                                            {approverData.User.FullName}
                                        </Col>
                                    ))
                                ) : (
                                    <div>No workflow data available.</div>
                                )}
                            </Row>
                        </div>
                        <Comment />
                    </div>
                </div>
            )
            }
        </RequestLayout >
    );
}

export default DetailRequest;
