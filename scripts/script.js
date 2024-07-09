console.log("Hi from scripts");

// #region Imports

import { removeScript, removeStyleSheet } from "./common.js";

import {
  CaptureImage,
  ClearICAOServiceThread,
  ConnectCamera,
  EnrolmentDevices,
  FaceDetectedRectangleDrawingThread,
  GetConnectionState,
  Reconnect,
  RetrieveScripts,
  SaveCaptureedImg,
  StopCameraIndicatorInBrowser,
  StopCheckingICAOServiceThread,
  cachedCamera,
  connectwithCameraFromLocalStorage,
  enumerateDevices,
  getSelectedCameraFromLocalStorage,
  handleChangeInAvaliableCameras,
  handleFullScreenChange,
  isCheckingICAOServiceThread,
  isICAO,
  reestCashedArray,
  setCachedCamera,
  setIsCheckingICAOServiceThread,
  setLableMessageForICAO,
  stopVideoStream,
  toggleFullScreen,
} from "./utils.js";
import "./utils.js";
// Function to dynamically import the module

// #endregion
import { StopWorker } from "./ICAOWorker.js";
console.log("before load modal");

(function () {
  console.log("Hello from inside the SIF");
})();

console.log("DOMContentLoaded");
var modalElement = document.getElementById("icao-modal");

console.log("shown.bs.modal");
// #region Bootstrap tootltip setup
// Enable bootstrap tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
// #endregion
// #region UseEffects
// ---------------- apply effects ----------------------

