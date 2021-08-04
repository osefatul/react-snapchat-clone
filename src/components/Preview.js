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

function Preview() {
  //pull the cameraImage from the redux store
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    //this will assign the cameraImage back to null and then when there is no image the useffect will trigger because of the condition.
    dispatch(resetCameraImage());
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

      <div className="preview_footer">
        <h2>Send Now</h2>
        <Send fontSize="small" className="preview_sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
