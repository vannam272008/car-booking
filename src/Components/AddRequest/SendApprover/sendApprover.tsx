import { useEffect, useState } from 'react';
import { DeleteOutlined, DragOutlined, EditOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Select, Radio, RadioChangeEvent, Upload, Button, Row, Col, Input, Space, notification } from 'antd';
import './sendApprover.css'
import request from "../../../Utils/request";
// import MenuAdd from '../MenuAdd/menuAdd';
import { RcFile } from 'antd/es/upload';
import { NotificationPlacement } from 'antd/es/notification/interface';

interface DepartmentMember {
    Id: string;
    User: {
        FullName: string;
        Email: string;
        JobTitle: string;
        Id: string;
    };
}

interface PropsDataList {
    fileList: RcFile[];
    setFileList: React.Dispatch<React.SetStateAction<RcFile[]>>;
    applyNote: boolean;
    setApplyNote: React.Dispatch<React.SetStateAction<boolean>>;
    listOfUserId: string[];
    setListOfUserId: React.Dispatch<React.SetStateAction<string[]>>;

}


function SendApprover({ fileList, setFileList, applyNote, setApplyNote, listOfUserId, setListOfUserId }: PropsDataList): JSX.Element {

    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getDataDepartmentMember = async () => {
            const endpoint = "departmentMember/all?page=1&limit=100";
            await request.get(endpoint).then((res) => {
                setDataDepartmentMember(res.data.Data.ListData);
            }).catch(() => {
                // setLoading(true);
            });
        }
        getDataDepartmentMember();
    }, [])

    const { Option } = Select;

    // const [applyNote, setApplyNote] = useState<DataApplyNote>(false);

    const onChange = (e: RadioChangeEvent) => {
        // console.log('radio checked', e.target.value);
        setApplyNote(e.target.value);
    };

    const [inputs, setInputs] = useState<string[]>(['Initial Input']);

    const [counterApprover, setCounterApprover] = useState(1);

    const handleAddInput = () => {
        setInputs([...inputs, '']);
        setLabelApprovers([...labelApprovers, `Approver ${counterApprover}`]);
        setCounterApprover(counterApprover + 1);
    };

    // const handleInputChange = (index: number, value: string) => {
    //     const newInputs = [...inputs];
    //     newInputs[index] = value;
    //     setInputs(newInputs);
    // };

    const handleDelete = (index: number) => {
        const newInputs = [...inputs];
        const newListOfUser = [...listOfUserId];
        newListOfUser.splice(index, 1);
        setListOfUserId(newListOfUser);
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    const [editingIndex, setEditingIndex] = useState(-1);
    const [labelApprovers, setLabelApprovers] = useState<string[]>(['Pho Phong IT']);

    const handleInputChangeApprover = (index: number, value: string) => {
        const newApprovers = [...labelApprovers];
        newApprovers[index] = value;
        setLabelApprovers(newApprovers);
    };


    const handleSave = (index: number) => {
        setEditingIndex(-1);
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
    };

    const handleBeforeUpload = (file: RcFile) => {
        setFileList([...fileList, file]);
        return false;
    };

    // const handleChange = (info: any) => {
    //     if (info.file.status === 'done') {
    //         console.log('File uploaded successfully');
    //     } else if (info.file.status === 'error') {
    //         console.error('Failed to upload file');
    //     }
    // };
    // const [showAlert, setShowAlert] = useState(false);
    // const [api, contextHolder] = notification.useNotification();

    const [selectedApprovers, setSelectedApprovers] = useState<{ [key: string]: string }>({});


    const handleSelectChange = (index: number, value: string) => {
        if (listOfUserId.indexOf(value) !== -1) {
            openNotification('topRight');
        } else {
            const temporaryList = { ...selectedApprovers, [index]: value };
            const finalSelectedUserId = Object.values(temporaryList) as string[];
            setListOfUserId(finalSelectedUserId);
            setSelectedApprovers(temporaryList);
        }
    }

    const openNotification = (placement: NotificationPlacement) => {
        notification.info({
            message: <strong>Approver already exists</strong>,
            description: 'Approver has been selected before, please choose another Approver',
            placement,
        });
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
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setShowAlert(false);
    //     }, 2000);

    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // }, [showAlert]);

    // console.log(listOfUserId);

    return (
        <div>
            {/* {contextHolder} */}
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
            <div className='reply-upload-comment'>
                <Upload
                    beforeUpload={handleBeforeUpload}
                    accept=".png, .jpg, .jpeg, .pdf, .csv, .doc, .docx, .pptx, .ppt, .txt, .xls, .xlsx"
                    fileList={fileList}
                >
                    <Button icon={<UploadOutlined />} style={{ backgroundColor: 'rgb(47,133,239)', color: 'white' }}>
                        Add attachments
                    </Button>
                    <span> (Maximum 20MB per file)</span>
                </Upload>
            </div>
            <div className='form-approver'>
                <h6>Send to approvers</h6>
                <div className='add-approvers'>
                    {/* {loading ? ( // Nếu đang tải dữ liệu, hiển thị spinner
                        <Spin style={{ height: '100vh' }} tip="Loading..." size="large">
                            <Alert
                                style={{ width: '100%', textAlign: 'center' }}
                                message="Loading..."
                                description="There are some issues happening, please wait a moment or you can try reloading the page"
                                type="info"
                            />
                        </Spin>) : ( */}
                    <Form>
                        <Row gutter={16}>
                            {inputs.map((input, index) => (
                                <Col span={8} key={index} className='col-request '>
                                    <Form.Item
                                        label={
                                            <div className='label-approver'>
                                                {editingIndex === index ? (
                                                    <Space>
                                                        <Input value={labelApprovers[index]} onChange={(e) => handleInputChangeApprover(index, e.target.value)} />
                                                        <Button type="link" onClick={() => handleSave(index)} icon={<SaveOutlined />} />
                                                    </Space>
                                                ) : (
                                                    <Space>
                                                        <span>{labelApprovers[index]}</span>
                                                        <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(index)} />
                                                        <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(index)} />
                                                        <Button type="link" icon={<DragOutlined />} />
                                                    </Space>
                                                )}
                                            </div>
                                        }
                                        name={`Approver${index}`}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Select something!',
                                            },
                                        ]}
                                        initialValue={'--Select a Approver--'}
                                        labelCol={{ span: 24 }}
                                    >
                                        <Select
                                            onChange={(value) => handleSelectChange(index, value)}
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
                                                        <span>{departmentMember.User.JobTitle} </span>
                                                    </div>
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            ))}
                            <Col span={8} className='btn-add-approver'>
                                <Button
                                    type="primary"
                                    onClick={handleAddInput}
                                    style={{
                                        backgroundColor: 'rgb(47,133,239)',
                                        color: 'white'
                                    }}>
                                    Add
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    {/* )} */}
                </div>
            </div>
        </div >
    );
}

export default SendApprover;