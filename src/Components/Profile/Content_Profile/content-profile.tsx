import React from "react";
import type { TabsProps } from "antd";
import { Tabs, Avatar, Upload, Modal, Button } from "antd";
import { useState, useEffect } from "react";
import {
  UserAddOutlined,
  LeftCircleOutlined,
  UserOutlined,
  CameraOutlined,
  SaveOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./profile.css";
import dayjs, { Dayjs } from "dayjs";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Overview from "../Overview_Tab/overview";
import Additional from "../Additional_Tab/additional";
import Family from "../Family_Tab/family";
import Signature from "../Signature_Tab/signature";
import request from "../../../Utils/request";

interface API {
  EmployeeNumber: string;
}

const ContentProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
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
  const [infoAPI, setInfoAPI] =useState<API[]>([]);

  //declare contract
  // const [contractType, setContractType] = useState("");
  // const [contractFrom, setContracFrom] = useState(dayjs());
  // const [contarctTo, setContractTo] = useState(dayjs());
  // const [signningdate, setSigningdate] = useState(dayjs());
  // const [subject, setSubject] = useState("");
  // const [deparment, setDepartment] = useState("");
  // const [contractnote, setContractNote] = useState("");
  // //declare relationship
  // const [contactname, setContactName] = useState("");
  // const [birthday, setBirthday] = useState(dayjs());
  // const [relationship, setRelationship] = useState("");
  // const [relationshipnote, setRelationshipNote] = useState("");

  //avatar
  const [imageUrl, setImageUrl] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
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

  let label: TabsProps["items"] = [
    {
      key: "1",
      label: <strong>Overview</strong>,
      children: (
        <Overview info={info} isEditing={isEditing} setInfo={setInfo} />
      ),
    },
    {
      key: "2",
      label: <strong>Additional</strong>,
      children: (
        <Additional info={info} isEditing={isEditing} setInfo={setInfo} />
      ),
    },
    {
      key: "3",
      label: <strong>Family</strong>,
      children: <Family info={info} isEditing={isEditing} setInfo={setInfo} />,
    },
    {
      key: "4",
      label: <strong>Signature</strong>,
      children: <Signature isEditing={isEditing} />,
    },
  ];

  useEffect(() => {
    const getProfile = async () => {
      await request.get('/user/profile/A3F3702C-99DC-4D24-96FD-CEEEE12A39A8')
      .then(response => {
        setInfoAPI(response.data.Data);
      })
      .catch(error => {
        console.error(error);
      });
    }
    getProfile();
  }, []);

  console.log(infoAPI)
  
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
        <span style={{ margin: "120px -50px 0px 0px", zIndex: 1 }}>
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
