import React from "react";
import { Dayjs } from "dayjs";
import { Input, DatePicker, Typography, Table } from "antd";
import { DeleteFilled, PlusCircleFilled } from "@ant-design/icons";

interface FamilyProps {
  isEditing: boolean;
  info: {
    martial_status: string;
    contact_name: string;
    relationship: string;
    phone_family: string;
    street_family: string;
    building_family: string;
    city_family: string;
    province_state_family: string;
    postal_code_family: string;
    country_family: string;
  };
  setInfo: React.Dispatch<
    React.SetStateAction<{
      employee_number: string;
      sex: string;
      birth_day: Dayjs | null;
      positon: string;
      company: string;
      unit: string;
      function: string;
      deparment: string;
      sections_teams: string;
      groups: string;
      office_location: string;
      cost_center: string;
      rank: string;
      employee_type: string;
      nation: string;
      phone: string;
      id_card_number: string;
      dateofidcard: Dayjs | null;
      placeofidcard: string;
      health_insurance: string;
      starting_date: Dayjs | null;
      Starting_date_official: Dayjs | null;
      Leaving_date: Dayjs | null;
      start_date_maternity_leave: Dayjs | null;
      note: string;
      academic_level: string;
      specialized_qualification: string;
      business_phone: string;
      home_phone: string;
      personal_email: string;
      bank_name: string;
      branch_number: string;
      bank_branch_name: string;
      bank_account_number: string;
      notebank_account_name: string;
      street: string;
      building_flatnumber: string;
      city: string;
      province_state: string;
      postal_code: string;
      country: string;
      martial_status: string;
      contact_name: string;
      relationship: string;
      phone_family: string;
      street_family: string;
      building_family: string;
      city_family: string;
      province_state_family: string;
      postal_code_family: string;
      country_family: string;
    }>
  >;
}
const { Title } = Typography;

const Family: React.FC<FamilyProps> = ({ isEditing, setInfo, info }) => {
  //tab_family
  const columns_family = [
    {
      dataIndex: "Family_title",
    },
    {
      dataIndex: "info",
      width: "70%",
    },
  ];

  const columns_relationship = [
    {
      title: "Contact name",
      dataIndex: "Contact_name",
    },
    {
      title: "Birth day",
      dataIndex: "Birth_day",
    },
    {
      title: "Relationship",
      dataIndex: "Relationship",
    },
    {
      title: "Note",
      dataIndex: "Note",
    },
    {
      title: isEditing ? <PlusCircleFilled onClick={() => {}} /> : null,
      dataIndex: "action",
    },
  ];

  let dataSource_family = [
    {
      Family_title: "Martial status",
      info: isEditing ? (
        <Input
          placeholder="Martial status"
          name="Martial_status"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                martial_status: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.martial_status}</strong>
      ),
    },
    {
      Family_title: <strong><br/><br/>Emergency contact</strong>,
    },
    {
      Family_title: "Contact name",
      info: isEditing ? (
        <Input
          placeholder="Contact name"
          name="Contact_name"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                contact_name: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.contact_name}</strong>
      ),
    },
    {
      Family_title: "Relationship",
      info: isEditing ? (
        <Input
          placeholder="Relationship"
          name="Relationship"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                relationship: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.relationship}</strong>
      ),
    },
    {
      Family_title: "Phone",
      info: isEditing ? (
        <Input
          placeholder="Phone"
          name="Phone"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                phone_family: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.phone_family}</strong>
      ),
    },
    {
      Family_title: <strong><br/><br/>Permanent Address</strong>,
    },
    {
      Family_title: "Street",
      info: isEditing ? (
        <Input
          placeholder="Street"
          name="Street"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                street: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.street_family}</strong>
      ),
    },
    {
      Family_title: "Building / flatnumber",
      info: isEditing ? (
        <Input
          placeholder="Building / flatnumber"
          name="Building / flatnumber"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                building_family: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.building_family}</strong>
      ),
    },
    {
      Family_title: "City",
      info: isEditing ? (
        <Input
          placeholder="City"
          name="City"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                city_family: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.city_family}</strong>
      ),
    },
    {
      Family_title: "Province / state",
      info: isEditing ? (
        <Input
          placeholder="Province / state"
          name="Province_state"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                province_state: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.province_state_family}</strong>
      ),
    },
    {
      Family_title: "Postal code",
      info: isEditing ? (
        <Input
          placeholder="Postal code"
          name="Postal code"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                postal_code: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.postal_code_family}</strong>
      ),
    },
    {
      Family_title: "Country",
      info: isEditing ? (
        <Input
          placeholder="Country"
          name="Country"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                country_family: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.country_family}</strong>
      ),
    },
  ];

  let dataSource_relationship = [
    {
      Contact_name: <Input />,
      Birth_day: <DatePicker />,
      Relationship: <Input />,
      Note: <Input />,
      action: <DeleteFilled />,
    },
  ];
  return (
    <div>
      <Table
        pagination={false}
        dataSource={dataSource_family}
        columns={columns_family}
      ></Table>
      <br/><br/>
      <Title>Relationships</Title>
      <Table
        pagination={false}
        dataSource={dataSource_relationship}
        columns={columns_relationship}
      ></Table>
    </div>
  );
};

export default Family;
