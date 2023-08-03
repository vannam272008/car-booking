import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Row, Col, Typography, Radio, DatePicker, FormInstance, Upload } from 'antd';
import { User, UserFormProps, DepartmentMembers, Role, Department } from '../Utils/interfaces'
import axios from 'axios';
import { ACTION_HANDLE } from '../Utils';
import { UploadOutlined } from '@ant-design/icons';
import { jwt_admin } from '../Utils/constants'
import { RcFile } from 'antd/es/upload';
import dayjs, { Dayjs } from 'dayjs';
import { resetUser } from '../Utils';
import { useTranslation } from 'react-i18next';


const UserForm: React.FC<UserFormProps> = ({ initialValues, onSave, form, action }) => {

  const {t} = useTranslation();

  const { Option } = Select;
  const [roles, setRoles] = useState<Role[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [tempUrl, setTempUrl] = React.useState<string | null>(null);
  const [listFiles, setListFiles] = React.useState<RcFile[]>([]);
  const [dataUser, setDataUser] = React.useState<User>(initialValues)


  const getRoles = async () => {
    let res = await axios.get('http://localhost:63642/api/role/all?page=1&limit=15')
    console.log('>>check res roles:', res);

    res.data && res.data.Data && res.data.Data.ListData ? setRoles(res.data.Data.ListData) : setRoles([])
  }

  const getDepartments = async () => {
    let res = await axios.get('http://localhost:63642/api/department/all?page=1&limit=15')
    console.log('>>check res department:', res);

    res.data && res.data.Data && res.data.Data.ListData ? setDepartments(res.data.Data.ListData) : setDepartments([])
  }

  const deleteFilesTemp = async () => {
    let data = await axios.get('http://localhost:63642/api/file/delete-files-temp')
    console.log('data del temp files:', data);

  }

  useEffect(() => {
    getRoles()
    getDepartments()
  }, [])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      values.AvatarPath = imageUrl || ''
      values.Birthday = dataUser.Birthday
      values.DateOfIdCard = dataUser.DateOfIdCard
      values.StartingDate = dataUser.StartingDate
      values.StartingDateOfficial = dataUser.StartingDateOfficial
      values.StartDateMaternityLeave = dataUser.StartDateMaternityLeave
      values.LeavingDate = dataUser.LeavingDate
      var file = listFiles[0]
      console.log('check final user', values);
      console.log('check final imageUrl', imageUrl);

      onSave(values as User, file);
      setDataUser(resetUser)
    });

  };

  useEffect(() => {
    handleFormReset()
    deleteFilesTemp()

  }, [initialValues])

  const handleFormReset = () => {
    setDataUser(initialValues)
    form.resetFields()
    setImageUrl(null)
    setTempUrl(null)
    setListFiles([])
  }

  const handleForSubmit = (values: User) => {
    console.log(values);
  }

  const uploadConfig = {
    action: 'http://localhost:63642/api/file/upload-temp',
    headers: {
      Authorization: `Bearer ${jwt_admin}`,
    },
    // multiple: false,
  }

  const handleImageChange = (info: any) => {
    console.log('info:', info)
    setListFiles([info.file])
    if (info.file.status === 'done') {
      console.log('info:', info.file.name)
      var linkToSave = `Files/Avatar/${initialValues.Id}/${info.file.name}`
      var linkToSaveTemp = `Files/Avatar/temp/${info.file.name}`
      setImageUrl(linkToSave)
      setTempUrl(linkToSaveTemp)
    }
  }

  const handleDatePicker = (value: Dayjs | null, field: string) => {
    if (value) {
      const formattedValue = value.format('YYYY-MM-DD HH:mm:ss');
      setDataUser((prevFormData) => ({
        ...prevFormData,
        [field]: formattedValue,
      }));
    }
  };

  return (
    <Form onFinish={handleForSubmit} form={form} initialValues={initialValues} layout="horizontal" style={{ minWidth: '600px' }}>

      {/* 1 */}
      <Typography.Title level={4}>{t('Overview')}</Typography.Title>

      <Row>
        <Col span={24}>
          <Form.Item label="Id" name="Id" hidden>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      {action === ACTION_HANDLE.ADD &&
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="">
              <img src={tempUrl ? `http://localhost:63642/${tempUrl}` : initialValues.AvatarPath} alt="" width={90} height={90} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="">
              <Upload {...uploadConfig} fileList={listFiles} onChange={handleImageChange}>
                <Button icon={<UploadOutlined />}>{t('Click to Upload')}</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>}
      {action === ACTION_HANDLE.EDIT &&
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="">
              <img src={tempUrl ? `http://localhost:63642/${tempUrl}` : initialValues.AvatarPath} alt="" width={90} height={90} style={{ borderRadius: '50%' }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="">
              <Upload {...uploadConfig} fileList={listFiles} onChange={handleImageChange}>
                <Button icon={<UploadOutlined />}>{t('Click to Upload')}</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>}

      {action === ACTION_HANDLE.ADD &&
        <>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label={t('Roles')} name="Roles">
                <Select mode="multiple">
                  {roles.map((role) => (
                    <Option key={role.Id}>
                      {role.Title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item label={t('Belong to departments')} name="Departments">
                <Select mode="multiple">
                  {departments.map((d) => (
                    <Option key={d.Id}>
                      {d.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="Email" name="Email">
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t('Password')} name="Password">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </>
      }
      {action === ACTION_HANDLE.EDIT &&
        <>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label={t('Roles')} name="Roles">
                <Select mode="multiple">
                  {roles.map((role) => (
                    <Option key={role.Id}>
                      {role.Title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item label={t('Belong to departments')} name="Departments">
                <Select mode="multiple">
                  {departments.map((d) => (
                    <Option key={d.Id}>
                      {d.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label={t('Username')} name="Username">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="Email">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </>
      }

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
          <Form.Item label="Gender" name="Sex">
            <Radio.Group style={{ float: 'right' }}>
              <Radio value={true}>Male</Radio>
              <Radio value={false}>Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Employee number" name="EmployeeNumber">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Birthday">
            <DatePicker style={{ float: 'right' }} value={dataUser.Birthday ? dayjs(dataUser.Birthday) : null} onChange={(value) => handleDatePicker(value, 'Birthday')} placeholder="Birthday" />
            {/* <Input hidden /> */}
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
          <Form.Item label="Company" name="Company">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Line manager" name="LineManager">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="Office location" name="OfficeLocation">
            <Input />
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
          <Form.Item label="Date of ID card">
            <DatePicker style={{ float: 'right' }} value={dataUser.DateOfIdCard ? dayjs(dataUser.DateOfIdCard) : null} onChange={(value) => handleDatePicker(value, "DateOfIdCard")} placeholder="Date of ID card" />
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
          <Form.Item label="Starting date">
            <DatePicker style={{ float: 'right' }} value={dataUser.StartingDate ? dayjs(dataUser.StartingDate) : null} onChange={(value) => handleDatePicker(value, "StartingDate")} placeholder="Starting date" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Starting date offical">
            <DatePicker style={{ float: 'right' }} value={dataUser.StartingDateOfficial ? dayjs(dataUser.StartingDateOfficial) : null} onChange={(value) => handleDatePicker(value, "StartingDateOfficial")} placeholder="Starting date offical" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Leaving date">
            <DatePicker style={{ float: 'right' }} value={dataUser.LeavingDate ? dayjs(dataUser.LeavingDate) : null} onChange={(value) => handleDatePicker(value, "LeavingDate")} placeholder="Leaving date" />
          </Form.Item>
        </Col>
      </Row>
      {!initialValues.Sex &&
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Start date maternity leave (for just female)">
              <DatePicker
                style={{ float: 'right' }}
                value={dataUser.StartDateMaternityLeave ? dayjs(dataUser.StartDateMaternityLeave) : null}
                onChange={(value) => handleDatePicker(value, "StartDateMaternityLeave")}
                placeholder="Start date maternity leave"
              />
            </Form.Item>
          </Col>
        </Row>
      }

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
          <Form.Item label="Personal email" name="PersonalEmail">
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
          <Form.Item label="Province / State" name="ProvinceR">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Postal code" name="PostalCodeR">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Country" name="CountryR">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      {/* <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Signature" name="Signature">
            <Input />
          </Form.Item>
        </Col>
      </Row> */}
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
  );
};

export default UserForm;