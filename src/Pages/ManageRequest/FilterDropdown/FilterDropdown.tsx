import { CaretDownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Input, Select } from "antd";
import { Form } from "antd";
import "./index.css";

const FilterForm = () => {
    const [form] = Form.useForm();

    return (
        <Form form={form} className='filter-form' initialValues={{ createdBy: 'all-user', status: 'all-request' }}>
            <p style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>Filter</p>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ color: 'white', backgroundColor: '#5cb85c', fontFamily: 'Segoe UI' }}>
                    Apply
                </Button>
                <Button htmlType="button" style={{ color: '#5cb85c', border: 'none', marginLeft: '20px', fontFamily: 'Segoe UI' }} onClick={() => {
                    form.setFieldsValue({ requestCode: undefined, created: undefined, createdBy: 'all-user', status: 'all-request' });
                }}>
                    Clear
                </Button>
                <hr style={{ border: "1px solid gray" }} />
            </Form.Item>
            <Form.Item name="requestCode" label="Request Code" style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <Input placeholder='Key words...' />
            </Form.Item>
            <Form.Item name="created" label="Created" style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <DatePicker.RangePicker />
            </Form.Item>
            <Form.Item name="createdBy" label="Created by" style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <Select>
                    <Select.Option value="all-user">All</Select.Option>
                    <Select.Option value="user1">Khai Tran</Select.Option>
                    <Select.Option value="user2">Dat Truong Minh</Select.Option>
                    <Select.Option value="user3">Bang Nguyen Minh</Select.Option>
                    <Select.Option value="user4">Demo Nhan Vien</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="status" label="Status" style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
                <Select>
                    <Select.Option value="all-request">All requests</Select.Option>
                    <Select.Option value="status1">Draft</Select.Option>
                    <Select.Option value="status2">Waiting for approval</Select.Option>
                    <Select.Option value="status3">Approved</Select.Option>
                    <Select.Option value="status4">Rejected</Select.Option>
                    <Select.Option value="status4">Canceled</Select.Option>
                    <Select.Option value="status4">Done</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

const FilterDropdown = () => {

    return (
        <Dropdown overlay={<FilterForm />} trigger={['click']}>
            <Button style={{ marginRight: 5, marginLeft: 3, color: '#8894a1', fontFamily: 'Segoe UI', fontWeight: 600 }}>
                <FilterOutlined style={{ color: 'green' }} />
                Filter
                <CaretDownOutlined />
            </Button>
        </Dropdown>
    );
};

export default FilterDropdown