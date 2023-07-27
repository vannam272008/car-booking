import { Alert, Col, Radio, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import './infoFeedback.css'
import request from "../../../Utils/request";
import { useParams } from 'react-router';


function InfoFeedback() {

    const [loading, setLoading] = useState<boolean>(true);
    const [vehicleData, setVehicleData] = useState<any>({})
    const [checkValue, setCheckValue] = useState();
    const { requestId } = useParams();



    useEffect(() => {
        const getVehicleData = async () => {
            setLoading(true);
            const endpoint = "/request/vehicle/requestId=" + requestId;
            await request.get(endpoint).then((res) => {
                setVehicleData(res.data.Data);
                setCheckValue(res.data.Data.Type)
            }
            );
        }
        getVehicleData();
        setLoading(false);
    }, [])

    console.log('vehicleData', vehicleData);

    return (
        <div>
            {loading
                ?
                (<Spin style={{ height: '100vh' }} tip="Loading..." size="large">
                    <Alert
                        style={{ width: '100%', textAlign: 'center' }}
                        message="Loading..."
                        description="There are some issues happening, please wait a moment or you can try reloading the page"
                        type="info"
                    />
                </Spin>)
                :
                (
                    <div>
                        <p>Infomation feedback vehicle type</p>
                        {checkValue === true ? (
                            <div><Radio checked>Company vehicle</Radio></div>
                        ) : (
                            <div><Radio checked>Rented car, taxi</Radio></div>
                        )}
                        {checkValue ? (
                            <Row className='info-feadback-row'>
                                <Col span={6}>
                                    <div className='info-feadback-col-title'>Driver</div>
                                    <div>{vehicleData.User.FullName}</div>
                                </Col>
                                <Col span={6}>
                                    <div className='info-feadback-col-title'>Mobile</div>
                                    <div>{vehicleData.DriverMobile}</div>
                                </Col>
                                <Col span={6}>
                                    <div className='info-feadback-col-title'>Car plate</div>
                                    <div>{vehicleData.DriverCarplate}</div>
                                </Col>
                                <Col span={6}>
                                    <div className='info-feadback-col-title'>Rotation</div>
                                    <div>{vehicleData.Rotation.Type}</div>
                                </Col>
                            </Row>) : (
                            <Row className='info-feadback-row'>
                                <Col span={6}>
                                    <div className='info-feadback-col-title'>Reason</div>
                                    <div>{vehicleData.Reason}</div>
                                </Col>
                            </Row>
                        )
                        }
                        {vehicleData.Note ? (
                            <Row className='info-feadback-row'><Col span={24}>
                                <div className='info-feadback-col-title'>Note</div>
                                <div>{vehicleData.Note}</div>
                            </Col></Row>) :
                            (null)
                        }
                    </div>
                )}
        </div>
    );
}

export default InfoFeedback;