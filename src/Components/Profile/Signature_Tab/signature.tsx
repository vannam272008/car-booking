import React, { ChangeEvent, useState, useEffect } from "react";
import { Input, Select, Tabs, Upload, Image, Col, Row } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { QRCodeCanvas } from "qrcode.react";
import type { TabsProps } from "antd";
import "./signature.css";
import { RcFile } from "antd/lib/upload";

interface SignatureProps {
  isEditing: boolean;
  infoAPI: {
    Email: string;
  };
}

const { Dragger } = Upload;

const Signature: React.FC<SignatureProps> = ({ isEditing, infoAPI }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [fonts] = useState<string[]>([
    "Great Vibes",
    "Dancing Script",
    "Pacifico",
    "Caveat",
  ]);
  const [signature, setSignature] = useState<string>("");
  const [selectedFont, setSelectedFont] = useState<string>("");
  const [img_preview, setImg_Preview] = useState<string | undefined>();

  const handleChangeSelect = (value: string) => {
    setSelectedFont(value);
  };

  const handleFileChange = (file: RcFile) => {
    const objectUrl = URL.createObjectURL(file);
    setImg_Preview(objectUrl);
    setSignature("");
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
                  value={signature}
                  onChange={(e) => {
                    setSignature(e.target.value);
                    setImg_Preview("");
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
            {signature ? (
              <div className="QR_signature">
                <QRCodeCanvas
                  style={{ height: "200px", width: "200px" }}
                  value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
                />
                <p>{infoAPI.Email}</p>
                <p>{currentTime.toLocaleString()}</p>
                <h1 style={{ fontSize: "50px", fontFamily: selectedFont }}>
                  {signature}
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
            {signature}
          </h1>
        </>
      )}
    </div>
  );
};

export default Signature;
