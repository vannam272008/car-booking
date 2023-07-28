import { Upload, Col, Input, Row, Form, Select, DatePicker, Spin, Alert, Radio, Button, RadioChangeEvent } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { changeFormatDatePostRequest } from '../../../Utils/formatDate.js';
import request from "../../../Utils/request";
import { RcFile, UploadFile } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import EditSendApprover from '../EditSendApprover/editSendApprover';
import MenuEdit from '../MenuEdit/menuEdit';
import RequestLayout from '../../RequestLayout/index.jsx';

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


function EditRequest() {

    const { Option } = Select;

    const [dataDepartment, setDataDepartment] = useState<Department[]>([]);
    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fileList, setFileList] = useState<RcFile[]>([]);
    const [applyNote, setApplyNote] = useState<boolean>(false);
    const [listOfUserId, setListOfUserId] = useState<string[]>([]);
    const { requestId } = useParams();
    const [status, setStatus] = useState<string>("")
    const [activeTabKey, setActiveTabKey] = useState<string>();


    useEffect(() => {
        const fetchData = async () => {
            try {

                const departmentEndpoint = "department/all?page=1&limit=100";
                const departmentRes = await request.get(departmentEndpoint);
                setDataDepartment(departmentRes.data.Data.ListData);

                const departmentMemberEndpoint = `departmentMember/position?departmentId=${activeTabKey}`;
                const departmentMemberRes = await request.get(departmentMemberEndpoint);
                setDataDepartmentMember(departmentMemberRes.data.Data);


                const detailsDataEndpoint = "/request/Id=" + requestId;
                const detailsDataRes = await request.get(detailsDataEndpoint);
                setDetailData(detailsDataRes.data.Data);
                setApplyNote(detailsDataRes.data.Data.ApplyNote);
                setStatus(detailsDataRes.data.Data.Status);


                // const attachmentsDataEndpoint = "/request/attachment/requestId=" + requestId;
                // const attachmentsDataRes = await request.get(attachmentsDataEndpoint);
                // setFileList([...fileList, attachmentsDataRes.data.Data.Path]);



                setFormData((prevFormData) => ({
                    ...prevFormData,
                    DepartmentId: detailsDataRes.data.Data.Department.Id,
                    ReceiverId: detailsDataRes.data.Data.ReceiveUser.Id,
                }));

                setLoading(false);
            } catch (error) {
                setLoading(true);
            }
        };

        fetchData();
    }, [activeTabKey]);



    const [detailData, setDetailData] = useState<any>({});
    const usageFrom = changeFormatDatePostRequest(detailData.UsageFrom);
    const usageTo = changeFormatDatePostRequest(detailData.UsageTo);
    const pickTime = changeFormatDatePostRequest(detailData.PickTime);

    const [formData, setFormData] = useState({
        SenderId: "" as string | null,
        DepartmentId: "",
        ReceiverId: "",
        Mobile: null as string | null,
        CostCenter: null as string | null,
        TotalPassengers: null as string | null,
        PickLocation: "",
        Destination: "",
        Reason: "",
        ApplyNote: false,
        UsageFrom: "",
        UsageTo: "",
        PickTime: "",
        ListOfUserId: listOfUserId,
        Status: "",
        files: fileList,
    });

    useEffect(() => {
        const number: number = detailData.TotalPassengers ? detailData.TotalPassengers : "";
        const stringNumber = number.toString();

        setFormData((prevFormData) => ({
            ...prevFormData,
            files: fileList,
            ApplyNote: applyNote,
            ListOfUserId: listOfUserId,
            Mobile: detailData.Mobile,
            CostCenter: detailData.CostCenter,
            TotalPassengers: stringNumber,
            PickLocation: detailData.PickLocation,
            Destination: detailData.Destination,
            Reason: detailData.Reason,
            SenderId: detailData.SenderUser ? detailData.SenderUser.Id : undefined,
            UsageFrom: usageFrom,
            UsageTo: usageTo,
            PickTime: pickTime,
            Status: status,
        }));
    }, [listOfUserId, status, usageFrom, usageTo, pickTime, detailData.SenderUser, fileList, applyNote, detailData.Mobile, detailData.CostCenter, detailData.TotalPassengers, detailData.PickLocation, detailData.Destination, detailData.Reason]);

    useEffect(() => {
        setActiveTabKey(detailData.Department && !activeTabKey ? detailData.Department.Id : activeTabKey);
    }, [detailData.Department, activeTabKey])



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
        setActiveTabKey(value);
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

    const onChange = (e: RadioChangeEvent) => {
        setApplyNote(e.target.value);
    };

    const handleBeforeUpload = (file: RcFile) => {
        setFileList([...fileList, file]);
        return false;
    };
    const handleRemoveFile = (file: UploadFile<any>) => {
        // Filter out the file to be removed from the fileList
        const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedFileList);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.which ? event.which : event.keyCode;

        if ((charCode < 48 || charCode > 57) && charCode !== 8) {
            event.preventDefault();
        }
    };

    const profile = false;

    console.log(formData);

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div className='page-request'>
                    <MenuEdit formData={formData} setFormData={setFormData} />
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
                        (<div className='page-content'>
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
                                                    initialValue={detailData.SenderUser ? detailData.SenderUser.FullName : undefined}
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
                                                    initialValue={detailData.Department ? detailData.Department.Name : undefined}
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
                                                    initialValue={detailData.ReceiveUser ? detailData.ReceiveUser.FullName + ' ' + detailData.ReceiveUser.Email + ' ' + detailData.ReceiveUser.JobTitle : undefined}
                                                    labelCol={{ span: 24 }}
                                                >
                                                    <Select
                                                        value={formData.ReceiverId}
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
                                                    initialValue={detailData.Mobile ? detailData.Mobile : undefined}
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
                                                    initialValue={detailData.CostCenter ? detailData.CostCenter : undefined}
                                                >
                                                    <Input onKeyPress={handleKeyPress} type='text' inputMode='numeric' name='CostCenter' value={formData.CostCenter ?? ''} onChange={handleInputChange} />
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
                                                    initialValue={detailData.TotalPassengers ? detailData.TotalPassengers : undefined}
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
                                                    initialValue={dayjs(usageFrom)} // Giá trị mặc định là thời gian hiện tại
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
                                                    initialValue={dayjs(usageTo)}
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
                                                    initialValue={dayjs(pickTime)}
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
                                                    initialValue={detailData.PickLocation ? detailData.PickLocation : undefined}
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
                                                    initialValue={detailData.Destination ? detailData.Destination : undefined}
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
                                                    initialValue={detailData.Reason ? detailData.Reason : undefined}
                                                >
                                                    <Input type='text' name='Reason' value={formData.Reason} onChange={handleInputChange}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                            <div className='attention-request' style={{ marginTop: '0', }}>
                                <p>Chú ý: Trường hợp Phòng Hành Chính không đủ xe để đáp ứng yêu cầu điều xe của bộ phận, Phòng Hành Chính đề nghị sắp xếp phương tiện khác thay thế (thuê xe ngoài, hoặc dùng thẻ taxi, Grab,...) và chi phí sẽ hạch toán theo bộ phận yêu cầu.</p>
                                <Radio.Group onChange={onChange} value={applyNote}>
                                    <Radio value={true}>Yes</Radio>
                                    <Radio value={false}>No</Radio>
                                </Radio.Group>
                            </div>
                            <div className='Attachment'>
                                <b>Attachment(s)</b>
                            </div>
                            <div className='reply-upload-comment' style={{ width: 'fit-content' }}>
                                <Upload
                                    beforeUpload={handleBeforeUpload}
                                    accept=".png, .jpg, .jpeg, .pdf, .csv, .doc, .docx, .pptx, .ppt, .txt, .xls, .xlsx"
                                    fileList={fileList}
                                    onRemove={handleRemoveFile}
                                >
                                    <Button icon={<UploadOutlined />} style={{ backgroundColor: 'rgb(47,133,239)', color: 'white' }}>
                                        Add attachments
                                    </Button>
                                    <span> (Maximum 20MB per file)</span>
                                </Upload>
                            </div>
                            <EditSendApprover listOfUserId={listOfUserId} setListOfUserId={setListOfUserId} />
                        </div>
                        )
                    }
                </div>
            )}
        </RequestLayout >
    );
}

export default EditRequest;