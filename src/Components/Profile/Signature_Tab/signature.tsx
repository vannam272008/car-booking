import React, { useState, useEffect } from "react";
import { Input, Select, Tabs, Upload, Image, Col, Row, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { QRCodeCanvas } from "qrcode.react";
import type { TabsProps } from "antd";
import "./signature.css";
import request from "../../../Utils/request";

<<<<<<< HEAD
import { API, SignatureProps } from "../interface";
import { info } from "console";
=======
import { API, SignatureProps } from "../interface"
>>>>>>> feature-fe

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
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [styleSignature, setStyleSignature] = useState<string>("");
  const [fonts] = useState<string[]>([
    "Great Vibes",
    "Dancing Script",
    "Pacifico",
    "Caveat",
  ]);
  const [selectedFont, setSelectedFont] = useState<string>("");
  const [img_preview, setImg_Preview] = useState<string | undefined>();

  // const beforeUpload = (file: File) => {
  //   const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === "image/jpg";
  //   if (!isImage) {
  //     message.error('You can only upload image files type (.png, .jpg, .jpeg)!');
  //   }
  //   return isImage;
  // }

  const handleChangeSelect = (value: string) => {
    // console.log('change font !');
    setInfoAPI((prev) => {
      const ps = prev.SignatureTemp;
      // console.log(ps.replace(ps.substring(ps.indexOf('font-family'), ps.indexOf(';"')), `font-family: ${value}`));
      return {
        ...prev,
        SignatureTemp: ps.replace(
          ps.substring(ps.indexOf("font-family"), ps.indexOf(';"')),
          `font-family: ${value}`
        ),
      };
    });

    setSelectedFont(value);
  };

  const handleFileChange = async (file: any) => {
    console.log("file: ", file);
    if (file.status === "done") {
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
            SignatureTemp: res.data.Data,
          }));
        })
        .catch((e) => {
          message.error("Upload failed ! ");
          console.log(e);
        });
    }
  };

  useEffect(() => {
    setInfoAPI((prevInfo) => ({
      ...prevInfo,
      SignatureTemp: prevInfo.Signature,
    }));
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
                  onChange={(e) => {
                    console.log(infoAPI.SignatureTemp);
<<<<<<< HEAD
                    setStyleSignature(e.target.value);
                    setInfoAPI((prev) => {
                      return {
                        ...prev,
                        SignatureTemp: `<h1 style="font-size: 30px; font-family: ${selectedFont};">${e.target.value}</h1>`,
                      };
                    });
=======
                    setStyleSignature(e.target.value)
                    if (e.target.value && e.target.value.length > 0) {
                      setInfoAPI((prev) => {
                        return {
                          ...prev,
                          SignatureTemp: `<h1 style="font-size: 30px; font-family: ${selectedFont};">${e.target.value}</h1>`,
                        };
                      });
                    } else {
                      setInfoAPI((prev) => {
                        return {
                          ...prev,
                          SignatureTemp: '',
                        };
                      });
                    }
>>>>>>> feature-fe
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
            {/* HERE */}
<<<<<<< HEAD
            {infoAPI.Signature ? (
              <div className="QR_signature">
                <QRCodeCanvas
                  style={{ height: "200px", width: "200px" }}
                  value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
                />
                <p>{infoAPI.Email}</p>
                <p>{currentTime.toLocaleString()}</p>
                {!styleSignature || styleSignature.length === 0 ? (
                  infoAPI.Signature && infoAPI.Signature.includes("<h1") ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: infoAPI.Signature }}
                    />
                  ) : infoAPI.Signature && infoAPI.Signature.length > 0 ? (
                    <img
                      width={250}
                      height={150}
                      src={`http://localhost:63642/${infoAPI.Signature}`}
                    ></img>
                  ) : (
                    <div></div>
                  )
                ) : infoAPI.SignatureTemp &&
                  infoAPI.SignatureTemp.length > 0 ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: infoAPI.SignatureTemp }}
                  />
                ) : infoAPI.SignatureTemp &&
                  infoAPI.SignatureTemp.includes("<h1") ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: infoAPI.SignatureTemp }}
                  />
                ) : infoAPI.SignatureTemp ? (
                  <img
                    width={250}
                    height={150}
                    src={`http://localhost:63642/${infoAPI.SignatureTemp}`}
                  ></img>
                ) : (
                  <div></div>
                )}
              </div>
            ) : null}
