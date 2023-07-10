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

    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const showModal1 = () => {
        setIsModalOpen1(true);
    };

    const showModal2 = () => {
        setIsModalOpen2(true);
    };

    const handleReject = () => {
        setIsModalOpen(false);
    };

    const handleApprove = () => {
        setIsModalOpen(false);
    }

    const handleClose = () => {
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
                <Menu.Item onClick={showModal} key="approve" icon={<CheckOutlined />}>
                    Approve
                </Menu.Item>
                <Modal title="Note" open={isModalOpen} footer={
                    <div>
                        <Button type="primary" onClick={handleApprove}>Approve</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                }>
                    <Input />
                </Modal>
                <Menu.Item onClick={showModal} key="reject" icon={<CloseOutlined />}>
                    Reject
                </Menu.Item>
                <Modal title="Reason" open={isModalOpen} footer={
                    <div>
                        <Button type="primary" onClick={handleReject}>Reject</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                }>
                    <Input />
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