import { Col, Radio, Row } from 'antd';
import React, { useState } from 'react';
import './infoFeedback.css'

function InfoFeedback() {

    const [checkValue, setCheckValue] = useState(false);

    return (
        <div>
            <p>Infomation feedback vehicle type</p>

            {checkValue === true ? (
                <div><Radio checked>Company vehicle</Radio></div>
            ) : (
                <div><Radio checked>Rented car, taxi</Radio></div>
            )}

            <Row className='info-feadback-row'>
                <Col span={6}>
                    <div className='info-feadback-col-title'>Driver</div>
                </Col>
                <Col span={6}>
                    <div className='info-feadback-col-title'>Mobile</div>
                </Col>
                <Col span={6}>
                    <div className='info-feadback-col-title'>Car plate</div>
                </Col>
                <Col span={6}>
                    <div className='info-feadback-col-title'>Rotation</div>
                </Col>
            </Row>
        </div>
    );
}

export default InfoFeedback;