import React, { useState, useEffect } from "react";
import { Input, Select, Tabs, Upload, Image, Col, Row } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { QRCodeCanvas } from "qrcode.react";
import type { TabsProps } from "antd";
import "./signature.css";
import request from "../../../Utils/request";

import { API, SignatureProps } from "../interface"
import { info } from "console";

const jwt_admin = localStorage.getItem("Token");
const uploadConfig = {
  action: "http://localhost:63642/api/file/signature-temp",
  headers: {
    Authorization: `Bearer ${jwt_admin}`,
  },
};
const config = {
  headers: {
    Authorization: `Bearer ${jwt_admin}`,
  },
};

const { Dragger } = Upload;

const Signature: React.FC<SignatureProps> = ({
  isEditing,
  infoAPI,
  setInfoAPI,
  setImageSignature,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [styleSignature, setStyleSignature] = useState<string>("")
  const [signatureRoot, setSignatureRoot] = useState<string>(infoAPI.Signature)
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

  const handleFileChange = async (file: any) => {
    if (file.status === "done") {
      setImageSignature(file);
      var userId = localStorage.getItem("Id");
      const objectUrl = URL.createObjectURL(file.originFileObj);
      setImg_Preview(objectUrl);

      const formData = new FormData();
      formData.append("fileName", file.originFileObj ? file.name : "");
      formData.append("userId", userId ? userId : "");
      await request
        .postForm("/file/signature-finish", formData, config)
        .then((res) => {
          console.log("res finish:", res);
          setInfoAPI((prevInfo) => ({
            ...prevInfo,
            Signature: res.data.Data,
          }));
        })
        .catch((e) => {
          console.log(e);
        });
    }
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
                  // value={infoAPI.Signature.includes('<h1>') ? infoAPI.Signature : ""}
                  onChange={(e) => {
                    setStyleSignature(e.target.value)
                    setInfoAPI((prev) => {
                      return {
                        ...prev,
                        Signature: `<h1 style={{ fontSize: "30px", fontFamily: ${selectedFont} }}>${e.target.value}</h1>`,
                      };
                    });
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
            {infoAPI.Signature ? (
              <div className="QR_signature">
                <QRCodeCanvas
                  style={{ height: "200px", width: "200px" }}
                  value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
                />
                <p>{infoAPI.Email}</p>
                <p>{currentTime.toLocaleString()}</p>
                {/* <h1 style={{ fontSize: "14px", fontFamily: selectedFont }}>
                  {styleSignature}
                </h1> */}
                {styleSignature.length > 0 ? <div dangerouslySetInnerHTML={{ __html: infoAPI.Signature }} /> : 
                signatureRoot.includes("<h1>") ? <div dangerouslySetInnerHTML={{ __html: signatureRoot }} /> : <img width={250} height={150} src={`http://localhost:63642/${signatureRoot}`}></img>}
                
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
            {...uploadConfig}
            listType="picture-card"
            showUploadList={false}
            onChange={({ file }) => handleFileChange(file)}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
          {infoAPI.Signature ? (
            <div className="QR_signature">
              <QRCodeCanvas
                style={{ height: "200px", width: "200px" }}
                value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
              />
              <p>{infoAPI.Email}</p>
              <p>{currentTime.toLocaleString()}</p>
              { styleSignature.length > 0 ? <div dangerouslySetInnerHTML={{ __html: infoAPI.Signature }} />
              :
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
              }
              
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
      
      {!signatureRoot.includes("<h1>") ? (
        <img
          src={"http://localhost:63642/" + signatureRoot}
          width={250}
          height={150}
        ></img>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: signatureRoot }} />
      )}
    </div>
  );
};

export default Signature;
