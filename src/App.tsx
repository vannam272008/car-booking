import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ManageRequest from './Pages/Request/ManageRequest/ManageRequest';
import Login from './Pages/Login/Login';
import Profile from './Components/Profile';
import AddRequest from './Components/AddRequest/AddRequest/addRequest';
import Register from './Pages/Register/Register';
import SettingPage from './Pages/Setting/settingPage';
import DetailRequest from './Components/DetailRequest/DetailRequest/detailRequest';
import SendToOthers from './Pages/Request/SendToOthers/SendToOthers';


function App() {  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/request/carbooking" element={<SendToOthers/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/request/carbooking/detail/:requestId" element={<DetailRequest />} />
      <Route path='/request/addrequest' element={<AddRequest />} />
      <Route path='/profile' element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/setting" element={<SettingPage />} />
    </Routes>
  );
}

export default App;
