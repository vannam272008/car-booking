import React from 'react';
import './menuUser.css';
import { Menu } from 'antd';
import { ArrowLeftOutlined, ClusterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function MenuUser(): JSX.Element {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/setting");
    }
    return (
        <div>
            <Menu mode="horizontal" className='organizational-menu-user'>
                <Menu.Item key="viewchart" icon={<ClusterOutlined />}>
                    View orgchart
                </Menu.Item>
                <Menu.Item onClick={handleReturn} key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuUser;