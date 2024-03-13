import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadSpinner = (): React.JSX.Element => {
    return (
        <div className="LoadSpinner">
            <Spinner
                animation="grow"
                role="status"
                className="text-white LoadSpinner__spinner"
            />
            <Spinner
                animation="grow"
                role="status"
                className="text-white LoadSpinner__spinner"
            />
            <Spinner
                animation="grow"
                role="status"
                className="text-white LoadSpinner__spinner"
            />
        </div>
    );
};

export default LoadSpinner;
