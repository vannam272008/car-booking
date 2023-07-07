import React from 'react';
import MenuAdd from '../MenuAdd';

function AddRequest(): JSX.Element {
    const profile = false;

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div>
                    <MenuAdd />

                </div>
                </RequestLayout>

    );
}

export default AddRequest;