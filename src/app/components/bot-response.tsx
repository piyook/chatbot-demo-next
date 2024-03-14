import React, { useState, useEffect, memo } from 'react';
import { BsRobot } from 'react-icons/bs';
import BotBox from './bot-box';

const BotResponse = ({
    botAnswer,
    id,
}: {
    readonly botAnswer: string;
    readonly id: string | undefined;
}): React.JSX.Element => {
    const [botAnswerSentence, setBotAnswerSentence] = useState<string[]>([]);

    useEffect(() => {
        setBotAnswerSentence((previous) => [...previous, botAnswer]);
    }, [botAnswer]);

    return (
        <div
            className="BotResponse d-flex flex-column justify-content-start align-items-start mb-5"
            role="botResponse"
        >
            <BsRobot className="BotIcon BotIcon--chat mb-4 text-white bg-primary" />

            {botAnswerSentence.map((sentence) => {
                const splitSentences = (sentence.trim() + ' ').split('. ');
                return splitSentences.map((splitSentence, sentenceNumber) => {
                    if (splitSentence === '') return;
                    return (
                        <BotBox
                            key={id + splitSentence.slice(0, 15)}
                            botAnswer={splitSentence}
                            sentenceNumber={sentenceNumber}
                            splitSentences={splitSentences}
                        />
                    );
                });
            })}
        </div>
    );
};

export default memo(BotResponse);
