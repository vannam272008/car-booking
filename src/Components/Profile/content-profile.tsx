import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Tabs,
  Avatar,
  Table,
  Typography,
  Input,
  Upload,
  DatePicker,
  Modal,
  Button,
} from "antd";
import { useState, useEffect } from "react";
import {
  UserAddOutlined,
  LeftCircleOutlined,
  UserOutlined,
  CameraOutlined,
  SaveOutlined,
  PlusCircleFilled,
  EditOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import "./profile.css";
import dayjs, { Dayjs } from "dayjs";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { TRUE } from "sass";

const { Title } = Typography;

const ContentProfile: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [edit_contract, setEdit_Contract] = useState(false);
  //declare contract
  const [contractType, setContractType] = useState("");
  const [contractFrom, setContracFrom] = useState(dayjs());
  const [contarctTo, setContractTo] = useState(dayjs());
  const [signningdate, setSigningdate] = useState(dayjs());
  const [subject, setSubject] = useState("");
  const [deparment, setDepartment] = useState("");
  const [contractnote, setContractNote] = useState("");
  //declare relationship
  const [contactname, setContactName] = useState("");
  const [birthday, setBirthday] = useState(dayjs());
  const [relationship, setRelationship] = useState("");
  const [relationshipnote, setRelationshipNote] = useState("");
  //avatar
  const [imageUrl, setImageUrl] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [preview,setPreview] = useState(false);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    setImageUrl(src);
  };

  // visible avatar
  const [visible, setVisible] = useState(false);
  // avatar
  // const handleChange = async (file: UploadFile) => {
  //   if (!file.url) {
  //     file.url = await getBase64(file.originFileObj as RcFile);
  //   }
  //   setImageUrl(file.url || (file.preview as string));

  // };

  //Edit contract
  // const handleEditContract = () =>{
  //   const randomNumber = parseInt(Math.random() );
  //   const newContract = {
  //     id: randomNumber,
  //     contract_type:"" ,
  //   };
  //   setEdit_Contract(true)
  //   // console.log(randomNumber)
  // }

  const handleDeleteContract = () => {};

  const onEditInfo = () => {
    setIsEditing(true);
  };

  const onSave = () => {
    setIsEditing(false);
  };

  // handle Modal
  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  // set array info fields
  const [info, setInfo] = useState({
    employee_number: "",
    sex: "",
    birth_day: null as Dayjs | null,
    positon: "",
    company: "",
    unit: "",
    function: "",
    deparment: "",
    sections_teams: "",
    groups: "",
    office_location: "",
    cost_center: "",
    rank: "",
    employee_type: "",
    nation: "",
    phone: "",
    id_card_number: "",
    dateofidcard: null as Dayjs | null,
    placeofidcard: "",
    health_insurance: "",
    starting_date: null as Dayjs | null,
    Starting_date_official: null as Dayjs | null,
    Leaving_date: null as Dayjs | null,
    start_date_maternity_leave: null as Dayjs | null,
    note: "",
    academic_level: "",
    specialized_qualification: "",
    business_phone: "",
    home_phone: "",
    personal_email: "",
    bank_name: "",
    branch_number: "",
    bank_branch_name: "",
    bank_account_number: "",
    notebank_account_name: "",
    street: "",
    building_flatnumber: "",
    city: "",
    province_state: "",
    postal_code: "",
    country: "",
    martial_status: "",
    contact_name: "",
    relationship: "",
    phone_family: "",
    street_family: "",
    building_family: "",
    city_family: "",
    province_state_family: "",
    postal_code_family: "",
    country_family: "",
  });
  //handle date time
  const handleDate_birth = (value: Dayjs | null) => {
    setInfo((prevInfo) => ({ ...prevInfo, birth_day: value }));
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

  const handleleaving_date = (value: Dayjs | null) => {
    setInfo((prevInfo) => ({ ...prevInfo, Leaving_date: value }));
  };
  const handlestart_date_maternity_leave = (value: Dayjs | null) => {
    setInfo((prevInfo) => ({ ...prevInfo, start_date_maternity_leave: value }));
  };

  // tab_overview
  const columns_overview = [
    {
      dataIndex: "overview_title",
    },
    {
      dataIndex: "info",
      width: "70%",
    },
  ];

  let dataSource_overview = [
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
      Family_title: <strong>Emergency contact</strong>,
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
      Family_title: <strong>Permanent Address</strong>,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let label = [
    {
      key: "1",
      label: <strong>Overview</strong>,
      children: (
        <Table
          pagination={false}
          dataSource={dataSource_overview}
          columns={columns_overview}
        ></Table>
      ),
    },
    {
      key: "2",
      label: <strong>Additional</strong>,
      children: [
        <Table
          pagination={false}
          dataSource={dataSource_additional}
          columns={columns_additional}
        ></Table>,
        <Title>Contract</Title>,
        <Table
          pagination={false}
          dataSource={dataSource_contract}
          columns={columns_contract}
        ></Table>,
      ],
    },
    {
      key: "3",
      label: <strong>Family</strong>,
      children: [
        <Table
          pagination={false}
          dataSource={dataSource_family}
          columns={columns_family}
        ></Table>,
        <Title>Relationships</Title>,
        <Table
          pagination={false}
          dataSource={dataSource_relationship}
          columns={columns_relationship}
        ></Table>,
      ],
    },
    {
      key: "4",
      label: <strong>Signature</strong>,
      children: (
        <div
          className="QR_signature"
          style={{
            width: "300px",
            margin: "auto",
            border: "2px solid black",
            padding: "50px 50px 50px 50px",
          }}
        >
          <QRCodeCanvas
            style={{ height: "200px", width: "200px" }}
            value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
          />
          ,<p>bangnm@o365.vn</p>
          <p>{currentTime.toLocaleString()}</p>
          <h1 style={{ fontFamily: "Monospace" }}>Nguyễn Minh Bằng</h1>
        </div>
      ),
    },
  ];
  // console.log(imageUrl)
  return (
    <div className="content-profile">
      <div className="nav-bar-profile">
        {isEditing ? (
          <>
            <SaveOutlined
              onClick={() => {
                onSave();
              }}
              style={{ margin: "30px 10px 20px 20px", fontSize: "30px" }}
            />
            <span
              onClick={() => {
                onSave();
              }}
              style={{ color: "#8894A1", fontSize: "15px" }}
            >
              Save
            </span>
          </>
        ) : null}
        <LeftCircleOutlined
          style={{ margin: "30px 10px 20px 20px", fontSize: "30px" }}
        />
        <span style={{ color: "#8894A1", fontSize: "15px" }}>Return</span>
      </div>
      <div className="info-user">
        <span style={{ margin: "120px -50px 0px 0px", zIndex: 1}}>
          <Button
            className="btn-camera"
            size="middle"
            shape="round"
            // style={{margin:"0px -20px 0px 0px"}}
            icon={
              <CameraOutlined
                style={{
                  fontSize: "25px",
                  color: "rgba(0, 0, 0, 0.25)",
                }}
              />
            }
            onClick={handleOpenModal}
          />
        </span>
        <Modal
          title="Upload and Edit Avatar"
          open={visible}
          onCancel={handleCloseModal}
          centered={true}
          bodyStyle={{ alignItems: "centered" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {imageUrl ? (
              <Avatar
                size={{ xs: 140, sm: 160, md: 180, lg: 200, xl: 250, xxl: 300 }}
                src={<img src={imageUrl} alt="avatar" />}
              />
            ) : (
              <Avatar
                size={{ xs: 140, sm: 160, md: 180, lg: 200, xl: 250, xxl: 300 }}
                icon={<UserOutlined />}
              />
            )}

            <div className="Upload-Avatar">
              <Upload
                fileList={fileList}
                onPreview={onPreview}
                onChange={onChange}
                showUploadList={true}
              >
                <Button shape="circle" icon={<EditOutlined />} />
              </Upload>
            </div>
          </div>
        </Modal>
        <span>
          {imageUrl ? (
            <Avatar
              className="avatar"
              size={{ xs: 80, sm: 100, md: 130, lg: 150, xl: 200, xxl: 250 }}
              icon={<UserOutlined />}
              src={<img src={imageUrl} alt="avatar" />}
            />
          ) : (
            <Avatar
              className="avatar"
              size={{ xs: 80, sm: 100, md: 130, lg: 150, xl: 200, xxl: 250 }}
              icon={<UserOutlined />}
            />
          )}
        </span>
        <h1 style={{ marginLeft: "50px" }}>Bang Nguyen Minh</h1>
        {isEditing ? null : (
          <UserAddOutlined
            onClick={() => {
              onEditInfo();
            }}
            style={{ fontSize: "50px", marginLeft: "50px" }}
          />
        )}
      </div>
      <div className="profile-table">
        <div className="tab-content ">
          <Tabs style={{ padding: "10px 10px" }} type="card" items={label} />
        </div>
      </div>
    </div>
  );
};

export default ContentProfile;
