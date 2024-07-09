import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class ICaoChecker extends LitElement {
  static get properties() {
    return {
      rating: { type: Number },
      vote: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.rating = 0;
    this.vote = null;
    console.log(this);
  }

  firstUpdated() {
    // this.loadBootstrap();
    this.loadScripts();
    this.loadStyles();
    this.createRenderRoot();
  }
  createRenderRoot() {
    return this.attachShadow({ mode: "open" });
    console.log(this.shadowRoot);
    return this;
  }

  willUpdate(changedProps) {
    if (changedProps.has("vote")) {
      const newValue = this.vote;
      const oldValue = changedProps.get("vote");

      if (newValue === "up") {
        if (oldValue === "down") {
          this.rating += 2;
        } else {
          this.rating += 1;
        }
      } else if (newValue === "down") {
        if (oldValue === "up") {
          this.rating -= 2;
        } else {
          this.rating -= 1;
        }
      }
    }
  }

  loadBootstrap() {
    // Load Bootstrap CSS
    const bootstrapLink = document.createElement("link");
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    bootstrapLink.integrity =
      "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH";
    bootstrapLink.crossOrigin = "anonymous";
    this.shadowRoot.appendChild(bootstrapLink);

    // Load Bootstrap JS
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.integrity =
      "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
    bootstrapScript.crossOrigin = "anonymous";
    bootstrapScript.onload = () => this.initializeBootstrap();
    this.shadowRoot.appendChild(bootstrapScript);
  }

  loadScripts() {
    // Load external scripts
    const icaoScript = document.createElement("script");
    icaoScript.src = "./scripts/script.js";
    icaoScript.type = "module";

    this.shadowRoot.appendChild(icaoScript);
  }

  loadStyles() {
    // Load external CSS file
    const stylesLink = document.createElement("link");
    stylesLink.rel = "stylesheet";
    stylesLink.href = "./styles/styles.css"; // Path to your external CSS file
    this.shadowRoot.appendChild(stylesLink);
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

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  
  
        <div class="container">
          <h5 class="mt-4">ICAO-Checker- JS ONLY</h5>
  
          <div class="modal-container">
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#icao-modal"
            >
              Launch demo modal
            </button>
  
            <!-- Modal -->
            <div
              class="modal fade icao-modal-container p-0 m-0"
              id="icao-modal"
              tabindex="-1"
              aria-labelledby="icao-modalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl mt-0 icao-container-modal">
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
                              class="middle-column flex-column-space-around-center"
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
  
          <div class="result-image card mt-4 p-4" style="height: 314px">
            <img id="result-image" src="" alt="" width="200px" />
          </div>
        </div>
      `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .container {
        padding: 16px;
      }
    `;
  }
}

customElements.define("icao-checker", ICaoChecker);
