import { Col, Layout, Row, Button, Drawer, message } from "antd";
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

const { Header } = Layout;

interface LogoutValues {
    username: string;
    password: string;
}

const AppHeader = (props: any) => {
    const userID = localStorage.getItem("Id");
    const { setTab, setStatus } = props;
    const avatar = require('../../public/images/logo192.png');
    const [pathName, setPathName] = useState(window.location.pathname);
    const [openHelp, setOpenHelp] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [userLoginInfo, setUserLoginInfo] = useState({
        FullName: "",
        AvatarPath: "",
        Email: ""
    });
    const navigate = useNavigate();

    const handlePathName = () => {
        setPathName(window.location.pathname);
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
    }, [userID])

    const handleLogout =
        (values: LogoutValues) => {
            request
                .get("/user/logout")
                .then((response) => {
                    const data = response.data;
                    console.log(response);
                    if (data) {
                        if (data.Success == false) {
                            message.error(data.Message);
                        } else {
                            localStorage.clear();
                            setStatus('');
                            setTab('get-all');
                            navigate("/login");
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
                        <NavLink to="/" className={`${pathName === "/" && "select-page"}`}>
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
                                <span>Help</span>
                                <Button className="header-btn-close" onClick={handleClickHelp}><CloseOutlined /></Button>
                            </div>
                            <div className="content-dropdown">
                                <h4 style={{ fontSize: '18px', fontFamily: 'Segoe UI' }}>Opus Helpdesk</h4>
                                <NavLink to="/" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                    <p>Introduction</p>
                                </NavLink>
                                <Feedback />
                                <NavLink to="https://tasken.io/issue/new" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                    <p>Open ticket</p>
                                </NavLink>
                                <NavLink to="/" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                    <p>Help</p>
                                </NavLink>
                            </div>
                            {/* </div> */}
                        </Drawer>

                        <Button className="btn-item"><BellOutlined /></Button>
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
                                <span>My Account</span>
                                <Button className="header-btn-close" onClick={handleClickProfile}><CloseOutlined /></Button>
                            </div>
                            <div className="content-dropdown">
                                <div className="account-info">
                                    <img src={String(avatar)} alt="avatar"></img>
                                    <span className="info-name">{userLoginInfo.FullName}</span>
                                    <br />
                                    <span className="info-email">{userLoginInfo.Email}</span>
                                </div>
                                <div className="content-info">
                                    <div className='my-profile' style={{ textDecoration: 'none' }} onClick={handleClickMyProfile}>
                                        <p>My Profile</p>
                                    </div>
                                    <div className='my-profile' style={{ textDecoration: 'none' }}>
                                        <p>My Account</p>
                                    </div>
                                    <NavLink to="/" onClick={() => handleLogout({ username: "", password: "" })} className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                        <p>Sign out</p>
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