import React, { useEffect, useRef } from 'react';

function BotBox({
	botAnswer,
}: {
	readonly botAnswer: string;
}): React.JSX.Element {
	const botAnswerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (botAnswerRef.current) {
			botAnswerRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [botAnswer]);

	return (
		<p ref={botAnswerRef} className="BotBox bg-light mb-5">
			{botAnswer}
		</p>
	);
}

export default BotBox;
