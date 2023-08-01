import MenuAdd from '../MenuAdd/menuAdd';
import SendApprover from '../SendApprover/sendApprover';
import RequestLayout from '../../RequestLayout';
import { Col, Input, Row, Form, Select, DatePicker, Spin, Alert } from 'antd';
import './addRequest.css'
import { ChangeEvent, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import request from "../../../Utils/request";
import { RcFile } from 'antd/es/upload';

interface Department {
    Name: string;
    Id: string;
}

interface DepartmentMember {
    Id: string;
    User: {
        Id: string;
        FullName: string;
        Email: string;
        JobTitle: string;
    };
}

function AddRequest(): JSX.Element {

    //set layout
    const profile = false;

    const [dataDepartment, setDataDepartment] = useState<Department[]>([]);
    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fileList, setFileList] = useState<RcFile[]>([]);
    const [applyNote, setApplyNote] = useState<boolean>(false);
    const [listOfUserId, setListOfUserId] = useState<string[]>([]);
    const [userLoginName, setUserLoginName] = useState("");
    const [searchValue, setSearchValue] = useState<string>('');

    //set initial formData
    const senderId = localStorage.getItem("Id")
    const futureTime = dayjs().add(24, 'hours');
    const usageMoment = dayjs();
    const updatefutureTime = futureTime.format('YYYY-MM-DD HH:mm:ss');
    const updateMoment = usageMoment.format('YYYY-MM-DD HH:mm:ss');

    //set formData post Api to server 
    const [formData, setFormData] = useState({
        SenderId: senderId as string | null,
        DepartmentId: "",
        ReceiverId: "",
        Mobile: null as string | null,
        CostCenter: null as string | null,
        TotalPassengers: null as string | null,
        PickLocation: '',
        Destination: '',
        Reason: '',
        ApplyNote: false,
        UsageFrom: updateMoment,
        UsageTo: updatefutureTime,
        PickTime: updateMoment,
        ListOfUserId: listOfUserId,
        Status: '',
        files: fileList,
    });

    //define initialValue for element input form
    const initialValueSender = userLoginName ?? '';
    const initialValueDepartment = dataDepartment.find((value) => value.Id === formData.DepartmentId)?.Name;
    const initialValueReceiver = dataDepartmentMember.length > 0 ? dataDepartmentMember[0].User.FullName + ' ' + dataDepartmentMember[0].User.Email + ' ' + dataDepartmentMember[0].User.JobTitle : 'Please choose another department !';
    const initialValueUsageFrom = formData.UsageFrom === "" ? dayjs() : dayjs(formData.UsageFrom);

    const { Option } = Select;

    useEffect(() => {
        request.get("/user/profile/" + senderId)
            .then((res) => {
                setUserLoginName(res.data.Data.FirstName + " " + res.data.Data.LastName);
            })
            .catch((e) => {
                console.log(e.response.Data);
            })
    }, [senderId])

    useEffect(() => {
        setLoading(true);
        const getAllDepartments = async () => {
            const departmentEndpoint = "department/all?page=1&limit=100";
            await request.get(departmentEndpoint)
                .then((res) => {
                    setDataDepartment(res.data.Data.ListData);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        DepartmentId: res.data.Data.ListData[0].Id,
                    }));
                })
        }

        const fetchData = async () => {
            try {
                const departmentMemberEndpoint = "departmentMember/position?departmentId=" + formData.DepartmentId;
                request.get(departmentMemberEndpoint).then((res) => {
                    setDataDepartmentMember(res.data.Data);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        ReceiverId: res.data.Data.length > 0 ? res.data.Data[0].User.Id : '',
                    }));
                    setLoading(false);
                })
            } catch (error) {
                setLoading(true);
            }
        };

        if (formData.DepartmentId === "") {
            getAllDepartments();
        } else {
            fetchData();
        }
    }, [formData.DepartmentId]);

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            files: fileList,
            ApplyNote: applyNote,
            ListOfUserId: listOfUserId,
            SenderId: senderId,
        }));
    }, [fileList, applyNote, listOfUserId, senderId]);


    //set Mobile, Cost Center, Total passengers, Pick location, Destination, Reason values ​​for formdata
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    //set User values ​​for formdata
    const handleSelectChange = (value: string, field: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    //set Usage time from, Usage time to, Pick time values ​​for formdata
    const handleDatePicker = (value: Dayjs | null, field: string) => {
        if (value) {
            const formattedValue = value.format('YYYY-MM-DD HH:mm:ss');
            setFormData((prevFormData) => ({
                ...prevFormData,
                [field]: formattedValue,
            }));
        }
    };

    //search value option in 'Select' 
    const handleSearch = (inputValue: string) => {
        setSearchValue(inputValue);
    };

    //show value option after search
    const filteredData = () => {
        if (dataDepartmentMember && dataDepartmentMember.length > 0) {
            return dataDepartmentMember.filter(
                (departmentMember) =>
                    departmentMember.User.FullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    departmentMember.User.Email?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    departmentMember.User.JobTitle?.toLowerCase().includes(searchValue.toLowerCase())
            )
        }
        else return [];
    };

    //limit the characters entered on the input tag
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.which ? event.which : event.keyCode;
        if ((charCode < 48 || charCode > 57) && charCode !== 8) {
            event.preventDefault();
        }
    };

    console.log('formdata', formData);

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-request'>
                    <MenuAdd formData={formData} setFormData={setFormData} />
                    <div className='page-content'>
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
                                <div className='table-request'>
                                    <h2 className='title-request'>CAR BOOKING REQUEST</h2>
                                    <div className='table-content'>
                                        <Form
                                            className='form-add-request'
                                        >
                                            <Row className='row-request'>
                                                {/*Request Applicant*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Applicant"
                                                        name="SenderId"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Applicant is require'
                                                            },
                                                        ]}
                                                        labelCol={{ span: 24 }}
                                                        initialValue={initialValueSender}
                                                    >
                                                        <Input type='text' value={formData.SenderId ?? ''} name='SenderId' readOnly onChange={handleInputChange} className='cursor-notallow-applicant' />
                                                    </Form.Item>
                                                </Col>
                                                {/*Request Department*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Dapartment"
                                                        name="DepartmentId"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Select something!',
                                                            },
                                                        ]}
                                                        initialValue={initialValueDepartment}
                                                        labelCol={{ span: 24 }}
                                                    >
                                                        <Select
                                                            value={formData.DepartmentId}
                                                            onChange={(value) => handleSelectChange(value, 'DepartmentId')}
                                                            showSearch
                                                            optionFilterProp="children"
                                                            filterOption={(inputValue, option) =>
                                                                option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                            }
                                                        >
                                                            {dataDepartment.map((department) => (
                                                                <Option key={department.Id} value={department.Id} >
                                                                    {department.Name}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                {/*Request User*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="User"
                                                        name="ReceiverId"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Select something!',
                                                            },
                                                        ]}
                                                        initialValue={initialValueReceiver}
                                                        labelCol={{ span: 24 }}
                                                    >
                                                        <Select
                                                            value={formData.SenderId}
                                                            onChange={(value) => handleSelectChange(value, 'ReceiverId')}
                                                            showSearch
                                                            optionFilterProp="children"
                                                            filterOption={false}
                                                            onSearch={handleSearch}
                                                        >
                                                            {filteredData().map((departmentMember) => (
                                                                <Option key={departmentMember.Id} value={departmentMember.User.Id}>
                                                                    <div>
                                                                        <span>{departmentMember.User.FullName} </span>
                                                                        <span>{departmentMember.User.Email} </span>
                                                                        <span>{departmentMember.User.JobTitle}</span>
                                                                    </div>
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                {/*Request Mobile*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Mobile"
                                                        name="Mobile"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Mobile is required',
                                                            },
                                                            {
                                                                pattern: /^[0-9]*$/,
                                                                message: 'Mobile must be a number',
                                                            },
                                                        ]}
                                                        labelCol={{ span: 24 }}
                                                    >
                                                        <Input maxLength={10} onKeyPress={handleKeyPress} type='text' name='Mobile' value={formData.Mobile ?? ''} onChange={handleInputChange} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row className='row-request'>
                                                {/*Request Cost Center*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Cost Center"
                                                        name="CostCenter"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: ' "Cost Center" is required'
                                                            },
                                                            {
                                                                pattern: /^[0-9]*$/,
                                                                message: 'Cost Center must be a number',
                                                            },
                                                        ]}
                                                        labelCol={{ span: 24 }}
                                                    >
                                                        <Input maxLength={10} onKeyPress={handleKeyPress} type='text' name='CostCenter' value={formData.CostCenter ?? ''} onChange={handleInputChange} />
                                                    </Form.Item>
                                                </Col>
                                                {/*Request Total passengers*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Total passengers"
                                                        name="Totalpassengers"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: ' "Total passengers" is required'
                                                            },
                                                            {
                                                                pattern: /^[0-9]*$/,
                                                                message: 'Total passengers must be a number',
                                                            },
                                                        ]}
                                                        labelCol={{ span: 24 }}
                                                    >
                                                        <Input maxLength={10} onKeyPress={handleKeyPress} type='text' name='TotalPassengers' value={formData.TotalPassengers ?? ''} onChange={handleInputChange} />
                                                    </Form.Item>
                                                </Col>
                                                {/*Request Usage time from*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Usage time from"
                                                        name="UsageFrom"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: ' "Usage time from" is required'
                                                            },
                                                        ]}
                                                        labelCol={{ span: 24 }}
                                                        initialValue={initialValueUsageFrom}
                                                    >
                                                        <DatePicker
                                                            className='add-request-width-formitem'
                                                            value={dayjs(formData.UsageFrom)}
                                                            onChange={(value) => handleDatePicker(value, 'UsageFrom')}
                                                            showTime
                                                            placeholder='From date time'
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                {/*Request Usage time to*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Usage time to"
                                                        name="UsageTo"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: ' "Usage time to" is required'
                                                            },
                                                        ]}
                                                        labelCol={{ span: 24 }}
                                                        initialValue={futureTime}
                                                    >
                                                        <DatePicker
                                                            className='add-request-width-formitem'
                                                            value={dayjs(formData.UsageTo)}
                                                            onChange={(value) => handleDatePicker(value, 'UsageTo')}
                                                            showTime
                                                            placeholder='To date time'
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row className='row-request'>
                                                {/*Request Pick time*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Pick time"
                                                        name="Picktime"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: ' "Pick time" is required'
                                                            },
                                                        ]}
                                                        labelCol={{ span: 24 }}
                                                        initialValue={dayjs()}
                                                    >
                                                        <DatePicker
                                                            className='.add-request-width-formitem'
                                                            value={dayjs(formData.PickTime)}
                                                            onChange={(value) => handleDatePicker(value, 'PickTime')}
                                                            showTime
                                                            placeholder='Pick time'
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                {/*Request Pick location*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Pick location"
                                                        name="Picklocation"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: ' "Pick location" is required'
                                                            },
                                                        ]}
                                                        labelCol={{ span: 24 }}
                                                    >
                                                        <Input type='text' name='PickLocation' value={formData.PickLocation} onChange={handleInputChange}></Input>
                                                    </Form.Item>
                                                </Col>
                                                {/*Request Destination */}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Destination "
                                                        name="Destination"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: ' "Destination" is required'

                                                            },
                                                        ]}
                                                        labelCol={{ span: 24 }}
                                                    >
                                                        <Input type='text' name='Destination' value={formData.Destination} onChange={handleInputChange}></Input>
                                                    </Form.Item>
                                                </Col>
                                                {/*Request Reason*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Reason"
                                                        name="Reason"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: ' "Reason" is required'
                                                            },
                                                        ]}
                                                        labelCol={{ span: 24 }}
                                                    >
                                                        <Input type='text' name='Reason' value={formData.Reason} onChange={handleInputChange}></Input>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>)}
                        <SendApprover fileList={fileList} setFileList={setFileList} applyNote={applyNote} setApplyNote={setApplyNote} listOfUserId={listOfUserId} setListOfUserId={setListOfUserId} />
                    </div>
                </div>
            )
            }
        </RequestLayout >
    );
}

export default AddRequest;