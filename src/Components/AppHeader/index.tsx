import { Col, Layout, Row, Button, Drawer, message, Badge, Menu } from "antd";
import "./AppHeader.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
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
    const { setTab, setStatus, userInfo } = props;
    const avatarDefault = require('../../public/images/avatarDefault.png');
    const [pathName, setPathName] = useState(window.location.pathname);
    const [openHelp, setOpenHelp] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    // const [userLoginInfo, setUserLoginInfo] = useState({
    //     FullName: "",
    //     AvatarPath: "",
    //     Email: ""
    // });
    const navigate = useNavigate();
    const { t } = useTranslation();

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

    // useEffect(() => {
    //     if (userID !== null) {
    //         request.get("/user/profile/" + userID)
    //             .then((res) => {
    //                 setUserLoginInfo({
    //                     FullName: res.data.Data.FirstName + " " + res.data.Data.LastName,
    //                     AvatarPath: res.data.Data.AvatarPath,
    //                     Email: res.data.Data.Email
    //                 })
    //             })
    //             .catch((e) => {
    //                 console.log(e.response.Data);
    //             })
    //     }
    // }, [userID])

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
            <Row className="row-header" >
                <Col xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    xxl={1}
                    // span={1}
                    className="col-menu"
                >
                    <Button className="btn-menu">
                        <MenuOutlined />
                    </Button>
                </Col>
                <Col xs={3}
                    sm={3}
                    md={3}
                    lg={4}
                    xl={4}
                    xxl={3}
                    className="col-logo">

                    <div onClick={handlePathName}>
                        <NavLink to="/" className={`${pathName === "/" && "select-page"}`}>
                            <img src={opus_logo} alt="img-opus" />
                        </NavLink>
                    </div>
                </Col>
                <Col xs={13}
                    sm={13}
                    md={13}
                    lg={13}
                    xl={13}
                    xxl={2}
                    className="col-label">
                    <p>eOffice</p>
                </Col>
                <Col xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={6}
                    xxl={18}
                    className="col-function">
                    <Menu className="group-btn" mode="horizontal">
                        <Menu.Item>
                            <Button className="btn-item" onClick={handleClickHelp}><QuestionOutlined /></Button>
                            <Drawer
                                className="dropdown-help"
                                placement="right"
                                onClose={onClose}
                                open={openHelp}
                                mask={false}
                                closable={false}
                            >
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
                            </Drawer>
                        </Menu.Item>

                        <Menu.Item>
                            <Badge count={3000} style={{ zIndex: '9999' }}>
                                <Button className="btn-item"><BellOutlined style={{ fontSize: '24px', color: 'white' }} /></Button>
                            </Badge>
                        </Menu.Item>
                        <Menu.Item>
                            <NavLink to="/setting" className={`${pathName === "/setting" && "select-page"}`}>
                                <Button className="btn-item"><SettingOutlined /></Button>
                            </NavLink>
                        </Menu.Item>

                        <Menu.Item>
                            <Button onClick={handleClickProfile} className="btn-item"><UserOutlined /></Button>
                            <Drawer
                                className="dropdown-help"
                                placement="right" onClose={onClose}
                                open={openProfile}
                                mask={false}
                                closable={false}
                            >
                                <div className="title-dropdown">
                                    <span>{t('myaccount')}</span>
                                    <Button className="header-btn-close" onClick={handleClickProfile}><CloseOutlined /></Button>
                                </div>
                                <div className="content-dropdown">
                                    <div className="account-info">
                                        {userInfo.AvatarPath
                                            ? <img
                                                src={`http://localhost:63642/${userInfo.AvatarPath}`}
                                                alt="avatar"></img>
                                            : <img
                                                src={String(avatarDefault)}
                                                alt="avatar"></img>
                                        }
                                        <span className="info-name">{userInfo.FullName}</span>
                                        <br />
                                        <span className="info-email">{userInfo.Email}</span>
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
                        </Menu.Item>


                    </Menu>

                    {/* <div className="group-btn">
                        <Button className="btn-item" onClick={handleClickHelp}><QuestionOutlined /></Button>
                        <Drawer
                            className="dropdown-help"
                            placement="right"
                            onClose={onClose}
                            open={openHelp}
                            mask={false}
                            closable={false}
                        >
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
                            <div className="title-dropdown">
                                <span>{t('myaccount')}</span>
                                <Button className="header-btn-close" onClick={handleClickProfile}><CloseOutlined /></Button>
                            </div>
                            <div className="content-dropdown">
                                <div className="account-info">
                                    {userInfo.AvatarPath
                                        ? <img
                                            src={`http://localhost:63642/${userInfo.AvatarPath}`}
                                            alt="avatar"></img>
                                        : <img
                                            src={String(avatarDefault)}
                                            alt="avatar"></img>
                                    }
                                    <span className="info-name">{userInfo.FullName}</span>
                                    <br />
                                    <span className="info-email">{userInfo.Email}</span>
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
                    </div> */}
                </Col>
            </Row >
        </Header >
    )
}
const mapStateToProps = (state: RootState) => ({
    tab: state.request.tab,
    status: state.request.status,
    userInfo: state.request.userInfo
});

const mapDispatchToProps = { setTab, setStatus };

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);