import MenuAdd from '../MenuAdd/menuAdd';
import SendApprover from '../SendApprover/sendApprover';
import RequestLayout from '../../RequestLayout';
import { Col, Input, Row, Form, Select, DatePicker, Spin, Alert } from 'antd';
import './addRequest.css'
import { ChangeEvent, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { changeFormatDatePostRequest } from '../../../Utils/formatDate.js';
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

    const { Option } = Select;

    const profile = false;

    const futureTime = dayjs().add(24, 'hours');
    const usageMoment = dayjs();
    const updatefutureTime = changeFormatDatePostRequest(futureTime);
    const updateMoment = changeFormatDatePostRequest(usageMoment);
    const [dataDepartment, setDataDepartment] = useState<Department[]>([]);
    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fileList, setFileList] = useState<RcFile[]>([]);
    const [applyNote, setApplyNote] = useState<boolean>(false);
    const [listOfUserId, setListOfUserId] = useState<string[]>([]);
    const senderId = localStorage.getItem("Id")
    // const [activeTabKey, setActiveTabKey] = useState<string>("");
    const [userLoginName, setUserLoginName] = useState("");
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
                    // Fetch data from the second API
                })
        }


        const fetchData = async () => {
            try {
                // Fetch data from the first API
                const departmentMemberEndpoint = "departmentMember/position?departmentId=" + formData.DepartmentId;
                request.get(departmentMemberEndpoint).then((res) => {
                    setDataDepartmentMember(res.data.Data);
                    // Update form data based on the fetched data
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        ReceiverId: res.data.Data[0].User.Id,
                    }));
                    setLoading(false);
                })

                // Set loading to false since data fetching is completed

            } catch (error) {
                // Handle errors if needed
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

    // useEffect(() => {
    //     setActiveTabKey(dataDepartment && !activeTabKey ? dataDepartment[0].Id : activeTabKey);
    // }, [])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSelectChange = (value: string, field: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleDatePicker = (value: Dayjs | null, field: string) => {
        if (value) {
            const formattedValue = value.format('YYYY-MM-DD HH:mm:ss');
            setFormData((prevFormData) => ({
                ...prevFormData,
                [field]: formattedValue,
            }));
        }
    };

    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearch = (inputValue: string) => {
        setSearchValue(inputValue);
    };

    const filteredData = () => {
        if (dataDepartmentMember.length > 0) {
            return dataDepartmentMember.filter(
                (departmentMember) =>
                    departmentMember.User.FullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    departmentMember.User.Email?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    departmentMember.User.JobTitle?.toLowerCase().includes(searchValue.toLowerCase())
            )
        }
        else return [];

    };

    // const getFullNameIfContainsSenderId = (dataDepartmentMember: DepartmentMember[], senderId: string | null) => {
    //     const userWithSenderId = dataDepartmentMember.find(
    //         (departmentMember) => departmentMember?.User.Id === senderId
    //     );
    //     return userWithSenderId?.User.FullName;
    // };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.which ? event.which : event.keyCode;

        if ((charCode < 48 || charCode > 57) && charCode !== 8) {
            event.preventDefault();
        }
    };

    console.log(formData);

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
                                                        initialValue={userLoginName}
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
                                                        initialValue={dataDepartment.find((value) => value.Id === formData.DepartmentId)?.Name}
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
                                                        initialValue={dataDepartmentMember.length > 0 ? dataDepartmentMember[0].User.FullName + ' ' + dataDepartmentMember[0].User.Email + ' ' + dataDepartmentMember[0].User.JobTitle : undefined}
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
                                                        initialValue={formData.Mobile}
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
                                                        <Input onKeyPress={handleKeyPress} type='text' inputMode='numeric' name='Mobile' value={formData.Mobile ?? ''} onChange={handleInputChange} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row className='row-request'>
                                                {/*Request Cost Center*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Cost Center"
                                                        name="CostCenter"
                                                        initialValue={formData.CostCenter}
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
                                                        <Input onKeyPress={handleKeyPress} type='text' inputMode='numeric' name='CostCenter' value={formData.CostCenter ?? ''} onChange={handleInputChange} />
                                                    </Form.Item>
                                                </Col>
                                                {/*Request Total passengers*/}
                                                <Col span={6} className='col-request'>
                                                    <Form.Item
                                                        label="Total passengers"
                                                        name="Totalpassengers"
                                                        initialValue={formData.TotalPassengers}
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
                                                        <Input onKeyPress={handleKeyPress} type='text' inputMode='numeric' name='TotalPassengers' value={formData.TotalPassengers ?? ''} onChange={handleInputChange} />
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
                                                        initialValue={formData.UsageFrom === "" ? dayjs() : dayjs(formData.UsageFrom)} // Giá trị mặc định là thời gian hiện tại
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
                                                        initialValue={futureTime} // Giá trị mặc định là thời gian sau 24 giờ
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
                                                        initialValue={dayjs()} // Giá trị mặc định là thời gian hiện tại
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
                                                        initialValue={formData.PickLocation}
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
                                                        initialValue={formData.Destination}
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
                                                        initialValue={formData.Reason}
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