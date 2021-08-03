import { RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  //it would run the function once, and then it would save the outputs and then when it happens to run again then it would know what is going to happen wihtout the calculation again.
  //and it should know when to re-run from the dependancy changes. the capture will be faster than first, second, third ... times.

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc);
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

      <img src={image} alt="" />
    </div>
  );
}

export default WebcamCapture;
