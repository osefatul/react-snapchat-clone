import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";
import React from "react";
import "./Chat.css";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "../features/appSlice";
import { db } from "../firebase";
import { useHistory } from "react-router";

function Chat({ id, username, timestamp, profilePic, imageUrl, read }) {
  const dispatch = useDispatch();
  const history = useHistory();

  //when i click on the image inside the chat list. it will go ahead and push the image in to the store.
  const open = () => {
    //if read is false then execute the act
    if (!read) {
      dispatch(selectImage(imageUrl));

      //now go to the post collection and go specifically to the document with the id, and use set method in order to update the read property and the read dot disappear.
      //we use merge because we want to override only the read property. if we dont use that then it override the whole document with only read and delete everything else.
      db.collection("post").doc(id).set({ read: true }, { merge: true });

      history.push("/chats/view");
    }
  };
  return (
    <div onClick={open} className="chat">
      <Avatar src={profilePic} className="chat_avatar" />
      <div className="chat_info">
        <h4>{username}</h4>
        <p>
          {/* if this one is read already then dont show the text. if not then show it in that case */}
          {!read && "Tap to view -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />{" "}
        </p>
      </div>

      {!read && <StopRounded className="chat_readIcon" />}
    </div>
  );
}

export default Chat;
