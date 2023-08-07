import React from "react";
import type { TabsProps } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import ImgCrop from "antd-img-crop";
import { Tabs, Upload, Avatar, Modal, message, Button } from "antd";
import { useState, useEffect } from "react";
import {
  UserAddOutlined,
  LeftCircleOutlined,
  CameraOutlined,
  SaveOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./profile.css";
import { useNavigate, useParams } from "react-router-dom";
import type { RcFile } from "antd/es/upload/interface";
import Overview from "../Overview_Tab/overview";
import Additional from "../Additional_Tab/additional";
import Family from "../Family_Tab/family";
import Signature from "../Signature_Tab/signature";
import request from "../../../Utils/request";
import { API } from "../interface";

const ContentProfile: React.FC = () => {
  const jwt_admin = localStorage.getItem("Token");

  const uploadConfig = {
    action: "http://localhost:63642/api/file/upload-temp",
    headers: {
      Authorization: `Bearer ${jwt_admin}`,
    },
  };
  const config = {
    headers: {
      Authorization: `Bearer ${jwt_admin}`,
    },
  };
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  //avatar
  const [image, setImage] = useState<RcFile | string>();

  const [infoAPI, setInfoAPI] = useState<API>({
    EmployeeNumber: "",
    Username: "",
    Email: "",
    AvatarPath: "",
    FirstName: "",
    LastName: "",
    Sex: true,
    Birthday: "",
    JobTitle: "",
    Company: "",
    Unit: "",
    Function: "",
    SectionsOrTeam: "",
    Groups: "",
    OfficeLocation: "",
    LineManager: "",
    BelongToDepartments: "",
    Rank: "",
    EmployeeType: "",
    Rights: "",
    Nation: "",
    Phone: "",
    IdCardNumber: "",
    DateOfIdCard: "",
    PlaceOfIdCard: "",
    HealthInsurance: "",
    StartingDate: "",
    StartingDateOfficial: "",
    LeavingDate: "",
    StartDateMaternityLeave: "",
    Note: "",
    AcademicLevel: "",
    Qualification: "",
    BusinessPhone: "",
    HomePhone: "",
    PersonalEmail: "",
    BankName: "",
    BankBranchNumber: "",
    BankBranchName: "",
    BankAccountNumber: "",
    BankAccountName: "",
    Street: "",
    FlatNumber: "",
    City: "",
    Province: "",
    PostalCode: "",
    Country: "",
    MartialStatus: "",
    ContactName: "",
    Relationship: "",
    PhoneR: "",
    StreetR: "",
    FlatNumberR: "",
    CityR: "",
    ProvinceR: "",
    PostalCodeR: "",
    CountryR: "",
    Signature: "",
    SignatureTemp: "",
  });

  const { userID } = useParams();
  const endpoint = "/user/profile/" + userID;
  const getProfile = async () => {
    await request
      .get(endpoint)
      .then((response) => {
        setInfoAPI(response.data.Data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleNotSave = () => {
    Modal.confirm({
      title: "Are you sure you want to cancel this update session ?",
      width: 1000,
      centered: true,
      onOk() {
        getProfile();
        setIsEditing(false);
      },
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const onSave = () => {
    setIsEditing(false);
    handleUpdateInfo();
    setOnOk(false);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.includes("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    const filesize = file.size / 1024 / 1024 < 5;
    if (!filesize) {
      message.error("Image must smaller than 5MB ");
    }
    return isImage && filesize;
  };

  const handleUpdateInfo = async () => {
    const endpoint = "/user/edit-post-file/" + userID;

    if (infoAPI.SignatureTemp) {
      const resSig = await request.post(
        "/user/signature",
        {
          Id: userID,
          Signature: infoAPI.SignatureTemp,
        },
        config
      );
      if (!resSig.data.Success) return message.error(resSig.data.Message);
    }
    const res = await request.putForm(endpoint, infoAPI, config);

    if (res.data.Success) {
      message.success("Edit success !");
    } else {
      message.error(res.data.Message);
    }
    getProfile();
  };

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

  const [onOk,setOnOk] = useState<Boolean>(false);

  const handleOk = () => {
    setVisible(false);
    setOnOk(true);
  };

  const handleFileChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    const file = info.file;
    if (file.status === "done" && file.originFileObj) {
      const croppedImage = file.originFileObj;
      const formData = new FormData();
      formData.append("fileName", croppedImage ? croppedImage.name : "");
      formData.append("userId", userID ? userID : "");
      let res = await request.postForm("/file/upload-finish", formData, config);
      setImage(croppedImage);
      infoAPI.AvatarPath = res.data.Data;
      setInfoAPI((prev) => ({ ...prev, AvatarPath: res.data.Data }));
    }
  };

  // visible avatar
  const [visible, setVisible] = useState(false);
  // const handleDeleteContract = () => {};
  const onEditInfo = () => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      Birthday: infoAPI.Birthday ? infoAPI.Birthday.substring(0, 10) : "",
    }));
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      StartDateMaternityLeave: infoAPI.StartDateMaternityLeave
        ? infoAPI.StartDateMaternityLeave.substring(0, 10)
        : "",
    }));
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      LeavingDate: infoAPI.LeavingDate
        ? infoAPI.LeavingDate.substring(0, 10)
        : "",
    }));
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      DateOfIdCard: infoAPI.DateOfIdCard
        ? infoAPI.DateOfIdCard.substring(0, 10)
        : "",
    }));
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      StartingDate: infoAPI.StartingDate
        ? infoAPI.StartingDate.substring(0, 10)
        : "",
    }));
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      StartingDateOfficial: infoAPI.StartingDateOfficial
        ? infoAPI.StartingDateOfficial.substring(0, 10)
        : "",
    }));
    setIsEditing(true);
  };

  // handle Modal
  const handleOpenModal = () => {
    setVisible(true);
    // setImage(null);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleReturnSetting = () => {
    navigate("/setting");
  };

  let label: TabsProps["items"] = [
    {
      key: "1",
      label: <strong>Overview</strong>,
      children: (
        <Overview
          infoAPI={infoAPI}
          isEditing={isEditing}
          setInfoAPI={setInfoAPI}
        />
      ),
    },
    {
      key: "2",
      label: <strong>Additional</strong>,
      children: (
        <Additional
          infoAPI={infoAPI}
          isEditing={isEditing}
          setInfoAPI={setInfoAPI}
        />
      ),
    },
    {
      key: "3",
      label: <strong>Family</strong>,
      children: (
        <Family
          infoAPI={infoAPI}
          isEditing={isEditing}
          setInfoAPI={setInfoAPI}
        />
      ),
    },
    {
      key: "4",
      label: <strong>Signature</strong>,
      children: (
        <Signature
          isEditing={isEditing}
          infoAPI={infoAPI}
          setInfoAPI={setInfoAPI}
        />
      ),
    },
  ];
  return (
    <div className="content-profile">
      <div className="nav-bar-profile">
        {isEditing ? (
          <>
            <Button
              className="btn"
              style={{ margin: "10px 0px 20px 25px" }}
              onClick={() => {
                onSave();
              }}
            >
              <SaveOutlined style={{ fontSize: "35px" }} />
              Save
            </Button>
            <Button
              className="btn"
              style={{ margin: "10px 10px 20px 5px" }}
              onClick={handleNotSave}
            >
              <LeftCircleOutlined
                style={{
                  fontSize: "35px",
                }}
              />
              Return
            </Button>
          </>
        ) : (
          <Button
            className="btn"
            style={{ margin: "10px 10px 20px 5px" }}
            onClick={handleReturnSetting}
          >
            <LeftCircleOutlined
              style={{
                fontSize: "35px",
              }}
            />
            Return
          </Button>
        )}
      </div>
      <div className="info-user">
        {isEditing ? (
          <span style={{ margin: "120px -50px 0px 0px", zIndex: 1 }}>
            <Button
              className="btn-camera"
              size="middle"
              shape="round"
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
        ) : null}
        <Modal
          title="Upload and Edit Avatar"
          open={visible}
          onCancel={handleCloseModal}
          onOk={handleOk}
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
            {image ? (
              <Avatar
                size={{ xs: 140, sm: 160, md: 180, lg: 200, xl: 250, xxl: 300 }}
                icon={<UserOutlined />}
                src={URL.createObjectURL(image as RcFile)}
              />
            ) : (
              <Avatar
                size={{ xs: 140, sm: 160, md: 180, lg: 200, xl: 250, xxl: 300 }}
                icon={<UserOutlined />}
                src={`http://localhost:63642/${
                  infoAPI.AvatarPath
                }?${Date.now()}`}
              />
            )}
            <div className="Upload-Avatar">
              <ImgCrop cropShape="round" rotationSlider>
                <Upload
                  {...uploadConfig}
                  beforeUpload={beforeUpload}
                  accept="image/*"
                  showUploadList={false}
                  // onChange={({ file }) => handleFileChange(file.originFileObj as RcFile)}
                  onChange={handleFileChange}
                >
                  <Button shape="circle" icon={<EditOutlined />} />
                </Upload>
              </ImgCrop>
            </div>
          </div>
        </Modal>
        <span>
          {image ? (
            <Avatar
              size={{ xs: 140, sm: 160, md: 180, lg: 200, xl: 250, xxl: 300 }}
              icon={<UserOutlined />}
              src={URL.createObjectURL(image as RcFile)}
            />
          ) : (
            <Avatar
              size={{ xs: 140, sm: 160, md: 180, lg: 200, xl: 250, xxl: 300 }}
              icon={<UserOutlined />}
              src={`http://localhost:63642/${infoAPI.AvatarPath}?${Date.now()}`}
            />
          )}
        </span>
        <h1 style={{ marginLeft: "50px" }}>
          {infoAPI.FirstName} {infoAPI.LastName}
        </h1>
        {isEditing ? null : (
          <Button
            className="btn"
            style={{ marginLeft: "50px" }}
            // onClick={() => setIsEditing(true)}
            onClick={() => onEditInfo()}
            icon={<UserAddOutlined style={{ fontSize: "50px" }} />}
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
