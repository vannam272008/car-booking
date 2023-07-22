// src/UserManage.tsx
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Tag, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UserForm from './userForm';
import { User } from '../interfaces';
import { userSampleData } from '../sampleData';

const UserManage: React.FC = () => {
  const resetUser = {
    id: 0,
    email: '',
    roles: [],
    departments: []
  }
  const [dataSource, setDataSource] = useState<User[]>(userSampleData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>(resetUser);
  const [form] = Form.useForm<User>();
  // const [isLoading, setIsLoading] = useState<Boolean>(true)

  // if(isLoading == true) return null;
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => (
        <>
          {roles.map((role) => (
            <Tag key={role}>{role}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Departments',
      dataIndex: 'departments',
      key: 'departments',
      render: (departments: string[]) => (
        <>
          {departments.map((department) => (
            <Tag key={department}>{department}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: User) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleAdd = () => {
    setSelectedUser(resetUser);
    setIsModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    const updatedDataSource = dataSource.filter((user) => user.id !== id);
    setDataSource(updatedDataSource);
  };

  const handleSave = (values: User) => {
    if (selectedUser) {
      // Editing existing user
      const updatedDataSource = dataSource.map((user) =>
        user.id === (Math.floor(Math.random() * (1000 - 100 + 1)) + 100) ? { ...user, ...values } : user
      );
      setDataSource(updatedDataSource);
    } else {
      // Adding new user
      const newUser: User = { ...values, id: dataSource.length + 1 };
      setDataSource([...dataSource, newUser]);
    }

    setIsModalVisible(false);
  };
  
  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add User
      </Button>

      <Table dataSource={dataSource} columns={columns} rowKey="id" />

      <Modal
        title={selectedUser ? <Typography.Title level={2}>Edit User</Typography.Title> : <Typography.Title level={2}>Add User</Typography.Title>}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        closable={true}
        maskClosable={false}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <UserForm initialValues={selectedUser ? selectedUser : resetUser} onSave={handleSave} form={form}/>
      </Modal>
    </div>
  );
};

export default UserManage;
