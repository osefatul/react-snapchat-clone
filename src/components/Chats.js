import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import React, { useState } from "react";
import "./Chats.css";
import { useEffect } from "react";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/appSlice";
import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

function Chats() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  //as the user is logged in we need to pull their info.
  const user = useSelector(selectUser);

  //lets get data form the database
  useEffect(() => {
    db.collection("post")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const takeSnap = () => {
    history.push("/");
  };
  return (
    <div className="chats">
      <div className="chats_header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats_avatar"
        />
        <div className="chats_search">
          <SearchIcon />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats_chatIcon" />
      </div>
      <div className="chat_posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => {
            return (
              <Chat
                key={id}
                id={id}
                username={username}
                timestamp={timestamp}
                imageUrl={imageUrl}
                read={read}
                profilePic={profilePic}
              />
            );
          }
        )}
      </div>

      <RadioButtonUnchecked
        className="chats_takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
