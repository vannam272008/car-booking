import React from 'react';
import MenuAdd from '../MenuAdd';
import RequestLayout from '../../RequestLayout';


function AddRequest(): JSX.Element {
    const profile = false;

    return (
        <RequestLayout profile={profile}>
            {() => (
                <div>
                    <MenuAdd />
                    <div>
                        <h2 className='title-request'>CAR BOOKING REQUEST</h2>
                    </div>
                </div>
            )}
        </RequestLayout>
    );
}

export default AddRequest;