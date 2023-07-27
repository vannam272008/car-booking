import React from 'react';
import { Menu, message, notification } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, SendOutlined, WarningOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { RcFile } from 'antd/es/upload';
import { NotificationPlacement } from 'antd/es/notification/interface';
import request from '../../../Utils/request';
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

    const handleReSubmit = () => {
        if (formData.Mobile && formData.CostCenter && formData.TotalPassengers && formData.PickTime && formData.PickLocation && formData.Destination && formData.Reason && formData.ListOfUserId !== null && formData.ListOfUserId.length !== 0) {
            request.putForm("/request/Id=" + requestId, formData)
                .then((response) => {
                    const data = response.data;
                    if (data) {
                        const comment = "Submit the request " + data.Data.RequestCode + " for approval";
                        request.postForm("/request/comment/requestId=" + data.Data.Id, { comment });
                        localStorage.setItem("Data", data?.Data);
                        if (data.Success === false) {
                            message.error(data.Message);
                        } else {
                            navigate("/request/carbooking/detail/" + requestId);
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



    // const handleReSubmit = () => {
    //     if (formData.Mobile && formData.CostCenter && formData.TotalPassengers && formData.PickTime && formData.PickLocation && formData.Destination && formData.Reason !== null && formData.ListOfUserId.length !== 0) {
    //         setFormData((prevFormData) => ({
    //             ...prevFormData,
    //             Status: 'Draft'
    //         }));
    //     }
    //     else {
    //         openNotification('topRight')
    //     }
    // };
    // useEffect(() => {
    //     if (formData.Status.length > 0 && formData.Status === 'Draft') {
    //         request.putForm("/request/Id=" + requestId, formData)
    //             .then((response) => {
    //                 const data = response.data;
    //                 if (data) {
    //                     localStorage.setItem("Data", data?.Data);
    //                     if (data.Success === false) {
    //                         message.error(data.Message);
    //                     } else {
    //                         navigate("/request/carbooking");
    //                     }
    //                 }
    //                 setFormData((prevFormData) => ({
    //                     ...prevFormData,
    //                     SenderId: "",
    //                     DepartmentId: "",
    //                     ReceiverId: "",
    //                     Mobile: "",
    //                     CostCenter: "",
    //                     TotalPassengers: "",
    //                     PickLocation: '',
    //                     Destination: '',
    //                     Reason: '',
    //                     ApplyNote: false,
    //                     UsageFrom: "",
    //                     UsageTo: "",
    //                     PickTime: "",
    //                     ListOfUserId: [],
    //                     Status: "",
    //                     files: [],
    //                 }));
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // }, [formData, navigate, setFormData, requestId])

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

    return (

        <div>
            <Menu mode="horizontal" className='fixed-menu '>
                <Menu.Item onClick={handleReturn} key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined />}>
                    Delete
                </Menu.Item>
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