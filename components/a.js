// 'a'
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const gestureA = new GestureDescription('A');

// Thumb
gestureA.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
gestureA.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.25);

// Index
gestureA.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
gestureA.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);

// Middle
gestureA.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
gestureA.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.25);

// Ring
gestureA.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
gestureA.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.25);

// Pinky
gestureA.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
gestureA.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.25);