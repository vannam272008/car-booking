import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ManageRequest from './Pages/ManageRequest/ManageRequest';
import Login from './Pages/Login/Login';
import Profile from './Components/Profile';
import AddRequest from './Components/AddRequest/AddRequest/addRequest';
import Register from './Pages/Register/Register';
import SettingPage from './Pages/Setting/settingPage';
import ContentStructure from './Components/OrganizationalStructure/ContentStructure/contentStructure';
import DetailRequest from './Components/DetailRequest/DetailRequest/detailRequest';
import AdminPage from './Components/AdminPage';
import { useEffect, useState } from 'react';
import request from './Utils/request';
import PageNotFound from './Pages/404';
import EditRequest from './Components/EditRequest/EditRequest/editRequest';

function App() {
  const userId = localStorage.getItem("Id");

  return (
    <Routes>
      {userId !== null ? (
        <>
          <Route path="/" element={<Navigate to="/request/carbooking" />} />
          <Route path="/request/carbooking/edit/:requestId" element={<EditRequest />} />
          <Route path="/request/carbooking" element={<ManageRequest />} />
          <Route path="/request/carbooking/detail/:requestId" element={<DetailRequest />} />
          <Route path='/request/addrequest' element={<AddRequest />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/setting/structure" element={<ContentStructure />} />
          <Route path="/setting/profile/:userID" element={<Profile />} />
          <Route path="/setting/admin" element={<AdminPage />} />
          <Route path="*" element={<PageNotFound />}></Route>
        </>
      ) : <>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<PageNotFound />}></Route>
      </>
      }

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
