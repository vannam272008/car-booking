import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ContentProfile from './Components/Profile/content-profile';
import ManageRequest from './Pages/ManageRequest/ManageRequest';
import Login from './Pages/Login/Login';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/request/carbooking" element={<ManageRequest />} />
      <Route path="/profile" element={<ContentProfile />} />
      {/* <Route path="/employee/create" element={<AddEmployee />} />
        <Route path="/department/create" element={<AddDepartment />} /> */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
