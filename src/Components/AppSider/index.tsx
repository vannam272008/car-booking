import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Space } from 'antd';
import { Input } from 'antd';

import { FolderOpenOutlined, BarChartOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import "./AppSider.scss";



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



const AppSider = (props: any) => {

    const items: MenuProps['items'] = [
        getItem('Requests', 'requests', <FolderOpenOutlined />, [
            getItem('All requests', 'all-request'),
            getItem('Sent to me', 'sent-to-me'),
            getItem('Sent to others', 'sent-to-others'),
            getItem('Shared with me', 'shared-with-me'),
        ]),

        getItem('Status', 'status', <BarChartOutlined />, [
            getItem('Draft', 'draft'),
            getItem('Approving', 'approving'),
            getItem('Approved', 'approved'),
            getItem('Rejected', 'rejected'),
        ]),

        getItem('Reports', 'reports', <BarChartOutlined />),

    ];

    const profileItems: MenuProps['items'] = [

        getItem('Setting', 'setting', <SettingOutlined />),

    ];

    const [openItem, setOpenItem] = useState('requests');

    const handleClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div className='sider-layout'>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: colorBgContainer }} width={230}>
                <div>
                    <Space.Compact size="large">
                        <Input addonBefore={<SearchOutlined />} placeholder="..." />
                    </Space.Compact>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[openItem]}
                        defaultOpenKeys={['requests']}
                        openKeys={[openItem]}
                        style={{ height: '100%' }}
                        items={props.profile ? profileItems : items}
                        onClick={handleClick}
                        onOpenChange={(openKey) => {
                            setOpenItem(openKey[1])
                        }}
                    />
                </div>
            </Sider>
        </div>
    )
}

export default AppSider;