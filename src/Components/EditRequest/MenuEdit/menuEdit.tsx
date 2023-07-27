import React, { useEffect, useState } from 'react';
import { Button, Menu, Modal, message, notification, Checkbox } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, SaveOutlined, SendOutlined, WarningOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { NotificationPlacement } from 'antd/es/notification/interface';
import request from '../../../Utils/request';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';




interface MenuAddProps {
    formData: {
        SenderId: string | null,
        DepartmentId: string,
        ReceiverId: string,
        Mobile: string | null,
        CostCenter: string | null,
        TotalPassengers: string | null,
        PickLocation: string,
        Destination: string,
        Reason: string,
        ApplyNote: boolean,
        UsageFrom: string,
        UsageTo: string,
        PickTime: string,
        ListOfUserId: string[],
        Status: string,
        files: RcFile[],
    },
    setFormData: React.Dispatch<React.SetStateAction<{
        SenderId: string | null;
        DepartmentId: string;
        ReceiverId: string;
        Mobile: string | null;
        CostCenter: string | null;
        TotalPassengers: string | null;
        PickLocation: string;
        Destination: string;
        Reason: string,
        ApplyNote: boolean,
        UsageFrom: string,
        UsageTo: string,
        PickTime: string,
        ListOfUserId: string[],
        Status: string,
        files: RcFile[];
    }>>,
}

function MenuEdit({ formData, setFormData }: MenuAddProps) {

    const navigate = useNavigate();
    const { requestId } = useParams();
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [checkBoxDelete, SetCheckBoxDelete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleReSubmit = () => {
        if (formData.Mobile && formData.CostCenter && formData.TotalPassengers && formData.PickTime && formData.PickLocation && formData.Destination && formData.Reason && formData.ListOfUserId !== null && formData.ListOfUserId.length !== 0) {
            request.putForm("/request/Id=" + requestId, formData)
                .then((response) => {
                    const data = response.data;
                    if (data) {
                        localStorage.setItem("Data", data?.Data);
                        if (data.Success === false) {
                            message.error(data.Message);
                        } else {
                            navigate("/request/carbooking");
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            setFormData((prevFormData) => ({
                ...prevFormData,
                SenderId: "",
                DepartmentId: "",
                ReceiverId: "",
                Mobile: "",
                CostCenter: "",
                TotalPassengers: "",
                PickLocation: '',
                Destination: '',
                Reason: '',
                ApplyNote: false,
                UsageFrom: "",
                UsageTo: "",
                PickTime: "",
                ListOfUserId: [],
                Status: "",
                files: [],
            }));
        } else {
            openNotification('topRight');
        }
    }

    const handleReturn = () => {
        navigate("/request/carbooking");
    }
    const openNotification = (placement: NotificationPlacement) => {
        notification.info({
            message: <strong>Failed action</strong>,
            description: 'Please fill in all the information in the form and and do the action again',
            placement,
            icon: <WarningOutlined style={{ color: '#FF0000' }} />,

        });
    };


    const showModalDelete = () => {
        setIsModalOpenDelete(true);
        console.log('succes');
    }
    const handleClose = () => {
        setIsModalOpenDelete(false);
    };


    const handleDelete = () => {
        request.delete("/request/" + requestId)
            .then(() => {
                navigate("/request/carbooking");
                console.log('sucess');
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


    return (

        <div>
            <Menu mode="horizontal" className='fixed-menu '>
                <Menu.Item onClick={handleReturn} key="return" icon={<ArrowLeftOutlined />}>
                    Return
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
                {/* <Menu.Item onClick={handleSaveDraft} key="savedraft" icon={<SaveOutlined />}>
                    Save draft
                </Menu.Item> */}
                <Menu.Item onClick={handleReSubmit} key="submit" icon={<SendOutlined />}>
                    Re-Submit
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuEdit;