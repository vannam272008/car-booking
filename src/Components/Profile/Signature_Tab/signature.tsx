import React from "react";
import { Input, Select, Tabs, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import type { TabsProps } from "antd";

interface SignatureProps {
  isEditing: boolean;
}

const { Dragger } = Upload;

const Signature: React.FC<SignatureProps> = ({ isEditing }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const signature_tab: TabsProps["items"] = [
    {
      key: "1",
      label: "Type signature",
      children: (
        <>
          <div>
            <strong>Confirm your Name</strong>
            <Input placeholder="Confirm your name" />
            <strong>Signature Style</strong>
            <Select
              placeholder="Choose your signature"
              style={{ width: "100%" }}
            />
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Upload your own",
      children: (
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      ),
    },
  ];

  return isEditing ? (
    <Tabs type="card" items={signature_tab} />
  ) : (
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
      <p>bangnm@o365.vn</p>
      <p>{currentTime.toLocaleString()}</p>
      <h1 style={{ fontFamily: "Monospace" }}>Nguyễn Minh Bằng</h1>
    </div>
  );
};

export default Signature;
