import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "../features/appSlice";
import "./ChatView.css";
import { useHistory } from "react-router";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

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
      <div className="chatView_timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default ChatView;
