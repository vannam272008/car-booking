import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Typography, Select, Input, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Role, RoleFormProps } from '../interfaces'
import { roleSampleData } from '../sampleData';

const RoleManage: React.FC = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Role) => (
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

  const resetRole = {
    Id: '',
    Title: ''
  }
  const [roles, setRoles] = useState<Role[]>(roleSampleData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(resetRole);
  const [form] = Form.useForm<Role>();

  useEffect(() => {
    form.resetFields()
  }, [selectedRole])

  const handleAdd = () => {
    setSelectedRole(resetRole);
    setIsModalVisible(true);
  };

  const handleEdit = (d: Role) => {
    setSelectedRole(d);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    const updatedRoles = roles.filter((d) => d.Id !== id);
    setRoles(updatedRoles);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add Role
      </Button>

      <Table dataSource={roles} columns={columns} rowKey="Id" />

      <Modal
        title={selectedRole ? <Typography.Title level={2}>Edit Role</Typography.Title> : <Typography.Title level={2}>Add Role</Typography.Title>}
        open={isModalVisible}
        onCancel={() => {
          setSelectedRole(resetRole)
          setIsModalVisible(false);
        }}
        closable={true}
        maskClosable={false}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <DepartmentForm initialValues={selectedRole ? selectedRole : resetRole} form={form} />
      </Modal>
    </div>
  );
};

const DepartmentForm: React.FC<RoleFormProps> = ({ initialValues, form }) => {

  useEffect(() => {
    console.log('useEffect run');
    form.resetFields()
  }, [initialValues])

  const handleFormReset = () => {
    form.resetFields()
    console.log('Form resetted');
  }

  return (
    <Form form={form} initialValues={initialValues} layout="horizontal" style={{ minWidth: '400px', marginTop: '40px' }}>
      <Form.Item>
        <Button onClick={handleFormReset} style={{ marginLeft: 8 }}>
          Reset
        </Button>
      </Form.Item>
      <Row gutter={24}>
        <Col span={5}>
          <Form.Item label="Id" name="Id">
            <Input />
          </Form.Item>
        </Col>
        <Col span={19}>
          <Form.Item label="Title" name="Title">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default RoleManage;