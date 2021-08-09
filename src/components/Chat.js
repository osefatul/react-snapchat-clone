import { Avatar } from "@material-ui/core";
import React from "react";
import "./Chat.css";

function Chat({ id, username, timestamp, profilePic, imageUrl, read }) {
  return (
    <div className="chat">
      <Avatar srcc={profilePic} />
      <div className="chat_info">
        <h4>{username}</h4>
        <p>Tap to view - {new Date(timestamp?.toDate()).toUTCString()}</p>
      </div>
    </div>
  );
}

export default Chat;
