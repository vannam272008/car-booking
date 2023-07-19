import React from "react";
import { Dayjs } from "dayjs";
import { Input, Table, DatePicker } from "antd";

interface OverviewProps {
  isEditing: boolean;
  info: {
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

const Overview: React.FC<OverviewProps> = ({ info, isEditing, setInfo }) => {
  // tab_overview
  const handleDate_birth = (value: Dayjs | null) => {
    setInfo((prevInfo) => ({ ...prevInfo, birth_day: value }));
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
      info: <strong>bangnm@o365.vn</strong>,
    },
    {
      overview_title: "Email",
      info: <strong>bangnm@o365.vn</strong>,
    },
    {
      overview_title: "Employee number",
      info: isEditing ? (
        <Input
          placeholder="Employee number"
          name="Employee Number"
          value={info.employee_number}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                employee_number: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.employee_number}</strong>
      ),
    },
    {
      overview_title: "First name",
      info: <strong>Bang</strong>,
    },
    {
      overview_title: "Last name",
      info: <strong>Nguyen Minh</strong>,
    },
    {
      overview_title: "Sex",
      info: isEditing ? (
        <Input
          placeholder="Sex"
          name="sex"
          value={info.sex}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                sex: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.sex}</strong>
      ),
    },
    {
      overview_title: "Birth day",
      info: isEditing ? (
        <DatePicker
          className="profile-birth-day-datepicker"
          value={info.birth_day}
          style={{ width: "100%" }}
          onChange={handleDate_birth}
          placeholder="Birth day"
        />
      ) : (
        <strong>
          {info.birth_day ? info.birth_day.format("DD-MM-YYYY") : ""}
        </strong>
      ),
    },
    {
      overview_title: "Job title",
      info: <strong>Developer</strong>,
    },
    {
      overview_title: "Position",
      info: isEditing ? (
        <Input
          placeholder="Position"
          name="position"
          value={info.positon}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                positon: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.positon}</strong>
      ),
    },
    {
      overview_title: "Company",
      info: isEditing ? (
        <Input
          placeholder="Company"
          name="company"
          value={info.company}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                company: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.company}</strong>
      ),
    },
    {
      overview_title: "Unit",
      info: isEditing ? (
        <Input
          placeholder="Unit"
          name="unit"
          value={info.unit}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                unit: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.unit}</strong>
      ),
    },
    {
      overview_title: "Function",
      info: isEditing ? (
        <Input
          placeholder="Function"
          name="function"
          value={info.function}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                function: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.function}</strong>
      ),
    },
    {
      overview_title: "Department",
      info: isEditing ? (
        <Input
          placeholder="Deparment"
          name="deparment"
          value={info.deparment}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                deparment: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.deparment}</strong>
      ),
    },
    {
      overview_title: "Sections/Teams",
      info: isEditing ? (
        <Input
          placeholder="Sections/Teams"
          name="sections_teams"
          value={info.sections_teams}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                sections_teams: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.sections_teams}</strong>
      ),
    },
    {
      overview_title: "Groups",
      info: isEditing ? (
        <Input
          placeholder="Groups"
          name="groups"
          value={info.groups}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                groups: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.groups}</strong>
      ),
    },
    {
      overview_title: "Office location",
      info: isEditing ? (
        <Input
          placeholder="Office location"
          name="office_location"
          value={info.office_location}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                office_location: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.office_location}</strong>
      ),
    },
    {
      overview_title: "Line Manager",
      info: <strong>Hao Ha Anh</strong>,
    },
    {
      overview_title: "Belong to departments",
      info: (
        <strong>
          Cộng tác viên, Dự án test, Hỗ trợ khách hàng, IT/ Technical, Kiểm thử
          Testing, Test 3, Test Project
        </strong>
      ),
    },
    {
      overview_title: "Cost Center",
      info: isEditing ? (
        <Input
          placeholder="Cost Center"
          name="cost_center"
          value={info.cost_center}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                cost_center: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.cost_center}</strong>
      ),
    },
    {
      overview_title: "Rank",
      info: isEditing ? (
        <Input
          placeholder="Rank"
          name="rank"
          value={info.rank}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                rank: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.rank}</strong>
      ),
    },
    {
      overview_title: "Employee type",
      info: isEditing ? (
        <Input
          placeholder="Employee type"
          name="Employee_type"
          value={info.employee_type}
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                employee_type: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.employee_type}</strong>
      ),
    },
    {
      overview_title: "Rights",
      info: (
        <strong>
          Request Admin, General Viewer, AVN Document Approval Request
          Reporters, Car Booking Request Admin, AVN Proposal Approval Request
          Reporters
        </strong>
      ),
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
