import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ManageRequest from './Pages/Request/ManageRequest/ManageRequest';
import Login from './Pages/Login/Login';
import Profile from './Components/Profile';
import AddRequest from './Components/AddRequest/AddRequest/addRequest';
import Register from './Pages/Register/Register';
import SettingPage from './Pages/Setting/settingPage';
import ContentStructure from './Components/OrganizationalStructure/ContentStructure/contentStructure';
import DetailRequest from './Components/DetailRequest/DetailRequest/detailRequest';
import SendToMe from './Pages/Request/SendToMe/SendToMe';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/request/carbooking" element={<ManageRequest />} />
      <Route path="/login" element={<Login />} />
      <Route path="/request/carbooking/detail/:requestId" element={<DetailRequest />} />
      <Route path='/request/addrequest' element={<AddRequest />} />
      <Route path="/register" element={<Register />} />
      <Route path="/setting" element={<SettingPage />} />
      <Route path="/setting/structure" element={<ContentStructure />} />
      <Route path="/setting/profile/:userID" element={<Profile />} />
    </Routes>
  );
}

export default App;
