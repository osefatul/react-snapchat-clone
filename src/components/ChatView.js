import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "../features/appSlice";
import "./ChatView.css";
import { useHistory } from "react-router";

function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);
  const history = useHistory();

  useEffect(() => {
    //if you come here through a sneaky way and if there is no selectedImage then you should exit
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    history.replace("./chats");
  };

  return (
    <div className="chatView">
      <img src={selectedImage} onClick={exit} />
    </div>
  );
}

export default ChatView;
