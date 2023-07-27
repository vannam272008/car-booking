import React, { useEffect } from 'react';
import { Menu, message, notification } from 'antd';
import {
    ArrowLeftOutlined,
    SaveOutlined,
    SendOutlined,
    WarningOutlined
} from '@ant-design/icons';
import './menuAdd.css'
// import { request } from 'http';
import { useNavigate } from 'react-router-dom';
import request from '../../../Utils/request';
import { RcFile } from 'antd/es/upload';
import { NotificationPlacement } from 'antd/es/notification/interface';


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

function MenuAdd({ formData, setFormData }: MenuAddProps): JSX.Element {

    const navigate = useNavigate();

    const handleSaveDraft = () => {
        if (formData.Mobile && formData.CostCenter && formData.TotalPassengers && formData.PickTime && formData.PickLocation && formData.Destination && formData.Reason !== null && formData.ListOfUserId.length !== 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                Status: 'Draft'
            }));
        }
        else {
            openNotification('topRight')
        }
    };
    useEffect(() => {
        if (formData.Status.length > 0 && formData.Status === "Draft") {
            request.postForm("/request/create", formData)
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
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [formData, navigate, setFormData])

    const handleSubmit = () => {
        if (formData.Mobile && formData.CostCenter && formData.TotalPassengers && formData.PickTime && formData.PickLocation && formData.Destination && formData.Reason && formData.ListOfUserId !== null && formData.ListOfUserId.length !== 0) {
            request.postForm("/request/create", formData)
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


    const openNotification = (placement: NotificationPlacement) => {
        notification.info({
            message: <strong>Failed action</strong>,
            description: 'Please fill in all the information in the form and and do the action again',
            placement,
            icon: <WarningOutlined style={{ color: '#FF0000' }} />,

        });
    };

    const handleReturn = () => {
        navigate("/request/carbooking");
    }

    console.log(formData);
    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu '>
                <Menu.Item onClick={handleReturn} key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
                <Menu.Item onClick={handleSaveDraft} key="savedraft" icon={<SaveOutlined />}>
                    Save draft
                </Menu.Item>
                <Menu.Item onClick={handleSubmit} key="submit" icon={<SendOutlined />}>
                    Submit
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuAdd;