import { useEffect, useState } from 'react';
import { DeleteOutlined, DragOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, Select, Button, Row, Col, Input, Space, notification } from 'antd';
import request from "../../../Utils/request";
// import MenuAdd from '../MenuAdd/menuAdd';
// import { RcFile } from 'antd/es/upload';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useParams } from 'react-router-dom';

interface DepartmentMember {
    Id: string;
    FullName: string;
    Email: string;
    JobTitle: string;
}

interface PropsDataList {
    listOfUserId: string[];
    setListOfUserId: React.Dispatch<React.SetStateAction<string[]>>;
    departmentId: string;
}


function EditSendApprover({ departmentId, listOfUserId, setListOfUserId }: PropsDataList): JSX.Element {

    const [dataDepartmentMember, setDataDepartmentMember] = useState<DepartmentMember[]>([]);
    const [workflowData, setWorkflowData] = useState<any>([])
    const [initialValueWorkflow, setInitialValueWorkflow] = useState<string[]>([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [labelApprovers, setLabelApprovers] = useState<string[]>([]);
    const [counterApprover, setCounterApprover] = useState(1);
    const [searchValue, setSearchValue] = useState<string>('');


    const { requestId } = useParams();

    const [inputs, setInputs] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const departmentMemberEndpoint = "/userRole/all-approvers/" + departmentId;
                const departmentMemberRes = await request.get(departmentMemberEndpoint);
                setDataDepartmentMember(departmentMemberRes.data.Data);

                const workflowDataEndpoint = "/request/workflow/requestId=" + requestId;
                const workflowDataRes = await request.get(workflowDataEndpoint);

                setListOfUserId([]);
                setWorkflowData([]);
                setLabelApprovers([]);
                setInitialValueWorkflow([]);
                setCounterApprover(1);
                setInputs([]);

                setListOfUserId([...workflowDataRes.data.Data.map((item: { User: { Id: string } }) => item.User.Id)]);
                setWorkflowData(workflowDataRes.data.Data);
                setLabelApprovers([...workflowDataRes.data.Data.map((item: { Position: string }) => item.Position)])
                setInitialValueWorkflow([...workflowDataRes.data.Data.map((item: { User: { FullName: string, Email: string, JobTitle: string } }) => item.User.FullName + ' ' + item.User.Email + ' ' + item.User.JobTitle)])
                setCounterApprover(counterApprover + workflowDataRes.data.Data.length)
                setInputs([...workflowDataRes.data.Data.map((item: { User: { Id: string } }) => item.User.Id)])

            } catch (error) {
                // Handle errors if needed
            }
        };
        fetchData();
    }, []);


    const { Option } = Select;


    const handleAddInput = () => {
        setInputs([...inputs, '' + counterApprover]);
        setLabelApprovers([...labelApprovers, "Approve " + [counterApprover]]);
        setCounterApprover(counterApprover + 1);
    };

    const handleDelete = (index: number) => {

        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);

        const newListOfUser = [...listOfUserId];
        newListOfUser.splice(index, 1);
        setListOfUserId(newListOfUser);

        const newLableApprover = [...labelApprovers];
        newLableApprover.splice(index, 1);
        setLabelApprovers(newLableApprover);
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

    // useEffect(() => {
    //     setInputs(listOfUserId);
    //     setLabelApprovers([...labelApprovers, `Approver ${counterApprover}`]);
    //     setCounterApprover(counterApprover + 1);
    // }, [listOfUserId]);

    // console.log('hello', workflowData.Position);

    // console.log('1', listOfUserId);
    // console.log('2', workflowData);
    // console.log('3', labelApprovers);
    // console.log('4', initialValueWorkflow);
    // console.log('5', counterApprover);
    // console.log('6', inputs);

    console.log(workflowData);

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
                                        name={inputs[index]}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Select something!',
                                            },
                                        ]}
                                        initialValue={initialValueWorkflow[index] === undefined ? '--Select a Approver--' : initialValueWorkflow[index]}
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