export const onICAOScriptLoad = async () => {
  const {
    CaptureImage,
    ClearICAOServiceThread,
    ConnectCamera,
    EnrolmentDevices,
    FaceDetectedRectangleDrawingThread,
    GetConnectionState,
    Reconnect,
    RetrieveScripts,
    SaveCaptureedImg,
    StopCameraIndicatorInBrowser,
    StopCheckingICAOServiceThread,
    cachedCamera,
    connectwithCameraFromLocalStorage,
    enumerateDevices,
    getSelectedCameraFromLocalStorage,
    handleChangeInAvaliableCameras,
    handleFullScreenChange,
    isCheckingICAOServiceThread,
    isICAO,
    reestCashedArray,
    setCachedCamera,
    setIsCheckingICAOServiceThread,
    setLableMessageForICAO,
    stopVideoStream,
    toggleFullScreen,
  } = await import("./utils.js");
  console.log({ isICAO });

  reestCashedArray();
  setIsCheckingICAOServiceThread(true);
  document.addEventListener("fullscreenchange", handleFullScreenChange);
  // document.addEventListener("keydown", handleKeyDown);
  if (isICAO) {
    try {
      RetrieveScripts(EnrolmentDevices.WebCam.Scripts);
    } catch (error) {
      console.log(error);
    }
  }

  const selecetedCameraIDFromLocalStorage = getSelectedCameraFromLocalStorage();
  setCachedCamera(selecetedCameraIDFromLocalStorage);
  enumerateDevices(selecetedCameraIDFromLocalStorage);
  let CheckingICAOServiceThread;
  if (isCheckingICAOServiceThread && isICAO) {
    console.log({ isICAO });
    console.log({ isCheckingICAOServiceThread });

    CheckingICAOServiceThread = setInterval(() => {
      if (isCheckingICAOServiceThread && isICAO) {
        GetConnectionState().then((ConnectionState) => {
          setLableMessageForICAO(ConnectionState);
          const lblMessageError = document.getElementById("lblMessageForICAO");
          lblMessageError
            ? (lblMessageError.innerText = ConnectionState)
            : null;

          // $("#lblMessageForICAO")?.text(ConnectionState);
        });
      }
    }, 1000);
  } else {
    ClearICAOServiceThread(CheckingICAOServiceThread);
  }

  // #endregion
  // #region HTML elements
  const modalCloseBtn = document.getElementById("top-row-close-icon");
  const croppedImage = document.getElementById("cropped");
  croppedImage.src = "";
  croppedImage.style.display = "none";
  const connectCameraBtn = document.getElementById("connect-camera-btn");
  const captureImageBtn = document.getElementById("capture-image-btn");
  const enumerateDevicesBtn = document.getElementById("enumerate-devices-btn");
  const avaliableCamerasSelect = document.getElementById("cbAvaliableCameras");
  const saveImageBtn = document.getElementById("save-image");
  const toggleFullScreenBtn = document.querySelector(".toggle-full-screen");
  const openFullScreenBtn = document.getElementById("open-full-screen");
  const closeFullScreenBtn = document.getElementById("close-full-screen");
  closeFullScreenBtn.style.display = "none";
  const reconnectIcaoBtn = document.getElementById("reconnect-icao-btn");

  const saveCroppedImageContainer = document.getElementById(
    "save-captured-image-btn-container"
  );
  saveCroppedImageContainer.style.display = "none";
  // #endregion

  let isFullScreen = false;

  // #region events

  avaliableCamerasSelect.addEventListener("change", (e) => {
    connectwithCameraFromLocalStorage();
    handleChangeInAvaliableCameras(e);
  });

  saveImageBtn.addEventListener("click", () => {
    SaveCaptureedImg();
  });
  reconnectIcaoBtn.addEventListener("click", () => {
    Reconnect();
  });

  toggleFullScreenBtn.addEventListener("click", () => {
    console.log("toggleFullScreenBtn is clicked");
    isFullScreen = !isFullScreen;
    toggleFullScreen();
    if (isFullScreen && !document.fullscreenElement) {
      openFullScreenBtn.style.display = "none";
      closeFullScreenBtn.style.display = "block";
    } else {
      closeFullScreenBtn.style.display = "none";
      openFullScreenBtn.style.display = "block";
    }
  });

  enumerateDevicesBtn.addEventListener("click", () => {
    console.log("enumerateDevicesBtn is clicked");

    enumerateDevices(cachedCamera);
  });
  connectCameraBtn.addEventListener("click", () => {
    console.log("connectCameraBtn is clicked");
    saveCroppedImageContainer.style.display = "none";
    const selecetedCameraIDFromLocalStorage =
      getSelectedCameraFromLocalStorage();
    try {
      ConnectCamera(selecetedCameraIDFromLocalStorage);
    } catch (error) {
      console.log(error);
    }
  });

  captureImageBtn.addEventListener("click", () => {
    console.log("captureImageBtn is clicked");
    CaptureImage();
  });

  modalCloseBtn.addEventListener("click", () => {
    console.log("close btn clicked");
    //   setShowICAOModal(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
      closeFullScreenBtn.style.display = "none";
      openFullScreenBtn.style.display = "block";
      //   setIsFullScreen(false);
    }
    stopVideoStream();
    StopCameraIndicatorInBrowser();
    StopCheckingICAOServiceThread();
    document.getElementById("icao-modal-start-container").remove();
    removeScript("./scripts/script.js");
    removeStyleSheet("./styles/styles.css");

    clearInterval(FaceDetectedRectangleDrawingThread);
  });

  if (isICAO) {
    croppedImage.classList.add("icao-img-width");
    croppedImage.classList.remove("no-icao-width");
  } else {
    croppedImage.classList.add("no-icao-width");
    croppedImage.classList.remove("icao-img-width");
  }
};

onICAOScriptLoad();
// #endregion

modalElement.addEventListener("hidden.bs.modal", function () {
  console.log("modal closed");
  // reset cashed array for tooltip
  setIsCheckingICAOServiceThread(false);
  StopWorker();
  reestCashedArray();
  stopVideoStream();
  window.stream = null; // by Ali

  if (document.fullscreenElement) {
    document.exitFullscreen();
    closeFullScreenBtn.style.display = "none";
    openFullScreenBtn.style.display = "block";
  }

  modalElement.removeEventListener("fullscreenchange", handleFullScreenChange);

  // Remove the script element
  // stopVideoStream();
});
