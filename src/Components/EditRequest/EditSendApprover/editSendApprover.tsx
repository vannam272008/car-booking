import { useEffect, useState } from 'react';
import { DeleteOutlined, DragOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, Select, Button, Row, Col, Input, Space, notification } from 'antd';
import request from "../../../Utils/request";
// import MenuAdd from '../MenuAdd/menuAdd';
// import { RcFile } from 'antd/es/upload';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface DepartmentMember {
    Id: string;
    FullName: string;
    Email: string;
    JobTitle: string;
}

interface PropsDataList {
    listOfUserId: string[];
    setListOfUserId: React.Dispatch<React.SetStateAction<string[]>>;
}


function EditSendApprover({ listOfUserId, setListOfUserId }: PropsDataList): JSX.Element {

    const {t} = useTranslation();

    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [workflowData, setWorkflowData] = useState<any>([])

    const { requestId } = useParams();

    const [inputs, setInputs] = useState<string[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the second API
                const departmentMemberEndpoint = "/userRole/all-approvers";
                const departmentMemberRes = await request.get(departmentMemberEndpoint);
                setDataDepartmentMember(departmentMemberRes.data.Data);
                // console.log(departmentMemberRes.data.Data);

                const workflowDataEndpoint = "/request/workflow/requestId=" + requestId;
                const workflowDataRes = await request.get(workflowDataEndpoint);
                setListOfUserId([...listOfUserId, ...workflowDataRes.data.Data.map((item: { User: { Id: string } }) => item.User.Id)]);
                setWorkflowData(workflowDataRes.data.Data);

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


    const handleSelectChange = (index: number, value: string) => {
        if (Array.isArray(listOfUserId)) {
            if (listOfUserId.indexOf(value) !== -1) {
                openNotification('topRight');
            } else {
                const newListOfUser = [...listOfUserId];
                newListOfUser[index] = value;
                setListOfUserId(newListOfUser);
            }
        }
    }


    const openNotification = (placement: NotificationPlacement) => {
        notification.info({
            message: <strong>{t('Approver already exists')}</strong>,
            description: t('Approver has been selected before, please choose another Approver'),
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
                    departmentMember.FullName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    departmentMember.Email?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    departmentMember.JobTitle?.toLowerCase().includes(searchValue.toLowerCase())
            )
        }
        else return [];
    };

    useEffect(() => {
        setInputs(listOfUserId);
        setLabelApprovers([...labelApprovers, `Approver ${counterApprover}`]);
        setCounterApprover(counterApprover + 1);
    }, [listOfUserId]);

    // console.log('hello', workflowData);

    return (
        <div>
            <div className='form-approver'>
                <h6>{t('Send to approvers')}</h6>
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
                                                message: t('Select something!'),
                                            },
                                        ]}
                                        initialValue={workflowData[index] && workflowData[index].User ? (workflowData[index].User.FullName + ' ' + workflowData[index].User.Email + ' ' + workflowData[index].User.JobTitle) : '--Select a Approver--'}
                                        labelCol={{ span: 24 }}
                                    >
                                        <Select
                                            virtual={false}
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
                                    {t('Add')}
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