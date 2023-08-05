import React from 'react';
import RequestLayout from '../../Components/RequestLayout';
import { Button, Col, Row } from 'antd';
import './settingPage.css'
import { AppleFilled, AppstoreAddOutlined, ContactsFilled, FieldTimeOutlined, ProfileFilled, RadarChartOutlined, SafetyCertificateFilled, ShareAltOutlined, TeamOutlined, ToolFilled, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const profile = true;
function SettingPage(): JSX.Element {
    const {t} = useTranslation();
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
                    <b>{t('System')}</b>
                    <b style={{ float: 'right', marginRight: '150px' }}> {t('Integration')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button onClick={handleOrganizationStructure}>{t('Organizational structure')}<br /><TeamOutlined /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button onClick={handleProflie}>{t('Personnal')}<br /><UserOutlined /></Button>
                        </Col>
                        <Col span={13}></Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>Office 365<br /><AppstoreAddOutlined /></Button>
                        </Col>
                    </Row>
                    <b>{t('requests')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Remind')}<br /><FieldTimeOutlined /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Procedure')}<br /><ShareAltOutlined /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Category')}<br /><AppleFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Setting')}<br /><ToolFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Business processs')}<br /><RadarChartOutlined /></Button>
                        </Col>
                    </Row>
                    <b>{t('Payment')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Car Booking')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button onClick={handleAdmin}>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Document approval')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Employee Offboarding')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Checklist')}<br /><ProfileFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Promotion')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Contract')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Contract Template')}<br /><ContactsFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Asset In/Out gate')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Capex Disposal')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Capital Expenditure')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Scheme')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>SMOS</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Prepayment')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Asset Transfer')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                    <b>{t('Partner')}</b>
                    <Row className='setting-page-row'>
                        <Col className='setting-page-col' span={3}>
                            <Button>{t('Permission')}<br /><SafetyCertificateFilled /></Button>
                        </Col>
                    </Row>
                </div>
            )
            }
        </RequestLayout >
    );

}
export default SettingPage;