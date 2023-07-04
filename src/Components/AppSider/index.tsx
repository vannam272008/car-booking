import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Space } from 'antd';
import { Input } from 'antd';

import { AppstoreOutlined, MailOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons';
import "./AppSider.scss";


const { Search } = Input;

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('Requests', 'requests', <SettingOutlined />, [
        getItem('All requests', 'all-request'),
        getItem('Sent to me', 'sent-to-me'),
        getItem('Sent to others', 'sent-to-others'),
        getItem('Shared with me', 'shared-with-me'),
    ]),

    getItem('Status', 'status', <SettingOutlined />, [
        getItem('Draft', 'draft'),
        getItem('Approving', 'approving'),
        getItem('Approved', 'approved'),
        getItem('Rejected', 'rejected'),
    ]),

    getItem('Reports', 'reports', <SettingOutlined />),

];

const AppSider = () => {

    const handleClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            <Sider className="carbooking-sider" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: colorBgContainer }} width={200}>
                <Space.Compact size="large">
                    <Input addonBefore={<SearchOutlined />} placeholder="..." />
                </Space.Compact>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['all-request']}
                    defaultOpenKeys={['requests']}
                    style={{ height: '100%' }}
                    items={items}
                    onClick={handleClick}
                />
            </Sider>
        </>

    )
}

export default AppSider;