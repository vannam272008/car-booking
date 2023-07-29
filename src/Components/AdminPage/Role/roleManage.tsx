import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Typography, Select, Input, Row, Col, message, Space, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Role, RoleFormProps } from '../Utils/interfaces'
import { roleSampleData } from '../Utils/sampleData';
import * as util from '../Utils'
import axios from 'axios';
import { resetRole } from '../Utils';
import "./roleManage.css";

const RoleManage: React.FC = () => {

  message.config(util.messageConfig)
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

  const [roles, setRoles] = useState<Role[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [action, setAction] = useState<string>('');
  const [form] = Form.useForm<Role>();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const getRoles = async () => {
    let res = await axios.get(`http://localhost:63642/api/role/all?page=${currentPage}&limit=${limit}`)
    console.log('>>check res role:', res)

    res.data.Success ? setRoles(res.data.Data.ListData) : setRoles([])
    setTotal(res.data.Data.TotalPage);
  }

  useEffect(() => {
    getRoles()
  }, [])

  const handleAdd = () => {
    setAction(util.ACTION_HANDLE.ADD)
    setSelectedRole(null);
    setIsModalVisible(true);
  };

  const handleEdit = (d: Role) => {
    setAction(util.ACTION_HANDLE.EDIT)
    setSelectedRole(d);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    let res = await axios.delete(`http://localhost:63642/api/role/delete/${id}`)
    /* const updatedRoles = roles.filter((d) => d.Id !== id);
    setRoles(updatedRoles); */
    if (res.data.Success) {
      message.success('Delete success !')
      setIsModalVisible(false)
      getRoles()
    } else {
      message.error(res.data.Message)
    }
  };

  const handleSave = async (role: Role) => {
    console.log('>>check role data from form:', role);
    console.log('>>selected role:', selectedRole);

    if (action === util.ACTION_HANDLE.ADD) {
      if (!role.Title) return message.error('Missing title !')
      /* var roleWithMaxId = roles.reduce((a, b) => a.Id > b.Id ? a : b);
      console.log('roleWithMaxId:', roleWithMaxId);
      role.Id = (+roleWithMaxId.Id + 1).toString();
      setRoles([...roles, role]) */
      let res = await axios.post('http://localhost:63642/api/role/add', { Title: role.Title })
      if (res.data.Success) {
        message.success('Add success !')
        setIsModalVisible(false)
        getRoles()
      } else {
        message.error(res.data.Message)
      }
    } else if (action === util.ACTION_HANDLE.EDIT) {
      if (!role.Title) return message.error('Missing title !')
      console.log(role.Id);

      let res = await axios.put(`http://localhost:63642/api/role/edit/${role.Id}`, { Title: role.Title })

      /* var existRole = roles.filter(r => r.Id !== role.Id)
      setRoles([...existRole, role].sort((a, b) => {
        var x = a.Id
        var y = b.Id
        return x < y ? -1 : x > y ? 1 : 0;
      })) */
      if (res.data.Success) {
        message.success('Edit success !')
        setIsModalVisible(false)
        getRoles()
      } else {
        message.error(res.data.Message)
      }
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className='manage-role-content'>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add Role
      </Button>

      <Table dataSource={roles} columns={columns} rowKey="Id" pagination={false} />
      <Pagination
        current={currentPage}
        pageSize={limit}
        total={total * limit}
        onChange={handlePageChange}
        itemRender={(page, type, originalElement) => {
          if (type === 'prev') {
            return <a style={{ color: currentPage === 1 ? 'gray' : '#337ab7', border: '1px solid #777777', padding: '5px' }}>Previous</a>;
          }
          if (type === 'next') {
            return <a style={{ color: currentPage === total ? 'gray' : '#337ab7', border: '1px solid #777777', padding: '5px' }}>Next</a>;
          }
          return originalElement;
        }}
      />

      <Modal
        title={action === util.ACTION_HANDLE.EDIT ? <Typography.Title level={2}>Edit Role</Typography.Title> : <Typography.Title level={2}>Add Role</Typography.Title>}
        open={isModalVisible}
        onCancel={() => {
          setSelectedRole(null)
          setIsModalVisible(false);
        }}
        closable={true}
        maskClosable={false}
        footer={null}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <RoleForm initialValues={selectedRole ? selectedRole : resetRole} onSave={handleSave} form={form} />
      </Modal>
    </div>
  );
};

const RoleForm: React.FC<RoleFormProps> = ({ initialValues, onSave, form }) => {
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSave(values as Role);
    });
  };

  useEffect(() => {
    console.log('useEffect run');
    form.resetFields()
  }, [initialValues])

  const handleFormReset = () => {
    form.resetFields()
    console.log('Form resetted');
  }

  return (
    <Form form={form} initialValues={initialValues} layout="horizontal" style={{ minWidth: '400px', marginTop: '24px' }}>
      <Form.Item label="Id" name="Id" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Title" name="Title">
        <Input />
      </Form.Item>
      {/* save */}
      <Form.Item style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
        <Button type="primary" onClick={handleSubmit} style={{ marginRight: '12px' }}>
          Save
        </Button>
        <Button onClick={handleFormReset} style={{ marginLeft: '12px' }}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RoleManage;