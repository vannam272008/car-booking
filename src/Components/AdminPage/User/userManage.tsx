// src/UserManage.tsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Tag, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UserForm from './userForm';
import { User, UserRoles, DepartmentMembers } from '../Utils/interfaces';
import { resetUser } from '../Utils';
import * as util from '../Utils'
import axios from 'axios';
import { jwt_admin } from '../Utils/constants'
import { RcFile } from 'antd/es/upload';
import request from '../../../Utils/request';

const UserManage: React.FC = () => {
  let config = {
    headers: {
      'Authorization': `Bearer ${jwt_admin}`
    }
  }
  message.config(util.messageConfig)

  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [action, setAction] = useState<string>('');
  const [form] = Form.useForm<User>();
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Roles',
      dataIndex: 'UserRoles',
      key: 'UserRoles',
      render: (roles: UserRoles[]) => (
        <>
          {roles.map((role) => (
            <Tag key={role.RoleId}>{role.RoleId}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Belong to Departments',
      dataIndex: 'DepartmentMembers',
      key: 'DepartmentMembers',
      render: (departments: DepartmentMembers[]) => (
        <>
          {departments.map((department) => (
            <Tag key={department.DepartmentId}>{department.DepartmentId}</Tag>
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
          <Button type="link" onClick={() => handleDelete(record.Id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  const getUsers = async () => {
    let res = await axios.get('http://localhost:63642/api/user/all?page=1&limit=15', config)
    console.log('>>check res user:', res)
    if (res.data.Success) {
      let usersData: User[] = res.data.Data.ListData
      usersData.forEach(user => {
        user.AvatarPath = `http://localhost:63642/${user.AvatarPath}`
        axios.get(`http://localhost:63642/api/userRole/roles-uid/${user.Id}`)
          .then(data => user.Roles = data.data.Data)
        axios.get(`http://localhost:63642/api/departmentMember/departments-uid/${user.Id}`)
          .then(data => user.Departments = data.data.Data)
      })
      console.log('update usersData:', usersData);

      // let roles: string[] = []
      // usersData.Roles = roles


      setUsers(usersData)

      setIsLoading(false)
    } else {
      setUsers([])
      setIsLoading(true)
    }
  }

  /* const deleteFilesTemp = async () => {
    return await axios.get('http://localhost:63642/api/file/delete-files-temp')
  } */

  useEffect(() => {
    getUsers()
  }, [])

  const handleAdd = () => {
    setAction(util.ACTION_HANDLE.ADD)
    setSelectedUser(null);
    setIsModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setAction(util.ACTION_HANDLE.EDIT)
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    let res = await axios.delete(`http://localhost:63642/api/user/delete/${id}`)
    if (res.data.Success) {
      message.success('Delete success !')
      setIsModalVisible(false)
      await getUsers()
    } else {
      message.error(res.data.Message)
    }
  };

  /* const uploadFile = (uid: string, file: any) => {
    console.log("check uid:", uid);
    console.log("check file:", file);
    
    console.log("Uploading file...");
    const API_ENDPOINT = "http://localhost:63642/api/file/upload";
    const request = new XMLHttpRequest();
    const formData = new FormData();
  
    request.open("POST", API_ENDPOINT, true);
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        console.log(request.responseText);
      }
    };
    
    formData.append("file", file)
    formData.append("idUser", uid)
    request.send(formData);
  }; */

  const handleSave = async (user: User, file: RcFile) => {
    console.log('>>check user data from form:', user);
    // console.log('>>selected user:', selectedUser);

    if (action === util.ACTION_HANDLE.ADD) {
      let res = await axios.post(`http://localhost:63642/api/user/add`, user, config)
      if (res.data.Success) {
        message.success('Add success !')
        setIsModalVisible(false)
        await getUsers()
      } else {
        message.error(res.data.Message)
      }
    } else if (action === util.ACTION_HANDLE.EDIT) {
      if(file) {
        const formData = new FormData();
        formData.append('fileName', file.name);
        formData.append('userId', user.Id);
        let resUpload = await axios.post('http://localhost:63642/api/file/upload-finish', formData, config)
        console.log('resUpload:', resUpload);
        if(!resUpload.data.Success) {
          return message.error(resUpload.data.Message)
        }
        user.AvatarPath = resUpload.data.Data
      }
      
      let res = await axios.put(`http://localhost:63642/api/user/edit/${user.Id}`, user, config)
      console.log('check res edit of admin:', res);
      
      if (res.data.Success) {
        message.success('Edit success !')
        await getUsers()
        setIsModalVisible(false)
      } else {
        message.error(res.data.Message)
      }
    }
  }

  const handleCancel = async () => {
    setIsModalVisible(false)
    /* var data = await deleteFilesTemp()
    console.log('data del temp files:', data) */
  }

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add User
      </Button>

      <Table dataSource={users} columns={columns} rowKey="id" />

      <Modal
        title={selectedUser ? <Typography.Title level={2}>Edit User</Typography.Title> : <Typography.Title level={2}>Add User</Typography.Title>}
        open={isModalVisible}
        closable={true}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <UserForm initialValues={selectedUser ? selectedUser : resetUser} onSave={handleSave} form={form} action={action} />
      </Modal>
    </div>
  );
};

export default UserManage;
