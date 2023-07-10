import React, { useState } from 'react';
import { Button, Input, Menu, Modal } from 'antd';
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu'>
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
                <Menu.Item onClick={showModal} key="reject" icon={<CloseOutlined />}>
                    Reject
                </Menu.Item>
                <Modal title="Reason" open={isModalOpen} footer={null}>
                    <Input />
                    <div>
                        <Button onClick={handleCancel}>Custom Cancel</Button>
                        <Button type="primary" onClick={handleOk}>Custom OK</Button>
                    </div>
                </Modal>
                <Menu.Item key="forward" icon={<DeliveredProcedureOutlined />}>
                    Forward
                </Menu.Item>
                <Menu.Item key="ellipsis" icon={<EllipsisOutlined />}>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuRequest;