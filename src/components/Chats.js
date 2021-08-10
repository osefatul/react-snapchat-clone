import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import React, { useState } from "react";
import "./Chats.css";
import { useEffect } from "react";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { selectUser } from "../features/appSlice";

function Chats() {
  const [posts, setPosts] = useState([]);

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
    </div>
  );
}

export default Chats;
