import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "../features/cameraSlice";
import "./Preview.css";
import Close from "@material-ui/icons/Close";

import {
  TextFields,
  AttachFile,
  Create,
  Crop,
  MusicNote,
  Note,
  Timer,
  Send,
} from "@material-ui/icons";
import { v4 as uuid } from "uuid"; // for unique id for image
import { storage, db } from "../firebase";
import firebase from "firebase";
import { selectUser } from "../features/appSlice";

function Preview() {
  //pull the cameraImage from the redux store
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    //this will assign the cameraImage back to null and then when there is no image the useffect will trigger because of the condition.
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid(); //generate a random string

    //upload the image to the firebase storage
    const uploadTask = storage
      .ref(`post/${id}`)
      .putString(cameraImage, "data_url");

    //when the upload task is completed then do the below..
    uploadTask.on(
      "state_changed", //when the state changes means it is completed
      null, //progress function is null as we dont care about it for now
      (error) => console.log(error), //any error log it
      () => {
        //COMPLETE FUNCTION after completion uploading pics
        storage
          .ref("post")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("post").add({
              imageUrl: url, //downloaded url
              username: "Sefat",
              read: false, //once the post is read this will get to true,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(), // will give you a consistent firebase regardless wherever in the world you are.
            });
            history.replace("/chats");
          });
      }
    );
  };

  return (
    <div className="preview">
      <Close className="preview_close" onClick={closePreview} />
      <div className="preview_toolbarRight">
        <TextFields />
        <Create />
        <Note />
        <MusicNote />
        <AttachFile />
        <Crop />
        <Timer />
      </div>
      <img src={cameraImage} alt="" />

      <div onClick={sendPost} className="preview_footer">
        <h2>Send Now</h2>
        <Send fontSize="small" className="preview_sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
