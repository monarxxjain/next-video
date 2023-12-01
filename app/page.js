"use client"
// 0. Clone gestures repo DONE
// 0. Install packages DONE
// 1. Create new gesture definition DONE
// 2. Import gesture into handpose DONE

///////// NEW STUFF ADDED USE STATE
import React, { useRef, useState, useEffect } from "react";
///////// NEW STUFF ADDED USE STATE

// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "@/components/utilities";

import { loveYouGesture } from "@/components/LoveYou";
import { gestureA } from "@/components/a";

///////// NEW STUFF IMPORTS
import * as fp from "fingerpose";
// import victory from "./victory.png";
// import thumbs_up from "./thumbs_up.png";
///////// NEW STUFF IMPORTS

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  ///////// NEW STUFF ADDED STATE HOOK
  // const [emoji, setEmoji] = useState(null);
  // const images = { thumbs_up: thumbs_up, victory: victory };
  const [currname, setcurrName] = useState("Under Processing ...");
  ///////// NEW STUFF ADDED STATE HOOK

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");

    const detectFrame = () => {
      detect(net);
      requestAnimationFrame(detectFrame);
    };

    detectFrame();
  };

  
  const detect = async (net) => {
    // Check data is available


    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null 
    ) {

      // Get Video Properties
      console.log("=-0098976543567890-")
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      console.log(hand.length);

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {

        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          loveYouGesture,
          gestureA,

        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        console.log("===========================")
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          console.log(gesture.gestures[maxConfidence].name);
          // setEmoji(gesture.gestures[maxConfidence].name);
          setcurrName(gesture.gestures[maxConfidence].name);
          // console.log(emoji);
        }
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(() => {
    runHandpose();
  }, [runHandpose]);

  useEffect(() => {
    const runWebcam = async () => {
      if (webcamRef.current !== null) {
        const videoConstraints = {
          width: 640,
          height: 480,
          facingMode: "user", // or "environment" for rear camera
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
        webcamRef.current.video.srcObject = mediaStream;
      }
    };

    runWebcam();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <div
          style={{
            zIndex: 10,
          }}
        >
          <h1>
            {currname}
          </h1>
        </div>

        {/* NEW STUFF */}
        {/* {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )} */}

        {/* NEW STUFF */}
      </header>
    </div>
  );
}

export default App;
