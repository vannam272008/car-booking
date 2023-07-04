import { Col, Layout, Row, Button, Dropdown, Space, Divider, theme } from "antd";
import "./AppHeader.scss";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { QuestionOutlined, BellOutlined, SettingOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';
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
    const { token } = useToken();
    const [pathName, setPathName] = useState(window.location.pathname);
    const [open, setOpen] = useState(false);
    const handlePathName = () => {
        setPathName(window.location.pathname);
    }

    const handleClickHelp = () => {
        setOpen(true);
    }

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };

    const menuStyle = {
        boxShadow: 'none',
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
                            open={open}
                            onOpenChange={handleClickHelp}
                            dropdownRender={() => (
                                <div style={contentStyle} className="dropdown-help">
                                    {/* {React.cloneElement(menu as React.ReactElement, { style: menuStyle })} */}
                                    <h2>Help</h2>
                                    <span onClick={() => setOpen(false)}>close</span>
                                    <div>
                                        <h4>OPUS HELPDESK</h4>
                                        <span>a</span>
                                        <span>a</span>
                                        <span>a</span>
                                        <span>a</span>

                                    </div>
                                </div>
                            )}
                        >
                            <Button className="btn-item" ><QuestionOutlined /></Button>
                        </Dropdown>

                        <Button className="btn-item"><BellOutlined /></Button>
                        <Button className="btn-item"><SettingOutlined /></Button>
                        <Button className="btn-item"><UserOutlined /></Button>
                    </div>

                </Col>
            </Row>

        </Header >
    )
}

export default AppHeader;