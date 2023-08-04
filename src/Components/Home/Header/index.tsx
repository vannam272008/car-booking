import React, { Dispatch, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Dropdown, Layout, Menu, MenuProps, Select } from "antd";
import UserOutlined from "@ant-design/icons"
import "./Header.css";
import MenuHeader from "./MenuHeader";
import request from "../../../Utils/request";
import united_states from "../../../assets/united_states.svg";
import vietnam from "../../../assets/vietnam.svg";
import opus_logo from "../../../public/images/opus_logo.jpg";
import { Option } from "antd/es/mentions";

const { Header } = Layout;

interface propsHomeHeader {
  setPayload: Dispatch<any>
}

const HomeHeader = ({ setPayload }: propsHomeHeader) => {
  const [data, setData] = useState<any>([]);
  const handleMenuClick = (e: any) => {
    setPayload(e.key)
  }
  // https://tasken.io/api/api/landingpage/tenant/8dc6957b-4869-4877-a511-6563f990d59e?v=1688011765685


  useEffect(() => {
    const url =
      "https://tasken.io/api/api/landingpage/tenant/8dc6957b-4869-4877-a511-6563f990d59e?v=1688011765685";
    const payload = "v: 1688011765685";

    const accessToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIyZmI3NTIxNy1lMmY0LTQ1NWEtOGYyZC0xMDVmMWNkNGM0NTUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84ZGM2OTU3Yi00ODY5LTQ4NzctYTUxMS02NTYzZjk5MGQ1OWUvIiwiaWF0IjoxNjkwOTQ0NjYxLCJuYmYiOjE2OTA5NDQ2NjEsImV4cCI6MTY5MDk0ODU2MSwiYW1yIjpbInB3ZCJdLCJjYyI6IkNnRUFFZ2R2TXpZMUxuWnVHaElLRUlTK0VvUDgyRHhGbkYvY0FJdXhlMUlpRWdvUVZVSUtkVUVJb0VhNUxTZk16VXdpQURJQ1FWTTRBQT09IiwiZmFtaWx5X25hbWUiOiJOZ3V5ZW4gTWluaCIsImdpdmVuX25hbWUiOiJCYW5nIiwiaXBhZGRyIjoiNTguMTg3LjEzOC4yMDAiLCJuYW1lIjoiTmd1eeG7hW4gTWluaCBC4bqxbmciLCJub25jZSI6IjUyODU3YjA3LTQ3NjQtNDllMC1hYjg4LTNmZGMwNGMyZjU0NiIsIm9pZCI6Ijg3ZmEyNjM4LWVlZmUtNDJkYS1iYWVjLTcwZmJiNmE1ZmQyMyIsInJoIjoiMC5BVk1BZTVYR2pXbElkMGlsRVdWai1aRFZuaGRTdHlfMDRscEZqeTBRWHh6VXhGVlRBQWsuIiwic3ViIjoiVFFBU000djYyLXA5Q0k1U3FDTVJtLWdSaE0yaGlGTlpYOVhBSl9GaDVvTSIsInRpZCI6IjhkYzY5NTdiLTQ4NjktNDg3Ny1hNTExLTY1NjNmOTkwZDU5ZSIsInVuaXF1ZV9uYW1lIjoiYmFuZ25tQG8zNjUudm4iLCJ1cG4iOiJiYW5nbm1AbzM2NS52biIsInV0aSI6IlZVSUtkVUVJb0VhNUxTZk16VXdpQUEiLCJ2ZXIiOiIxLjAifQ.mv8USk9g1CQRVXO13hnDYvFo_m3dfvr_6sbA1twnV9ThmhDkl8Nwzd0nOLHKma3nphd1hM0S2axt18c4ay8b8P6m0ZDoINJkN9abJ0klr8Z471KI5M62ctgxz2VN_HEYUGAmImNqdUneYJyI1fge1VMe9k-Zu6z8R5A74J-i3JtDA3SqSb5-RW1x_QJ_lc9nJYWxh35lcy9ZECoGeqeZjaPe149JbrLCvlakYS6Bk3h7J2ErVDe8vLO-4YUtEzbKaDm9g-8p9GTq7yCWgVqO1AGTjg2jZSqrbsJkCqS26FYwkBFgysWr6qn5Uy_bgUfW_3uJ4Nm-Fs6ZpmQIzaeHwA"; // Replace 'your-access-token' with your actual access token

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    request
      .post(url, payload, config)
      .then((response) => {
        // console.log("Response:", response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [])


  return (
    <Header className="header">
      <div className="logo-name">
        <img src={opus_logo} alt="Logo" className="logo" />
        <div className="header-name">{data.name}</div>
      </div>
      <div className="header-homepage"> <UserOutlined />Bang Nguyen Minh</div>
      <div className="header-homepage">Trang chủ</div>
      <div className="header-homepage">
        <Select
          labelInValue
          style={{ width: 90 }}
          defaultValue={
            <Option key="en-US">
              <img src={united_states} alt="img-en-flat" width={20} className="img-flat" />
              <span>EN</span>
            </Option>
          }
          onChange={handleMenuClick}
        >
          <Option key="en-US">
            <img src={united_states} alt="img-en-flat" width={20} style={{ marginBottom: 3, marginRight: 5 }} />
            <span>EN</span>
          </Option>
          <Option key="vi-VN">
            <img src={vietnam} alt="img-vn-flat" width={20} style={{ marginBottom: 3, marginRight: 5 }} />
            <span>VN</span>
          </Option>
        </Select>
      </div>



    </Header>
  );
};

export default HomeHeader;
