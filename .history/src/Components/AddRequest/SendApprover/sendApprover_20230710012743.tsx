import { useState } from 'react';
import { DeleteOutlined, DragOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Select, Radio, RadioChangeEvent, Upload, Button, Row, Col } from 'antd';
import './sendApprover.css'

function SendApprover(): JSX.Element {

    const { Option } = Select;

    const [value, setValue] = useState(2);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const [inputs, setInputs] = useState<string[]>([]);

    const handleAddInput = () => {
        setInputs([...inputs, '']);
    };

    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleDelete = (index: number) => {
        const newInputs = [...inputs];
        newInputs.splice(index, 1);
        setInputs(newInputs);
    };

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(label);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Xử lý logic lưu giá trị mới tại đây (ví dụ: gọi hàm API để cập nhật giá trị)
        console.log("New label:", value);
    };
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
                <Upload>
                    <Button icon={<UploadOutlined />} style={{ backgroundColor: 'rgb(47,133,239)', color: 'white' }}>Add attachments</Button>
                    <span> (Maximum 20MB per file)</span>
                </Upload>
            </div>
            <div className='form-approver'>
                <h6>Send to approvers</h6>
                <div className='add-approvers'>
                    <Form>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    label={
                                        <div>
                                            <div>
                                                {isEditing ? (
                                                    <input type="text" value={value} onChange={handleInputChange} />
                                                ) : (
                                                    <label>{value}</label>
                                                )}
                                                <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
                                            </div>
                                            Pho phong IT
                                            <span>
                                                <Button type="link" icon={<DeleteOutlined />} />
                                            </span>
                                            <span>
                                                <Button type="link" icon={<EditOutlined />} />
                                            </span>
                                            <span>
                                                <Button type="link" icon={<DragOutlined />} />
                                            </span>
                                        </div>
                                    }
                                    name="Approver"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Select something!',
                                        },
                                    ]}
                                    initialValue="1"
                                    labelCol={{ span: 24 }}
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(inputValue, option) =>
                                            option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                        }
                                    >
                                        <Option value="1">bangnm@o365.vn, Developer</Option>
                                        <Option value="2">thy@o365.vn, Giám đốc tài chính</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            {inputs.map((input, index) => (
                                <Col span={8} key={index}>
                                    <Form.Item
                                        label={
                                            <div>

                                                Approver {index + 1}
                                                <span>
                                                    <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(index)} />
                                                </span>
                                                <span>
                                                    <Button type="link" icon={<EditOutlined />} />
                                                </span>
                                                <span>
                                                    <Button type="link" icon={<DragOutlined />} />
                                                </span>
                                            </div>
                                        }
                                        name={`Approver${index}`}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Select something!',
                                            },
                                        ]}
                                        initialValue="1"
                                        labelCol={{ span: 24 }}
                                    >
                                        <Select
                                            className='select-add-request'
                                            onChange={(value) => handleInputChange(index, value)}
                                            showSearch
                                            optionFilterProp="children"
                                            filterOption={(inputValue, option) =>
                                                option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                            }
                                        >
                                            <Option value="1">bangnm@o365.vn, Developer</Option>
                                            <Option value="2">thy@o365.vn, Giám đốc tài chính</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            ))}
                            <Col span={8} className='btn-add-approver'>
                                <Button type="primary" onClick={handleAddInput} style={{ backgroundColor: 'rgb(47,133,239)', color: 'white' }}>
                                    Add
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SendApprover;