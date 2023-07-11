import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import DetailRequest from './Components/DetailRequest/Detail/detailRequest';
import ManageRequest from './Pages/ManageRequest/ManageRequest';
import AddRequest from './Components/AddRequest/AddRequest';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/request/carbooking" element={<ManageRequest />} />
      <Route path="/request/detail" element={<DetailRequest />} />
      <Route path='/request/addrequest' element={<AddRequest />} />
      {/* <Route path="/employee/create" element={<AddEmployee />} />
        <Route path="/department/create" element={<AddDepartment />} /> */}
    </Routes>
  );
}

export default App;
