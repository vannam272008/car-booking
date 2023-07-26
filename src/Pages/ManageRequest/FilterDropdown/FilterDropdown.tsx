import { CaretDownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Input, Select } from "antd";
import { Form } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import request from "../../../Utils/request";

interface FilterDropdownProps {
    onRequestCodeChange: (value: string) => void;
    onCreatedFromChange: (value: string) => void;
    onCreatedToChange: (value: string) => void;
    onSenderIdChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onApply: () => void;
}

interface User {
    Id: string;
    FirstName: string;
    LastName: string;
}

const FilterForm: React.FC<FilterDropdownProps> = ({
    onRequestCodeChange,
    onCreatedFromChange,
    onCreatedToChange,
    onSenderIdChange,
    onStatusChange,
    onApply,
}) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(true);
    const [createdFrom, setCreatedFrom] = useState(() => {
        const date = dayjs().subtract(1, 'year');
        return date.format('MM/DD/YYYY');
    });
    const [createdTo, setCreatedTo] = useState(() => {
        const date = dayjs();
        return date.format('MM/DD/YYYY');
    });
    const [dataUser, setDataUser] = useState<User[]>([]);

    const handleClear = () => {
        // // Reset filter mà k cần load lại trang
        // form.setFieldsValue({ 
        //     requestCode: undefined,
        //     created: undefined,
        //     createdBy: "All",
        //     status: "All requests",
        // });
        // onRequestCodeChange("");
        // onCreatedFromChange("");
        // onCreatedToChange("");
        // onSenderIdChange("");
        // onStatusChange("");
        // onApply();

        window.location.reload();
    };

    const getAllUser = async () => {
        const endpoint = "user/all?page=1&limit=100";
        await request.get(endpoint).then((res) => {
            setDataUser(res.data.Data.ListData);
            setLoading(false);
        }).catch(() => {
            setLoading(true);
        });
    }

    useEffect(() => {
        getAllUser();
    }, [])

    return (
        <Form
            form={form}
            className="filter-form"
            initialValues={{ createdBy: "All", status: "All requests" }}
        >
            <p style={{ fontWeight: "bold", fontFamily: "Segoe UI" }}>Filter</p>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={onApply}
                    style={{
                        color: "white",
                        backgroundColor: "#5cb85c",
                        fontFamily: "Segoe UI",
                    }}
                >
                    Apply
                </Button>
                <Button
                    htmlType="button"
                    style={{
                        color: "#5cb85c",
                        border: "none",
                        marginLeft: "20px",
                        fontFamily: "Segoe UI",
                    }}
                    onClick={handleClear}
                >
                    Clear
                </Button>
                <hr style={{ border: "1px solid gray" }} />
            </Form.Item>
            <Form.Item name="requestCode" label="Request Code" style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <Input placeholder='Key words...' onChange={e => onRequestCodeChange(e.target.value)} />
            </Form.Item>
            <Form.Item name="created" label="Created" style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <DatePicker.RangePicker
                    defaultValue={[dayjs(createdFrom), dayjs(createdTo)]}
                    onChange={(_, dateString) => {
                        onCreatedFromChange(dateString[0]);
                        onCreatedToChange(dateString[1]);
                    }}
                />
            </Form.Item>
            <Form.Item name="createdBy" label="Created by" initialValue={dataUser.length > 0 ? dataUser[0].FirstName : undefined} style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <Select
                    onChange={value => onSenderIdChange(value)}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(inputValue, option) =>
                        option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                    }
                >
                    <Select.Option value="">All</Select.Option>
                    {dataUser.map((items) => (
                        <Select.Option key={items.Id} value={items.Id} >
                            {`${items.FirstName} ${items.LastName}`}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="status" label="Status" style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <Select onChange={value => onStatusChange(value)}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(inputValue, option) =>
                        option?.props.children?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                    }
                >
                    <Select.Option value="">All requests</Select.Option>
                    <Select.Option value="Draft">Draft</Select.Option>
                    <Select.Option value="Waiting for approval">Waiting for approval</Select.Option>
                    <Select.Option value="Approved">Approved</Select.Option>
                    <Select.Option value="Rejected">Rejected</Select.Option>
                    <Select.Option value="Canceled">Canceled</Select.Option>
                    <Select.Option value="Done">Done</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    onRequestCodeChange,
    onCreatedFromChange,
    onCreatedToChange,
    onSenderIdChange,
    onStatusChange,
    onApply,
}) => {

    return (
        <Dropdown
            overlay={
                <FilterForm
                    onRequestCodeChange={onRequestCodeChange}
                    onCreatedFromChange={onCreatedFromChange}
                    onCreatedToChange={onCreatedToChange}
                    onSenderIdChange={onSenderIdChange}
                    onStatusChange={onStatusChange}
                    onApply={onApply}
                />
            }
            trigger={["click"]}
        >
            <Button style={{ marginRight: 5, marginLeft: 3, color: '#8894a1', fontFamily: 'Segoe UI', fontWeight: 600 }}>
                <FilterOutlined style={{ color: 'green' }} />
                Filter
                <CaretDownOutlined />
            </Button>
        </Dropdown>
    );
};

export default FilterDropdown;
