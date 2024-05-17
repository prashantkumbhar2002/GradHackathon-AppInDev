import React from 'react';

const Spinner = () => {
    // return <div>Spinner</div>;
    return (
        <div class="d-flex justify-content-center Spinner">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;