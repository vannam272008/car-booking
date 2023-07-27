import React, { useState, useEffect } from "react";
import { Input, Select, Tabs, Upload, Image, Col, Row } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { QRCodeCanvas } from "qrcode.react";
import type { TabsProps } from "antd";
import "./signature.css";
import { RcFile } from "antd/lib/upload";

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

interface SignatureProps {
  isEditing: boolean;
  infoAPI: {
    Email: string;
    Signature: string;
  };
  setInfoAPI: React.Dispatch<React.SetStateAction<API>>;
}

const { Dragger } = Upload;

const Signature: React.FC<SignatureProps> = ({ isEditing, infoAPI, setInfoAPI }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [fonts] = useState<string[]>([
    "Great Vibes",
    "Dancing Script",
    "Pacifico",
    "Caveat",
  ]);
  const [selectedFont, setSelectedFont] = useState<string>("");
  const [img_preview, setImg_Preview] = useState<string | undefined>();

  const handleChangeSelect = (value: string) => {
    setSelectedFont(value);
  };

  
  const handleFileChange = (file: RcFile) => {
    const objectUrl = URL.createObjectURL(file);
    setImg_Preview(objectUrl);
    // setSignature("");
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      Signature:"",
    }));
  
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
 
  const signature_tab: TabsProps["items"] = [
    {
      key: "1",
      label: "Type signature",
      children: (
        <>
          <Row>
            <Col span={12}>
              <strong>Confirm your Name</strong>
              <div>
                <Input
                  aria-required
                  showCount
                  placeholder="Confirm your name"
                  value={infoAPI.Signature}
                  onChange={(e) => {
                    setInfoAPI((prev) => {
                      return {
                        ...prev,
                        Signature: e.target.value,
                      };
                      
                    });
                    setImg_Preview('');
                  }}
                 
                  style={{ width: "95%" }}
                  maxLength={50}
                />
              </div>
            </Col>
            <Col span={12}>
              <strong>Signature Style</strong>
              <div>
                <Select
                  showSearch
                  placeholder="Choose your signature"
                  style={{ width: "95%" }}
                  onChange={handleChangeSelect}
                  options={fonts.map((value) => ({
                    label: value,
                    value: value,
                  }))}
                />
              </div>
            </Col>
          </Row>
          <Row>
            {infoAPI.Signature ? (
              <div className="QR_signature">
                <QRCodeCanvas
                  style={{ height: "200px", width: "200px" }}
                  value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
                />
                <p>{infoAPI.Email}</p>
                <p>{currentTime.toLocaleString()}</p>
                <h1 style={{ fontSize: "50px", fontFamily: selectedFont }}>
                  {infoAPI.Signature}
                </h1>
              </div>
            ) : null}
          </Row>
        </>
      ),
    },
    {
      key: "2",
      label: "Upload your own",
      children: (
        <>
          <Dragger
            listType="picture-card"
            showUploadList={false}
            onChange={({ file }) =>
              handleFileChange(file.originFileObj as RcFile)
            }
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
          {img_preview ? (
            <div className="QR_signature">
              <QRCodeCanvas
                style={{ height: "200px", width: "200px" }}
                value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
              />
              <p>{infoAPI.Email}</p>
              <p>{currentTime.toLocaleString()}</p>
              <Image
                src={img_preview}
                alt="upload image"
                style={{
                  minWidth: "200px",
                  maxWidth: "500px",
                  minHeight: "50px",
                  maxHeight: "150px",
                }}
              />
            </div>
          ) : null}
        </>
      ),
    },
  ];

  return isEditing ? (
    <Tabs type="card" items={signature_tab} />
  ) : (
    <div className="QR_signature">
      <QRCodeCanvas
        style={{ height: "200px", width: "200px" }}
        value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
      />
      <p>{infoAPI.Email}</p>
      <p>{currentTime.toLocaleString()}</p>
      {img_preview ? (
        <>
          <Image
            src={img_preview || ""}
            alt="upload image"
            style={{
              minWidth: "200px",
              maxWidth: "500px",
              minHeight: "50px",
              maxHeight: "150px",
            }}
          />
        </>
      ) : (
        <>
          <h1 style={{ fontSize: "50px", fontFamily: selectedFont }}>
            {infoAPI.Signature}
          </h1>
        </>
      )}
    </div>
  );
};

export default Signature;
