import React from 'react';
import EditRequest from '../EditRequest/editRequest';
import EditSendApprover from '../EditSendApprover/editSendApprover';
import { Menu } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import RequestLayout from '../../RequestLayout';
import { useNavigate } from 'react-router';


function MenuEdit() {

    const profile = false;

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/request/carbooking");
    }

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div>
                    <Menu mode="horizontal" className='fixed-menu '>
                        <Menu.Item onClick={handleReturn} key="return" icon={<ArrowLeftOutlined />}>
                            Return
                        </Menu.Item>
                        <Menu.Item key="delete" icon={<DeleteOutlined />}>
                            Delete
                        </Menu.Item>
                        <Menu.Item key="savedraft" icon={<SaveOutlined />}>
                            Save draft
                        </Menu.Item>
                        <Menu.Item key="submit" icon={<SendOutlined />}>
                            Re-Submit
                        </Menu.Item>
                    </Menu>
                    <EditRequest />
                    <EditSendApprover />
                </div>
            )}
        </RequestLayout >
    );
}

export default MenuEdit;