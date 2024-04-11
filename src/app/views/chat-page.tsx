import React from 'react';
import { Stack } from 'react-bootstrap';
import UserBox from '../components/user-box';
import BotResponse from '../components/bot-response';
import IntroBox from '../components/intro-box';

type chatPageProperties = {
    readonly chatItems: Array<{
        id: string | undefined;
        question: string | undefined;
        answer: string | undefined;
    }>;
};

const chatPage = ({ chatItems }: chatPageProperties): React.JSX.Element => {
    return (
        <Stack className="chatPage mt-5" role="chatPage">
            <IntroBox />
            {chatItems.map((item) => {
                if (item.question === undefined || item.answer === undefined)
                    return;

                return (
                    <div
                        key={item.id}
                        className="chatPage__responseSection"
                        role="responseDisplay"
                    >
                        <UserBox userQuestion={item.question} />
                        <BotResponse botAnswer={item.answer} id={item.id} />
                    </div>
                );
            })}
        </Stack>
    );
};

export default chatPage;
