import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import { private_routes, public_routes } from './routes/routes';

function App() {
  const userId = localStorage.getItem("Id");

  return (
    <Routes>
      {userId !== null ? (
        private_routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))
      ) : (
        public_routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))
      )}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

