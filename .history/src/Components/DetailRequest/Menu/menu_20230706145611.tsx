import React from 'react';
import { Button, Menu } from 'antd';
import './menu.css'
import {
    ArrowLeftOutlined,
    FilePdfOutlined,
    DeleteOutlined,
    RiseOutlined,
    ShareAltOutlined,
    CheckOutlined,
    CloseOutlined,
    DeliveredProcedureOutlined,
    EllipsisOutlined
} from '@ant-design/icons';

function MenuRequest(): JSX.Element {
    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu '>
                <Menu.Item key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
                <Menu.Item key="download" icon={<FilePdfOutlined />}>
                    Download file
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined />}>
                    Delete
                </Menu.Item>
                <Menu.Item key="progress" icon={<RiseOutlined />}>
                    Progress
                </Menu.Item>
                <Menu.Item key="share" icon={<ShareAltOutlined />}>
                    Share
                </Menu.Item>
                <Menu.Item key="approve" icon={<CheckOutlined />}>
                    Approve
                </Menu.Item>
                <Menu.Item key="reject" icon={<CloseOutlined />}>
                    Reject
                </Menu.Item>
                <Menu.Item key="forward" icon={<DeliveredProcedureOutlined />}>
                    Forward
                </Menu.Item>
                <Menu.Item key="vv" icon={<EllipsisOutlined />}>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuRequest;