/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useRef, useState } from 'react';

const BotBox = ({
    botAnswer,
    sentenceNumber,
    splitSentences,
}: {
    readonly botAnswer: string;
    readonly sentenceNumber: number;
    readonly splitSentences: string[];
}): React.JSX.Element => {
    const botAnswerReference = useRef<HTMLDivElement>(null);

    const [letters, setLetters] = useState<string>('');
    const [typing, setTyping] = useState(0);

    useEffect(() => {
        if (botAnswerReference.current) {
            botAnswerReference.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [botAnswer, typing]);

    useEffect(() => {
        const arrayOfLetters = botAnswer.split('');

        // Add delay for split sentences using previous length
        const delay = splitSentences.reduce(
            (accumulator, currentValue, currentIndex) => {
                if (currentIndex < sentenceNumber) {
                    return 500 + accumulator + currentValue.length * 30;
                }

                return accumulator;
            },
            0,
        );

        for (const [index] of arrayOfLetters.entries()) {
            setTimeout(
                () => {
                    // Slice through the answer increasing slice by one letter each time
                    setLetters(botAnswer.slice(0, index + 1));
                    // Scroll the box up periodically
                    if (index % 50 === 0) {
                        setTyping(index);
                    }

                    if (index + 1 === arrayOfLetters.length) {
                        // Reset typing when completed so that box may be scrolled into view
                        setLetters(botAnswer + '.');
                        setTyping(index + 1);
                    }
                },
                index * 30 + delay,
            );
        }
    }, [botAnswer, sentenceNumber, splitSentences]);

    return (
        <>
            {letters && (
                <p ref={botAnswerReference} className="BotBox mb-5 bg-primary">
                    {letters}
                </p>
            )}
        </>
    );
};

export default BotBox;
