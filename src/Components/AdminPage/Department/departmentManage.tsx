import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Typography, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Department, DepartmentFormProps } from '../interfaces';
import { departmentSampleData } from '../sampleData';

const DepartmentManage: React.FC = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Contact Info',
      dataIndex: 'ContactInfo',
      key: 'ContactInfo',
    },
    {
      title: 'Code',
      dataIndex: 'Code',
      key: 'Code',
    },
    {
      title: 'Under Department',
      dataIndex: 'UnderDepartment',
      key: 'UnderDepartment',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Department) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record.Id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const resetDepartment = {
    Id: '',
    Name: '',
    ContactInfo: '',
    Code: '',
    UnderDepartment: '',
    Description: ''
  }

  const [departments, setDepartments] = useState<Department[]>(departmentSampleData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(resetDepartment);
  const [form] = Form.useForm<any>();

  const handleAdd = () => {
    setSelectedDepartment(resetDepartment);
    setIsModalVisible(true);
  };

  const handleEdit = (d: Department) => {
    console.log('>>d:', d);

    setSelectedDepartment(d);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    const updatedDepartments = departments.filter((d) => d.Id !== id);
    setDepartments(updatedDepartments);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add Department
      </Button>

      <Table dataSource={departments} columns={columns} rowKey="Id" />

      <Modal
        title={selectedDepartment ? <Typography.Title level={2}>Edit Department</Typography.Title> : <Typography.Title level={2}>Add Department</Typography.Title>}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        closable={true}
        maskClosable={false}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <DepartmentForm initialValues={selectedDepartment ? selectedDepartment : resetDepartment} form={form} />
      </Modal>
    </div>
  );
};

const DepartmentForm: React.FC<DepartmentFormProps> = ({ initialValues, form }) => {

  useEffect(() => {
    console.log('useEffect run');
    form.resetFields()
  }, [initialValues])

  const handleFormReset = () => {
    form.resetFields()
    console.log('Form resetted');
  }

  return (
    <Form form={form} initialValues={initialValues} layout="horizontal" style={{ minWidth: '600px' }}>
      <Form.Item>
        <Button onClick={handleFormReset}>
          Reset
        </Button>
      </Form.Item>
      <Form.Item label="Name" name="Name">
        <Input />
      </Form.Item>
      <Form.Item label="ContactInfo" name="ContactInfo">
        <Input />
      </Form.Item>
      <Form.Item label="Code" name="Code">
        <Input />
      </Form.Item>
      <Form.Item label="UnderDepartment" name="UnderDepartment">
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="Description">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default DepartmentManage;