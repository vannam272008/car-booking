import React from 'react';
import { Menu } from 'antd';
import {
    ArrowLeftOutlined,
    SaveOutlined,
    SendOutlined
} from '@ant-design/icons';
import './menuAdd.css'

function MenuAdd(): JSX.Element {
    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu '>
                <Menu.Item key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
                <Menu.Item key="return" icon={<SaveOutlined />}>
                    Save draft
                </Menu.Item>
                <Menu.Item key="return" icon={<SendOutlined />}>
                    Submit
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuAdd;