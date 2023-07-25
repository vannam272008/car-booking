import React, { useState } from 'react';
import { Button, Checkbox, Dropdown, Input, Menu, Modal, Select, MenuProps } from 'antd';
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
// import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import request from '../../../Utils/request';

interface ActionRequest {
    action: string,
    Note: string
}

function MenuRequest(props: any): JSX.Element {

    const { Option } = Select;
    const { requestStatus } = props;
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenApprove, setIsModalOpenApprove] = useState(false);
    const [isModalOpenReject, setIsModalOpenReject] = useState(false);
    const [isModalOpenShare, setIsModalOpenShare] = useState(false);
    const [isModalOpenForward, setIsModalOpenForward] = useState(false);
    const [checkBoxDelete, SetCheckBoxDelete] = useState(false);
    const { requestId } = useParams();
    const [actionRequest, setActionRequest] = useState<ActionRequest>({
        action: "",
        Note: ""
    })

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
        request.delete("/request/" + requestId)
            .then(() => {
                navigate("/request/carbooking");
            })
            .catch((e) => {
                console.log(e.response.data.Message);
            })
        setIsModalOpenDelete(false);
    }

    const onChangeCheckBoxDelete = () => {
        SetCheckBoxDelete(!checkBoxDelete);
    };

    const handleShare = () => {
        setIsModalOpenShare(false);
    }

    // Action Request
    const putActionRequest = () => {
        request.putForm("/request/action/Id=" + requestId, actionRequest)
            .then(() => {
                navigate("/request/carbooking");
            })
            .catch((e) => {
                console.log(e.response.data.Message);
            })
    }
    const handleApprove = () => {
        putActionRequest();
        setIsModalOpenApprove(false);
    }

    const handleReject = () => {
        putActionRequest();
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

    const items: MenuProps['items'] = [
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
            key: '0',
        },
    ];

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
                        <Button type="primary" onClick={handleDelete} disabled={checkBoxDelete ? false : true}>OK</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </div>
                }>
                    <Checkbox className='menu-btn-delete-checkbox' onChange={onChangeCheckBoxDelete}>Delete approval tasks related to this request.</Checkbox>
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
                {requestStatus === 'Waiting for approval' && (
                    <>
                        <Menu.Item onClick={showModalApprove} key="approve" icon={<CheckOutlined />}>
                            Approve
                        </Menu.Item>
                        <Modal className='custom-menu' title={<h4>Note</h4>} closable={false} open={isModalOpenApprove} footer={
                            <div>
                                <Button type="primary" onClick={handleApprove}>Approve</Button>
                                <Button onClick={handleClose}>Close</Button>
                            </div>
                        }>
                            <Input className='menu-after-btn-input' onChange={(e) => { setActionRequest({ action: "Approved", Note: e.target.value }) }} />
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
                            <Input className='menu-after-btn-input' onChange={(e) => { setActionRequest({ action: "Rejected", Note: e.target.value }) }} />
                        </Modal>
                    </>
                )}

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
                <Menu.Item key="ellipsis" icon={<EllipsisOutlined />} />
                <Dropdown menu={{ items }}>
                </Dropdown>
            </Menu>
        </div>
    );
}

export default MenuRequest;