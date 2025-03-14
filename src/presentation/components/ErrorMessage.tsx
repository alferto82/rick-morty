import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorMessageProps {
	message: string;
	showBack?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, showBack = false }) => {
	const navigate = useNavigate();

	return (
		<div
			style={{
				border: '1px solid red',
				padding: '1rem',
				margin: '1rem 0',
				borderRadius: '8px',
				backgroundColor: '#ffe6e6',
				color: 'red',
				textAlign: 'center'
			}}
		>
			<p>{message}</p>
			{showBack && (
				<div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
					<button onClick={() => navigate('/')}>Back to Home</button>
				</div>
			)}
		</div>
	);
};

export default ErrorMessage;
