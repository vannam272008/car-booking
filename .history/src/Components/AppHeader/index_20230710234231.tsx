import { Col, Layout, Row, Button, Dropdown, theme, Affix, FloatButton } from "antd";
import "./AppHeader.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { QuestionOutlined, BellOutlined, SettingOutlined, UserOutlined, MenuOutlined, CloseOutlined, CustomerServiceOutlined } from "@ant-design/icons";
const { Header } = Layout;
const { useToken } = theme;

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

const AppHeader = () => {
    const avatar = require('../../public/images/logo192.png');
    const { token } = useToken();
    const [pathName, setPathName] = useState(window.location.pathname);
    const [openHelp, setOpenHelp] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
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

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };

    // const pathName = window.location.pathname;
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
                        <NavLink

                            to="/"
                            className={`${pathName === "/" && "select-page"}`}
                        >
                            <p><b>OPUS Solutions</b></p>
                        </NavLink>
                    </div>
                </Col>
                <Col span={2} className="col-label">
                    <p><b>eOffice</b></p>
                </Col>
                <Col span={18} className="col-function">
                    <div className="group-btn">
                        <Dropdown
                            trigger={['click']}
                            open={openHelp}
                            onOpenChange={handleClickHelp}
                            dropdownRender={() => (
                                <FloatButton.Group
                                    placement="topbottom"
                                    open={openHelp}
                                    trigger="click"
                                    style={{ right: 279, top: 46 }}
                                >
                                    <div className="dropdown-help" style={contentStyle}>
                                        {/* <Affix style={{ position: 'absolute', top: 0, right: -200 }} offsetTop={64} onChange={(affixed) => console.log(affixed)}> */}
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
                                        {/* </Affix> */}
                                    </div>
                                </FloatButton.Group>
                            )}
                        >
                            <Button className="btn-item" ><QuestionOutlined /></Button>
                        </Dropdown>

                        <Button className="btn-item"><BellOutlined /></Button>
                        <NavLink

                            to="/"
                            className={`${pathName === "/" && "select-page"}`}
                        >
                            <Button className="btn-item"><SettingOutlined /></Button>
                        </NavLink>

                        <Dropdown
                            trigger={['click']}
                            open={openProfile}
                            onOpenChange={handleClickProfile}
                            dropdownRender={() => (
                                <div className="dropdown-help" style={contentStyle}>
                                    {/* <Affix style={{ position: 'absolute', top: 0, right: -5 }} offsetTop={64} onChange={(affixed) => console.log(affixed)}> */}
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
                                            <NavLink to="/" className={`${pathName === "/" && "select-page"}`}>
                                                <p>My Profile</p>
                                            </NavLink>
                                            <NavLink to="/" className={`${pathName === "/" && "select-page"}`}>
                                                <p>My Account</p>
                                            </NavLink>
                                            <NavLink to="/" className={`${pathName === "/" && "select-page"}`}>
                                                <p>Sign out</p>
                                            </NavLink>
                                        </div>
                                    </div>
                                    {/* </Affix> */}
                                </div>
                            )}
                        >
                            <Button className="btn-item"><UserOutlined /></Button>
                        </Dropdown>
                    </div>
                </Col>
            </Row >
        </Header >
    )
}

export default AppHeader;