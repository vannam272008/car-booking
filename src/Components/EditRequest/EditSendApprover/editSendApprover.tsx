import { useEffect, useState } from 'react';
import { DeleteOutlined, DragOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, Select, Button, Row, Col, Input, Space, notification, Spin, Alert } from 'antd';
import request from "../../../Utils/request";
// import MenuAdd from '../MenuAdd/menuAdd';
import { RcFile } from 'antd/es/upload';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useParams } from 'react-router-dom';
import { workerData } from 'worker_threads';

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
    listOfUserId: string[];
    setListOfUserId: React.Dispatch<React.SetStateAction<string[]>>;
}


function EditSendApprover({ listOfUserId, setListOfUserId }: PropsDataList): JSX.Element {

    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [workflowData, setWorkflowData] = useState<any>([])

    const { requestId } = useParams();

    const [inputs, setInputs] = useState<string[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the second API
                const departmentMemberEndpoint = "departmentMember/all?page=1&limit=100";
                const departmentMemberRes = await request.get(departmentMemberEndpoint);
                setDataDepartmentMember(departmentMemberRes.data.Data.ListData);

                const workflowDataEndpoint = "/request/workflow/requestId=" + requestId;
                const workflowDataRes = await request.get(workflowDataEndpoint);
                setListOfUserId([...listOfUserId, ...workflowDataRes.data.Data.map((item: { User: { Id: string } }) => item.User.Id)]);
                setWorkflowData(workflowDataRes.data.Data);
                setInputs([...inputs, ...workflowDataRes.data.Data.map((item: { User: { Id: string } }) => item.User.Id)])

            } catch (error) {
                // Handle errors if needed
            }
        };
        fetchData();
    }, []);


    const { Option } = Select;

    const [counterApprover, setCounterApprover] = useState(1);

    const handleAddInput = () => {
        setInputs([...inputs, '']);
        setLabelApprovers([...labelApprovers, `Approver ${counterApprover}`]);
        setCounterApprover(counterApprover + 1);
    };

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

    // console.log('hello', workflowData);

    return (
        <div>
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
                </div>
            </div>
        </div >
    );
}

export default EditSendApprover;