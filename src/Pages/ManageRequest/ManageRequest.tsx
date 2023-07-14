import React, { useState, useEffect } from 'react'
import "./index.css";
import { Button, Table, Tooltip } from 'antd';
import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons';
import RequestLayout from '../../Components/RequestLayout';
import request from "../../Utils/request";
import FilterDropdown from './FilterDropdown/FilterDropdown';
import { changeFormatDate } from '../../Utils/formatDate';

interface RequestType {
  requestCode: string;
  department: object;
  createdBy: object;
  user: object;
  createdDate: string;
  from: string;
  to: string;
  Status: string;
}

const ManageRequest: React.FC = () => {
  const [requestData, setRequestData] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("");

  const handleGetAllRequest = async () => {
    setLoading(true);
    try {
      const response = await request.get('/request/get-all?page=1&limit=8');
      setRequestData(response.data.Data);
      setLoading(false);


    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleGetAllRequest();
  }, []);

  console.log(requestData);

  const profile = false;
  return (
    <RequestLayout profile={profile}>
      {() => (
        <div style={{ overflowX: 'hidden' }} className='request'>
          <div id='navbar'>
            <div className='title'>car booking</div>
            <div>
              <Button style={{ marginRight: 8, color: '#8894a1', fontFamily: 'Segoe UI', fontWeight: 600 }}><FileExcelOutlined style={{ color: 'green' }} />Export excel</Button>
              <FilterDropdown />
              <Button style={{ marginRight: 5, marginLeft: 5, backgroundColor: '#5cb85c', color: 'white', fontFamily: 'Segoe UI', fontWeight: 600 }}><PlusOutlined />Create new</Button>
            </div>
          </div>
          <div className='content'>
            <Table
              loading={loading}
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
                        className = 'rejected';
                        break;
                      case 'Approved':
                        className = 'approved';
                        break;
                      case 'Waiting for approval':
                        className = 'waiting-approval';
                        break;
                      case 'Done':
                        className = 'done';
                        break;
                      case 'Canceled':
                        className = 'canceled';
                        break;
                      case 'Draf':
                        className = 'draft';
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
              pagination={{ position: ['bottomCenter'] }}
            />
          </div>
        </div>
      )}
    </RequestLayout>

  )
}

export default ManageRequest