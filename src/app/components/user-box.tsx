import React from "react";
import "bootswatch/dist/solar/bootstrap.min.css";
import { BiUser } from "react-icons/bi";

function UserBox({
  userQuestion,
}: {
  readonly userQuestion: string;
}): React.JSX.Element {
  return (
    <div className="UserBox d-flex flex-column justify-content-end align-items-end">
      <BiUser className="BotIcon BotIcon--chat mb-4 bg-info text-white" />
      <p className="UserBox__userOutput bg-light">{userQuestion}</p>
    </div>
  );
}

export default UserBox;
