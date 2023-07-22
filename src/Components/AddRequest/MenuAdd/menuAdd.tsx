import React, { useEffect } from 'react';
import { Menu, message } from 'antd';
import {
    ArrowLeftOutlined,
    SaveOutlined,
    SendOutlined
} from '@ant-design/icons';
import './menuAdd.css'
// import { request } from 'http';
import { useNavigate } from 'react-router-dom';
import request from '../../../Utils/request';
import { RcFile } from 'antd/es/upload';


interface MenuAddProps {
    formData: {
        SenderId: string,
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
        SenderId: string;
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
        setFormData((prevFormData) => ({
            ...prevFormData,
            Status: 'Draft'
        }));
    };
    useEffect(() => {
        if (formData.Status.length > 0) {
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
        }
    }, [formData, navigate])

    const handleSubmit = () => {
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
    }


    const handleReturn = () => {
        navigate("/request/carbooking");
    }

    // console.log(formData);

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