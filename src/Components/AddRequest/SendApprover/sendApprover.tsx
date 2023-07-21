import { useEffect, useState } from 'react';
import { DeleteOutlined, DragOutlined, EditOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Select, Radio, RadioChangeEvent, Upload, Button, Row, Col, Input, Space, Spin, Alert } from 'antd';
import './sendApprover.css'
import request from "../../../Utils/request";
// import MenuAdd from '../MenuAdd/menuAdd';
import { RcFile } from 'antd/es/upload';

interface DepartmentMember {
    Id: string;
    User: {
        FullName: string;
        Email: string;
        JobTitle: string;
        Id: string;
    };
}

interface DataFileList {
    fileList: RcFile[];
    setFileList: React.Dispatch<React.SetStateAction<RcFile[]>>
}

function SendApprover({ fileList, setFileList }: DataFileList): JSX.Element {

    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getDataDepartmentMember = async () => {
            const endpoint = "departmentMember/all?page=1&limit=100";
            await request.get(endpoint).then((res) => {
                setDataDepartmentMember(res.data.Data);
                setLoading(false);
            }).catch(() => {
                setLoading(true);
            });
        }
        getDataDepartmentMember();
    }, [])

    const { Option } = Select;

    const [value, setValue] = useState(2);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const [inputs, setInputs] = useState<string[]>([]);

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
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    const [editingIndex, setEditingIndex] = useState(-1);
    const [labelApprovers, setLabelApprovers] = useState<string[]>([]);

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
    // console.log(fileList);

    return (
        <div>
            <div className='attention-request' style={{ marginTop: '0', }}>
                <p>Chú ý: Trường hợp Phòng Hành Chính không đủ xe để đáp ứng yêu cầu điều xe của bộ phận, Phòng Hành Chính đề nghị sắp xếp phương tiện khác thay thế (thuê xe ngoài, hoặc dùng thẻ taxi, Grab,...) và chi phí sẽ hạch toán theo bộ phận yêu cầu.</p>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Yes</Radio>
                    <Radio value={2}>No</Radio>
                </Radio.Group>
            </div>
            <div className='Attachment'>
                <b>Attachment(s)</b>
            </div>
            <div className='reply-upload-comment'>
                <Upload
                    beforeUpload={handleBeforeUpload}
                    // onChange={handleChange}
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
                    {loading ? ( // Nếu đang tải dữ liệu, hiển thị spinner
                        <Spin style={{ height: '100vh' }} tip="Loading..." size="large">
                            <Alert
                                style={{ width: '100%', textAlign: 'center' }}
                                message="Loading..."
                                description="There are some issues happening, please wait a moment or you can try reloading the page"
                                type="info"
                            />
                        </Spin>) : (
                        <Form>
                            <Row gutter={16}>
                                <Col span={8} className='col-request'>
                                    <Form.Item
                                        label={
                                            <div>
                                                Pho phong IT
                                                <span><Button type="link" icon={<DeleteOutlined />} /></span>
                                                <span><Button type="link" icon={<EditOutlined />} /></span>
                                                <span><Button type="link" icon={<DragOutlined />} /></span>
                                            </div>
                                        }
                                        name="Approver"
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
                                            showSearch
                                            optionFilterProp="children"
                                            filterOption={(inputValue, option) =>
                                                option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                            }
                                        >
                                            {dataDepartmentMember.map((departmentMember) => (
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
                                            initialValue={dataDepartmentMember.length > 0 ? dataDepartmentMember[0].User.FullName + ' ' + dataDepartmentMember[0].User.Email + ' ' + dataDepartmentMember[0].User.JobTitle : undefined}
                                            labelCol={{ span: 24 }}
                                        >
                                            <Select
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(inputValue, option) =>
                                                    option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                }
                                            >
                                                {dataDepartmentMember.map((departmentMember) => (
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
                    )}
                </div>
            </div>
        </div>
    );
}

export default SendApprover;