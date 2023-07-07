import React from 'react'
import "./index.css";
import { Button } from 'antd';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CaretDownOutlined, FileExcelOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, DatePicker, Select, Dropdown } from 'antd';
import RequestLayout from '../../Components/RequestLayout';

interface DataType {
  key: string;
  requestCode: string;
  department: string;
  createdBy: string;
  user: string;
  createdDate: string;
  from: string;
  to: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Request Code',
    dataIndex: 'requestCode',
    key: 'requestCode',
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'Created by',
    dataIndex: 'createdBy',
    key: 'createdBy',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
  },
  {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
  },
];

const data: DataType[] = [
  {
    key: '1',
    requestCode: '2023OPS-CAR-0704-001',
    department: 'Kiểm thử Testing',
    createdBy: 'Dat Truong Minh',
    user: 'Dat Truong Minh',
    createdDate: '04/07/2023',
    from: '04/07/2023',
    to: '04/07/2023',
  },
  {
    key: '2',
    requestCode: '2023OPS-CAR-0704-001',
    department: 'Kiểm thử Testing',
    createdBy: 'Dat Truong Minh',
    user: 'Dat Truong Minh',
    createdDate: '04/07/2023',
    from: '04/07/2023',
    to: '04/07/2023',
  },
  {
    key: '3',
    requestCode: '2023OPS-CAR-0704-001',
    department: 'Kiểm thử Testing',
    createdBy: 'Dat Truong Minh',
    user: 'Dat Truong Minh',
    createdDate: '04/07/2023',
    from: '04/07/2023',
    to: '04/07/2023',
  },
  {
    key: '4',
    requestCode: '2023OPS-CAR-0704-001',
    department: 'Kiểm thử Testing',
    createdBy: 'Dat Truong Minh',
    user: 'Dat Truong Minh',
    createdDate: '04/07/2023',
    from: '04/07/2023',
    to: '04/07/2023',
  },
  {
    key: '5',
    requestCode: '2023OPS-CAR-0704-001',
    department: 'Kiểm thử Testing',
    createdBy: 'Dat Truong Minh',
    user: 'Dat Truong Minh',
    createdDate: '04/07/2023',
    from: '04/07/2023',
    to: '04/07/2023',
  },
  {
    key: '6',
    requestCode: '2023OPS-CAR-0704-001',
    department: 'Kiểm thử Testing',
    createdBy: 'Dat Truong Minh',
    user: 'Dat Truong Minh',
    createdDate: '04/07/2023',
    from: '04/07/2023',
    to: '04/07/2023',
  },
  {
    key: '7',
    requestCode: '2023OPS-CAR-0704-001',
    department: 'Kiểm thử Testing',
    createdBy: 'Dat Truong Minh',
    user: 'Dat Truong Minh',
    createdDate: '04/07/2023',
    from: '04/07/2023',
    to: '04/07/2023',
  },
  {
    key: '8',
    requestCode: '2023OPS-CAR-0704-001',
    department: 'Kiểm thử Testing',
    createdBy: 'Dat Truong Minh',
    user: 'Dat Truong Minh',
    createdDate: '04/07/2023',
    from: '04/07/2023',
    to: '04/07/2023',
  },
];

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
          <Select.Option value="all-user" default>All</Select.Option>
          <Select.Option value="user1">Khai Tran</Select.Option>
          <Select.Option value="user2">Dat Truong Minh</Select.Option>
          <Select.Option value="user3">Bang Nguyen Minh</Select.Option>
          <Select.Option value="user4">Demo Nhan Vien</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Status" style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
        <Select>
          <Select.Option value="all-request" default>All requests</Select.Option>
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

const ManageRequest: React.FC = () => {
  const profile = true;
  return (
    <RequestLayout profile={profile}>
      {() => (
        <div style={{ overflowX: 'hidden' }} className='request'>
          <div id='navbar'>
            <div className='title'>car booking</div>
            <div>
              <Button style={{ marginRight: 8, color: '#8894a1', fontFamily: 'Segoe UI', fontWeight: 600 }}><FileExcelOutlined style={{ color: 'green' }} />Export excel</Button>
              <FilterDropdown />
              <Button style={{ marginRight: 5, marginLeft: 5, backgroundColor: '#5cb85c', color: 'white', fontFamily: 'Segoe UI', fontWeight: 600 }}><PlusOutlined />Create new</Button>
            </div>
          </div>
          <div className='content'>
            <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} />
          </div>
        </div>
      )}
    </RequestLayout>

  )
}

export default ManageRequest