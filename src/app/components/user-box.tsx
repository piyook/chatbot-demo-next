import React from 'react';
import 'bootswatch/dist/solar/bootstrap.min.css';
import { BiUser } from 'react-icons/bi';

const UserBox = ({
    userQuestion,
}: {
    readonly userQuestion: string;
}): React.JSX.Element => {
    return (
        <div
            className="userBox d-flex flex-column justify-content-end align-items-end"
            role="userQuery"
        >
            <BiUser className="botIcon botIcon__chat mb-4 bg-info text-white" />
            <p className="userBox__userOutput bg-info">{userQuestion}</p>
        </div>
    );
};

export default UserBox;
