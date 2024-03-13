import React from 'react';
import 'bootswatch/dist/solar/bootstrap.min.css';
import { BiUser } from 'react-icons/bi';

const UserBox = ({
    userQuestion,
}: {
    readonly userQuestion: string;
}): React.JSX.Element => {
    return (
        <div className="UserBox d-flex flex-column justify-content-end align-items-end">
            <BiUser className="BotIcon BotIcon--chat mb-4 bg-info text-white" />
            <p className="UserBox__userOutput bg-info">{userQuestion}</p>
        </div>
    );
};

export default UserBox;
