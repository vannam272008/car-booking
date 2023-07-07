import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import DetailRequest from './Components/DetailRequest/Detail/detail';
import ManageRequest from './Pages/ManageRequest/ManageRequest';
import Profile from './Components/Profile';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/request/carbooking" element={<ManageRequest />} />
      <Route path="/request/detail" element={<DetailRequest />} />
      <Route path="/profile" element={<Profile/>}/>
      {/* <Route path="/employee/create" element={<AddEmployee />} />
        <Route path="/department/create" element={<AddDepartment />} /> */}
    </Routes>
  );
}

export default App;
