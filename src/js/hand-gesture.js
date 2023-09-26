import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export class HandGesture {
  constructor() {
    this.createHandLandmarker().then(() => {
      console.log('HandLandmarker created');
    });
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
          const webcam = document.querySelector('#webcam');
          webcam.srcObject = stream;
        })
        .catch((error) => {
          console.log('Error accessing camera', error);
        });
    } else {
      console.log('getUserMedia() is not supported by your browser');
    }
  }

  async createHandLandmarker() {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
    );
    const handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: '../../assets/models/hand_landmarker.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numHands: 1,
    });
  }
}
