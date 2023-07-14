import React, { useCallback } from 'react';
import { Menu, message } from 'antd';
import {
    ArrowLeftOutlined,
    SaveOutlined,
    SendOutlined
} from '@ant-design/icons';
import './menuAdd.css'
// import { request } from 'http';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        PickTime: string
    };
}

function MenuAdd({ formData }: MenuAddProps): JSX.Element {

    const navigate = useNavigate();



    const handleSubmit = useCallback(() => {
        axios.post("http://localhost:63642/api/request/create", formData)
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
    }, [formData, navigate]);

    // console.log(formData);

    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu '>
                <Menu.Item key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
                <Menu.Item key="savedraft" icon={<SaveOutlined />}>
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