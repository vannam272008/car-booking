import React from 'react';
import { Menu } from 'antd';
import './menuAdd.css'

function MenuAdd(): JSX.Element {
    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu '>
                <Menu.Item key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
                <Menu.Item key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
                <Menu.Item key="return" icon={<ArrowLeftOutlined />}>
                    Return
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default MenuAdd;