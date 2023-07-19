import React, { useState, useEffect } from 'react'
import "./index.css";
import { Button, Table, Tooltip } from 'antd';
import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons';
import RequestLayout from '../../../Components/RequestLayout';
import request from "../../../Utils/request";
import FilterDropdown from '../ManageRequest/FilterDropdown/FilterDropdown';
import { changeFormatDate } from '../../../Utils/formatDate';
import { useNavigate } from "react-router-dom";

interface RequestType {
  Id: string;
  requestCode: string;
  department: object;
  createdBy: object;
  user: object;
  createdDate: string;
  from: string;
  to: string;
  Status: string;
}

const SendToMe: React.FC = () => {
  const [requestData, setRequestData] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [requestCode, setRequestCode] = useState("");
  const [createdFrom, setCreatedFrom] = useState("");
  const [createdTo, setCreatedTo] = useState("");
  const [senderId, setSenderId] = useState("");
  const [status, setStatus] = useState("");
  const userId = localStorage.getItem("Id")

  const handleGetSendToMeRequest = async () => {
    setLoading(true);
    try {
      const url = `/request/sent-to-me/userId=${userId}?requestCode=${requestCode}&createdFrom=${createdFrom}&createdTo=${createdTo}&senderId=${senderId}&status=${status}&page=1&limit=20`;
      const response = await request.get(url);

      setRequestData(response.data.Data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleGetSendToMeRequest();
  }, []);

  console.log(userId);
  

  const profile = false;
  return (
    <RequestLayout profile={profile}>
      {() => (
        <div style={{ overflowX: 'hidden' }} className='request'>
          <div className='send-to-me-navbar'>
            <div className='send-to-me-title'>car booking</div>
            <div>
              <Button style={{ marginRight: 8, color: '#8894a1', fontFamily: 'Segoe UI', fontWeight: 600 }}><FileExcelOutlined style={{ color: 'green' }} />Export excel</Button>
              <FilterDropdown
                onRequestCodeChange={setRequestCode}
                onCreatedFromChange={setCreatedFrom}
                onCreatedToChange={setCreatedTo}
                onSenderIdChange={setSenderId}
                onStatusChange={setStatus}
                onApply={handleGetSendToMeRequest}
              />
              <Button style={{ marginRight: 5, marginLeft: 5, backgroundColor: '#5cb85c', color: 'white', fontFamily: 'Segoe UI', fontWeight: 600 }} onClick={() => navigate('/request/addrequest')}><PlusOutlined />Create new</Button>
            </div>
          </div>
          <div className='send-to-me-content'>
            <Table
              loading={loading}
              onRow={(record) => ({
                onDoubleClick: () => {
                  navigate(`/request/carbooking/detail/${record.Id}`);
                },
              })}
              columns={[
                {
                  title: 'Request Code',
                  dataIndex: 'RequestCode',
                },
                {
                  title: 'Department',
                  dataIndex: 'Department',
                  render: (department) => `${department.Name}`,
                },
                {
                  title: 'Created by',
                  dataIndex: 'SenderUser',
                  render: (senderUser) => `${senderUser.FullName}`,
                },
                {
                  title: 'User',
                  dataIndex: 'ReceiveUser',
                  render: (receiveUser) => `${receiveUser.FullName}`,
                },
                {
                  title: 'Created Date',
                  dataIndex: 'Created',
                  render: (text: string, record: RequestType) => {
                    let className = '';
                    switch (record.Status) {
                      case 'Rejected':
                        className = 'send-to-me-rejected-status-theme';
                        break;
                      case 'Approved':
                        className = 'send-to-me-approved-status-theme';
                        break;
                      case 'Waiting for approval':
                        className = 'send-to-me-waiting-approval-status-theme';
                        break;
                      case 'Done':
                        className = 'send-to-me-done-status-theme';
                        break;
                      case 'Canceled':
                        className = 'send-to-me-canceled-status-theme';
                        break;
                      case 'Draft':
                        className = 'send-to-me-draft-status-theme';
                        break;
                      default:
                        className = '';
                    }
                    return (
                      <Tooltip title={record.Status} className="small-tooltip" color="black">
                        <div className={className}>{changeFormatDate(text)}</div>
                      </Tooltip>
                    );
                  },
                },
                {
                  title: 'From',
                  dataIndex: 'UsageFrom',
                  render: (record: string) => changeFormatDate(record),
                },
                {
                  title: 'To',
                  dataIndex: 'UsageTo',
                  render: (record: string) => changeFormatDate(record),
                },
              ]}
              dataSource={requestData}
              pagination={{ pageSize: 20, position: ['bottomCenter'] }}
            />
          </div>
        </div>
      )}
    </RequestLayout>

  )
}

export default SendToMe