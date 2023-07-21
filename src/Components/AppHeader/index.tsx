import { Col, Layout, Row, Button, Drawer, message } from "antd";
import "./AppHeader.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { QuestionOutlined, BellOutlined, SettingOutlined, UserOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import request from "../../Utils/request";
import opus_logo from "../../assets/opus_logo.png";
const { Header } = Layout;
// const { useToken } = theme;

// const items: MenuProps['items'] = [
//     {
//         key: '1',
//         label: (
//             <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
//                 1st menu item
//             </a>
//         ),   
//     },
// ];

interface LogoutValues {
    username: string;
    password: string;
}

const AppHeader = () => {
    const avatar = require('../../public/images/logo192.png');
    // const { token } = useToken();
    const [pathName, setPathName] = useState(window.location.pathname);
    const [openHelp, setOpenHelp] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
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

    // const contentStyle = {
    //     backgroundColor: token.colorBgElevated,
    //     borderRadius: token.borderRadiusLG,
    //     boxShadow: token.boxShadowSecondary,
    // };

    const onClose = () => {
        setOpenHelp(!openHelp);
    };

    // const pathName = window.location.pathname;

    const handleLogout =
        (values: LogoutValues) => {
            request
                .post("/user/logout", values)
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    if (data) {
                        if (data.Success == false) {
                            message.error(data.Message);
                        } else {
                            localStorage.setItem("Token", "");
                            localStorage.setItem("Id", "");
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
                                <span><b>Opus Helpdesk</b></span>
                                <NavLink to="/" className={`${pathName === "/" && "select-page"}`}>
                                    <p>Introduction</p>
                                </NavLink>
                                <NavLink to="/" className={`${pathName === "/" && "select-page"}`}>
                                    <p>Feedbacks & Suggest idea</p>
                                </NavLink>
                                <NavLink to="/" className={`${pathName === "/" && "select-page"}`}>
                                    <p>Open ticket</p>
                                </NavLink>
                                <NavLink to="/" className={`${pathName === "/" && "select-page"}`}>
                                    <p>Help</p>
                                </NavLink>
                            </div>
                            {/* </div> */}
                        </Drawer>

                        <Button className="btn-item"><BellOutlined /></Button>
                        <NavLink to="/" className={`${pathName === "/" && "select-page"}`}>
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
                                    <span className="info-name">Bang Nguyen Minh</span>
                                    <br />
                                    <span className="info-email">bangmn@o365.vn</span>
                                </div>
                                <div className="content-info">
                                    <NavLink to="/setting/profile" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                        <p>My Profile</p>
                                    </NavLink>
                                    <NavLink to="/" className={`${pathName === "/" && "select-page"}`} style={{ textDecoration: 'none' }}>
                                        <p>My Account</p>
                                    </NavLink>
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

export default AppHeader;