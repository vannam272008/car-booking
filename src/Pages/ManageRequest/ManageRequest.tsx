import React, { useState, useEffect } from 'react'
import "./index.css";
import { Button, Input, Space, Table, Tooltip } from 'antd';
import { FileExcelOutlined, PlusOutlined } from '@ant-design/icons';
import RequestLayout from '../../Components/RequestLayout';
import request from "../../Utils/request";
import FilterDropdown from './FilterDropdown/FilterDropdown';
import { changeFormatDate } from '../../Utils/formatDate';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { setTab, setStatus } from '../../Actions/requestAction';
import { RootState } from '../../Reducers/rootReducer';


type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

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

const { Search } = Input;

const ManageRequest = (props: any) => {

  const { tab, status, setStatus } = props
  const [requestData, setRequestData] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [requestCode, setRequestCode] = useState("");
  const [createdFrom, setCreatedFrom] = useState("");
  const [createdTo, setCreatedTo] = useState("");
  const [senderId, setSenderId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState<number>();

  const handleGetAllRequest = async () => {
    setLoading(true);
    try {
      const url = `/request/${tab}?requestCode=${requestCode}&createdFrom=${createdFrom}&createdTo=${createdTo}&senderId=${senderId}&status=${status}&page=${page}&limit=20&search=${searchQuery}`;
      const response = await request.get(url);

      for (let i = 1; i < response.data.Data.TotalPage; i++) {
        if(response.data.Data.ListData.length < 20){
          setPage(1)
        }
        else{
          setPage(i)
        }
      }
      
      setRequestData(response.data.Data.ListData)
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleGetAllRequest();
  }, [tab, status, page]);

  const profile = false;
  return (
    <RequestLayout profile={profile}>
      {() => (
        <div style={{ overflowX: 'hidden' }} className='request'>
          <div className='manage-request-navbar'>
            <div className='manage-request-title'>car booking</div>
            <Space.Compact size="large">
              <Search placeholder="Search" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} onSearch={() => handleGetAllRequest()} />
            </Space.Compact>
            <div>
              <Button style={{ marginRight: 8, color: '#8894a1', fontFamily: 'Segoe UI', fontWeight: 600 }}><FileExcelOutlined style={{ color: 'green' }} />Export excel</Button>
              <FilterDropdown
                onRequestCodeChange={setRequestCode}
                onCreatedFromChange={setCreatedFrom}
                onCreatedToChange={setCreatedTo}
                onSenderIdChange={setSenderId}
                onStatusChange={setStatus}
                onApply={handleGetAllRequest}
              />
              <Button style={{ marginRight: 5, marginLeft: 5, backgroundColor: '#5cb85c', color: 'white', fontFamily: 'Segoe UI', fontWeight: 600 }} onClick={() => navigate('/request/addrequest')}><PlusOutlined />Create new</Button>
            </div>
          </div>
          <div className='manage-request-content'>
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
                        className = 'manage-request-rejected-status-theme';
                        break;
                      case 'Approved':
                        className = 'manage-request-approved-status-theme';
                        break;
                      case 'Waiting for approval':
                        className = 'manage-request-waiting-approval-status-theme';
                        break;
                      case 'Done':
                        className = 'manage-request-done-status-theme';
                        break;
                      case 'Canceled':
                        className = 'manage-request-canceled-status-theme';
                        break;
                      case 'Draft':
                        className = 'manage-request-draft-status-theme';
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

const mapStateToProps = (state: RootState) => ({
  tab: state.request.tab,
  status: state.request.status
})

const mapDispatchToProps = { setTab, setStatus }

export default connect(mapStateToProps, mapDispatchToProps)(ManageRequest)

// export default ManageRequest