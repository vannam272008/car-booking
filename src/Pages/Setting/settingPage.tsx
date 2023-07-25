import React from 'react';
import RequestLayout from '../../Components/RequestLayout';
import { Button, Col, Row } from 'antd';
import './settingPage.css'
import { AppleFilled, AppstoreAddOutlined, ContactsFilled, FieldTimeOutlined, ProfileFilled, RadarChartOutlined, SafetyCertificateFilled, ShareAltOutlined, TeamOutlined, ToolFilled, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const profile = true;
function SettingPage(): JSX.Element {
    const userID = localStorage.getItem("Id");
    const navigate = useNavigate();

    const handleOrganizationStructure = () => {
        navigate("/setting/structure");
    }
    const handleProflie = () => {
        navigate("/setting/profile/" + userID);
    }

    const handleAdmin = () => {
        navigate("/setting/admin");
    }
    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='setting-page-content'>
                    <b>System</b>
                    <b style={{ float: 'right', marginRight: '150px' }}> Integration</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button onClick={handleOrganizationStructure}>Organizational structure<br /><TeamOutlined /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button onClick={handleProflie}>Personnal<br /><UserOutlined /></Button>
                        </Col>
                        <Col span={13}></Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>Office 365<br /><AppstoreAddOutlined /></Button>
                        </Col>
                    </Row>
                    <b>Requests</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>Remind<br /><FieldTimeOutlined /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>Procedure<br /><ShareAltOutlined /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>Category<br /><AppleFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>Setttings<br /><ToolFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>Business processs<br /><RadarChartOutlined /></Button>
                        </Col>
                    </Row>
                    <b>Payment</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>Car Booking</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button onClick={handleAdmin}>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>Document approval</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>Employee Offboarding</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>Checklist<br /><ProfileFilled /></Button>
                        </Col>
                    </Row>
                    <b>Promotion</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>Contract</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>Contract Template<br /><ContactsFilled /></Button>
                        </Col>
                    </Row>
                    <b>Asset In/Out gate</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>Capex Disposal</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>Capital Expenditure</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>Scheme</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>SMOS</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>Prepayment</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>Asset Transfer</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>Partner</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>Permission<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                </div>
            )
            }
        </RequestLayout >
    );

}
export default SettingPage;