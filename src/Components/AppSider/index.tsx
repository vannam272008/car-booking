import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

import { FolderOpenOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import "./AppSider.scss";
import { setTab, setStatus } from '../../Actions/requestAction';
import { RootState } from '../../Reducers/rootReducer';

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
    const userID = localStorage.getItem("Id")

    const { tab, setTab, setStatus } = props
    const items: MenuProps['items'] = [
        getItem('Requests', 'requests', <FolderOpenOutlined />, [
            getItem('All requests', 'get-all'),
            getItem('Sent to me', 'sent-to-me'),
            getItem('Sent to others', 'sent-to-others'),
            getItem('Shared with me', 'shared-with-me'),
        ]),

        getItem('Status', 'status', <BarChartOutlined />, [
            getItem('Draft', 'Draft'),
            getItem('Approving', 'Waiting for approval'),
            getItem('Approved', 'Approved'),
            getItem('Rejected', 'Rejected'),
        ]),

        getItem('Reports', 'reports', <BarChartOutlined />),

    ];

    const profileItems: MenuProps['items'] = [

        getItem('Setting', 'setting', <SettingOutlined />),

    ];

    const [openItem, setOpenItem] = useState('requests');

    const handleClick: MenuProps['onClick'] = (e) => {
        if (e.key !== 'get-all' && e.keyPath[1] === 'requests') {
            setTab(e.key + `/userId=${userID}`);
            setStatus("");
        }
        else if (e.keyPath[1] === 'status') {
            setTab('get-all' + `/userId=${userID}`);
            setStatus(e.key);
        }
        else { setTab(e.key + `/userId=${userID}`); setStatus("") }
    };
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className='sider-layout'>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: colorBgContainer }} width={230}>
                <div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[tab]}
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
const mapStateToProps = (state: RootState) => ({
    tab: state.request.tab,
    status: state.request.status
})

const mapDispatchToProps = { setTab, setStatus }

export default connect(mapStateToProps, mapDispatchToProps)(AppSider);

// export default AppSider