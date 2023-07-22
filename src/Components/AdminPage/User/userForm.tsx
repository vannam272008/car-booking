import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Row, Col, Typography, Radio, DatePicker, FormInstance } from 'antd';
import { User, UserFormProps } from '../interfaces'


const UserForm: React.FC<UserFormProps> = ({ initialValues, onSave, form }) => {
    const handleSubmit = () => {
      form.validateFields().then((values) => {
        onSave(values as User);
      });
    };

    useEffect(() => {
        form.resetFields()
    }, [initialValues])
  
    const handleFormReset = () => {
      form.resetFields()
    }

    const handleForSubmit = (values: User) => {
        console.log(values);
    }
  
    return (
      <Form onFinish={handleForSubmit} form={form} initialValues={initialValues} layout="horizontal" style={{ minWidth: '600px' }}>
        <Form.Item>
          <Button onClick={handleFormReset} style={{ marginLeft: 8 }}>
            Reset
          </Button>
        </Form.Item>
        <Form.Item label="Roles" name="roles">
          <Select mode="multiple">
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Editor">Editor</Select.Option>
            <Select.Option value="Viewer">Viewer</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Departments" name="departments">
          <Select mode="multiple">
            <Select.Option value="HR">HR</Select.Option>
            <Select.Option value="Finance">Finance</Select.Option>
            <Select.Option value="IT">IT</Select.Option>
          </Select>
        </Form.Item>
  
        {/* 1 */}
        <Typography.Title level={4}>Overview</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Username" name="Username">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="First name" name="FirstName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last name" name="LastName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Employee number" name="EmployeeNumber">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Job title" name="JobTitle">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Birthday" name="Birthday">
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Gender" name="Sex">
              <Radio.Group style={{float: 'right'}}>
                <Radio value="true">Male</Radio>
                <Radio value="false">Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Company" name="Company">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Office location" name="OfficeLocation">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Line manager" name="LineManager">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Cost center" name="CostCenter">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Belong to departments" name="BelongToDepartments">
              <Select mode="multiple">
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Editor">Editor</Select.Option>
                <Select.Option value="Viewer">Viewer</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Groups" name="Groups">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sections/Teams" name="SectionsOrTeam">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Unit" name="Unit">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Function" name="Function">
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        {/* 2 */}
        <Typography.Title level={4}>Additional</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Nation" name="Nation">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Id card number" name="IdCardNumber">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date of ID card" name="DateOfIdCard">
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Place of ID card" name="PlaceOfIdCard">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Health insurance" name="HealthInsurance">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Phone" name="Phone">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Starting date" name="StartingDate">
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Starting date offical" name="StartingDateOfficial">
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Leaving date" name="LeavingDate">
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Start date maternity leave (for just female)" name="StartingDateOfficial">
              <DatePicker style={{float: 'right'}} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
            <Form.Item label="Note" name="Note">
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        <Typography.Title level={5}>Literacy</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Academic level" name="AcademicLevel">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Specialized qualification" name="Qualification">
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        <Typography.Title level={5}>Contact Info</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Business phone" name="BusinessPhone">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Home phone" name="HomePhone">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Personal email" name="Personal email">
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        <Typography.Title level={5}>Contact Info</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Bank Name" name="BankName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Branch number" name="BankBranchNumber">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Bank brach name" name="BankBranchName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Bank account number" name="BankAccountNumber">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Bank account name" name="BankAccountName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Typography.Title level={5}>Address</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Street" name="Street">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Building / Flat number" name="FlatNumber">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="City" name="City">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Province / State" name="Province">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Postal code" name="PostalCode">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Country" name="Country">
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        {/* 3 */}
        <Typography.Title level={4}>Family</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Martial status" name="MartialStatus">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Typography.Title level={5}>Emergency contact</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Contact name" name="ContactName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Relationship" name="Relationship">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Phone" name="PhoneR">
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
        <Typography.Title level={5}>Permanent Address</Typography.Title>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Street" name="StreetR">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Building / Flat number" name="FlatNumberR">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="City" name="CityR">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Province / State" name="FlatNumberR">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Postal code" name="CityR">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Country" name="CountryR">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Signature" name="Signature">
              <Input />
            </Form.Item>
          </Col>
        </Row>
  
  
        {/* save */}
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size='large' type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Form.Item>
      </Form>
    );
};

export default UserForm;