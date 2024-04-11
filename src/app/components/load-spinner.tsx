import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadSpinner = (): React.JSX.Element => {
    return (
        <div className="loadSpinner">
            <Spinner
                animation="grow"
                role="status"
                className="text-white loadSpinner__spinner"
            />
            <Spinner
                animation="grow"
                role="status"
                className="text-white loadSpinner__spinner"
            />
            <Spinner
                animation="grow"
                role="status"
                className="text-white loadSpinner__spinner"
            />
        </div>
    );
};

export default LoadSpinner;
