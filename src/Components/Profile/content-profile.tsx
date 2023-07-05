import { Tabs, Table, Avatar, Typography } from 'antd';
import { useState } from "react";
import React from 'react';
import { UserAddOutlined, AntDesignOutlined } from '@ant-design/icons';
import "./profile.css"
import { relative } from 'path';
import RequestLayout from '../RequestLayout';

const { Title } = Typography;
const onChange = (key: string) => {
};

const columns_overview = [
    {
        dataIndex: 'overview_title',
    },
    {
        dataIndex: 'info',
    },
];

const columns_additional = [
    {
        dataIndex: 'additional_title',
    },
    {
        dataIndex: 'info',
    },
];

const columns_contract = [
    {
        title: 'Contract type',
        dataIndex: 'Contract_type'
    },
    {
        title: 'From',
        dataIndex: 'From'
    },
    {
        title: 'To',
        dataIndex: 'To'
    },
    {
        title: 'Signing date',
        dataIndex: 'Signing_date'
    },
    {
        title: 'Subject',
        dataIndex: 'Subject'
    },
    {
        title: 'Department',
        dataIndex: 'Department'
    },
    {
        title: 'Note',
        dataIndex: 'Note'
    }
];

const columns_family = [
    {
        dataIndex: 'Family_title',
    },
    {
        dataIndex: 'info',
    },
];

const columns_relationship = [
    {
        title: 'Contact name',
        dataIndex: 'Contact_name',
    },
    {
        title: 'Birth day',
        dataIndex: 'Birth_day'
    },
    {
        title: 'Relationship',
        dataIndex: 'Relationship',
    },
    {
        title: 'Note',
        dataIndex: 'Note',
    }
];

const dataSource_overview = [
    {
        overview_title: 'Login',
        info: <strong>bangnm@o365.vn</strong>
    },
    {
        overview_title: 'Email',
        info: <strong>bangnm@o365.vn</strong>
    },
    {
        overview_title: 'Employee number',
        info: ''
    },
    {
        overview_title: 'First name',
        info: <strong>Bang</strong>
    },
    {
        overview_title: 'Last name',
        info: <strong>Nguyen Minh</strong>
    },
    {
        overview_title: 'Sex',
        info: ''
    },
    {
        overview_title: 'Birth day',
        info: ''
    },
    {
        overview_title: 'Job title',
        info: <strong>Developer</strong>
    },
    {
        overview_title: 'Position',
        info: ''
    },
    {
        overview_title: 'Company',
        info: ''
    },
    {
        overview_title: 'Unit',
        info: ''
    },
    {
        overview_title: 'Function',
        info: ''
    },
    {
        overview_title: 'Department',
        info: ''
    },
    {
        overview_title: 'Sections/Teams',
        info: ''
    },
    {
        overview_title: 'Groups',
        info: ''
    },
    {
        overview_title: 'Office location',
        info: ''
    },
    {
        overview_title: 'Line Manager',
        info: <strong>Hao Ha Anh</strong>
    },
    {
        overview_title: 'Belong to departments',
        info: <strong>Cộng tác viên, Dự án test, Hỗ trợ khách hàng, IT/ Technical, Kiểm thử Testing, Test 3, Test Project</strong>
    },
    {
        overview_title: 'Cost Center',
        info: ''
    },
    {
        overview_title: 'Rank',
        info: ''
    },
    {
        overview_title: 'Employee type',
        info: ''
    },
    {
        overview_title: 'Rights',
        info: <strong>Request Admin, General Viewer, AVN Document Approval Request Reporters, Car Booking Request Admin, AVN Proposal Approval Request Reporters</strong>
    },
];

