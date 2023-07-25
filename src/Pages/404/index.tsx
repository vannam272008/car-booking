import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginPage = () => {
        navigate("/login");
    }
    return (

        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={handleLoginPage}>Login Page</Button>}
        />
    );
}

export default PageNotFound;