import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Row, Col, Typography, Radio, DatePicker, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';


interface User {
  id: number;
  email: string;
  roles: string[];
  departments: string[];
}

interface UserFormProps {
  initialValues: User;
  onSave: (values: User) => void;
  form: FormInstance<any>;
}

const UserForm: React.FC<UserFormProps> = ({ initialValues, onSave, form }) => {

  const { t } = useTranslation();

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
          {t('Reset')}
        </Button>
      </Form.Item>
      <Form.Item label={t('Roles')} name="roles" rules={[{ required: true, message: t('Please select roles') }]}>
        <Select mode="multiple">
          <Select.Option value="Admin">{t('Admin')}</Select.Option>
          <Select.Option value="Editor">{t('Editor')}</Select.Option>
          <Select.Option value="Viewer">{t('Viewer')}</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label={t('Departments')} name="departments" rules={[{ required: true, message: t('Please select departments') }]}>
        <Select mode="multiple">
          <Select.Option value="HR">HR</Select.Option>
          <Select.Option value="Finance">{t('Finance')}</Select.Option>
          <Select.Option value="IT">IT</Select.Option>
        </Select>
      </Form.Item>

      {/* 1 */}
      <Typography.Title level={4}>{t('Overview')}</Typography.Title>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Username')} name="Username" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('First name')} name="FirstName" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Last name')} name="LastName" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Employee number')} name="EmployeeNumber" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Job title')} name="JobTitle" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Birthday')} name="Birthday" rules={[{ required: true, message: t('Please enter the email') }]}>
            <DatePicker style={{ float: 'right' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Gender')} name="Sex" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Radio.Group style={{ float: 'right' }}>
              <Radio value="true">{t('Male')}</Radio>
              <Radio value="false">{t('Female')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Company')} name="Company" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Office location')} name="OfficeLocation" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Line manager')} name="LineManager" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Cost center')} name="CostCenter" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={24}>
          <Form.Item label={t('Belong to departments')} name="BelongToDepartments" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Select mode="multiple">
              <Select.Option value="Admin">{t('Admin')}</Select.Option>
              <Select.Option value="Editor">{t('Editor')}</Select.Option>
              <Select.Option value="Viewer">{t('Viewer')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Groups')} name="Groups" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Sections/Teams')} name="SectionsOrTeam" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Unit')} name="Unit" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Function')} name="Function" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* 2 */}
      <Typography.Title level={4}>{t('Additional')}</Typography.Title>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Nation')} name="Nation" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Id card number')} name="IdCardNumber" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Date of ID card')} name="DateOfIdCard" rules={[{ required: true, message: t('Please enter the email') }]}>
            <DatePicker style={{ float: 'right' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Place of ID card')} name="PlaceOfIdCard" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Health insurance')} name="HealthInsurance" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Phone')} name="Phone" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Starting date')} name="StartingDate" rules={[{ required: true, message: t('Please enter the email') }]}>
            <DatePicker style={{ float: 'right' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Starting date offical')} name="StartingDateOfficial" rules={[{ required: true, message: t('Please enter the email') }]}>
            <DatePicker style={{ float: 'right' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Leaving date')} name="LeavingDate" rules={[{ required: true, message: t('Please enter the email') }]}>
            <DatePicker style={{ float: 'right' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={24}>
          <Form.Item label={t('Start date maternity leave (for just female)')} name="StartingDateOfficial" rules={[{ required: true, message: t('Please enter the email') }]}>
            <DatePicker style={{ float: 'right' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label={t('Note')} name="Note" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Typography.Title level={5}>{t('Literacy')}</Typography.Title>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Academic level')} name="AcademicLevel" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Specialized qualification')} name="Qualification" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Typography.Title level={5}>{t('Contact Info')}</Typography.Title>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Business phone')} name="BusinessPhone" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Home phone')} name="HomePhone" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Personal email')} name="Personal email" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Typography.Title level={5}>{t('Contact Info')}</Typography.Title>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Bank Name')} name="BankName" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Branch number')} name="BankBranchNumber" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Bank brach name')} name="BankBranchName" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Bank account number')} name="BankAccountNumber" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Bank account name')} name="BankAccountName" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title level={5}>{t('Address')}</Typography.Title>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Street')} name="Street" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Building / Flat number')} name="FlatNumber" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('City')} name="City" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Province / State')} name="Province" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Postal code')} name="PostalCode" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Country')} name="Country" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {/* 3 */}
      <Typography.Title level={4}>{t('Family')}</Typography.Title>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Martial status')} name="MartialStatus" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title level={5}>{t('Emergency contact')}</Typography.Title>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Contact name')} name="ContactName" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Relationship')} name="Relationship" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Phone')} name="PhoneR" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Typography.Title level={5}>{t('Permanent Address')}</Typography.Title>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Street')} name="StreetR" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Building / Flat number')} name="FlatNumberR" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('City')} name="CityR" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Province / State')} name="FlatNumberR" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Postal code')} name="CityR" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Country')} name="CountryR" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label={t('Signature')} name="Signature" rules={[{ required: true, message: t('Please enter the email') }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>


      {/* save */}
      <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size='large' type="primary" onClick={handleSubmit}>
          {t('Save')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;