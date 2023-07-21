import React from "react";
import { Dayjs } from "dayjs";
import { Input, Table, DatePicker } from "antd";

interface API {
  EmployeeNumber: string;
  Username: string,
  Email: string,
  FirstName: string,
  LastName: string,
  Sex: boolean,
  Birthday: Dayjs | null,
  JobTitle: string,
  Company: string,
  Unit: string,
  Function: string,
  SectionsOrTeam: string,
  Groups: string,
  OfficeLocation: string,
  LineManager: string,
  BelongToDepartments: string,
  Rank: string,
  EmployeeType: string,
  Rights: string
}

interface OverviewProps {
  isEditing: boolean;
  infoAPI: {
    EmployeeNumber: string;
    Username: string,
    Email: string,
    FirstName: string,
    LastName: string,
    Sex: boolean,
    Birthday: Dayjs | null,
    JobTitle: string,
    Company: string,
    Unit: string,
    Function: string,
    SectionsOrTeam: string,
    Groups: string,
    OfficeLocation: string,
    LineManager: string,
    BelongToDepartments: string,
    Rank: string,
    EmployeeType: string,
    Rights: string
  }
  // setInfo: React.Dispatch<
  //   React.SetStateAction<{
  //     employee_number: string;
  //     sex: string;
  //     birth_day: Dayjs | null;
  //     positon: string;
  //     company: string;
  //     unit: string;
  //     function: string;
  //     deparment: string;
  //     sections_teams: string;
  //     groups: string;
  //     office_location: string;
  //     cost_center: string;
  //     rank: string;
  //     employee_type: string;
  //     nation: string;
  //     phone: string;
  //     id_card_number: string;
  //     dateofidcard: Dayjs | null;
  //     placeofidcard: string;
  //     health_insurance: string;
  //     starting_date: Dayjs | null;
  //     Starting_date_official: Dayjs | null;
  //     Leaving_date: Dayjs | null;
  //     start_date_maternity_leave: Dayjs | null;
  //     note: string;
  //     academic_level: string;
  //     specialized_qualification: string;
  //     business_phone: string;
  //     home_phone: string;
  //     personal_email: string;
  //     bank_name: string;
  //     branch_number: string;
  //     bank_branch_name: string;
  //     bank_account_number: string;
  //     notebank_account_name: string;
  //     street: string;
  //     building_flatnumber: string;
  //     city: string;
  //     province_state: string;
  //     postal_code: string;
  //     country: string;
  //     martial_status: string;
  //     contact_name: string;
  //     relationship: string;
  //     phone_family: string;
  //     street_family: string;
  //     building_family: string;
  //     city_family: string;
  //     province_state_family: string;
  //     postal_code_family: string;
  //     country_family: string;
  //   }>>;
  setInfoAPI: React.Dispatch<React.SetStateAction<API>>
}

const Overview: React.FC<OverviewProps> = ({ infoAPI, isEditing, setInfoAPI}) => {
  // tab_overview
  const handleDate_birth = (value: Dayjs | null) => {
    setInfoAPI((prevInfo) => ({ ...prevInfo, Birthday: value }));
  };

  const columns_overview = [
    {
      dataIndex: "overview_title",
    },
    {
      dataIndex: "info",
      width: "70%",
    },
  ];

  const dataSource_overview = [
    {
      overview_title: "Login",
      info: <strong>{infoAPI.Username}</strong>,
    },
    {
      overview_title: "Email",
      info: <strong>{infoAPI.Email}</strong>,
    },
    {
      overview_title: "Employee number",
      info: isEditing ? (
        <Input
          placeholder="Employee number"
          name="Employee Number"
          value={infoAPI.EmployeeNumber}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                EmployeeNumber: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.EmployeeNumber}</strong>
      ),
    },
    {
      overview_title: "First name",
      info: <strong>{infoAPI.FirstName}</strong>,
    },
    {
      overview_title: "Last name",
      info: <strong>{infoAPI.LastName}</strong>,
    },
    {
      overview_title: "Sex",
      info: isEditing ? (
        <Input
          placeholder="Sex"
          name="sex"
          // value={infoAPI.Sex}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                sex: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Sex}</strong>
      ),
    },
    {
      overview_title: "Birth day",
      info: isEditing ? (
        <DatePicker
          className="profile-birth-day-datepicker"
          value={infoAPI.Birthday}
          style={{ width: "100%" }}
          onChange={handleDate_birth}
          placeholder="Birth day"
        />
      ) : (
        <strong>
          {infoAPI.Birthday ? infoAPI.Birthday.format("DD-MM-YYYY") : ""}
        </strong>
      ),
    },
    {
      overview_title: "Job title",
      info: <strong>{infoAPI.JobTitle}</strong>,
    },
    {
      overview_title: "Company",
      info: isEditing ? (
        <Input
          placeholder="Company"
          name="company"
          value={infoAPI.Company}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                company: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Company}</strong>
      ),
    },
    {
      overview_title: "Unit",
      info: isEditing ? (
        <Input
          placeholder="Unit"
          name="unit"
          value={infoAPI.Unit}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                unit: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Unit}</strong>
      ),
    },
    {
      overview_title: "Function",
      info: isEditing ? (
        <Input
          placeholder="Function"
          name="function"
          value={infoAPI.Function}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                function: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Function}</strong>
      ),
    },
    {
      overview_title: "Sections/Teams",
      info: isEditing ? (
        <Input
          placeholder="Sections/Teams"
          name="sections_teams"
          value={infoAPI.SectionsOrTeam}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                sections_teams: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.SectionsOrTeam}</strong>
      ),
    },
    {
      overview_title: "Groups",
      info: isEditing ? (
        <Input
          placeholder="Groups"
          name="groups"
          value={infoAPI.Groups}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                groups: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Groups}</strong>
      ),
    },
    {
      overview_title: "Office location",
      info: isEditing ? (
        <Input
          placeholder="Office location"
          name="office_location"
          value={infoAPI.OfficeLocation}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                office_location: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.OfficeLocation}</strong>
      ),
    },
    {
      overview_title: "Line Manager",
      info: <strong>{infoAPI.LineManager}</strong>,
    },
    {
      overview_title: "Belong to departments",
      info: <strong>{infoAPI.BelongToDepartments}</strong>
    },
    {
      overview_title: "Rank",
      info: isEditing ? (
        <Input
          placeholder="Rank"
          name="rank"
          value={infoAPI.Rank}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Rank: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Rank}</strong>
      ),
    },
    {
      overview_title: "Employee type",
      info: isEditing ? (
        <Input
          placeholder="Employee type"
          name="Employee_type"
          value={infoAPI.EmployeeType}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                EmployeeType: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.EmployeeType}</strong>
      ),
    },
    {
      overview_title: "Rights",
      info: <strong>{infoAPI.Rights}</strong>
    },
  ];

  return (
    <Table
      pagination={false}
      dataSource={dataSource_overview}
      columns={columns_overview}
    ></Table>
  );
};

export default Overview;
