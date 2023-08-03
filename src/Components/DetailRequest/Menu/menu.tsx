import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Dropdown, Input, Menu, Modal, Select, notification } from 'antd';
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
    EllipsisOutlined,
    WarningOutlined,
    CloseCircleFilled
} from '@ant-design/icons';
// import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import request from '../../../Utils/request';
import { NotificationPlacement } from 'antd/es/notification/interface';
import TextArea from 'antd/es/input/TextArea';
import { useTranslation } from 'react-i18next';

interface ActionRequest {
    action: string,
    Note: string
}

interface ApproverShare {
    Id: string;
    FullName: string;
    Email: string;
    JobTitle: string;
}

function MenuRequest(props: any): JSX.Element {

    const { Option } = Select;
    const { requestStatus, requestCode, setLoading } = props;
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenApprove, setIsModalOpenApprove] = useState(false);
    const [isModalOpenReject, setIsModalOpenReject] = useState(false);
    const [isModalOpenShare, setIsModalOpenShare] = useState(false);
    const [isModalOpenForward, setIsModalOpenForward] = useState(false);
    const [checkBoxDelete, SetCheckBoxDelete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { requestId } = useParams();
    const {t} = useTranslation();
    const [actionRequest, setActionRequest] = useState<ActionRequest>({
        action: "",
        Note: ""
    })
    const [comment, setComment] = useState({
        comment: "",
    });
    const [showCancel, setShowCancel] = useState(false);
    const [dataApprover, setDataApprover] = useState<ApproverShare[]>([]);
    const [selectedApprovers, setSelectedApprovers] = useState<{ [key: string]: string }>({});
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        const getDataApprover = async () => {
            const endpoint = "/userRole/all-approvers";
            await request.get(endpoint).then((res) => {
                setDataApprover(res.data.Data);
            }).catch(() => {
            });
        }
        getDataApprover();
    }, [])

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
                setErrorMessage(e.response.data.Message);
                openNotification('topRight');
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
        const putAction = () => {
            request.putForm("/request/action/Id=" + requestId, actionRequest)
                .then(() => {
                    request.postForm("/request/comment/requestId=" + requestId, comment)
                    setLoading(true);
                    navigate("/request/carbooking/detail/" + requestId);
                })
                .catch((e) => {
                    setErrorMessage(e.response.data.Message);
                    openNotification('topRight');
                })
        }
        putAction();
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

    const handleMenuClick = (e: any) => {
        if (e.key === 'ellipsis') {
            setShowCancel(true);
        }
    };
    const handleCancelClick = () => {
        const putAction = () => {
            request.putForm("/request/action/cancel/Id=" + requestId, actionRequest)
                .then(() => {
                    request.postForm("/request/comment/requestId=" + requestId, comment);
                    setLoading(true);
                    navigate("/request/carbooking/detail/" + requestId);
                })
                .catch((e) => {
                    setErrorMessage(e.response.data.Message);
                    openNotification('topRight');
                })
        }
        putAction();
        setShowCancel(false);
    };

    const menu = (
        <Button icon={<CloseCircleFilled />} onClick={handleCancelClick}>{t('cancelrequest')}</Button>
    );

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

    // const items: MenuProps['items'] = [
    //     {
    //         label: (
    //             <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
    //                 1st menu item
    //             </a>
    //         ),
    //         key: '0',
    //     },
    // ];

    const openNotification = (placement: NotificationPlacement) => {
        notification.info({
            message: <strong>{t('Failed action')}</strong>,
            description: errorMessage,
            placement,
            icon: <WarningOutlined style={{ color: '#FF0000' }} />,

        });
    };
    const downloadFilePdf = async () => {
        window.open(`http://localhost:63642/api/file/pdf-request/${requestId}`)
    }

    const handleSelectChange = (value: string) => {
        const temporaryList = { ...selectedApprovers, value };
        setSelectedApprovers(temporaryList);
    }

    const handleSearch = (inputValue: string) => {
        setSearchValue(inputValue);
    };

    const filteredDataApprover = () => {
        if (dataApprover.length > 0) {
            return dataApprover.filter(
                (approver) =>
                    approver.FullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    approver.Email?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    approver.JobTitle?.toLowerCase().includes(searchValue.toLowerCase())
            )
        }
        else return [];
    };

    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu'>
                <Menu.Item onClick={handleReturn} key="return" icon={<ArrowLeftOutlined />}>
                    {t('return')}
                </Menu.Item>
                <Menu.Item onClick={downloadFilePdf} key="download" icon={<FilePdfOutlined />}>
                    {t('downloadfile')}
                </Menu.Item>
                <Menu.Item onClick={showModalDelete} key="delete" icon={<DeleteOutlined />}>
                    {t('delete')}
                </Menu.Item>
                <Modal className='custom-menu' closable={false} title={<h4 className='menu-title-alert'>Are you sure ?</h4>} open={isModalOpenDelete} footer={
                    <div className='menu-btn-delete'>
                        <Button type="primary" onClick={handleDelete}>OK</Button>
                        <Button onClick={handleClose}>{t('Cancel')}</Button>
                    </div>
                }>
                    <Checkbox className='menu-btn-delete-checkbox' onChange={onChangeCheckBoxDelete}>Delete approval tasks related to this request.</Checkbox>
                </Modal>
                <Menu.Item key="progress" icon={<RiseOutlined />}>
                    {t('progress')}
                </Menu.Item>
                <Menu.Item onClick={showModalShare} key="share" icon={<ShareAltOutlined />}>
                    {t('share')}
                </Menu.Item>
                <Modal className='custom-menu' closable={false} title={<h4>Share</h4>} open={isModalOpenShare} footer={
                    <div >
                        <Button type="primary" onClick={handleShare}>{t('share')}</Button>
                        <Button onClick={handleClose}>{t('Close')}</Button>
                    </div>
                }>
                    <Select
                        onChange={handleSelectChange}
                        showSearch
                        optionFilterProp="children"
                        filterOption={false}
                        onSearch={handleSearch}
                        className='fixed-width-object'
                    >
                        {filteredDataApprover().map((approver) => (
                            <Option key={approver.Id} value={approver.Id}>
                                <div>
                                    <span>{approver.FullName} </span>
                                    <span>{approver.Email} </span>
                                    <span>{approver.JobTitle} </span>
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Modal>
                {requestStatus === 'Waiting for approval' && (
                    <>
                        <Menu.Item onClick={showModalApprove} key="approve" icon={<CheckOutlined />}>
                            {t('approve')}
                        </Menu.Item>
                        <Modal className='custom-menu' title={<h4>Note</h4>} closable={false} open={isModalOpenApprove} footer={
                            <div>
                                <Button type="primary" onClick={handleApprove}>{t('approve')}</Button>
                                <Button onClick={handleClose}>{t('Close')}</Button>
                            </div>
                        }>
                            <TextArea rows={5} className='menu-after-btn-input' onChange={(e) => {
                                setActionRequest({ action: "Approved", Note: e.target.value });
                                setComment((prevComment) => ({
                                    ...prevComment,
                                    comment: "Request " + requestCode + " has been Approved. </br>Note: " + e.target.value
                                }));
                            }} />
                        </Modal>
                        <Menu.Item onClick={showModalReject} key="reject" icon={<CloseOutlined />}>
                            {t('reject')}
                        </Menu.Item>
                        <Modal className='custom-menu' closable={false} title={<h4>{t('reason')}</h4>} open={isModalOpenReject} footer={
                            <div>
                                <Button type="primary" onClick={handleReject}>{t('reject')}</Button>
                                <Button onClick={handleClose}>{t('Close')}</Button>
                            </div>
                        }>
                            <TextArea rows={5} className='menu-after-btn-input'
                                onChange={(e) => {
                                    setActionRequest({ action: "Rejected", Note: e.target.value });
                                    setComment((prevComment) => ({
                                        ...prevComment,
                                        comment: "Request " + requestCode + " has been Rejected. </br> Reason: " + e.target.value
                                    }));
                                }} />
                        </Modal>
                    </>
                )}

                <Menu.Item onClick={showModalForward} key="forward" icon={<DeliveredProcedureOutlined />}>
                    {t('forward')}
                </Menu.Item>
                <Modal className='custom-menu' closable={false} title={<h4>{t('Choose User')}</h4>} open={isModalOpenForward} footer={
                    <div >
                        <Button type="primary" onClick={handleForward}>{t('forward')}</Button>
                        <Button onClick={handleClose}>{t('Close')}</Button>
                    </div>
                }>
                    <Select className='fixed-width-object'>
                        <Option value="1">bangnm@o365.vn, Developer</Option>
                        <Option value="2">bu.test5@o365.vn, Tài xế</Option>
                    </Select>
                    <Input className='menu-after-btn-forward'></Input>
                </Modal>
                {requestStatus === 'Approved' &&
                    <Dropdown overlay={menu} trigger={['click']}
                        onOpenChange={() => {
                            setActionRequest({ action: "Canceled", Note: "Canceled" });
                            setComment((prevComment) => ({
                                ...prevComment,
                                comment: "Request " + requestCode + " has been Canceled."
                            }));
                        }}>
                        {!showCancel && (
                            <Menu.Item onClick={handleMenuClick} key="ellipsis" icon={<EllipsisOutlined />} />
                        )}
                    </Dropdown>}
            </Menu>
        </div>
    );
}

export default MenuRequest;