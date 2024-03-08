import React from 'react';
import { Spinner } from 'react-bootstrap';

function LoadSpinner(): React.JSX.Element {
	return (
		<div className="LoadSpinner">
			<Spinner
				animation="border"
				role="status"
				className="text-white LoadSpinner__spinner"
			/>
			<h1 className="display-4 text-white">thinking</h1>
		</div>
	);
}

export default LoadSpinner;
