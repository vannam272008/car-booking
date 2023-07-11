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
                <Menu.Item key="approve" icon={<CheckOutlined />}>
                    Approve
                </Menu.Item>
                <Menu.Item onClick={showModal} key="reject" icon={<CloseOutlined />}>
                    Open Modal with customized footer

                    Reject
                </Menu.Item>
                <Modal
                    open={open}
                    title="Title"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                            Submit
                        </Button>,
                        <Button
                            key="link"
                            href="https://google.com"
                            type="primary"
                            loading={loading}
                            onClick={handleOk}
                        >
                            Search on Google
                        </Button>,
                    ]}
                >
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