import React from 'react';
import { Menu } from 'antd';
import './menuAdd.css'

function MenuAdd(): JSX.Element {
    return (
        <div>
            <Menu mode="horizontal" className='fixed-menu '>
            </Menu>
        </div>
    );
}

export default MenuAdd;