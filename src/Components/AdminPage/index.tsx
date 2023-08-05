import React, { useState } from "react";
import { Tabs } from 'antd';
import UserManage from "./User/userManage";
import DepartmentManage from "./Department/departmentManage";
import RoleManage from "./Role/roleManage";
import RequestLayout from "../RequestLayout";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const AdminPage: React.FC = () => {

    const {t} = useTranslation();

    const [activeTab, setActiveTab] = useState<string>('user');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const profile = true;

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div style={{ padding: '48px', marginTop: '30px' }}>
                    <h1>{t('Admin Page')}</h1>
                    <Tabs activeKey={activeTab} onChange={handleTabChange}>
                        <TabPane tab={t('user')} key="user">
                            <UserManage />
                        </TabPane>
                        <TabPane tab={t('department')} key="department">
                            <DepartmentManage />
                        </TabPane>
                        <TabPane tab={t('Roles')} key="role">
                            <RoleManage />
                        </TabPane>
                    </Tabs>
                </div>
            )}
        </RequestLayout>

    );
};

export default AdminPage;