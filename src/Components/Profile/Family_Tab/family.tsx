import React from "react";
import { useState } from "react";
import { Input, DatePicker, Typography, Table } from "antd";
import { DeleteFilled, PlusCircleFilled } from "@ant-design/icons";
import { RcFile } from "antd/es/upload/interface";

interface API {
  EmployeeNumber: string;
  Username: string;
  Email: string;
  AvatarPath: RcFile | null;
  FirstName: string;
  LastName: string;
  Sex: boolean;
  Birthday: string;
  JobTitle: string;
  Company: string;
  Unit: string;
  Function: string;
  SectionsOrTeam: string;
  Groups: string;
  OfficeLocation: string;
  LineManager: string;
  BelongToDepartments: string;
  Rank: string;
  EmployeeType: string;
  Rights: string;
  Nation: string;
  Phone: string;
  IdCardNumber: string;
  DateOfIdCard: string;
  PlaceOfIdCard: string;
  HealthInsurance: string;
  StartingDate: string;
  StartingDateOfficial: string;
  LeavingDate: string;
  StartDateMaternityLeave: string;
  Note: string;
  AcademicLevel: string;
  Qualification: string;
  BusinessPhone: string;
  HomePhone: string;
  PersonalEmail: string;
  BankName: string;
  BankBranchNumber: string;
  BankBranchName: string;
  BankAccountNumber: string;
  BankAccountName: string;
  Street: string;
  FlatNumber: string;
  City: string;
  Province: string;
  PostalCode: string;
  Country: string;
  MartialStatus: string;
  ContactName: string;
  Relationship: string;
  PhoneR: string;
  StreetR: string;
  FlatNumberR: string;
  CityR: string;
  ProvinceR: string;
  PostalCodeR: string;
  CountryR: string;
  Signature: string;
}

interface FamilyProps {
  isEditing: boolean;
  infoAPI: {
    MartialStatus: string;
    ContactName: string;
    Relationship: string;
    PhoneR: string;
    StreetR: string;
    FlatNumberR: string;
    CityR: string;
    ProvinceR: string;
    PostalCodeR: string;
    CountryR: string;
  };
  setInfoAPI: React.Dispatch<React.SetStateAction<API>>;
}
const { Title } = Typography;

const Family: React.FC<FamilyProps> = ({ isEditing, setInfoAPI, infoAPI }) => {
  //tab_family
  const [edit_family, setEditFamily] = useState(false);
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
      title: isEditing ? <PlusCircleFilled onClick={() => {setEditFamily(true)}} /> : null,
      dataIndex: "action",
    },
  ];

  let dataSource_family = [
    {
      Family_title: "Martial status",
      info: isEditing ? (
        <Input
          placeholder="Martial status"
          value={infoAPI.MartialStatus}
          name="Martial_status"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                MartialStatus: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.MartialStatus}</strong>
      ),
    },
    {
      Family_title: (
        <strong>
          <br />
          <br />
          Emergency contact
        </strong>
      ),
    },
    {
      Family_title: "Contact name",
      info: isEditing ? (
        <Input
          placeholder="Contact name"
          value={infoAPI.ContactName}
          name="Contact_name"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                ContactName: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.ContactName}</strong>
      ),
    },
    {
      Family_title: "Relationship",
      info: isEditing ? (
        <Input
          placeholder="Relationship"
          value={infoAPI.Relationship}
          name="Relationship"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Relationship: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Relationship}</strong>
      ),
    },
    {
      Family_title: "Phone",
      info: isEditing ? (
        <Input
          placeholder="Phone"
          value={infoAPI.PhoneR}
          name="Phone"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                PhoneR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.PhoneR}</strong>
      ),
    },
    {
      Family_title: (
        <strong>
          <br />
          <br />
          Permanent Address
        </strong>
      ),
    },
    {
      Family_title: "Street",
      info: isEditing ? (
        <Input
          placeholder="Street"
          value={infoAPI.StreetR}
          name="Street"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                StreetR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.StreetR}</strong>
      ),
    },
    {
      Family_title: "Building / flatnumber",
      info: isEditing ? (
        <Input
          placeholder="Building / flatnumber"
          value={infoAPI.FlatNumberR}
          name="Building / flatnumber"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                FlatNumberR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.FlatNumberR}</strong>
      ),
    },
    {
      Family_title: "City",
      info: isEditing ? (
        <Input
          placeholder="City"
          value={infoAPI.CityR}
          name="City"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                CityR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.CityR}</strong>
      ),
    },
    {
      Family_title: "Province / state",
      info: isEditing ? (
        <Input
          placeholder="Province / state"
          value={infoAPI.ProvinceR}
          name="Province_state"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                ProvinceR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.ProvinceR}</strong>
      ),
    },
    {
      Family_title: "Postal code",
      info: isEditing ? (
        <Input
          placeholder="Postal code"
          value={infoAPI.PostalCodeR}
          name="Postal code"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                PostalCodeR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.PostalCodeR}</strong>
      ),
    },
    {
      Family_title: "Country",
      info: isEditing ? (
        <Input
          placeholder="Country"
          value={infoAPI.CountryR}
          name="Country"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                CountryR: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.CountryR}</strong>
      ),
    },
  ];

  let dataSource_relationship = [
    {
      Contact_name:isEditing ?(edit_family ? <Input /> : null ): (null),
      Birth_day: isEditing ?(edit_family ? <DatePicker /> : null): (null),
      Relationship:isEditing ?(edit_family ?  <Input /> : null): (null),
      Note:isEditing ?(edit_family ?  <Input /> : null): (null),
      action:isEditing ?(edit_family ? <DeleteFilled /> : null): (null) ,
    },
  ];
  return (
    <div>
      <Table
        pagination={false}
        dataSource={dataSource_family}
        columns={columns_family}
      ></Table>
      <br />
      <br />
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
