import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, theme } from 'antd';
import AppHeader from '../../Components/AppHeader';
import AppSider from '../../Components/AppSider';
import AppFooter from '../../Components/AppFooter';

import "./ManageRequest.scss";

const { Content } = Layout;

const ManageRequest: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className='manage-request'>
            <AppHeader />
            <Content >
                <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                    <AppSider />
                    <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
                    </Layout>
                </Layout>
            </Content>
            <AppFooter />
        </div>


    );
};

export default ManageRequest;