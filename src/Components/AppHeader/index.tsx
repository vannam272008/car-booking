import { Col, Layout, Row, Button, Drawer, message, Badge } from "antd";
import "./AppHeader.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuestionOutlined, BellOutlined, SettingOutlined, UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import request from "../../Utils/request";
import opus_logo from "../../assets/opus_logo.png";
import { connect } from 'react-redux';
import { RootState } from '../../Reducers/rootReducer';
import { setTab, setStatus } from "../../Actions/requestAction";
import Feedback from "../Feedback/Feedback";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

interface LogoutValues {
    username: string;
    password: string;
}

const AppHeader = (props: any) => {
    const userID = localStorage.getItem("Id");
    const { setTab, setStatus } = props;
    const avatarDefault = require('../../public/images/avatarDefault.png');
    const [pathName, setPathName] = useState(window.location.pathname);
    const [openHelp, setOpenHelp] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [userLoginInfo, setUserLoginInfo] = useState({
        FullName: "",
        AvatarPath: "",
        Email: ""
    });
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handlePathName = () => {
        setPathName(window.location.pathname);
        window.location.reload();
    }

    const handleClickHelp = () => {
        setOpenHelp(!openHelp);
        setOpenProfile(false);
    }

    const handleClickProfile = () => {
        setOpenProfile(!openProfile);
        setOpenHelp(false);
    }

    const handleClickMyProfile = () => {
        navigate('/setting/profile/' + userID);
    }

    const onClose = () => {
        setOpenHelp(!openHelp);
    };

    useEffect(() => {
        if (userID !== null) {
            request.get("/user/profile/" + userID)
                .then((res) => {
                    setUserLoginInfo({
                        FullName: res.data.Data.FirstName + " " + res.data.Data.LastName,
                        AvatarPath: res.data.Data.AvatarPath,
                        Email: res.data.Data.Email
                    })
                })
                .catch((e) => {
                    console.log(e.response.Data);
                })
        }
    }, [userID])

    const handleLogout =
        (values: LogoutValues) => {
            request
                .get("/user/logout")
                .then((response) => {
                    const data = response.data;
                    console.log(response);
                    if (data) {
                        if (data.Success === false) {
                            message.error(data.Message);
                        } else {
                            localStorage.clear();
                            setStatus('');
                            setTab('get-all');
                            window.location.reload();
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };

    return (
        <Header className="mcs-header">
            <Row className="row-header">
                <Col span={1}>
                    <Button className="btn-menu">
                        <MenuOutlined />
                    </Button>
                </Col>
                <Col span={3} className="col-logo">

                    <div onClick={handlePathName}>
                        <NavLink to="/request/carbooking" className={`${pathName === "/" && "select-page"}`}>
                            <img src={opus_logo} alt="img-opus" />
                        </NavLink>
                    </div>
                </Col>
                <Col span={2} className="col-label">
                    <p>eOffice</p>
                </Col>
                <Col span={18} className="col-function">
                    <div className="group-btn">
                        <Button className="btn-item" onClick={handleClickHelp}><QuestionOutlined /></Button>
                        <Drawer
                            className="dropdown-help"
                            placement="right"
                            onClose={onClose}
                            open={openHelp}
                            mask={false}
                            closable={false}
                        >
                            {/* <div style={contentStyle}> */}
                            {/* {React.cloneElement(menu as React.ReactElement, { style: menuStyle })} */}
                            <div className="title-dropdown">
                                <span>{t('help')}</span>
                                <Button className="header-btn-close" onClick={handleClickHelp}><CloseOutlined /></Button>
                            </div>
                            <div className="content-dropdown">
                                <h4 style={{ fontSize: '18px', fontFamily: 'Segoe UI' }}>Opus Helpdesk</h4>
                                <NavLink to="/" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                    <p>{t('introduction')}</p>
                                </NavLink>
                                <Feedback />
                                <NavLink to="https://tasken.io/issue/new" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                    <p>{t('openticket')}</p>
                                </NavLink>
                                <NavLink to="/" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                    <p>{t('help')}</p>
                                </NavLink>
                            </div>
                            {/* </div> */}
                        </Drawer>

                        <Badge count={3000} style={{ zIndex: '9999' }}>
                            <Button className="btn-item"><BellOutlined style={{ fontSize: '24px', color: 'white' }} /></Button>
                        </Badge>
                        <NavLink to="/setting" className={`${pathName === "/setting" && "select-page"}`}>
                            <Button className="btn-item"><SettingOutlined /></Button>
                        </NavLink>

                        <Button onClick={handleClickProfile} className="btn-item"><UserOutlined /></Button>
                        <Drawer
                            className="dropdown-help"
                            placement="right" onClose={onClose}
                            open={openProfile}
                            mask={false}
                            closable={false}
                        >
                            {/* {React.cloneElement(menu as React.ReactElement, { style: menuStyle })} */}
                            <div className="title-dropdown">
                                <span>{t('myaccount')}</span>
                                <Button className="header-btn-close" onClick={handleClickProfile}><CloseOutlined /></Button>
                            </div>
                            <div className="content-dropdown">
                                <div className="account-info">
                                    {userLoginInfo.AvatarPath
                                        ? <img
                                            src={`http://localhost:63642/${userLoginInfo.AvatarPath}`}
                                            alt="avatar"></img>
                                        : <img
                                            src={String(avatarDefault)}
                                            alt="avatar"></img>
                                    }
                                    <span className="info-name">{userLoginInfo.FullName}</span>
                                    <br />
                                    <span className="info-email">{userLoginInfo.Email}</span>
                                </div>
                                <div className="content-info">
                                    <div className='my-profile' style={{ textDecoration: 'none' }} onClick={handleClickMyProfile}>
                                        <p>{t('myprofile')}</p>
                                    </div>
                                    <div className='my-profile' style={{ textDecoration: 'none' }}>
                                        <p>{t('myaccount')}</p>
                                    </div>
                                    <NavLink to="/" onClick={() => handleLogout({ username: "", password: "" })} className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                        <p>{t('signout')}</p>
                                    </NavLink>
                                </div>
                            </div>
                        </Drawer>
                    </div>
                </Col>
            </Row >
        </Header >
    )
}
const mapStateToProps = (state: RootState) => ({
    tab: state.request.tab,
    status: state.request.status
});

const mapDispatchToProps = { setTab, setStatus };

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);