import React, { useEffect, useState } from 'react';
import { Row, Col, Radio, RadioChangeEvent, Spin, Alert, Badge, Card } from 'antd';
import DoneRequest from '../DoneRequest/doneRequest';
import Comment from '../Comments/comment';
import MenuRequest from '../Menu/menu';
import RequestLayout from '../../RequestLayout';
import request from "../../../Utils/request";
import "./detailRequest.css";
import { useParams } from 'react-router';
import { changeFormatDatePostRequest } from '../../../Utils/formatDate';
import { FileTextOutlined } from '@ant-design/icons';
import InfoFeedback from '../InfoFeedback/infoFeedback';
// import PageNotFound from '../../../Pages/404';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
    const [loading, setLoading] = useState(true);
    const [showFeedback, setShowFeedback] = useState<string>('')
    const departmentId = detailData.Department ? detailData.Department.Id : undefined;


    //Data Approver
    // const Approver1: string = 'Approver 1';
    // const Approver2: string = 'Approver 2';

    const { t } = useTranslation();

    const profile = false;

    const { requestId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const getDetailRequest = async () => {
            const endpoint = "/request/Id=" + requestId;
            await request.get(endpoint).then((res) => {
                setDetailData(res.data.Data);
                setShowFeedback(res.data.Data.Status);
            }
            ).catch(() => {
                navigate("/page-not-found");
            });
        }
        const getAttachmentsRequest = async () => {
            const endpoint = "/request/attachment/requestId=" + requestId;
            await request.get(endpoint).then((res) => {
                setAttachmentData(res.data.Data);
            }
            ).catch(() => {
                navigate("/page-not-found");
            });
        }
        const getWokflowRequest = async () => {
            const endpoint = "/request/workflow/requestId=" + requestId;
            await request.get(endpoint).then((res) => {
                setWorkflowData(res.data.Data);
            }
            ).catch(() => {
                navigate("/page-not-found");
            });
        }
        getWokflowRequest();
        getAttachmentsRequest();
        getDetailRequest();
        setLoading(false);
    }, [requestId, loading, navigate])

    const [value, setValue] = useState(!detailData.ApplyNote);


    //Setup select-adio Yes or No
    const onChange = (e: RadioChangeEvent) => {
        // console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const handleDownloadFile = (attachmentPath: string) => {
        window.open(`http://localhost:63642/${attachmentPath}`);
    }

    // console.log(attachmentData);
    // const handleDownloadFile = (attachment: string) => {
    //     console.log(attachment);
    //     window = attachment;
    // }

    // console.log('hello', detailData.Department ? detailData.Department.Id : undefined);

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-detail-request'>
                    {loading ? (<Spin style={{ height: '100vh' }} tip="Loading..." size="large">
                        <Alert
                            style={{ width: '100%', textAlign: 'center' }}
                            message={t('Loading...')}
                            description={t('There are some issues happening, please wait a moment or you can try reloading the page')}
                            type="info"
                        />
                    </Spin>)
                        : <>
                            <MenuRequest departmentId={departmentId} requestStatus={detailData.Status} requestCode={detailData.RequestCode} setLoading={setLoading} />
                            <div className='info-detail-request'>
                                <div className='info-basic-detail-request'>
                                    <p>{t('requestcode')}: {detailData.RequestCode}</p>
                                    <p>{t('createdate')}: {detailData.Created}</p>
                                    <p>{t('status')}: {detailData.Status}</p>
                                </div>
                                <div className='main-detail-request'>
                                    <h2 className='title-detail-request'>{t('CAR BOOKING REQUEST')}</h2>
                                    <div className='content-detail-request'>
                                        <Row className='row-detail-request'>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('Applicant')} <span className='required'>*</span></label>
                                                <div>{detailData.SenderUser ? detailData.SenderUser.FullName : ""}</div>
                                            </Col>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('department')} <span className='required'>*</span></label>
                                                <div>{detailData.Department ? detailData.Department.Name : ""}</div>
                                            </Col>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('user')} <span className='required'>*</span></label>
                                                <div>{detailData.ReceiverUser ? detailData.ReceiverUser.FullName : ""} </div>
                                            </Col>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('mobile')} <span className='required'>*</span></label>
                                                <div>{detailData.Mobile}</div>
                                            </Col>
                                        </Row>
                                        <Row className='row-request'>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('Cost Center')} <span className='required'>*</span></label>
                                                <div>{detailData.CostCenter}</div>
                                            </Col>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('totalpassengers')} <span className='required'>*</span></label>
                                                <div>{detailData.TotalPassengers}</div>
                                            </Col>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('Usage time from')} <span className='required'>*</span></label>
                                                <div>{changeFormatDatePostRequest(detailData.UsageFrom)}</div>
                                            </Col>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('Usage time to')} <span className='required'>*</span></label>
                                                <div>{changeFormatDatePostRequest(detailData.UsageTo)}</div>
                                            </Col>
                                        </Row>
                                        <Row className='row-request'>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('Pick time')} <span className='required'>*</span></label>
                                                <div>{changeFormatDatePostRequest(detailData.PickTime)}</div>
                                            </Col>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('picklocation')} <span className='required'>*</span></label>
                                                <div>{detailData.PickLocation}</div>
                                            </Col>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('destination')} <span className='required'>*</span></label>
                                                <div>{detailData.Destination}</div>
                                            </Col>
                                            <Col span={6} className='col-detail-request'>
                                                <label>{t('reason')} <span className='required'>*</span></label>
                                                <div>{detailData.Reason}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className='attention-detail-request'>
                                    <p>Chú ý: Trường hợp Phòng Hành Chính không đủ xe để đáp ứng yêu cầu điều xe của bộ phận, Phòng Hành Chính đề nghị sắp xếp phương tiện khác thay thế (thuê xe ngoài, hoặc dùng thẻ taxi, Grab,...) và chi phí sẽ hạch toán theo bộ phận yêu cầu.</p>
                                    <Radio.Group onChange={onChange} value={value}>
                                        <Radio value={true}>{t('yes')}</Radio>
                                        <Radio value={false}>{t('no')}</Radio>
                                    </Radio.Group>
                                </div>
                                {showFeedback === 'Approved' ? (
                                    <DoneRequest requestCode={detailData.RequestCode} />
                                ) : showFeedback === 'Done' ? (
                                    <InfoFeedback />
                                ) : null}
                                <div className='Attachment'>
                                    <b>{t('Attachment(s)')}</b>
                                    <div>
                                        {Array.isArray(attachmentData) ? (
                                            attachmentData.map((attachment: { Id: number; Path: string; }) => (
                                                <div key={attachment.Id} className='approver'
                                                    onClick={() => { handleDownloadFile(attachment.Path) }}
                                                    style={{ cursor: 'pointer', color: 'blue' }}
                                                >
                                                    <span><FileTextOutlined /> </span>
                                                    {/* <span onClick={() => { handleDownloadFile(attachment.Path); console.log(attachment.Path); }}>{attachment.Path.substring(39)} </span> */}
                                                    <span>{attachment.Path.split('/').pop()} </span>
                                                    <span style={{ color: 'black' }}>{detailData.SenderUser ? detailData.SenderUser.FullName : ""}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div>{t('No attachment data available.')}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='list-approvers'>
                                    <p style={{ fontWeight: '700' }}>Approvers:</p>
                                    <Row>
                                        {Array.isArray(workflowData) ? (
                                            workflowData.map((approverData: { Id: number; Status: string; Position: string; User: { Id: number; FullName: string } }, index: number) => (
                                                <Col key={approverData.Id} span={6} className='approver'>
                                                    {approverData.Status === 'Rejected' ? (
                                                        <Badge.Ribbon text={t('rejected')} color="red" >
                                                            <Card
                                                                title={
                                                                    approverData.Position === 'Supervisor' || approverData.Position === 'Manager' ?
                                                                        (<span style={{ fontWeight: '̃700' }}>{approverData.Position}</span>)
                                                                        : (<span style={{ fontWeight: '̃700' }}>${t('Approver')}  {index + 1}</span>)
                                                                }
                                                                size="small">
                                                                {approverData.User.FullName}
                                                            </Card>
                                                        </Badge.Ribbon>
                                                    ) : (
                                                        approverData.Status === 'Approved' ? (
                                                            <Badge.Ribbon text={t('approved')} color="green" >
                                                                <Card
                                                                    title={

                                                                        approverData.Position === 'Supervisor' || approverData.Position === 'Manager' ?
                                                                            (<span style={{ fontWeight: '̃700' }}>{approverData.Position}</span>)
                                                                            : (<span style={{ fontWeight: '̃700' }}>{`t('Approver')} ${index + 1}`}</span>)
                                                                    }
                                                                    size="small">
                                                                    {approverData.User.FullName}
                                                                </Card>
                                                            </Badge.Ribbon>) : (
                                                            <Badge.Ribbon text={t('waitingforapproval')} color="blue" >
                                                                <Card
                                                                    title={
                                                                        approverData.Position === 'Supervisor' || approverData.Position === 'Manager' ?
                                                                            (<span style={{ fontWeight: '̃700' }}>{approverData.Position}</span>)
                                                                            : (<span style={{ fontWeight: '̃700' }}>{`t('Approver')} ${index + 1}`}</span>)
                                                                    }
                                                                    size="small">
                                                                    {approverData.User.FullName}
                                                                </Card>
                                                            </Badge.Ribbon>
                                                        )
                                                    )}
                                                </Col>
                                            ))
                                        ) : (
                                            <div>{t('No workflow data available.')}</div>
                                        )}
                                    </Row>
                                </div>
                                <Comment />
                            </div>
                        </>}
                </div>
            )
            }
        </RequestLayout >
    );
}

export default DetailRequest;
