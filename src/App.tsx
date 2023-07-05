import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ManagerRequest from './Pages/ManageRequest';
import ContentProfile from './Components/Profile/content-profile';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/request/carbooking" element={<ManagerRequest />} />
      <Route path="/profile" element={<ContentProfile/>} />
      {/* <Route path="/employee/create" element={<AddEmployee />} />
        <Route path="/department/create" element={<AddDepartment />} /> */}
    </Routes>
  );
}

export default App;