=======
            <div className="QR_signature">
              <QRCodeCanvas
                style={{ height: "200px", width: "200px" }}
                value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
              />
              <p>{infoAPI.Email}</p>
              <p>{currentTime.toLocaleString()}</p>
              {infoAPI.SignatureTemp && infoAPI.SignatureTemp.length !== 0
                ?
                (infoAPI.SignatureTemp && infoAPI.SignatureTemp.length > 0 && infoAPI.SignatureTemp.includes("<h1") ?
                  <div dangerouslySetInnerHTML={{ __html: infoAPI.SignatureTemp }} /> :
                  <img width={250} height={150} src={`http://localhost:63642/${infoAPI.SignatureTemp}`}></img>)
                :
                (infoAPI.Signature ?
                  (infoAPI.Signature.includes("<h1") ? <div dangerouslySetInnerHTML={{ __html: infoAPI.Signature }} /> : <img width={250} height={150} src={`http://localhost:63642/${infoAPI.Signature}`}></img>)
                  : null)
              }
            </div>
>>>>>>> feature-fe
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
            // beforeUpload={beforeUpload}
            accept="image/*"
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
          <div className="QR_signature">
            <QRCodeCanvas
              style={{ height: "200px", width: "200px" }}
              value="https://tasken.io/setting/system/employee?userId=87fa2638-eefe-42da-baec-70fbb6a5fd23"
            />
            <p>{infoAPI.Email}</p>
            <p>{currentTime.toLocaleString()}</p>

<<<<<<< HEAD
              {/* HERE */}
              {!img_preview ? (
                /* infoAPI.Signature && infoAPI.Signature.includes("<h1") ? <div dangerouslySetInnerHTML={{ __html: infoAPI.Signature }} /> : 
              infoAPI.Signature ? <img width={250} height={150} src={`http://localhost:63642/${infoAPI.Signature}`}></img> : <div></div> */
                !styleSignature || styleSignature.length === 0 ? (
                  infoAPI.Signature && infoAPI.Signature.includes("<h1") ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: infoAPI.Signature }}
                    />
                  ) : infoAPI.Signature ? (
                    <img
                      width={250}
                      height={150}
                      src={`http://localhost:63642/${infoAPI.Signature}`}
                    ></img>
                  ) : (
                    <div></div>
                  )
                ) : infoAPI.SignatureTemp &&
                  infoAPI.SignatureTemp.length > 0 ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: infoAPI.SignatureTemp }}
                  />
                ) : infoAPI.SignatureTemp &&
                  infoAPI.SignatureTemp.includes("<h1") ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: infoAPI.SignatureTemp }}
                  />
                ) : infoAPI.SignatureTemp ? (
                  <img
                    width={250}
                    height={150}
                    src={`http://localhost:63642/${infoAPI.SignatureTemp}`}
                  ></img>
                ) : (
                  <div></div>
                )
              ) : (
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
              )}
            </div>
          ) : null}
=======
            {/* HERE */}
            {!img_preview ?
              (infoAPI.Signature && !styleSignature
                ?
                (infoAPI.Signature && infoAPI.Signature.includes("<h1") ? <div dangerouslySetInnerHTML={{ __html: infoAPI.Signature }} /> :
                  infoAPI.Signature ? <img width={250} height={150} src={`http://localhost:63642/${infoAPI.Signature}`}></img> : <div></div>)
                :
                (infoAPI.SignatureTemp && infoAPI.SignatureTemp.length > 0 ? <div dangerouslySetInnerHTML={{ __html: infoAPI.SignatureTemp }} /> :
                  infoAPI.SignatureTemp && infoAPI.SignatureTemp.includes("<h1") ? <div dangerouslySetInnerHTML={{ __html: infoAPI.SignatureTemp }} /> :
                    infoAPI.SignatureTemp ? <img width={250} height={150} src={`http://localhost:63642/${infoAPI.SignatureTemp}`}></img> : <div></div>))
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
>>>>>>> feature-fe
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

<<<<<<< HEAD
=======

>>>>>>> feature-fe
      {/* HERE */}
      {infoAPI.Signature && !infoAPI.Signature.includes("<h1") ? (
        <img
          src={"http://localhost:63642/" + infoAPI.Signature}
          width={250}
          height={150}
        ></img>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: infoAPI.Signature }} />
      )}
    </div>
  );
};

export default Signature;
