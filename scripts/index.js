import { StopWorker } from "./ICAOWorker.js";
import {
  loadScript,
  loadStyle,
  removeScript,
  removeStyleSheet,
} from "./common.js";
class ICaoChecker extends HTMLElement {
  constructor() {
    super();
    // this.attachShadow({ mode: "open" });
    this.isICAOWC = false;
  }

  connectedCallback() {
    const hasisICAOWCAttr = this.getAttribute("isICAOWC");
    console.log({ hasisICAOWCAttr });
    if (hasisICAOWCAttr === null) {
      this.isICAOWC = false;
    } else {
      this.isICAOWC = true;
    }
    this.loadBootstrap();
    console.log("connectedCallback()");
    const shadowRoot = this.attachShadow({ mode: "open" });
    // Create button to open modal
    this.initICAOModal();
    const openMOdalBtn = document.getElementById("open-icao-modal");
    openMOdalBtn.addEventListener(
      "click",
      this.openModalAndoadIcaoScripts.bind(this)
    );
    // Append button to the shadow DOM

    // shadowRoot.appendChild(button);
  }
  disconnectedCallback() {
    console.log("disconnectedCallback");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute ${name} has changed from ${oldValue} to ${newValue}.`
    );
  }
  initICAOModal() {
    // Create modal structure
    const modal = document.createElement("div");
    modal.id = "icao-modal-start-container";
    modal.innerHTML = `
       <div 
       class="modal fade icao-modal-container p-0 m-0"
       id="icao-modal" 
       tabindex="-1" 
       role="dialog" 
       aria-labelledby="exampleModalLabel" 
       aria-hidden="true">
           <div class="modal-dialog modal-xl mt-0 icao-container-modal" role="document">
               <div class="modal-content">
               
                   <div class="modal-body">
                      
                 <div class="icao-container">
                   <!-- div.icao-header-container -->
                   <div class="icao-header-container">
                     <!-- error message row -->

                     <div
                       class="icao-error-message display-flex-centered"
                       id="divICAOCheckingMessage"
                     ></div>

                     <!-- top row close icon -->
                     <div
                       class="top-row-close-icon"
                       id="top-row-close-icon"
                       data-bs-dismiss="modal"
                       aria-label="Close"
                       data-dismiss="modal"
                     >
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="16"
                         height="16"
                         fill="currentColor"
                         class="bi bi-x"
                         viewBox="0 0 16 16"
                       >
                         <path
                           d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                         />
                       </svg>
                     </div>
                   </div>
                   <div class="icao-video-container display-flex-centered">
                     <div class="image-container">
                       <div class="profile-image display-flex-centered">
                         <img
                           id="cropped"
                           class="icao-cropped-image animate-display"
                           alt="cropped image"
                         />

                         <canvas id="canvas"></canvas>
                         <video id="video" ref="{videoRef}"></video>
                       </div>

                       <div class="data-conatiner">
                         <!--#region left column -->
                         <div
                           id="left-features"
                           class="left-column flex-column-space-around-center"
                         >
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-sharpness"
                             data-bs-placement="right"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/sharpness.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-brightness"
                             data-bs-placement="right"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/brightness.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-contrast"
                             data-bs-placement="right"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/contrast.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-uniqueintensitylevels"
                             data-bs-placement="right"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/Intensitylevels.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-shadow"
                             data-bs-placement="right"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/shadow.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-noseshadow"
                             data-bs-placement="right"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/noseshadow.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-specularity"
                             data-bs-placement="right"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/specularity.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-eyegaze"
                             data-bs-placement="right"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/eyegaze.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-eyestatusr"
                             data-bs-placement="right"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/eyestatusr.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-eyestatusl"
                             data-bs-placement="right"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/eyestatusl.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                         </div>
                         <!--#endregion -->
                         <!-- middle-column -->
                         <div
                           id="icao-status-instructions"
                           class="middle-column flex-column-space-around-center p-4"
                         >
                           <div
                             class="icao-reconnect-container flex-column-space-around-center"
                           >
                             <!-- icao-reconnect-message -->
                             <!--
                         style={{ color: isDeviceAvailable ? "white" : "red" , }}
                          -->
                             <p
                               id="lblMessageForICAO"
                               class="icao-reconnect-label text-white"
                             ></p>
                             <p class="icao-reconnect-instrcutions">
                               Please click the button to reconnect.
                             </p>
                             <button
                               class="btn btn-primary"
                               id="reconnect-icao-btn"
                             >
                               Connect to ICAO
                             </button>
                           </div>
                         </div>

                         <!-- right column -->
                         <div
                           id="right-features"
                           class="right-column flex-column-space-around-center"
                         >
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-glassstatus"
                             data-bs-placement="left"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/glassstatus.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-heavyframe"
                             data-bs-placement="left"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/heavyframe.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-mouthstatus"
                             data-bs-placement="left"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/mousestatus.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-backgrounduniformity"
                             data-bs-placement="left"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/backgrounduniformity.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-redeyer"
                             data-bs-placement="left"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/redeyer.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-redeyel"
                             data-bs-placement="left"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/redeyel.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-roll"
                             data-bs-placement="left"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/roll.svg"
                               class="icon-svg white-svg"
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-yaw"
                             data-bs-placement="left"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/yaw.svg"
                               class="icon-svg white-svg"
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-pitch"
                             data-bs-placement="left"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/pitch.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                           <div
                             class="icao-card-container display-flex-centered icao-white-background"
                             data-bs-toggle="tooltip"
                             data-bs-html="true"
                             id="icao-face-feature-faceconfidence"
                             data-bs-placement="left"
                             data-bs-title="0"
                           >
                             <img
                               src="./assets/icao-attributes/faceconfidence.svg"
                               class="icon-svg white-svg"
                               white-svg
                               alt=""
                             />
                           </div>
                         </div>
                         <!-- )} -->
                         <!-- connect camera / capture image -->
                         <!-- {isPhotoCaptured ? ( -->
                         <div
                           id="connect-camera-btn-container"
                           class="connect-camera-btn display-flex-centered"
                         >
                           <!-- disabled={!isDeviceAvailable} -->
                           <button id="connect-camera-btn">
                             <svg
                               xmlns="http://www.w3.org/2000/svg"
                               width="16"
                               height="16"
                               fill="currentColor"
                               class="bi bi-camera-video-fill"
                               viewBox="0 0 16 16"
                             >
                               <path
                                 fill-rule="evenodd"
                                 d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"
                               />
                             </svg>
                           </button>
                         </div>
                         <!-- ) : ( -->
                         <div
                           id="capture-image-btn-container"
                           class="capture-image-btn display-flex-centered"
                         >
                           <!-- disabled={!isDeviceConnected} -->
                           <button id="capture-image-btn">
                             <svg
                               xmlns="http://www.w3.org/2000/svg"
                               width="16"
                               height="16"
                               fill="currentColor"
                               class="bi bi-camera-fill"
                               viewBox="0 0 16 16"
                             >
                               <path
                                 d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"
                               />
                               <path
                                 d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"
                               />
                             </svg>
                             <!-- <CameraFill /> -->
                           </button>
                         </div>
                         <!-- )} -->
                       </div>
                     </div>
                   </div>

                   <!-- bottom row -->
                   <div class="bottom-row">
                     <!-- connect sercive - get media devices -->
                     <div class="icao-get-media-devices">
                       <!-- show/hide availabe cameras -->

                       <div class="icao-available-cams">
                         <div
                           id="icao-getDevicesTooltip"
                           class="icao-getDevicesTooltip"
                           data-bs-toggle="tooltip"
                           data-bs-placement="top"
                           data-bs-title="Get Devices"
                         >
                           <div id="enumerate-devices-btn">
                             <svg
                               xmlns="http://www.w3.org/2000/svg"
                               width="16"
                               height="16"
                               fill="currentColor"
                               class="bi bi-arrow-clockwise"
                               viewBox="0 0 16 16"
                             >
                               <path
                                 fill-rule="evenodd"
                                 d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                               />
                               <path
                                 d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"
                               />
                             </svg>
                           </div>
                         </div>

                         <select
                           class="form-select select-row select-avaliable-cameras"
                           aria-label="select camera"
                           value="-1"
                           id="cbAvaliableCameras"
                         >
                           <option disabled value="-1">Select Camera</option>
                         </select>
                       </div>
                     </div>

                     <!-- save captured image -->
                     <!-- {isPhotoCaptured ? ( -->
                     <div
                       id="save-captured-image-btn-container"
                       class="save-captured-image-btn display-flex-centered"
                     >
                       <!-- disabled="{!isPhotoCaptured}" -->
                       <button id="save-image" data-bs-dismiss="modal">
                         <!-- <FiSave></FiSave> -->
                         Next
                       </button>
                     </div>
                     <!-- ) : null} -->

                     <!-- toggle fullscreen -->
                     <div class="toggle-full-screen">
                       <button
                         id="open-full-screen"
                         class="toggle-full-screen-btn"
                       >
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           fill="currentColor"
                           class="bi bi-fullscreen"
                           viewBox="0 0 16 16"
                         >
                           <path
                             d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"
                           />
                         </svg>
                       </button>
                       <button
                         id="close-full-screen"
                         class="toggle-full-screen-btn"
                       >
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           fill="currentColor"
                           class="bi bi-fullscreen-exit"
                           viewBox="0 0 16 16"
                         >
                           <path
                             d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z"
                           />
                         </svg>
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
                   </div>
                  
               </div>
           </div>
       </div>
   `;

    // Append modal to the regular DOM
    document.body.appendChild(modal);
  }
  openModalAndoadIcaoScripts() {
    this.openModal(this);
    // loadScript("./scripts/script.js");
    loadStyle("./styles/styles.css");
  }
  loadBootstrap() {
    // Load necessary scripts and styles
    loadScript("https://code.jquery.com/jquery-3.5.1.min.js")
      .then(() =>
        loadScript(
          "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
        )
      )
      .then(() =>
        loadScript(
          // "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        )
      )
      .then(() =>
        loadStyle(
          // "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        )
      )
      .then()
      .catch((err) => console.error("Error loading scripts or styles", err));
  }

  initializeBootstrap() {
    // Manually initialize all Bootstrap modals within the shadow DOM
    const modals = this.shadowRoot.querySelectorAll(".modal");
    console.log({ modals });
    modals.forEach((modal) => {
      new window.bootstrap.Modal(modal);
    });

    // Initialize tooltips
    const tooltipTriggerList = this.shadowRoot.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  async openModal() {
    // Create modal structure
    // const modal = document.createElement("div");
    // modal.id = "icao-modal-start-container";
    // modal.innerHTML = `
    //     <div
    //     class="modal fade icao-modal-container p-0 m-0"
    //     id="icao-modal"
    //     tabindex="-1"
    //     role="dialog"
    //     aria-labelledby="exampleModalLabel"
    //     aria-hidden="true">
    //         <div class="modal-dialog modal-xl mt-0 icao-container-modal" role="document">
    //             <div class="modal-content">

    //                 <div class="modal-body">

    //               <div class="icao-container">
    //                 <!-- div.icao-header-container -->
    //                 <div class="icao-header-container">
    //                   <!-- error message row -->

    //                   <div
    //                     class="icao-error-message display-flex-centered"
    //                     id="divICAOCheckingMessage"
    //                   ></div>

    //                   <!-- top row close icon -->
    //                   <div
    //                     class="top-row-close-icon"
    //                     id="top-row-close-icon"
    //                     data-bs-dismiss="modal"
    //                     aria-label="Close"
    //                     data-dismiss="modal"
    //                   >
    //                     <svg
    //                       xmlns="http://www.w3.org/2000/svg"
    //                       width="16"
    //                       height="16"
    //                       fill="currentColor"
    //                       class="bi bi-x"
    //                       viewBox="0 0 16 16"
    //                     >
    //                       <path
    //                         d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
    //                       />
    //                     </svg>
    //                   </div>
    //                 </div>
    //                 <div class="icao-video-container display-flex-centered">
    //                   <div class="image-container">
    //                     <div class="profile-image display-flex-centered">
    //                       <img
    //                         id="cropped"
    //                         class="icao-cropped-image animate-display"
    //                         alt="cropped image"
    //                       />

    //                       <canvas id="canvas"></canvas>
    //                       <video id="video" ref="{videoRef}"></video>
    //                     </div>

    //                     <div class="data-conatiner">
    //                       <!--#region left column -->
    //                       <div
    //                         id="left-features"
    //                         class="left-column flex-column-space-around-center"
    //                       >
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-sharpness"
    //                           data-bs-placement="right"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/sharpness.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-brightness"
    //                           data-bs-placement="right"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/brightness.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-contrast"
    //                           data-bs-placement="right"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/contrast.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-uniqueintensitylevels"
    //                           data-bs-placement="right"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/Intensitylevels.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-shadow"
    //                           data-bs-placement="right"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/shadow.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-noseshadow"
    //                           data-bs-placement="right"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/noseshadow.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-specularity"
    //                           data-bs-placement="right"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/specularity.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-eyegaze"
    //                           data-bs-placement="right"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/eyegaze.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-eyestatusr"
    //                           data-bs-placement="right"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/eyestatusr.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-eyestatusl"
    //                           data-bs-placement="right"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/eyestatusl.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                       </div>
    //                       <!--#endregion -->
    //                       <!-- middle-column -->
    //                       <div
    //                         id="icao-status-instructions"
    //                         class="middle-column flex-column-space-around-center p-4"
    //                       >
    //                         <div
    //                           class="icao-reconnect-container flex-column-space-around-center"
    //                         >
    //                           <!-- icao-reconnect-message -->
    //                           <!--
    //                       style={{ color: isDeviceAvailable ? "white" : "red" , }}
    //                        -->
    //                           <p
    //                             id="lblMessageForICAO"
    //                             class="icao-reconnect-label text-white"
    //                           ></p>
    //                           <p class="icao-reconnect-instrcutions">
    //                             Please click the button to reconnect.
    //                           </p>
    //                           <button
    //                             class="btn btn-primary"
    //                             id="reconnect-icao-btn"
    //                           >
    //                             Connect to ICAO
    //                           </button>
    //                         </div>
    //                       </div>

    //                       <!-- right column -->
    //                       <div
    //                         id="right-features"
    //                         class="right-column flex-column-space-around-center"
    //                       >
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-glassstatus"
    //                           data-bs-placement="left"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/glassstatus.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-heavyframe"
    //                           data-bs-placement="left"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/heavyframe.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-mouthstatus"
    //                           data-bs-placement="left"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/mousestatus.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-backgrounduniformity"
    //                           data-bs-placement="left"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/backgrounduniformity.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-redeyer"
    //                           data-bs-placement="left"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/redeyer.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-redeyel"
    //                           data-bs-placement="left"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/redeyel.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-roll"
    //                           data-bs-placement="left"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/roll.svg"
    //                             class="icon-svg white-svg"
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-yaw"
    //                           data-bs-placement="left"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/yaw.svg"
    //                             class="icon-svg white-svg"
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-pitch"
    //                           data-bs-placement="left"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/pitch.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                         <div
    //                           class="icao-card-container display-flex-centered icao-white-background"
    //                           data-bs-toggle="tooltip"
    //                           data-bs-html="true"
    //                           id="icao-face-feature-faceconfidence"
    //                           data-bs-placement="left"
    //                           data-bs-title="0"
    //                         >
    //                           <img
    //                             src="./assets/icao-attributes/faceconfidence.svg"
    //                             class="icon-svg white-svg"
    //                             white-svg
    //                             alt=""
    //                           />
    //                         </div>
    //                       </div>
    //                       <!-- )} -->
    //                       <!-- connect camera / capture image -->
    //                       <!-- {isPhotoCaptured ? ( -->
    //                       <div
    //                         id="connect-camera-btn-container"
    //                         class="connect-camera-btn display-flex-centered"
    //                       >
    //                         <!-- disabled={!isDeviceAvailable} -->
    //                         <button id="connect-camera-btn">
    //                           <svg
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             width="16"
    //                             height="16"
    //                             fill="currentColor"
    //                             class="bi bi-camera-video-fill"
    //                             viewBox="0 0 16 16"
    //                           >
    //                             <path
    //                               fill-rule="evenodd"
    //                               d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"
    //                             />
    //                           </svg>
    //                         </button>
    //                       </div>
    //                       <!-- ) : ( -->
    //                       <div
    //                         id="capture-image-btn-container"
    //                         class="capture-image-btn display-flex-centered"
    //                       >
    //                         <!-- disabled={!isDeviceConnected} -->
    //                         <button id="capture-image-btn">
    //                           <svg
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             width="16"
    //                             height="16"
    //                             fill="currentColor"
    //                             class="bi bi-camera-fill"
    //                             viewBox="0 0 16 16"
    //                           >
    //                             <path
    //                               d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"
    //                             />
    //                             <path
    //                               d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"
    //                             />
    //                           </svg>
    //                           <!-- <CameraFill /> -->
    //                         </button>
    //                       </div>
    //                       <!-- )} -->
    //                     </div>
    //                   </div>
    //                 </div>

    //                 <!-- bottom row -->
    //                 <div class="bottom-row">
    //                   <!-- connect sercive - get media devices -->
    //                   <div class="icao-get-media-devices">
    //                     <!-- show/hide availabe cameras -->

    //                     <div class="icao-available-cams">
    //                       <div
    //                         id="icao-getDevicesTooltip"
    //                         class="icao-getDevicesTooltip"
    //                         data-bs-toggle="tooltip"
    //                         data-bs-placement="top"
    //                         data-bs-title="Get Devices"
    //                       >
    //                         <div id="enumerate-devices-btn">
    //                           <svg
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             width="16"
    //                             height="16"
    //                             fill="currentColor"
    //                             class="bi bi-arrow-clockwise"
    //                             viewBox="0 0 16 16"
    //                           >
    //                             <path
    //                               fill-rule="evenodd"
    //                               d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
    //                             />
    //                             <path
    //                               d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"
    //                             />
    //                           </svg>
    //                         </div>
    //                       </div>

    //                       <select
    //                         class="form-select select-row select-avaliable-cameras"
    //                         aria-label="select camera"
    //                         value="-1"
    //                         id="cbAvaliableCameras"
    //                       >
    //                         <option disabled value="-1">Select Camera</option>
    //                       </select>
    //                     </div>
    //                   </div>

    //                   <!-- save captured image -->
    //                   <!-- {isPhotoCaptured ? ( -->
    //                   <div
    //                     id="save-captured-image-btn-container"
    //                     class="save-captured-image-btn display-flex-centered"
    //                   >
    //                     <!-- disabled="{!isPhotoCaptured}" -->
    //                     <button id="save-image" data-bs-dismiss="modal">
    //                       <!-- <FiSave></FiSave> -->
    //                       Next
    //                     </button>
    //                   </div>
    //                   <!-- ) : null} -->

    //                   <!-- toggle fullscreen -->
    //                   <div class="toggle-full-screen">
    //                     <button
    //                       id="open-full-screen"
    //                       class="toggle-full-screen-btn"
    //                     >
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="16"
    //                         height="16"
    //                         fill="currentColor"
    //                         class="bi bi-fullscreen"
    //                         viewBox="0 0 16 16"
    //                       >
    //                         <path
    //                           d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"
    //                         />
    //                       </svg>
    //                     </button>
    //                     <button
    //                       id="close-full-screen"
    //                       class="toggle-full-screen-btn"
    //                     >
    //                       <svg
    //                         xmlns="http://www.w3.org/2000/svg"
    //                         width="16"
    //                         height="16"
    //                         fill="currentColor"
    //                         class="bi bi-fullscreen-exit"
    //                         viewBox="0 0 16 16"
    //                       >
    //                         <path
    //                           d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z"
    //                         />
    //                       </svg>
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //                 </div>

    //             </div>
    //         </div>
    //     </div>
    // `;

    // // Append modal to the regular DOM
    // document.body.appendChild(modal);
    console.log("Adding script...........");
    // Remove existing script element if it exists
    const existingScript = document.querySelector(
      'script[src="./scripts/script.js"]'
    );
    if (existingScript) {
      console.log("exist");
      existingScript.remove();
    }
    // Initialize the modal with Bootstrap's jQuery method
    const modal = document.getElementById("icao-modal-start-container");
    console.log({ modal });
    // $(modal).find(".modal").modal("show");

    const innerModal = modal.querySelector(".modal");
    if (innerModal) {
      innerModal.addEventListener("shown.bs.modal", async () => {
        // Your async function code here
        console.log(
          "Hiiiiiiiiiiiiii from inside shown modal -------------------"
        );

        const { onICAOScriptLoad } = await import("./script.js");
        onICAOScriptLoad(this.isICAOWC);
      });
    }
    if (innerModal) {
      innerModal.addEventListener("hidden.bs.modal", async function () {
        // Your async function code here
        console.log(
          "Hiiiiiiiiiiiiii from hidden shown modal -------------------"
        );
        const {
          setIsCheckingICAOServiceThread,
          reestCashedArray,
          stopVideoStream,
          ClearICAOServiceThread,
          isCheckingICAOServiceThread,
          utils,
          isICAO,
          EnrolmentDevices,
          utilsCommonVars,
        } = await import("./utils.js");
        const myUtils = (await import("./utils.js")).utils;
        console.log({ myUtils });
        console.log({ isICAO });
        console.log({ utilsCommonVars });

        setIsCheckingICAOServiceThread(false);
        StopWorker();
        reestCashedArray();
        stopVideoStream();
        ClearICAOServiceThread(utils.CheckingICAOServiceThread);

        window.stream = null;

        removeScript("./scripts/script.js");
        removeScript("./scripts/utils.js");
        EnrolmentDevices.WebCam.Scripts.map((script) => {
          removeScript(script);
        });
        console.log({ isCheckingICAOServiceThread });
      });
    }

    if (innerModal) {
      const bootstrapModal = new bootstrap.Modal(innerModal);
      bootstrapModal.show();
      // const { onICAOScriptLoad } = await import("./script.js");
      // onICAOScriptLoad();
    }

    // load icao scripts()
    loadScript("./scripts/utils.js");
    loadScript("./scripts/script.js");
    // on show modal
    // $(modal)
    //   .find(".modal")
    //   .on("shown.bs.modal", async function () {
    //     console.log("Hi shown.bs.modal from index.js");
    //     const { onICAOScriptLoad } = await import("./script.js");
    //     onICAOScriptLoad();
    //     const tooltipTriggerList = document.querySelectorAll(
    //       '[data-bs-toggle="tooltip"]'
    //     );
    //     const tooltipList = [...tooltipTriggerList].map(
    //       (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    //     );
    //   });

    // on hide moda Remove modal from DOM when hidden to clean up
    // $(modal)
    //   .find(".modal")
    //   .on("hidden.bs.modal", async () => {
    //     const {
    //       setIsCheckingICAOServiceThread,
    //       reestCashedArray,
    //       stopVideoStream,
    //     } = await import("./utils.js");
    //     setIsCheckingICAOServiceThread(false);
    //     StopWorker();
    //     reestCashedArray();
    //     stopVideoStream();
    //     window.stream = null;

    //     const openFullScreenBtn = document.getElementById("open-full-screen");
    //     const closeFullScreenBtn = document.getElementById("close-full-screen");
    //     if (document.fullscreenElement) {
    //       document.exitFullscreen();
    //       closeFullScreenBtn.style.display = "none";
    //       openFullScreenBtn.style.display = "block";
    //     }
    //     // removeScript("./scripts/script.js");
    //     // removeScript("./scripts/utils.js");
    //     // removeStyleSheet("./styles/styles.css");

    //     // modal.remove();
    //     console.log("modal closed");
    //   });
  }

  // static get styles() {
  //   return css`
  //     :host {
  //       display: block;
  //     }
  //     .container {
  //       padding: 16px;
  //     }
  //   `;
  // }
}

// customElements.define("icao-checker-wc", ICaoChecker);

if (!customElements.get("icao-checker-wc")) {
  customElements.define("icao-checker-wc", ICaoChecker);
}
