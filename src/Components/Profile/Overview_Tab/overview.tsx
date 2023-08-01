import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { Input, Table, DatePicker } from "antd";
import { OverviewProps } from "../interface";

const Overview: React.FC<OverviewProps> = ({
  infoAPI,
  isEditing,
  setInfoAPI,
}) => {
  // tab_overview
  const handleDate_birth = (date: Dayjs | null, dateString: string) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      Birthday: dateString ? dateString.substring(0, 10) : "",
    }));
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
          disabled
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
      info: isEditing ? (
        <Input
          placeholder="First name"
          name="First name"
          value={infoAPI.FirstName}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                FirstName: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.FirstName}</strong>
      ),
    },
    {
      overview_title: "Last name",
      info: isEditing ? (
        <Input
          placeholder="Last Name"
          name="Last Name"
          value={infoAPI.LastName}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                LastName: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.LastName}</strong>
      ),
    },
    {
      overview_title: "Sex",
      info: isEditing ? (
        <Input
          placeholder="Sex"
          name="sex"
          // value={infoAPI.Sex}
          disabled
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
        infoAPI.Birthday ? (
          <DatePicker
            value={dayjs(infoAPI.Birthday)}
            style={{ width: "100%" }}
            disabled
            onChange={handleDate_birth}
            placeholder="Birth day"
            format="YYYY-MM-DD"
          />
        ) : (
          <DatePicker
            // value={infoAPI.Birthday === null ? null : dayjs(infoAPI.Birthday)}
            value={null}
            style={{ width: "100%" }}
            onChange={handleDate_birth}
            disabled
            placeholder="Birth day"
            format="YYYY-MM-DD"
          />
        )
      ) : (
        <strong>
          {infoAPI.Birthday ? infoAPI.Birthday.substring(0, 10) : ""}
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
          disabled
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Company: e.target.value,
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
          disabled
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Unit: e.target.value,
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
          disabled
          value={infoAPI.Function}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Function: e.target.value,
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
          disabled
          name="sections_teams"
          value={infoAPI.SectionsOrTeam}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                SectionsOrTeam: e.target.value,
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
          disabled
          value={infoAPI.Groups}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Groups: e.target.value,
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
          disabled
          value={infoAPI.OfficeLocation}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                OfficeLocation: e.target.value,
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
      info: <strong>{infoAPI.BelongToDepartments}</strong>,
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
      info: isEditing ? (
        <Input
          placeholder="Rights"
          name="rights"
          disabled
          value={infoAPI.Rights}
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Rights: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Rights}</strong>
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
