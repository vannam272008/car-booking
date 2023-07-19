import React from "react";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { Input, DatePicker, Typography, Table } from "antd";
import { DeleteFilled, PlusCircleFilled } from "@ant-design/icons";

const { Title } = Typography;

interface AdditionalProps {
  isEditing: boolean;
  info: {
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
const Additional: React.FC<AdditionalProps> = ({
  isEditing,
  setInfo,
  info,
}) => {
  const [edit_contract, setEdit_Contract] = useState(false);
  const handlestart_date_maternity_leave = (value: Dayjs | null) => {
    setInfo((prevInfo) => ({ ...prevInfo, start_date_maternity_leave: value }));
  };
  const handleleaving_date = (value: Dayjs | null) => {
    setInfo((prevInfo) => ({ ...prevInfo, Leaving_date: value }));
  };
  const handleDate_Id_card = (value: Dayjs | null) => {
    setInfo((prevInfo) => ({ ...prevInfo, dateofidcard: value }));
  };

  const handleDate_start_date = (value: Dayjs | null) => {
    setInfo((prevInfo) => ({ ...prevInfo, starting_date: value }));
  };

  const handleDate_start_date_official = (value: Dayjs | null) => {
    setInfo((prevInfo) => ({ ...prevInfo, Starting_date_official: value }));
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
      title: isEditing ? <PlusCircleFilled onClick={() => {}} /> : null,
      dataIndex: "action",
    },
  ];

  let dataSource_additional = [
    {
      additional_title: "Nation",
      info: isEditing ? (
        <Input
          placeholder="Nation"
          name="nation"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                nation: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.nation}</strong>
      ),
    },
    {
      additional_title: "Phone",
      info: isEditing ? (
        <Input
          placeholder="Phone"
          name="phone"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                phone: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.phone}</strong>
      ),
    },
    {
      additional_title: "ID card number",
      info: isEditing ? (
        <Input
          placeholder="ID card number"
          name="id_card_number"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                id_card_number: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.id_card_number}</strong>
      ),
    },
    {
      additional_title: "Date of ID card",
      info: isEditing ? (
        <DatePicker
          value={info.dateofidcard}
          style={{ width: "100%" }}
          onChange={handleDate_Id_card}
          placeholder="Date of ID card"
        />
      ) : info.dateofidcard ? (
        info.dateofidcard.format("DD-MM-YYYY")
      ) : (
        ""
      ),
    },
    {
      additional_title: "Health insurance",
      info: isEditing ? (
        <Input
          placeholder="Health insurance"
          name="health insurance"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                health_insurance: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.health_insurance}</strong>
      ),
    },
    {
      additional_title: "Starting date",
      info: isEditing ? (
        <DatePicker
          value={info.starting_date}
          style={{ width: "100%" }}
          onChange={handleDate_start_date}
          placeholder="Starting date"
        />
      ) : info.starting_date ? (
        info.starting_date.format("DD-MM-YYYY")
      ) : (
        ""
      ),
    },
    {
      additional_title: "Starting date offical",
      info: isEditing ? (
        <DatePicker
          value={info.Starting_date_official}
          style={{ width: "100%" }}
          onChange={handleDate_start_date_official}
          placeholder="Starting date offical"
        />
      ) : info.Starting_date_official ? (
        info.Starting_date_official.format("DD-MM-YYYY")
      ) : (
        ""
      ),
    },
    {
      additional_title: "Leaving date",
      info: isEditing ? (
        <DatePicker
          value={info.Leaving_date}
          style={{ width: "100%" }}
          onChange={handleleaving_date}
          placeholder="Leaving date"
        />
      ) : info.Leaving_date ? (
        info.Leaving_date.format("DD-MM-YYYY")
      ) : (
        ""
      ),
    },
    {
      additional_title: "Start Date Maternity Leave",
      info: isEditing ? (
        <DatePicker
          value={info.start_date_maternity_leave}
          style={{ width: "100%" }}
          onChange={handlestart_date_maternity_leave}
          placeholder="Start Date Maternity Leave"
        />
      ) : info.start_date_maternity_leave ? (
        info.start_date_maternity_leave.format("DD-MM-YYYY")
      ) : (
        ""
      ),
    },
    {
      additional_title: "Note",
      info: isEditing ? (
        <Input
          placeholder="Note"
          name="Note"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                note: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.note}</strong>
      ),
    },
    {
      additional_title: <strong>Literacy</strong>,
    },
    {
      additional_title: "Academic level",
      info: isEditing ? (
        <Input
          placeholder="Academic level"
          name="Academic_level"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                academic_level: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.academic_level}</strong>
      ),
    },
    {
      additional_title: "Specialized qualification",
      info: isEditing ? (
        <Input
          placeholder="Specialized qualification"
          name="Specialized qualification"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                specialized_qualification: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.specialized_qualification}</strong>
      ),
    },
    {
      additional_title: <strong>Contact Info</strong>,
    },
    {
      additional_title: "Business phone",
      info: isEditing ? (
        <Input
          placeholder="Business phone"
          name="Business_phone"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                business_phone: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.business_phone}</strong>
      ),
    },
    {
      additional_title: "Home phone",
      info: isEditing ? (
        <Input
          placeholder="Home phone"
          name="home_phone"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                home_phone: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.home_phone}</strong>
      ),
    },
    {
      additional_title: "Personal email",
      info: isEditing ? (
        <Input
          placeholder="Personal email"
          name="personal_email"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                personal_email: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.personal_email}</strong>
      ),
    },
    {
      additional_title: <strong>Bank account</strong>,
    },
    {
      additional_title: "Bank Name",
      info: isEditing ? (
        <Input
          placeholder="Bank Name"
          name="Bank_Name"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                bank_name: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.bank_name}</strong>
      ),
    },
    {
      additional_title: "Branch number",
      info: isEditing ? (
        <Input
          placeholder="Branch number"
          name="branch_number"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                branch_number: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.branch_number}</strong>
      ),
    },
    {
      additional_title: "Bank brach name",
      info: isEditing ? (
        <Input
          placeholder="Bank brach name"
          name="Bank brach name"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                bank_branch_name: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.bank_branch_name}</strong>
      ),
    },
    {
      additional_title: "Bank account number",
      info: isEditing ? (
        <Input
          placeholder="Bank account number"
          name="Bank account number"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                bank_account_number: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.bank_account_number}</strong>
      ),
    },
    {
      additional_title: "NoteBank Account Name",
      info: isEditing ? (
        <Input
          placeholder="NoteBank Account Name"
          name="NoteBank_Account_Name"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                notebank_account_name: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.notebank_account_name}</strong>
      ),
    },
    {
      additional_title: <strong>Address</strong>,
    },
    {
      additional_title: "Street",
      info: isEditing ? (
        <Input
          placeholder="Street"
          name="street"
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
        <strong>{info.street}</strong>
      ),
    },
    {
      additional_title: "Building / flatnumber",
      info: isEditing ? (
        <Input
          placeholder="Building / flatnumber"
          name="Building_flatnumber"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                building_flatnumber: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.building_flatnumber}</strong>
      ),
    },
    {
      additional_title: "Province / state",
      info: isEditing ? (
        <Input
          placeholder="Province / state"
          name="Province / state"
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
        <strong>{info.province_state}</strong>
      ),
    },
    {
      additional_title: "Postal code",
      info: isEditing ? (
        <Input
          placeholder="Postal code"
          name="Postal_code"
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
        <strong>{info.postal_code}</strong>
      ),
    },
    {
      additional_title: "Country",
      info: isEditing ? (
        <Input
          placeholder="Country"
          name="country"
          onChange={(e) => {
            setInfo((prev) => {
              return {
                ...prev,
                country: e.target.value,
              };
            });
          }}
        />
      ) : (
        <strong>{info.country}</strong>
      ),
    },
  ];

  let dataSource_contract = [
    {
      Contract_type: edit_contract ? <Input /> : null,
      From: edit_contract ? <DatePicker /> : null,
      To: edit_contract ? <DatePicker /> : null,
      Signing_date: edit_contract ? <DatePicker /> : null,
      Subject: edit_contract ? <Input /> : null,
      Department: edit_contract ? <Input /> : null,
      Note: edit_contract ? <Input /> : null,
      action: edit_contract ? <DeleteFilled onClick={() => {}} /> : null,
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
