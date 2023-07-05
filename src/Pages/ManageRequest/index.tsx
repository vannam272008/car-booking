import React from 'react';

import "./ManageRequest.scss";
import RequestLayout from '../../Components/RequestLayout';


const ManageRequest: React.FC = () => {
    const profile = false;

    return (
        <RequestLayout profile={profile}>
            {() => (<h1>Manage Request</h1>)}
        </RequestLayout>
    );
};

export default ManageRequest;