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
    CloseCircleFilled,
    CheckCircleFilled
} from '@ant-design/icons';
// import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import request from '../../../Utils/request';
import { NotificationPlacement } from 'antd/es/notification/interface';
import TextArea from 'antd/es/input/TextArea';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from '../../../Reducers/rootReducer';
import { checkUserRoles } from '../../../Utils/checkUserRoles';

interface ActionRequest {
    action: string,
    Note: string
}

// interface ApproverShare {
//     Id: string;
//     FullName: string;
//     Email: string;
//     JobTitle: string;
// }

interface DepartmentMember {
    Id: string;
    User: {
        Id: string;
        FullName: string;
        Email: string;
        JobTitle: string;
    };
}

function MenuRequest(props: any): JSX.Element {

    // console.log(props);

    const { Option } = Select;
    const { departmentId, requestStatus, requestCode, setLoading, userInfo, senderId, workflowData } = props;
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenApprove, setIsModalOpenApprove] = useState(false);
    const [isModalOpenReject, setIsModalOpenReject] = useState(false);
    const [isModalOpenShare, setIsModalOpenShare] = useState(false);
    const [isModalOpenForward, setIsModalOpenForward] = useState(false);
    const [checkBoxDelete, SetCheckBoxDelete] = useState(false);
    const { requestId } = useParams();
    const { t } = useTranslation();
    const [actionRequest, setActionRequest] = useState<ActionRequest>({
        action: "",
        Note: ""
    })
    const [comment, setComment] = useState({
        comment: "",
    });
    const [showCancel, setShowCancel] = useState(false);
    // const [dataApprover, setDataApprover] = useState<ApproverShare[]>([]);
    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [selectedApprovers, setSelectedApprovers] = useState<{ [key: string]: string }>({});
    const [searchValue, setSearchValue] = useState<string>('');
    const [dataUserId, setDataUserId] = useState<string>('');

    useEffect(() => {
        // const getDataApprover = async () => {
        //     const endpoint = "/userRole/all-approvers";
        //     await request.get(endpoint).then((res) => {
        //         setDataApprover(res.data.Data);
        //     }).catch(() => {
        //     });
        // }

        const getDataDepatmentMember = async () => {
            const endpoint = "departmentMember/position?departmentId=" + departmentId;
            await request.get(endpoint).then((res) => {
                setDataDepartmentMember(res.data.Data);
            }).catch(() => {
            });
        }

        // getDataApprover();
        if (departmentId !== undefined) {
            getDataDepatmentMember();
        }

    }, [departmentId])

    const showModalDelete = () => {
        setIsModalOpenDelete(true);
    }

    const showModalShare = () => {
        setIsModalOpenShare(true);
    }

    const showModalApprove = () => {
        setActionRequest({ action: "Approved", Note: "" });
        setComment((prevComment) => ({
            ...prevComment,
            comment: t('Request ') + requestCode + t(' has been Approved. Note: ')
        }));
        setIsModalOpenApprove(true);
    };

    const showModalReject = () => {
        setActionRequest({ action: "Rejected", Note: "" });
        setComment((prevComment) => ({
            ...prevComment,
            comment: t('Request ') + requestCode + t(' has been Rejected. Note: ')
        }));
        setIsModalOpenReject(true);
    };

    const showModalForward = () => {
        setIsModalOpenForward(true);
    }

    const handleDelete = () => {
        request.delete("/request/" + requestId)
            .then((res) => {
                navigate("/request/carbooking");
                openNotification('topRight', 'Delete successful', true);
            })
            .catch((e) => {
                // setErrorMessage(e.response.data.Message);
                openNotification('topRight', e.response.data.Message, false);
            })
        setIsModalOpenDelete(false);
    }

    const onChangeCheckBoxDelete = () => {
        SetCheckBoxDelete(!checkBoxDelete);
    };

    const handleShare = () => {
        request.post("/request/share/create", { UserId: dataUserId, RequestId: requestId })
            .then(() => {
                // setLoading(true);
                openNotification('topRight', 'Shared successful', true);
            })
            .catch((error) => {
                console.log('error', error);
                // setLoading(true);
                // setErrorMessage(error.response.data.Message);
                openNotification('topRight', error.response.data.Message, false);
            });
        setIsModalOpenShare(false);
    }

    // Action Request
    const putActionRequest = () => {
        const putAction = () => {
            request.putForm("/request/action/Id=" + requestId, actionRequest)
                .then((res) => {
                    request.postForm("/request/comment/requestId=" + requestId, comment)
                    setLoading(true);
                    navigate("/request/carbooking/detail/" + requestId);
                    openNotification('topRight', actionRequest.action + ' successful', true);
                })
                .catch((e) => {
                    // setErrorMessage(e.response.data.Message);
                    openNotification('topRight', e.response.data.Message, false);
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
                .then((res) => {
                    request.postForm("/request/comment/requestId=" + requestId, comment);
                    setLoading(true);
                    navigate("/request/carbooking/detail/" + requestId);
                    openNotification('topRight', actionRequest.action + ' successful', true);
                })
                .catch((e) => {
                    // setErrorMessage(e.response.data.Message);
                    openNotification('topRight', e.response.data.Message, false);
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

    const openNotification = (placement: NotificationPlacement, msg: string, success: boolean) => {
        if (success === false) {
            notification.info({
                message: <strong>{t('Failed action')}</strong>,
                description: msg,
                placement,
                icon: <WarningOutlined style={{ color: '#FF0000' }} />,
            });
        } else {
            notification.info({
                message: <strong>Successfull</strong>,
                description: msg,
                placement,
                icon: <CheckCircleFilled style={{ color: 'green' }} />,

            });

        };
    }
    const downloadFilePdf = async () => {
        window.open(`http://localhost:63642/api/file/pdf-request/${requestId}`)
    }

    const handleSelectChange = (value: string) => {
        const temporaryList = { ...selectedApprovers, value };
        setSelectedApprovers(temporaryList);
        setDataUserId((value));
    }

    const handleSearch = (inputValue: string) => {
        setSearchValue(inputValue);
    };

    const filteredDataApprover = () => {
        if (dataDepartmentMember && dataDepartmentMember.length > 0) {
            return dataDepartmentMember.filter(
                (departmentMember) =>
                    departmentMember.User.Id !== dataUserId && (
                        departmentMember.User.FullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                        departmentMember.User.Email?.toLowerCase().includes(searchValue.toLowerCase()) ||
                        departmentMember.User.JobTitle?.toLowerCase().includes(searchValue.toLowerCase())

                    ))
        }
        else return [];
    };

    // check User Roles is Admin || AdminStative || Approver
    // const checkUserRoles = (roles: number[]) => {
    //     if (userInfo.UserRoles) {
    //         let checkRole = [];
    //         // ADMIN OR ADMINSTRATIVE
    //         if (roles.includes(1) || roles.includes(2)) {
    //             checkRole = userInfo.UserRoles.filter((role: any) => role.RoleId === 1 || role.RoleId === 2);
    //         }
    //         // APPROVER
    //         else if (roles.includes(3)) {
    //             checkRole = userInfo.UserRoles.filter((role: any) => role.RoleId === 3);
    //         }
    //         if (checkRole.length === 0) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     }
    //     else {
    //         return false;
    //     }
    // }

    // Check User is Approver of this Request
    const checkUserApprover = () => {
        const checkUserApprover = workflowData.filter((data: any) => data.User.Id === userInfo.Id);
        if (checkUserApprover.length !== 0) {
            return true;
        } else return false;
    }

    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu'>
                <Menu.Item onClick={handleReturn} key="return" icon={<ArrowLeftOutlined />}>
                    {t('return')}
                </Menu.Item>
                <Menu.Item onClick={downloadFilePdf} key="download" icon={<FilePdfOutlined />}>
                    {t('downloadfile')}
                </Menu.Item>
                {(senderId === userInfo.Id || checkUserRoles([1, 2], userInfo)) && (
                    <Menu.Item onClick={showModalDelete} key="delete" icon={<DeleteOutlined />}>
                        {t('delete')}
                    </Menu.Item>
                )}
                <Modal className='custom-menu' closable={false} title={<h4 className='menu-title-alert'>{t('Are you sure ?')}</h4>} open={isModalOpenDelete} footer={
                    <div className='menu-btn-delete'>
                        <Button type="primary" onClick={handleDelete}>OK</Button>
                        <Button onClick={handleClose}>{t('Cancel')}</Button>
                    </div>
                }>
                    <Checkbox className='menu-btn-delete-checkbox' onChange={onChangeCheckBoxDelete}>{t('Delete approval tasks related to this request.')}</Checkbox>
                </Modal>
                <Menu.Item key="progress" icon={<RiseOutlined />}>
                    {t('progress')}
                </Menu.Item>
                <Menu.Item onClick={showModalShare} key="share" icon={<ShareAltOutlined />}>
                    {t('share')}
                </Menu.Item>
                <Modal className='custom-menu' closable={false} title={<h4>{t('share')}</h4>} open={isModalOpenShare} footer={
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
                        defaultValue={'--Select a User--'}
                    >
                        {filteredDataApprover().map((approver) => (
                            <Option key={approver.Id} value={approver.User.Id}>
                                <div>
                                    <span>{approver.User.FullName} </span>
                                    <span>{approver.User.Email} </span>
                                    <span>{approver.User.JobTitle} </span>
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Modal>
                {(requestStatus === 'Waiting for approval' && (checkUserApprover() || checkUserRoles([1, 2], userInfo))) && (
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
                                    comment: t('Request ') + requestCode + t(' has been Approved. Note: ') + e.target.value
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
                                        comment: t('Request ') + requestCode + t(' has been Rejected. Reason: ') + e.target.value
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
                {(requestStatus === 'Approved' && checkUserRoles([1, 2], userInfo)) &&
                    <Dropdown overlay={menu} trigger={['click']}
                        onOpenChange={() => {
                            setActionRequest({ action: "Canceled", Note: "Canceled" });
                            setComment((prevComment) => ({
                                ...prevComment,
                                comment: t('Request ') + requestCode + t(' has been Canceled.')
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

const mapStateToProps = (state: RootState) => ({
    userInfo: state.request.userInfo
});


export default connect(mapStateToProps, null)(MenuRequest);
