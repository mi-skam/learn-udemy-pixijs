import * as PIXI from 'pixi.js';
import { globals } from './globals';

import {
  DrawingUtils,
  FilesetResolver,
  GestureRecognizer,
} from '@mediapipe/tasks-vision';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

export class HandController extends PIXI.utils.EventEmitter {
  constructor() {
    super();
    this.sprite = new PIXI.Sprite(globals.resources['hand'].texture);
    this.sprite.x = window.innerWidth / 2;
    this.sprite.y = window.innerHeight / 2;
    this.sprite.scale.set(0.08);
    this.sprite.anchor.set(0.5);

    this.gestureRecognizer = null;
    this.isFistClosed = false;
  }

  get position() {
    return this.sprite.position;
  }

  async run() {
    this.gestureRecognizer = await this.createGestureRecognizer();
    this.startWebCam();
  }

  _hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  startWebCam() {
    if (this._hasGetUserMedia()) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.webcamCanvas = document.querySelector('#webcam-canvas');
          this.webcamCanvasCtx = this.webcamCanvas.getContext('2d');
          this.drawingUtils = new DrawingUtils(this.webcamCanvasCtx);

          this.lastVideoTime = -1;
          this.results = null;

          this.webcam = document.querySelector('#webcam');
          this.webcam.srcObject = stream;
          this.webcam.addEventListener(
            'loadeddata',
            this.predictWebcam.bind(this)
          );
        })
        .catch((error) => {
          console.log('Error accessing camera', error);
        });
    } else {
      console.log('getUserMedia() is not supported by your browser');
    }
  }

  async createGestureRecognizer() {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
    );
    const gestureRecognizer = await GestureRecognizer.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath: '../../assets/models/gesture_recognizer.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
      }
    );
    return gestureRecognizer;
  }

  async predictWebcam() {
    // Now let's start detecting the stream.
    this.webcamCanvasCtx.save();
    this.webcamCanvasCtx.clearRect(
      0,
      0,
      this.webcamCanvas.width,
      this.webcamCanvas.height
    );

    this.webcamCanvas.style.height = 150;
    this.webcam.style.height = 150;
    this.webcamCanvas.style.width = 200;
    this.webcam.style.width = 200;

    let nowInMs = Date.now();
    if (this.webcam.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = this.webcam.currentTime;
      this.results = this.gestureRecognizer.recognizeForVideo(
        this.webcam,
        nowInMs
      );
    }

    if (this.results?.landmarks && this.results.landmarks.length > 0) {
      this.sprite.x =
        window.innerWidth - this.results.landmarks[0][0].x * window.innerWidth;
      this.sprite.y = this.results.landmarks[0][0].y * window.innerHeight;

      for (const landmarks of this.results.landmarks) {
        this.drawingUtils.drawConnectors(
          landmarks,
          GestureRecognizer.HAND_CONNECTIONS,
          {
            color: '#00FF00',
            lineWidth: 2,
          }
        );
        this.drawingUtils.drawLandmarks(landmarks, {
          color: '#FF0000',
          lineWidth: 1,
        });
      }
    }
    this.webcamCanvasCtx.restore();
    if (this.results.gestures.length > 0) {
      const categoryName = this.results.gestures[0][0].categoryName;
      if (categoryName === 'Closed_Fist' && !this.isFistClosed) {
        console.log('closed fist');
        this.emit('closedfist');
        this.isFistClosed = true;
      }
      if (categoryName === 'Open_Palm' && this.isFistClosed) {
        console.log('open palm');
        this.emit('openpalm');
        this.isFistClosed = false;
      }
      const categoryScore = parseFloat(
        this.results.gestures[0][0].score * 100
      ).toFixed(2);
      const handedness = this.results.handedness[0][0].displayName;
      // console.log(
      //   `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`
      // );
      // console.log(this.results);
    }

    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(this.predictWebcam.bind(this));
  }
}
