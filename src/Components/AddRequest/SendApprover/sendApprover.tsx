import { useEffect, useState } from 'react';
import { DeleteOutlined, DragOutlined, EditOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Select, Radio, RadioChangeEvent, Upload, Button, Row, Col, Input, Space, notification } from 'antd';
import './sendApprover.css'
import request from "../../../Utils/request";
import { RcFile } from 'antd/es/upload';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { UploadFile } from 'antd/lib/upload';

interface DepartmentMember {
    Id: string;
    FullName: string;
    Email: string;
    JobTitle: string;
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
    const [inputs, setInputs] = useState<string[]>(['Initial Input']);
    const [counterApprover, setCounterApprover] = useState(1);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [labelApprovers, setLabelApprovers] = useState<string[]>([`Approver ${counterApprover}`]);
    const [selectedApprovers, setSelectedApprovers] = useState<{ [key: string]: string }>({});
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        const getDataDepartmentMember = async () => {
            const endpoint = "/userRole/all-approvers";
            await request.get(endpoint).then((res) => {
                setDataDepartmentMember(res.data.Data);
            }).catch(() => {
            });
        }
        getDataDepartmentMember();
    }, [])

    const { Option } = Select;

    const onChange = (e: RadioChangeEvent) => {
        setApplyNote(e.target.value);
    };

    const handleAddInput = () => {
        setInputs([...inputs, '']);
        setLabelApprovers([...labelApprovers, `Approver ${counterApprover + 1}`]);
        setCounterApprover(counterApprover + 1);
    };

    const handleDelete = (index: number) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
        const newListOfUser = [...listOfUserId];
        newListOfUser.splice(index, 1);
        setListOfUserId(newListOfUser);
    };

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

    const handleSearch = (inputValue: string) => {
        setSearchValue(inputValue);
    };

    const filteredData = () => {
        if (dataDepartmentMember.length > 0) {
            return dataDepartmentMember.filter(
                (departmentMember) =>
                    departmentMember.FullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    departmentMember.Email?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    departmentMember.JobTitle?.toLowerCase().includes(searchValue.toLowerCase())
            )
        }
        else return [];
    };

    const handleBeforeUpload = (file: RcFile) => {
        setFileList([...fileList, file]);
        return false;
    };

    const handleRemoveFile = (file: UploadFile<any>) => {
        const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedFileList);
    };

    return (
        <div>
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
            <div className='form-approver'>
                <h6>Send to approvers</h6>
                <div className='add-approvers'>
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
                                                <Option key={departmentMember.Id} value={departmentMember.Id}>
                                                    <div>
                                                        <span>{departmentMember.FullName} </span>
                                                        <span>{departmentMember.Email} </span>
                                                        <span>{departmentMember.JobTitle} </span>
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
                </div>
            </div>
        </div >
    );
}

export default SendApprover;