import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import { selectCameraImage, setCameraImage } from "../features/cameraSlice";
import "./webcamCapture.css";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  //it would run the function once, and then it would save the outputs and then when it happens to run again then it would know what is going to happen wihtout the calculation again.
  //and it should know when to re-run from the dependancy changes. the capture will be faster than first, second, third ... times.
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    //dispatch or shoot the action of setting camera image
    //use payload of imagesrc
    dispatch(setCameraImage(imageSrc));
    history.push("/preview");
    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />

      <RadioButtonUnchecked
        className="webcamCapture_button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}

export default WebcamCapture;