const dataSource_additional = [
    {
        additional_title: 'Nation',
        info: ''
    },
    {
        additional_title: 'Phone',
        info: ''
    },
    {
        additional_title: 'ID card number',
        info: ''
    },
    {
        additional_title: 'Date of ID card',
        info: ''
    },
    {
        additional_title: 'Health insurance',
        info: ''
    },
    {
        additional_title: 'Starting date',
        info: ''
    },
    {
        additional_title: 'Starting date offical',
        info: ''
    },
    {
        additional_title: 'Leaving date',
        info: ''
    },
    {
        additional_title: 'Start Date Maternity Leave',
        info: ''
    },
    {
        additional_title: 'Note',
        info: ''
    },
    {
        additional_title: <strong>Literacy</strong>,
    },
    {
        additional_title: 'Academic level',
        info: ''
    },
    {
        additional_title: 'Specialized qualification',
        info: ''
    },
    {
        additional_title: <strong>Contact Info</strong>,
    },
    {
        additional_title: 'Business phone',
        info: ''
    },
    {
        additional_title: 'Home phone',
        info: ''
    },
    {
        additional_title: 'Personal email',
        info: ''
    },
    {
        additional_title: <strong>Bank account</strong>,
    },
    {
        additional_title: 'Bank Name',
        info: ''
    },
    {
        additional_title: 'Branch number',
        info: ''
    },
    {
        additional_title: 'Bank brach name',
        info: ''
    },
    {
        additional_title: 'Bank account number',
        info: ''
    },
    {
        additional_title: 'NoteBank Account Name',
        info: ''
    },
    {
        additional_title: <strong>Address</strong>,
    },
    {
        additional_title: 'Street',
        info: ''
    },
    {
        additional_title: 'Building / flatnumber',
        info: ''
    },
    {
        additional_title: 'Province / state',
        info: ''
    },
    {
        additional_title: 'Postal code',
        info: ''
    },
    {
        additional_title: 'Country',
        info: ''
    },
];

const dataSource_contract = [
    {
        Contract_type: 'input',
        From: 'inputFrom',
        To: 'inputTo',
        Signing_date: 'inputDate',
        Subject: 'inputSubject',
        Department: 'inputDepart',
        Note: 'inputNote'
    }
];

const dataSource_family = [
    {
        Family_title: 'Martial status',
        info: 'Đã kết hôn'
    },
    {
        Family_title: <strong>Emergency contact</strong>,

    },
    {
        Family_title: 'Contact name',
        info: 'Nguyễn Thị A'
    },
    {
        Family_title: 'Relationship',
        info: 'Vợ'
    },
    {
        Family_title: 'Phone',
        info: '0876839834'
    },
    {
        Family_title: <strong>Permanent Address</strong>,
    },
    {
        Family_title: 'Street',
        info: '19'
    },
    {
        Family_title: 'Building / flatnumber',
        info: ''
    },
    {
        Family_title: 'City',
        info: 'Hồ Chí Minh'
    },
    {
        Family_title: 'Province / state',
        info: ''
    },
    {
        Family_title: 'Postal code',
        info: '700000'
    },
    {
        Family_title: 'Country',
        info: 'Việt Nam'
    },


];

const dataSource_relationship = [
    {
        Contact_name: 'input',
        Birth_day: 'input',
        Relationship: 'input',
        Note: 'inputNote'
    }
];

let label = [
    {
        key: '1',
        label: <strong>Overview</strong>,
        children: <Table pagination={false} dataSource={dataSource_overview} columns={columns_overview}></Table>,
    },
    {
        key: '2',
        label: <strong>Additional</strong>,
        children: [<Table pagination={false} dataSource={dataSource_additional} columns={columns_additional}></Table>,
        <Title>Contract</Title>,
        <Table pagination={false} dataSource={dataSource_contract} columns={columns_contract}></Table>]
    },
    {
        key: '3',
        label: <strong>Family</strong>,
        children: [<Table pagination={false} dataSource={dataSource_family} columns={columns_family}></Table>,
        <Title>Relationships</Title>,
        <Table pagination={false} dataSource={dataSource_relationship} columns={columns_relationship}></Table>
        ]
    },
    {
        key: '4',
        label: <strong>Signature</strong>,
        children: 'Content of Tab Chữ Ký',
    },
];

const ContentProfile: React.FC = () => {
    const profile = true;

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className="content-profile">
                    <div className="info-user" >
                        <Avatar
                            size={{ xs: 90, sm: 100, md: 120, lg: 140, xl: 160, xxl: 180 }}
                            icon={<AntDesignOutlined />}
                        />
                        <Title style={{ marginLeft: '50px' }}>Bang Nguyen Minh</Title>
                        <UserAddOutlined style={{ fontSize: '50px', marginLeft: '50px' }} />
                    </div>
                    <div className="profile-table">
                        <div className="tab-content ">
                            <Tabs
                                style={{ padding: '10px 10px' }}
                                onChange={onChange}
                                type="card"
                                items={label}
                            />
                        </div>


                    </div>
                </div>
            )}
        </RequestLayout>
    );
};
export default ContentProfile