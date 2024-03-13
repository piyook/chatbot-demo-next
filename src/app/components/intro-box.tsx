import React from 'react';
import { Stack } from 'react-bootstrap';
import { BsRobot } from 'react-icons/bs';

const IntroBox = (): React.JSX.Element => {
    return (
        <Stack className="IntroBox d-flex flex-column justify-content-center align-items-center bg-dark vh-100 pt-4 bg-opacity-25">
            <h1 className="display-4 text-light">
                Hello, I&apos;m Demo ChatBot
            </h1>
            <BsRobot className="BotIcon text-dark" />
            <h1 className="display-6 text-primary">How Can I Help You?</h1>
        </Stack>
    );
};

export default IntroBox;
