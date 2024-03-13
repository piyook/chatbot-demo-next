import React from 'react';
import { Stack } from 'react-bootstrap';
import { BsRobot } from 'react-icons/bs';

const IntroBox = (): React.JSX.Element => {
    return (
        <Stack className="IntroBox d-flex flex-column justify-content-center align-items-center pt-4 bg-opacity-25 p-1 text-center">
            <h1 className="display-4 text-light text-center">Hello</h1>
            <h1 className="display-4 text-light text-center">Bonjour</h1>
            <h1 className="display-4 text-light text-center">Hola</h1>
            <h1 className="display-4 text-light text-center">Hallo</h1>
            <h1 className="display-4 text-light text-center">你好</h1>
            <h1 className="display-4 text-light text-center">नमस्कार</h1>
            <h1 className="display-4 text-light text-center">Привет</h1>
            <BsRobot className="BotIcon bg-primary text-white" />
            <h1 className="display-6 text-primary">How Can I Help You?</h1>
        </Stack>
    );
};

export default IntroBox;
