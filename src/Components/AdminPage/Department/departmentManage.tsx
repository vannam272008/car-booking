import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Typography, Input, message, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Department, DepartmentFormProps } from '../Utils/interfaces';
import * as util from '../Utils'
import axios from 'axios';
import './departmentManage.scss'
import { resetDepartment } from '../Utils';

const DepartmentManage: React.FC = () => {

  message.config(util.messageConfig)
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

  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [action, setAction] = useState<string>('');
  const [form] = Form.useForm<any>();

  const getDepartments = async () => {
    let res = await axios.get('http://localhost:63642/api/department/all?page=1&limit=15')
    console.log('>>check res department:', res)
    if (res.data.Success) {
      setDepartments(res.data.Data.ListData)
    } else {
      setDepartments([])
    }
  }

  useEffect(() => {
    getDepartments()
  }, [])

  const handleAdd = () => {
    setAction(util.ACTION_HANDLE.ADD)
    setSelectedDepartment(null);
    setIsModalVisible(true);
  };

  const handleEdit = (d: Department) => {
    setAction(util.ACTION_HANDLE.EDIT)
    setSelectedDepartment(d);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    let res = await axios.delete(`http://localhost:63642/api/department/delete/${id}`)
    if (res.data.Success) {
      message.success('Delete success !')
      setIsModalVisible(false)
      getDepartments()
    } else {
      message.error(res.data.Message)
    }
  };

  const handleSave = async (department: Department) => {
    console.log('>>check department data from form:', department);
    console.log('>>selected department:', selectedDepartment);

    if (action === util.ACTION_HANDLE.ADD) {
      if (!department.Name || !department.Code || !department.ContactInfo || !department.Description) return message.error('Missing title !')
      let res = await axios.post('http://localhost:63642/api/department/add', department)
      if (res.data.Success) {
        message.success('Add success !')
        setIsModalVisible(false)
        getDepartments()
      } else {
        message.error(res.data.Message)
      }
    } else if (action === util.ACTION_HANDLE.EDIT) {
      if (!department.Name || !department.Code || !department.ContactInfo || !department.Description) return message.error('Missing title !')

      let res = await axios.put(`http://localhost:63642/api/department/edit/${department.Id}`, department)
      if (res.data.Success) {
        message.success('Edit success !')
        setIsModalVisible(false)
        getDepartments()
      } else {
        message.error(res.data.Message)
      }
    }
    setSelectedDepartment(null)
  }

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
        footer={null}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <DepartmentForm initialValues={selectedDepartment ? selectedDepartment : resetDepartment} onSave={handleSave} form={form} />
      </Modal>
    </div>
  );
};

const DepartmentForm: React.FC<DepartmentFormProps> = ({ initialValues, onSave, form }) => {
  const { Option } = Select;
  const [departmentForDropDown, setDepartmentForDropDown] = useState<Department[]>([]);
  const getDepartmentForDropDown = async () => {
    let res = await axios.get('http://localhost:63642/api/department/all?page=1&limit=200')
    console.log('>>check res department props:', res)
    console.log('initialValues:', initialValues);
    var listForDropDown = res.data.Data.ListData.filter((d: Department) => d.Id !== initialValues.Id)
    console.log('>>check listForDropDown props:', listForDropDown)

    res.data.Success ? setDepartmentForDropDown(listForDropDown) : setDepartmentForDropDown([])
  }

  useEffect(() => {
    console.log('useEffect reset fields run');
    getDepartmentForDropDown()
    form.resetFields()
  }, [initialValues])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSave(values as Department);
    });
  };

  const handleFormReset = () => {
    form.resetFields()
    console.log('Form resetted');
  }

  return (
    <Form form={form} initialValues={initialValues} layout="horizontal" style={{ minWidth: '450px', marginTop: '24px' }}>
      <Form.Item label="Id" name="Id" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="Name">
        <Input className="right-80" />
      </Form.Item>
      <Form.Item label="ContactInfo" name="ContactInfo">
        <Input className="right-80" />
      </Form.Item>
      <Form.Item label="Code" name="Code">
        <Input className="right-80" />
      </Form.Item>
      <Form.Item label="UnderDepartment" name="UnderDepartment">
        <Select className="right-80">
          <Option value={''}>
            None
          </Option>
          {departmentForDropDown.map((d) => (
            <Option key={d.Id}>
              {d.Name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Description" name="Description">
        <Input className="right-80" />
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

export default DepartmentManage;