import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
import { Route, Routes } from 'react-router-dom';
import { private_routes, public_routes } from './routes/routes';
import Login from './Pages/Login/Login';
import { RootState } from './Reducers/rootReducer';

const App = () => {
  const userId = localStorage.getItem("Id");
  const language = useSelector((state: RootState) => state.language);
  const locale = language === 'en' ? enUS : viVN;

  return (
    <ConfigProvider locale={locale}>
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
    </ConfigProvider>
  );

}

export default App;

