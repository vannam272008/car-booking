import React, { useState } from 'react';
import { Button, Checkbox, Input, Menu, Modal, Select } from 'antd';
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
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate } from 'react-router';

function MenuRequest(): JSX.Element {

    const { Option } = Select;

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenApprove, setIsModalOpenApprove] = useState(false);
    const [isModalOpenReject, setIsModalOpenReject] = useState(false);
    const [isModalOpenShare, setIsModalOpenShare] = useState(false);
    const [isModalOpenForward, setIsModalOpenForward] = useState(false);

    const showModalDelete = () => {
        setIsModalOpenDelete(true);
    }

    const showModalShare = () => {
        setIsModalOpenShare(true);
    }

    const showModalApprove = () => {
        setIsModalOpenApprove(true);
    };

    const showModalReject = () => {
        setIsModalOpenReject(true);
    };

    const showModalForward = () => {
        setIsModalOpenForward(true);
    }

    const handleDelete = () => {
        setIsModalOpenDelete(false);
    }

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleShare = () => {
        setIsModalOpenShare(false);
    }

    const handleApprove = () => {
        setIsModalOpenApprove(false);
    }

    const handleReject = () => {
        setIsModalOpenReject(false);
    };

    const handleForward = () => {
        setIsModalOpenForward(true);
    };

    const handleClose = () => {
        setIsModalOpenDelete(false);
        setIsModalOpenShare(false);
        setIsModalOpenApprove(false);
        setIsModalOpenReject(false);
        setIsModalOpenForward(false);
    };

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/request/carbooking");
    }
    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu'>
                <Menu.Item onClick={handleReturn} key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
                <Menu.Item key="download" icon={<FilePdfOutlined />}>
                    Download file
                </Menu.Item>
                <Menu.Item onClick={showModalDelete} key="delete" icon={<DeleteOutlined />}>
                    Delete
                </Menu.Item>
                <Modal className='custom-menu' closable={false} title={<h4 className='menu-title-alert'>Are you sure ?</h4>} open={isModalOpenDelete} footer={
                    <div className='menu-btn-delete'>
                        <Button type="primary" onClick={handleDelete}>OK</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </div>
                }>
                    <Checkbox className='menu-btn-delete-checkbox' defaultChecked onChange={onChangeCheckbox}>Delete approval tasks related to this request.</Checkbox>
                </Modal>
                <Menu.Item key="progress" icon={<RiseOutlined />}>
                    Progress
                </Menu.Item>
                <Menu.Item onClick={showModalShare} key="share" icon={<ShareAltOutlined />}>
                    Share
                </Menu.Item>
                <Modal className='custom-menu' closable={false} title={<h4>Share</h4>} open={isModalOpenShare} footer={
                    <div >
                        <Button type="primary" onClick={handleShare}>Share</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                }>
                    <Select className='fixed-width-object'>
                        <Option value="1">bangnm@o365.vn, Developer</Option>
                        <Option value="2">bu.test5@o365.vn, Tài xế</Option>
                    </Select>
                </Modal>
                <Menu.Item onClick={showModalApprove} key="approve" icon={<CheckOutlined />}>
                    Approve
                </Menu.Item>
                <Modal className='custom-menu' title={<h4>Note</h4>} closable={false} open={isModalOpenApprove} footer={
                    <div>
                        <Button type="primary" onClick={handleApprove}>Approve</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                }>
                    <Input className='menu-after-btn-input' />
                </Modal>
                <Menu.Item onClick={showModalReject} key="reject" icon={<CloseOutlined />}>
                    Reject
                </Menu.Item>
                <Modal className='custom-menu' closable={false} title={<h4>Reason</h4>} open={isModalOpenReject} footer={
                    <div>
                        <Button type="primary" onClick={handleReject}>Reject</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                }>
                    <Input className='menu-after-btn-input' />
                </Modal>
                <Menu.Item onClick={showModalForward} key="forward" icon={<DeliveredProcedureOutlined />}>
                    Forward
                </Menu.Item>
                <Modal className='custom-menu' closable={false} title={<h4>Choose User</h4>} open={isModalOpenForward} footer={
                    <div >
                        <Button type="primary" onClick={handleForward}>Forward</Button>
                        <Button onClick={handleClose}>Close</Button>
                    </div>
                }>
                    <Select className='fixed-width-object'>
                        <Option value="1">bangnm@o365.vn, Developer</Option>
                        <Option value="2">bu.test5@o365.vn, Tài xế</Option>
                    </Select>
                    <Input className='menu-after-btn-forward'></Input>
                </Modal>
                <Menu.Item key="ellipsis" icon={<EllipsisOutlined />}>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuRequest;