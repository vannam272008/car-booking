import React from "react";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
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

const { Title } = Typography;

interface AdditionalProps {
  isEditing: boolean;
  infoAPI: {
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
  };
  setInfoAPI: React.Dispatch<React.SetStateAction<API>>;
}

const Additional: React.FC<AdditionalProps> = ({
  infoAPI,
  isEditing,
  setInfoAPI,
}) => {
  const [edit_contract, setEdit_Contract] = useState(false);

  const handlestart_date_maternity_leave = (
    date: Dayjs | null,
    dateString: string
  ) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      StartDateMaternityLeave: dateString,
    }));
  };
  const handleleaving_date = (date: Dayjs | null, dateString: string) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      LeavingDate: dateString,
    }));
  };
  const handleDate_Id_card = (date: Dayjs | null, dateString: string) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      DateOfIdCard: dateString,
    }));
  };

  const handleDate_start_date = (date: Dayjs | null, dateString: string) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      StartingDate: dateString,
    }));
  };

  const handleDate_start_date_official = (
    date: Dayjs | null,
    dateString: string
  ) => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      StartingDateOfficial: dateString,
    }));
  };
  // tab additional
  const columns_additional = [
    {
      dataIndex: "additional_title",
    },
    {
      dataIndex: "info",
      width: "70%",
    },
  ];

  const columns_contract = [
    {
      title: "Contract type",
      dataIndex: "Contract_type",
    },
    {
      title: "From",
      dataIndex: "From",
    },
    {
      title: "To",
      dataIndex: "To",
    },
    {
      title: "Signing date",
      dataIndex: "Signing_date",
    },
    {
      title: "Subject",
      dataIndex: "Subject",
    },
    {
      title: "Department",
      dataIndex: "Department",
    },
    {
      title: "Note",
      dataIndex: "Note",
    },
    {
      title: isEditing ? <PlusCircleFilled onClick={() => {setEdit_Contract(true)}} /> : null,
      dataIndex: "action",
    },
  ];

  let dataSource_additional = [
    {
      additional_title: "Nation",
      info: isEditing ? (
        <Input
          placeholder="Nation"
          value={infoAPI.Nation}
          name="nation"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Nation: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Nation}</strong>
      ),
    },
    {
      additional_title: "Phone",
      info: isEditing ? (
        <Input
          placeholder="Phone"
          value={infoAPI.Phone}
          name="phone"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Phone: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Phone}</strong>
      ),
    },
    {
      additional_title: "ID card number",
      info: isEditing ? (
        <Input
          placeholder="ID card number"
          value={infoAPI.IdCardNumber}
          name="id_card_number"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                IdCardNumber: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.IdCardNumber}</strong>
      ),
    },
    {
      additional_title: "Date of ID card",
      info: isEditing ? (
        <DatePicker
          value={
            infoAPI.DateOfIdCard === null
              ? dayjs()
              : dayjs(infoAPI.DateOfIdCard)
          }
          style={{ width: "100%" }}
          onChange={handleDate_Id_card}
          placeholder="Date of ID card"
          format="YYYY-MM-DD"
        />
      ) : (infoAPI.DateOfIdCard === null ? (
        infoAPI.DateOfIdCard
      ) : (
        infoAPI.DateOfIdCard.substring(0,10)
      ))
    },
    {
      additional_title: "Health insurance",
      info: isEditing ? (
        <Input
          placeholder="Health insurance"
          value={infoAPI.HealthInsurance}
          name="health insurance"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                HealthInsurance: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.HealthInsurance}</strong>
      ),
    },
    {
      additional_title: "Starting date",
      info: isEditing ? (
        <DatePicker
          value={
            infoAPI.StartingDate === null
              ? dayjs()
              : dayjs(infoAPI.StartingDate)
          }
          style={{ width: "100%" }}
          onChange={handleDate_start_date}
          placeholder="Starting date"
          format="YYYY-MM-DD"
        />
      ) : (infoAPI.StartingDate === null ? (
        infoAPI.StartingDate
      ) : (
        infoAPI.StartingDate.substring(0, 10)
      ))
    },
    {
      additional_title: "Starting date offical",
      info: isEditing ? (
        <DatePicker
          value={
            infoAPI.StartingDateOfficial === null
              ? dayjs()
              : dayjs(infoAPI.StartingDateOfficial)
          }
          style={{ width: "100%" }}
          onChange={handleDate_start_date_official}
          placeholder="Starting date offical"
          format="YYYY-MM-DD"
        />
      ) : (infoAPI.StartingDateOfficial === null ? (
        infoAPI.StartingDateOfficial
      ) : (
        infoAPI.StartingDateOfficial.substring(0, 10)
      ))
    },
    {
      additional_title: "Leaving date",
      info: isEditing ? (
        <DatePicker
          value={
            infoAPI.LeavingDate === null ? dayjs() : dayjs(infoAPI.LeavingDate)
          }
          style={{ width: "100%" }}
          onChange={handleleaving_date}
          placeholder="Leaving date"
          format="YYYY-MM-DD"
        />
      ) : (infoAPI.LeavingDate === null ? (
        infoAPI.LeavingDate
      ) : (
        infoAPI.LeavingDate.substring(0, 10)
      ))
    },
    {
      additional_title: "Start Date Maternity Leave",
      info: isEditing ? (
        <DatePicker
          value={
            infoAPI.StartDateMaternityLeave === null
              ? dayjs()
              : dayjs(infoAPI.StartDateMaternityLeave)
          }
          style={{ width: "100%" }}
          onChange={handlestart_date_maternity_leave}
          placeholder="Start Date Maternity Leave"
          format="YYYY-MM-DD"
        />
      ) : (infoAPI.StartDateMaternityLeave === null ? (
        infoAPI.StartDateMaternityLeave
      ) : (
        infoAPI.StartDateMaternityLeave.substring(0, 10)
      ))
    },
    {
      additional_title: "Note",
      info: isEditing ? (
        <Input
          placeholder="Note"
          value={infoAPI.Note}
          name="Note"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Note: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Note}</strong>
      ),
    },
    {
      additional_title: (
        <strong>
          <br />
          <br />
          Literacy
        </strong>
      ),
    },
    {
      additional_title: "Academic level",
      info: isEditing ? (
        <Input
          placeholder="Academic level"
          value={infoAPI.AcademicLevel}
          name="Academic_level"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                AcademicLevel: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.AcademicLevel}</strong>
      ),
    },
    {
      additional_title: "Specialized qualification",
      info: isEditing ? (
        <Input
          placeholder="Specialized qualification"
          value={infoAPI.Qualification}
          name="Specialized qualification"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Qualification: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Qualification}</strong>
      ),
    },
    {
      additional_title: (
        <strong>
          <br />
          <br />
          Contact Info
        </strong>
      ),
    },
    {
      additional_title: "Business phone",
      info: isEditing ? (
        <Input
          placeholder="Business phone"
          value={infoAPI.BusinessPhone}
          name="Business_phone"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BusinessPhone: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BusinessPhone}</strong>
      ),
    },
    {
      additional_title: "Home phone",
      info: isEditing ? (
        <Input
          placeholder="Home phone"
          value={infoAPI.HomePhone}
          name="home_phone"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                HomePhone: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.HomePhone}</strong>
      ),
    },
    {
      additional_title: "Personal email",
      info: isEditing ? (
        <Input
          placeholder="Personal email"
          value={infoAPI.PersonalEmail}
          name="personal_email"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                PersonalEmail: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.PersonalEmail}</strong>
      ),
    },
    {
      additional_title: (
        <strong>
          <br />
          <br />
          Bank account
        </strong>
      ),
    },
    {
      additional_title: "Bank Name",
      info: isEditing ? (
        <Input
          placeholder="Bank Name"
          value={infoAPI.BankName}
          name="Bank_Name"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BankName: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BankName}</strong>
      ),
    },
    {
      additional_title: "Branch number",
      info: isEditing ? (
        <Input
          placeholder="Branch number"
          value={infoAPI.BankBranchNumber}
          name="branch_number"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BankBranchNumber: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BankBranchNumber}</strong>
      ),
    },
    {
      additional_title: "Bank brach name",
      info: isEditing ? (
        <Input
          placeholder="Bank brach name"
          value={infoAPI.BankBranchName}
          name="Bank brach name"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BankBranchName: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BankBranchName}</strong>
      ),
    },
    {
      additional_title: "Bank account number",
      info: isEditing ? (
        <Input
          placeholder="Bank account number"
          value={infoAPI.BankAccountNumber}
          name="Bank account number"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BankAccountNumber: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BankAccountNumber}</strong>
      ),
    },
    {
      additional_title: "NoteBank Account Name",
      info: isEditing ? (
        <Input
          placeholder="NoteBank Account Name"
          value={infoAPI.BankAccountName}
          name="NoteBank_Account_Name"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                BankAccountName: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.BankAccountName}</strong>
      ),
    },
    {
      additional_title: (
        <strong>
          <br />
          <br />
          Address
        </strong>
      ),
    },
    {
      additional_title: "Street",
      info: isEditing ? (
        <Input
          placeholder="Street"
          value={infoAPI.Street}
          name="street"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Street: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Street}</strong>
      ),
    },
    {
      additional_title: "Building / flatnumber",
      info: isEditing ? (
        <Input
          placeholder="Building / flatnumber"
          value={infoAPI.FlatNumber}
          name="Building_flatnumber"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                FlatNumber: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.FlatNumber}</strong>
      ),
    },
    {
      additional_title: "Province / state",
      info: isEditing ? (
        <Input
          placeholder="Province / state"
          value={infoAPI.Province}
          name="Province / state"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Province: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Province}</strong>
      ),
    },
    {
      additional_title: "Postal code",
      info: isEditing ? (
        <Input
          placeholder="Postal code"
          value={infoAPI.PostalCode}
          name="Postal_code"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                PostalCode: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.PostalCode}</strong>
      ),
    },
    {
      additional_title: "Country",
      info: isEditing ? (
        <Input
          placeholder="Country"
          value={infoAPI.Country}
          name="country"
          onChange={(e) => {
            setInfoAPI((prev) => {
              return {
                ...prev,
                Country: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{infoAPI.Country}</strong>
      ),
    },
  ];

  let dataSource_contract = [
    {
      Contract_type: isEditing ? (edit_contract ? <Input /> : null):( null) ,
      From: isEditing ? (edit_contract ? <DatePicker /> : null):(null),
      To: isEditing ? (edit_contract ? <DatePicker /> : null):(null),
      Signing_date: isEditing ? (edit_contract ? <DatePicker /> : null):( null),
      Subject: isEditing ? (edit_contract ? <Input /> : null):( null),
      Department: isEditing ? (edit_contract ? <Input /> : null):( null),
      Note: isEditing ? (edit_contract ? <Input /> : null):( null),
      action: isEditing ? (edit_contract ? <DeleteFilled onClick={() => {}} /> : null):( null),
    },
  ];
  return (
    <div>
      <Table
        pagination={false}
        dataSource={dataSource_additional}
        columns={columns_additional}
      ></Table>
      <br />
      <br />
      <Title>Contract</Title>
      <Table
        pagination={false}
        dataSource={dataSource_contract}
        columns={columns_contract}
      ></Table>
    </div>
  );
};

export default Additional;
