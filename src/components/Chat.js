import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";
import React from "react";
import "./Chat.css";
import ReactTimeago from "react-timeago";

function Chat({ id, username, timestamp, profilePic, imageUrl, read }) {
  return (
    <div className="chat">
      <Avatar src={profilePic} className="chat_avatar" />
      <div className="chat_info">
        <h4>{username}</h4>
        <p>
          Tap to view -{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />{" "}
        </p>
      </div>

      {!read && <StopRounded className="chat_readIcon" />}
    </div>
  );
}

export default Chat;
