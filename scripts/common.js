export function removeScript(src) {
  const scriptToRemove = document.querySelector(`script[src="${src}"]`);

  if (scriptToRemove) {
    scriptToRemove.remove();
  }
}
export function removeStyleSheet(href) {
  const styleSheetToRemove = document.querySelector(`link[href="${href}"]`);
  if (styleSheetToRemove) {
    styleSheetToRemove.remove();
  }
}

export function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = src;
      script.type = "module";
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script ${src}`));
      document.head.appendChild(script);
    }
  });
}

export function loadStyle(href) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
    } else {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load style ${href}`));
      document.head.appendChild(link);
    }
  });
}
export const html = (strings, ...values) => {
  return strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");
};

export const modalInnerHtml = html`
  <style>
    .icao-modal-container {
      padding: 0 !important;
      overflow: auto;
      /* background: rgba(0, 0, 0, 0.7); */
      background-color: transparent;
      width: 100%;
      height: 100%;
    }

    .icao-modal-container .modal-content {
      /* border-radius: 20px; */
      background: transparent;
      margin: 0 auto;
      /* width: auto; */
      border: none;
      /* width: 100%; */
      width: fit-content;
      height: 100%;
    }

    .modal-dialog.modal-dialog-centered {
      margin-top: 10px;
      margin-bottom: 5px;
      justify-content: center;
    }

    .icao-modal-container .modal-dialog.modal-dialog-centered {
      min-width: 730px;
    }

    .icao-left {
      flex-basis: 29%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .icao-reconnect,
    .icao-available-cams {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }

    /*
p.icao-reconnect-label {
  margin: 0;
  border-left: 1px solid lightgray;
  padding-left: 10px;
} */

    select.select-avaliable-cameras {
      margin: 0;
      border: none;
      padding: 0 5px 0px 7px;
      background: inherit;
      color: white;
    }

    select#cbAvaliableCameras option {
      background: rgba(0, 0, 0, 0.8);
    }

    .border-padding-radius {
      border: 1px solid lightgray;
      padding: 10px;
      border-radius: 10px;
    }

    .icao-title {
      background: #e3e1e5;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 12px;

      padding: 13px 16px;
      margin-bottom: 0;

      border-radius: 10px;

      color: black;
      font-weight: bold;
      font-size: 1rem;
    }

    .icao-buttons-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.5rem;
      padding: 1rem;

      border: 1px solid #a3a3a3;
      border-radius: 10px;
      height: 100%;
    }

    .icao-modal-container .modal-header {
      border-bottom: 1px solid lightgray !important;
      padding-top: 7px;
      padding-bottom: 7px;
    }

    .icao-buttons-container button {
      height: 38px;
    }

    .flex-column-gap-1rem {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .icao-available-cams svg,
    .icao-reconnect.icao-btn svg {
      width: 25px;
      height: 25px;
    }

    /* .icao-container  */
    /* .icao-video-container */
    /* .image-container */
    /* .profile-image */
    /* cropped */
    img#cropped {
      margin: 0 auto;
    }
    /* video */
    #video {
      width: 100%;
    }

    .icao-header-container {
      display: grid;
      grid-template-columns: repeat(8, 1fr);

      width: 95%;
      height: 30px;
      /* height: 5%; */
      /* padding-bottom: 10px; */
    }

    .icao-error-message {
      height: 30px;
      text-align: center;
      color: red;
      grid-area: 1/1/2/8;
      display: none;
      padding: 0;
    }

    /* close button */
    .icao-header-container .top-row-close-icon {
      /* grid-area: 1/8/1/9; */
      cursor: pointer;
      color: white;

      grid-area: 1/8/2/9;
      justify-self: end;
    }

    .icao-header-container .top-row-close-icon:hover {
      color: red;
    }
    .top-row-close-icon svg,
    .toggle-full-screen svg {
      width: 25px;
      height: 25px;
    }

    .icao-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      padding: 5px;
      border-radius: 12px;
      background: #353945;

      /* width: fit-content; */
      width: 835px;
      height: 100%;

      /* min-height: 75vh; */
      margin: 0 auto;
      /* min-height: 600px; */
    }

    .icao-error-message,
    .icao-reconnect label,
    .icao-available-cams label {
      line-height: 30px;
      font-size: 0.9rem;
    }

    .icao-video-container {
      width: 100%;
      /* height: 90%; */
      padding-bottom: 10px;

      /* min-height: 525px; */
    }

    .image-container {
      position: relative;
      margin: 0 auto;

      border-radius: 10px;

      width: 100%;
      height: 100%;
      /* min-height: 525px; */
      min-height: 83vh;

      /* background-color: #526d82; */
    }

    .profile-image {
      width: 100%;
      height: 100%;
      /* min-height: 525px; */
      margin: 0 auto;
    }

    .profile-image.profile-image-fullscreen {
      /* min-width: 920px; */
    }

    .icao-cropped-image {
      display: none;
      align-self: start;
      /* width: 375px; */
      /* width: 40%; */
      border-radius: 8px;
    }

    .profile-image video {
      /* width: 100%; */
      height: 100%;
      /* min-height: 525px; */
      min-height: 83vh;
      /* aspect-ratio: 1 / 1; */
      border-radius: 10px;
      border: 1px solid gray;
      /* transform: scaleX(-1); */
    }

    .data-conatiner {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(10, 1fr);
      grid-column-gap: 0px;
      grid-row-gap: 0px;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 100%;
      min-width: 100%;
      /* max-width: 65vw; */

      height: 100%;
    }

    .data-conatiner-fullscreen {
      max-width: 65vw;
    }

    /* @media screen and  (min-width: 1440px) {
  .data-conatiner-fullscreen {
    max-width: 1315px;
  }
} */
    /* .data-conatiner .top-row {
  grid-area: 1 / 2 / 2 / 8;

  display: flex;
  justify-content: space-around;
  align-items: center;
} */

    .flex-column-space-around-center {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
    .data-conatiner .left-column {
      grid-area: 1 / 1 / 11 / 2;
      align-items: start;
      margin: 15%;
    }

    .middle-column {
      grid-area: 3 / 3 / 6 /7;

      background: rgba(0, 0, 0, 0.8);
      border-radius: 10px;
      border: 1px solid white;
    }

    .icao-reconnect-container {
      /* gap: 1rem;
  padding: 1rem;

  border-radius: 10px;
  height: 100%; */
    }

    p.icao-reconnect-instrcutions {
      color: white;
    }

    .data-conatiner .right-column {
      grid-area: 1 /8 / 11 / 9;
      align-items: end;
      margin: 15%;
    }

    .data-conatiner .connect-camera-btn,
    .data-conatiner .capture-image-btn {
      grid-area: 9/4/11/6;
      align-self: center;
    }

    .data-conatiner .save-captured-image-btn button {
      padding: 5px 10px;
      border-radius: 5px;
      width: 3rem;
      height: 3rem;
    }

    .icao-container .bottom-row {
      /* display: flex;
  justify-content: space-between; */
      width: 95%;
      border-radius: 0 0 10px 10px;

      display: grid;
      grid-template-columns: repeat(14, 1fr);
      grid-template-rows: repeat(1, 1fr);

      height: auto;
    }

    .bottom-row .icao-get-media-devices {
      display: flex;
      justify-content: flex-start;
      gap: 1rem;
      /* align-items: flex-end; */
      align-items: center;

      grid-column-start: 1;
      grid-column-end: 7;
    }

    .toggle-available-cams-btn button {
      border-radius: 5px;
      padding: 10px;
    }

    /* test animation to show select cameras */

    .icao-available-cams {
      padding: 5px;
      border-radius: 10px;
      color: white;
      background: rgba(0, 0, 0, 0.8);
    }

    .show-available-cams {
      max-height: 200px;
    }

    .hide-available-cams {
      max-height: 0;
    }

    /* toggle fullscreen button */

    .toggle-full-screen {
      cursor: pointer;
      grid-column-start: 13;
      grid-column-end: 15;
      justify-self: end;
      display: flex;
      /* justify-content: center; */
      /* align-items: center; */
    }

    .toggle-full-screen button,
    .save-captured-image-btn button {
      border: none;
      color: white;
      background: rgba(0, 0, 0, 0.8);
      padding: 0.5rem;
      border-radius: 12px;
    }

    .bottom-row .save-captured-image-btn {
      grid-column-start: 7;
      grid-column-end: 9;
    }

    .display-flex-centered {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .bottom-row button {
      /* background: transparent;
  border: 1px solid lightgray;
  color: white; */
    }

    .bottom-row button:disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }

    .bottom-row img.capture-image,
    .toggle-modal-header-btn button svg,
    .bottom-row .save-captured-image-btn button svg {
      height: 25px;
      width: 25px;
    }

    .capture-image-btn button,
    .connect-camera-btn button {
      border-radius: 50%;
      background: white;
      outline: none;
      width: 4rem;
      height: 4rem;
      border: 1px solid gray;
      padding: 1rem;
    }

    .capture-image-btn button svg,
    .connect-camera-btn button svg {
      width: 100%;
      height: 100%;
    }
    .toggle-modal-header-btn button {
      padding: 5px;
    }

    #canvas {
      height: 525px;
      display: none;
      width: 100%;
      border-radius: 5px;
    }

    @keyframes scale-animation {
      from {
        transform: scale(1);
      }

      to {
        transform: scale(1.5);
      }
    }

    .animate-scale {
      animation: scale-animation 1.3s infinite;
      /* animation: flickerAnimation 1s infinite; */
    }

    .animate-display {
      display: none;
      animation: display-animation 1s ease-in-out;
    }

    @keyframes display-animation {
      0% {
        display: none;
      }

      100% {
        display: block;
      }
    }
    /*
.red-svg {
  filter: invert(30%) sepia(97%) saturate(7061%) hue-rotate(355deg)
    brightness(97%) contrast(120%);
}

.green-svg {
  filter: invert(51%) sepia(22%) saturate(5189%) hue-rotate(84deg)
    brightness(90%) contrast(121%);
}

.white-svg {
  filter: brightness(0) saturate(100%) invert(100%) sepia(8%) saturate(7499%)
    hue-rotate(288deg) brightness(115%) contrast(93%);
} */

    .icao-img-width {
      width: 40%;
    }

    .no-icao-width {
      width: 80%;
    }

    .icao-card-container {
      padding: 0.5rem;
      border: 0.5px solid lightgray;

      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.9);

      /* box-shadow: -5px 5px 5px 1px; */
    }

    .icao-tooltip-container {
      z-index: 20;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .cursor-not-allowed {
      cursor: not-allowed;
    }

    .icao-tooltip-container * {
      font-size: 0.7rem;
    }

    .icao-tooltip-container p {
      margin: 10px 0;
    }

    /* .icao-green-background {
  background-color: rgb(51, 102, 0);
} */

    .icao-green-background {
      background-color: #58bd7d;
      /* border: 3px solid #c8e7d0; */
      border: 3px solid rgba(200, 231, 208, 0.9);
    }

    /* .icao-red-background {
  background-color: #ff0000;
} */

    .icao-red-background {
      background-color: #ff6838;
      /* border: 3px solid #f5c3ac; */
      border: 3px solid rgba(245, 195, 172, 0.5);
    }

    .icao-black-background {
      background-color: rgba(0, 0, 0, 0.9);
    }

    .red-font {
      color: red;
    }

    .green-font {
      color: green;
    }
    .white-font {
      color: white;
    }

    .icon-svg-container {
      width: 22px;
      height: 22px;
    }
    .icon-svg-container-fullscreen {
      width: 30px;
      height: 30px;
    }

    .icon-svg {
      display: inline-block;
      width: 25px;
      height: 25px;
    }

    #result-image {
      border-radius: 10px;
    }
  </style>

  <div
    class="modal fade icao-modal-container p-0 m-0"
    id="icao-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-xl mt-0 icao-container-modal"
      role="document"
    >
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

                  <div id="left-features" class="left-column d-none">
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-sharpness"
                      data-bs-placement="right"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="78"
                        height="101"
                        viewBox="0 0 78 101"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0L78 101H0V0Z" fill="white" />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-brightness"
                      data-bs-placement="right"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="65"
                        height="65"
                        viewBox="0 0 65 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M34.4043 14.2203C33.7784 14.1558 33.1437 14.1225 32.5 14.1225C22.3661 14.1225 14.1225 22.3661 14.1225 32.5C14.1225 42.6334 22.3661 50.877 32.5 50.877C33.1437 50.877 33.7784 50.8442 34.4043 50.7792C43.6465 49.8236 50.8785 41.9913 50.8785 32.5C50.8785 23.0087 43.6465 15.1764 34.4043 14.2203ZM34.4043 46.9443V18.0553C41.542 18.9909 47.0704 25.1111 47.0704 32.5001C47.0704 39.8892 41.542 46.0091 34.4043 46.9443ZM32.5 11.3678C33.5513 11.3678 34.4043 10.5148 34.4043 9.46347V1.9043C34.4043 0.85249 33.5513 0 32.5 0C31.4482 0 30.5957 0.85249 30.5957 1.9043V9.46347C30.5957 10.5148 31.4482 11.3678 32.5 11.3678ZM32.5 53.6322C31.4482 53.6322 30.5957 54.4852 30.5957 55.5365V63.0957C30.5957 64.1475 31.4482 65 32.5 65C33.5513 65 34.4043 64.1475 34.4043 63.0957V55.5365C34.4043 54.4847 33.5518 53.6322 32.5 53.6322ZM11.3678 32.5C11.3678 31.4482 10.5148 30.5957 9.46347 30.5957H1.9043C0.85249 30.5957 0 31.4482 0 32.5C0 33.5513 0.85249 34.4043 1.9043 34.4043H9.46347C10.5148 34.4043 11.3678 33.5518 11.3678 32.5ZM63.0957 30.5957H55.5365C54.4847 30.5957 53.6322 31.4482 53.6322 32.5C53.6322 33.5513 54.4847 34.4043 55.5365 34.4043H63.0957C64.1475 34.4043 65 33.5513 65 32.5C65 31.4482 64.1475 30.5957 63.0957 30.5957ZM14.4071 17.1C14.5838 17.2771 14.7936 17.4175 15.0247 17.5133C15.2558 17.609 15.5035 17.6582 15.7536 17.6579C16.2411 17.6579 16.7281 17.4719 17.1 17.1C17.8434 16.356 17.8434 15.1506 17.1 14.4073L11.6048 8.91186C10.8615 8.16791 9.65542 8.16791 8.91211 8.91186C8.16816 9.65529 8.16816 10.8608 8.91211 11.6047L14.4071 17.1ZM50.5929 47.9C49.8494 47.1561 48.6439 47.1561 47.9 47.9C47.1566 48.6434 47.1566 49.8489 47.9 50.5927L53.3952 56.088C53.5718 56.2651 53.7817 56.4055 54.0127 56.5013C54.2438 56.597 54.4915 56.6461 54.7416 56.6459C55.2291 56.6459 55.716 56.4599 56.088 56.088C56.8313 55.3441 56.8313 54.1385 56.088 53.3952L50.5929 47.9ZM14.4071 47.9L8.91211 53.3952C8.1688 54.1385 8.1688 55.3441 8.91211 56.0879C9.0887 56.265 9.29856 56.4055 9.52964 56.5013C9.76072 56.597 10.0084 56.6462 10.2586 56.6459C10.7456 56.6459 11.2329 56.4599 11.6049 56.088L17.1001 50.5929C17.8435 49.8489 17.8435 48.6434 17.1001 47.9C16.3568 47.1561 15.1507 47.1561 14.4074 47.9H14.4071ZM49.2464 17.6579C49.7339 17.6579 50.2209 17.4719 50.5929 17.1L56.0879 11.6048C56.8312 10.8608 56.8312 9.65542 56.0879 8.91211C55.3445 8.16816 54.1384 8.16816 53.3951 8.91211L47.8999 14.4071C47.156 15.1506 47.156 16.3561 47.8999 17.1C48.0765 17.2771 48.2863 17.4176 48.5174 17.5133C48.7484 17.6091 48.9962 17.6582 49.2463 17.6579H49.2464Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-contrast"
                      data-bs-placement="right"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="65"
                        height="65"
                        viewBox="0 0 65 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.5002 0C14.5793 0 0 14.5792 0 32.4999C0 50.4213 14.5793 65 32.5 65C50.4212 65 65 50.4213 65 32.4999C65 14.5792 50.4212 0 32.5002 0ZM3.67888 32.4999C3.67888 16.6083 16.6083 3.67887 32.5002 3.67887V61.3211C16.6082 61.321 3.67888 48.3917 3.67888 32.4999Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-uniqueintensitylevels"
                      data-bs-placement="right"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="96"
                        height="60"
                        viewBox="0 0 96 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M81.7092 13.7562C63.9687 -4.51622 32.2879 -4.60237 14.4518 13.6008C9.86218 18.0549 6.21705 23.3881 3.73409 29.2821C1.25112 35.1761 -0.0187734 41.51 0.000209723 47.9056C0.000209723 48.4023 0.197537 48.8787 0.548782 49.2299C0.900027 49.5812 1.37642 49.7785 1.87315 49.7785C7.74295 49.7748 26.5211 49.7785 32.7018 49.7785C33.0142 51.5822 33.7432 53.2881 34.8309 54.7604C35.9186 56.2328 37.335 57.4309 38.9672 58.2595C40.5995 59.0881 42.4027 59.5243 44.2332 59.5333C46.0637 59.5424 47.8711 59.1241 49.5114 58.3116C51.1606 57.4907 52.5903 56.2884 53.6818 54.8043C54.7734 53.3203 55.4953 51.5974 55.7877 49.7785C62.343 49.7748 88.0341 49.7785 94.1268 49.7785C94.6236 49.7785 95.0999 49.5812 95.4512 49.2299C95.8024 48.8787 95.9998 48.4023 95.9998 47.9056C96.0202 41.5472 94.7659 35.2492 92.3111 29.3838C89.8563 23.5184 86.2506 18.2045 81.7073 13.7562H81.7092ZM58.5372 20.0849C57.9729 19.7929 57.3305 19.6878 56.7026 19.7848C56.0748 19.8818 55.494 20.1757 55.0441 20.6243L35.9925 39.556C34.2245 41.3042 33.0661 43.5751 32.6887 46.0326H12.9703C13.4435 37.0611 17.3407 28.6131 23.8585 22.43C30.3763 16.247 39.0179 12.8002 48.0019 12.8002C56.9858 12.8002 65.6274 16.247 72.1452 22.43C78.663 28.6131 82.5602 37.0611 83.0334 46.0326H56.4039L60.1273 23.2389C60.2305 22.6125 60.1321 21.9696 59.8463 21.4027C59.5605 20.8359 59.1021 20.3744 58.5372 20.0849ZM46.1289 9.12817C37.2792 9.54583 28.8415 12.9907 22.2283 18.8862L18.4187 15.0766C26.0384 8.16246 35.8479 4.14979 46.1289 3.74159V9.12817ZM73.7754 18.8862C67.1622 12.9907 58.7245 9.54583 49.8748 9.12817V3.74159C60.1561 4.15015 69.9657 8.16351 77.585 15.0785L73.7754 18.8862ZM15.7423 17.6988L19.55 21.5064C13.315 28.2029 9.6564 36.8931 9.22445 46.0326H3.7873C4.21391 35.4529 8.46127 25.3864 15.7423 17.6988ZM47.8258 54.9666C39.8527 59.0196 32.2673 48.4956 38.6334 42.2118L56.0611 24.8965L52.0999 49.1417C51.9042 50.3833 51.4141 51.56 50.6705 52.5734C49.9269 53.5868 48.9515 54.4074 47.8258 54.9666ZM86.7793 46.0326C86.3473 36.8931 82.6887 28.2029 76.4537 21.5064L80.2596 17.6988C87.5415 25.3859 91.7896 35.4525 92.2164 46.0326H86.7793Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-shadow"
                      data-bs-placement="right"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="65"
                        height="65"
                        viewBox="0 0 65 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M57.2067 53.6892C67.5876 42.414 67.6079 22.586 57.2067 11.3108C37.9279 -11.402 -0.0203067 2.35165 8.15312e-06 32.5C8.15312e-06 62.6484 37.9279 76.402 57.2067 53.6892ZM34.7181 4.40352C40.6501 4.85047 46.0945 7.12581 50.4418 10.7014H34.7181V4.40352ZM34.7181 15.0489H54.6673C56.7191 17.6493 58.324 20.5951 59.3601 23.8049H34.7181V15.0489ZM34.7181 28.1321H60.3758C60.8634 30.9763 60.8634 34.0237 60.3758 36.8679H34.7181V28.1321ZM34.7181 41.1951H59.3601C58.324 44.4049 56.7191 47.3507 54.6673 49.9511H34.7181V41.1951ZM34.7181 54.2986H50.4418C45.9756 57.9695 40.4835 60.1693 34.7181 60.5965V54.2986Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-noseshadow"
                      data-bs-placement="right"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsxlink="http://www.w3.org/1999/xlink"
                        xmlnssvgjs="http://svgjs.com/svgjs"
                        width="512"
                        height="512"
                        x="0"
                        y="0"
                        viewBox="0 0 502.432 502.432"
                        style="enable-background:new 0 0 512 512"
                        xmlspace="preserve"
                        class=""
                      >
                        <g>
                          <path
                            d="M368.488 159.792c-19.056-17.792-38.752-36.192-56.912-55.04A606.598 606.598 0 0 1 233.016 0l-27.808 15.824a627.19 627.19 0 0 0 83.312 111.104c18.768 19.488 38.784 38.176 58.128 56.256 30.512 28.48 72.304 67.504 72.304 81.056 0 60.08-39.008 83.376-76.8 105.936-23.504 14.032-45.696 27.28-56.448 48.768a54.204 54.204 0 0 0-5.472 24.544 121.234 121.234 0 0 0 19.952 58.944l26.672-17.712a93.03 93.03 0 0 1-14.576-41.2 22.794 22.794 0 0 1 2.08-10.208 114.542 114.542 0 0 1 44.256-35.648c38.96-23.28 92.336-55.136 92.336-133.392 0-26.208-29.792-55.312-82.464-104.48z"
                            fill="white"
                            data-original="#000000"
                            class=""
                          ></path>
                          <path
                            d="M110.92 376.032c-17.588-7.403-28.557-25.133-27.328-44.176a120.455 120.455 0 0 1 11.44-46.928l-28.544-14.4A152.001 152.001 0 0 0 51.56 331.92c-1.434 31.499 16.755 60.604 45.696 73.12a50.465 50.465 0 0 0 21.856 4.8c23.616 0 47.648-14.848 73.088-30.576 28.144-17.44 57.216-35.344 86.832-35.344v-32c-38.704 0-73.184 21.312-103.632 40.128-25.968 15.984-50.144 30.848-64.48 23.984z"
                            fill="white"
                            data-original="#000000"
                            class=""
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-specularity"
                      data-bs-placement="right"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="65"
                        height="57"
                        viewBox="0 0 65 57"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M63.9798 57H4.07073C3.50794 57 3.05518 56.5151 3.05518 55.9124V49.0831C3.05518 48.4804 3.50794 47.9955 4.07073 47.9955H63.9798C64.5426 47.9955 64.9954 48.4804 64.9954 49.0831V55.9124C64.9954 56.5151 64.5426 57 63.9798 57ZM5.08628 54.8248H62.9643V50.1707H5.08628V54.8248Z"
                          fill="white"
                        />
                        <path
                          d="M24.3731 50.0982C24.1023 50.0982 23.8442 49.9849 23.6538 49.781L12.0342 37.3323C11.6364 36.9064 11.6364 36.2175 12.0342 35.7961C12.4319 35.3746 13.0751 35.3701 13.4686 35.7961L24.3731 47.4743L50.092 19.9305C50.4897 19.5045 51.1329 19.5045 51.5264 19.9305C51.9242 20.3565 51.9242 21.0453 51.5264 21.4668L25.0925 49.781C24.902 49.9849 24.6439 50.0982 24.3731 50.0982Z"
                          fill="white"
                        />
                        <path
                          d="M50.6549 26.7734H50.6211C50.0625 26.7508 49.6225 26.2478 49.6394 25.6496L49.7621 21.8248L46.1907 21.9562C45.628 21.9743 45.1583 21.5076 45.1413 20.9049C45.1244 20.3021 45.5603 19.7991 46.123 19.781L50.7819 19.6133C51.0654 19.6042 51.3362 19.7175 51.5351 19.9305C51.734 20.1435 51.8398 20.4336 51.8313 20.7372L51.6747 25.7266C51.6493 26.3112 51.2008 26.7734 50.6549 26.7734Z"
                          fill="white"
                        />
                        <path
                          d="M37.5372 50.0982C37.2664 50.0982 37.0082 49.9849 36.8178 49.781L25.1982 37.3323C24.8005 36.9064 24.8005 36.2175 25.1982 35.7961C25.596 35.3746 26.2392 35.3701 26.6327 35.7961L37.5372 47.4743L63.256 19.9305C63.6538 19.5045 64.297 19.5045 64.6905 19.9305C65.0882 20.3565 65.0882 21.0453 64.6905 21.4668L38.2565 49.7764C38.0661 49.9849 37.808 50.0982 37.5372 50.0982Z"
                          fill="white"
                        />
                        <path
                          d="M63.8232 26.7689H63.7893C63.2308 26.7462 62.7907 26.2432 62.8076 25.645L62.9303 21.8202L59.359 21.9517C58.8004 21.9698 58.3265 21.503 58.3096 20.9003C58.2927 20.3021 58.7285 19.7946 59.2913 19.7764L63.9501 19.6088C64.2336 19.5997 64.5044 19.713 64.7033 19.926C64.9022 20.139 65.008 20.429 64.9995 20.7326L64.843 25.7221C64.8176 26.3066 64.3648 26.7689 63.8232 26.7689ZM14.9625 25.6405C10.0116 25.6405 5.98329 21.3263 5.98329 16.0242C5.98329 10.7221 10.0116 6.40785 14.9625 6.40785C19.9133 6.40785 23.9416 10.7221 23.9416 16.0242C23.9416 21.3263 19.9133 25.6405 14.9625 25.6405ZM14.9625 8.58761C11.133 8.58761 8.01439 11.923 8.01439 16.0287C8.01439 20.1299 11.1288 23.4698 14.9625 23.4698C18.7919 23.4698 21.9105 20.1344 21.9105 16.0287C21.9105 11.923 18.7962 8.58761 14.9625 8.58761ZM14.9625 4.56344C14.3997 4.56344 13.9469 4.07855 13.9469 3.47583V1.08761C13.9469 0.484894 14.3997 0 14.9625 0C15.5252 0 15.978 0.484894 15.978 1.08761V3.47583C15.978 4.07402 15.5252 4.56344 14.9625 4.56344ZM6.67725 8.23867C6.41913 8.23867 6.15678 8.13444 5.9579 7.92145L4.3838 6.23565C4.18492 6.02266 4.08759 5.74622 4.08759 5.46526C4.08759 5.18429 4.18492 4.90786 4.3838 4.69486C4.78156 4.26888 5.42474 4.26888 5.81826 4.69486L7.39237 6.38066C7.59125 6.59366 7.68857 6.87009 7.68857 7.15106C7.68857 7.43202 7.59125 7.70846 7.39237 7.92145C7.19772 8.12991 6.93537 8.23867 6.67725 8.23867ZM3.24553 17.1118H1.01555C0.452767 17.1118 0 16.6269 0 16.0242C0 15.4215 0.452767 14.9366 1.01555 14.9366H3.24553C3.80832 14.9366 4.26108 15.4215 4.26108 16.0242C4.26108 16.6269 3.80409 17.1118 3.24553 17.1118ZM5.09892 27.6752C4.8408 27.6752 4.57844 27.571 4.37957 27.358C4.18069 27.145 4.08336 26.8686 4.08336 26.5876C4.08336 26.3066 4.18069 26.0302 4.37957 25.8172L5.95367 24.1314C6.35143 23.7054 6.99461 23.7054 7.38814 24.1314C7.58702 24.3444 7.68434 24.6208 7.68434 24.9018C7.68434 25.1828 7.58702 25.4592 7.38814 25.6722L5.81403 27.358C5.61939 27.571 5.36127 27.6752 5.09892 27.6752ZM14.9625 32.0529C14.3997 32.0529 13.9469 31.568 13.9469 30.9653V28.577C13.9469 27.9743 14.3997 27.4894 14.9625 27.4894C15.5252 27.4894 15.978 27.9743 15.978 28.577V30.9653C15.978 31.5634 15.5252 32.0529 14.9625 32.0529ZM24.826 27.6752C24.5679 27.6752 24.3055 27.571 24.1067 27.358L23.2096 26.3973L22.5326 25.6722C22.3337 25.4592 22.2363 25.1828 22.2363 24.9018C22.2363 24.6208 22.3337 24.3444 22.5326 24.1314C22.9303 23.7054 23.5735 23.7054 23.967 24.1314L25.5411 25.8172C25.74 26.0302 25.8373 26.3066 25.8373 26.5876C25.8373 26.8686 25.74 27.145 25.5411 27.358C25.3465 27.571 25.0884 27.6752 24.826 27.6752ZM28.9136 17.1118H26.6836C26.1208 17.1118 25.6681 16.6269 25.6681 16.0242C25.6681 15.4215 26.1208 14.9366 26.6836 14.9366H28.9136C29.4764 14.9366 29.9292 15.4215 29.9292 16.0242C29.9292 16.6269 29.4722 17.1118 28.9136 17.1118ZM23.2519 8.23867C22.9938 8.23867 22.7314 8.13444 22.5326 7.92145C22.3337 7.70846 22.2363 7.43202 22.2363 7.15106C22.2363 6.87009 22.3337 6.59366 22.5326 6.38066L24.1067 4.69486C24.5044 4.26888 25.1476 4.26888 25.5411 4.69486C25.74 4.90786 25.8373 5.18429 25.8373 5.46526C25.8373 5.74169 25.74 6.02266 25.5411 6.23565L23.967 7.92145C23.7724 8.12991 23.51 8.23867 23.2519 8.23867Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-eyegaze"
                      data-bs-placement="right"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="58"
                        height="58"
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M33.1429 29C33.1429 31.2848 31.2848 33.1429 29 33.1429C26.7152 33.1429 24.8571 31.2848 24.8571 29C24.8571 26.7152 26.7152 24.8571 29 24.8571C31.2848 24.8571 33.1429 26.7152 33.1429 29ZM10.3571 53.8571H6.21429C5.07293 53.8571 4.14286 52.9271 4.14286 51.7857V47.6429C4.14286 47.0935 3.92462 46.5666 3.53615 46.1781C3.14768 45.7897 2.62081 45.5714 2.07143 45.5714C1.52205 45.5714 0.995175 45.7897 0.606707 46.1781C0.218239 46.5666 0 47.0935 0 47.6429V51.7857C0 55.2119 2.78814 58 6.21429 58H10.3571C10.9065 58 11.4334 57.7818 11.8219 57.3933C12.2103 57.0048 12.4286 56.4779 12.4286 55.9286C12.4286 55.3792 12.2103 54.8523 11.8219 54.4638C11.4334 54.0754 10.9065 53.8571 10.3571 53.8571ZM2.07143 12.4286C2.62081 12.4286 3.14768 12.2103 3.53615 11.8219C3.92462 11.4334 4.14286 10.9065 4.14286 10.3571V6.21429C4.14286 5.07293 5.07293 4.14286 6.21429 4.14286H10.3571C10.9065 4.14286 11.4334 3.92462 11.8219 3.53615C12.2103 3.14768 12.4286 2.62081 12.4286 2.07143C12.4286 1.52205 12.2103 0.995175 11.8219 0.606707C11.4334 0.218239 10.9065 0 10.3571 0H6.21429C2.78814 0 0 2.78814 0 6.21429V10.3571C0 10.9065 0.218239 11.4334 0.606707 11.8219C0.995175 12.2103 1.52205 12.4286 2.07143 12.4286ZM51.7857 0H47.6429C47.0935 0 46.5666 0.218239 46.1781 0.606707C45.7897 0.995175 45.5714 1.52205 45.5714 2.07143C45.5714 2.62081 45.7897 3.14768 46.1781 3.53615C46.5666 3.92462 47.0935 4.14286 47.6429 4.14286H51.7857C52.9271 4.14286 53.8571 5.07293 53.8571 6.21429V10.3571C53.8571 10.9065 54.0754 11.4334 54.4638 11.8219C54.8523 12.2103 55.3792 12.4286 55.9286 12.4286C56.4779 12.4286 57.0048 12.2103 57.3933 11.8219C57.7818 11.4334 58 10.9065 58 10.3571V6.21429C58 2.78814 55.2119 0 51.7857 0ZM55.9286 45.5714C55.3792 45.5714 54.8523 45.7897 54.4638 46.1781C54.0754 46.5666 53.8571 47.0935 53.8571 47.6429V51.7857C53.8571 52.9271 52.9271 53.8571 51.7857 53.8571H47.6429C47.0935 53.8571 46.5666 54.0754 46.1781 54.4638C45.7897 54.8523 45.5714 55.3792 45.5714 55.9286C45.5714 56.4779 45.7897 57.0048 46.1781 57.3933C46.5666 57.7818 47.0935 58 47.6429 58H51.7857C55.2119 58 58 55.2119 58 51.7857V47.6429C58 47.0935 57.7818 46.5666 57.3933 46.1781C57.0048 45.7897 56.4779 45.5714 55.9286 45.5714ZM55.3424 32.1838L44.7739 40.9874C40.1632 44.2965 34.6318 46.0785 28.9565 46.0831C23.4755 46.0831 18.0111 44.4114 13.3462 41.0806L2.65557 32.1838C1.70686 31.3946 1.16414 30.2346 1.16414 29C1.16414 27.7654 1.70893 26.6054 2.65764 25.8162L13.3483 16.9194C17.9156 13.6579 23.3877 11.9046 29 11.9046C34.6123 11.9046 40.0844 13.6579 44.6517 16.9194L55.3424 25.8162C56.2911 26.6054 56.8338 27.7654 56.8338 29C56.8338 30.2346 56.2911 31.3946 55.3424 32.1838ZM37.2857 29C37.2857 24.4304 33.5696 20.7143 29 20.7143C24.4304 20.7143 20.7143 24.4304 20.7143 29C20.7143 33.5696 24.4304 37.2857 29 37.2857C33.5696 37.2857 37.2857 33.5696 37.2857 29Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-eyestatusr"
                      data-bs-placement="right"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="84"
                        height="63"
                        viewBox="0 0 84 63"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M82.8033 39.1322C81.9345 38.35 61.3109 20 41.8467 20C22.3836 20 1.76 38.35 0.890255 39.1322C0.610071 39.3843 0.386023 39.6925 0.232653 40.0367C0.0792819 40.381 1.61156e-05 40.7537 2.45709e-09 41.1306C-1.61106e-05 41.5075 0.0792178 41.8801 0.232559 42.2244C0.3859 42.5687 0.609922 42.8769 0.890084 43.129C1.75983 43.9116 22.3835 62.2588 41.8465 62.2588C61.3109 62.2588 81.9345 43.9116 82.8031 43.129C83.0836 42.8771 83.308 42.569 83.4616 42.2247C83.6151 41.8804 83.6945 41.5076 83.6945 41.1306C83.6946 40.7536 83.6152 40.3809 83.4616 40.0366C83.3081 39.6923 83.0838 39.3841 82.8033 39.1322ZM41.8465 56.3398C33.4621 56.3398 26.6379 49.5178 26.6379 41.1309C26.6379 32.7434 33.4621 25.9215 41.8465 25.9215C50.2316 25.9215 57.0562 32.7434 57.0562 41.1309C57.0563 49.5178 50.2318 56.3398 41.8465 56.3398ZM24.6294 29.876C22.5068 33.1139 21.2596 36.9763 21.2596 41.1309C21.2596 45.2793 22.5015 49.1372 24.6234 52.375C16.9244 48.7512 10.2731 43.841 6.88297 41.1284C10.2729 38.413 16.9244 33.4973 24.6294 29.876ZM59.0651 52.3826C61.1867 49.1451 62.4346 45.2827 62.4346 41.1309C62.4346 36.982 61.1898 33.1216 59.0704 29.8837C66.7671 33.5078 73.4185 38.418 76.8107 41.1309C73.4208 43.8463 66.7702 48.7589 59.0651 52.3826Z"
                          fill="white"
                        />
                        <path
                          d="M41.8466 32.4762C37.0652 32.4762 33.1921 36.3489 33.1921 41.131C33.1921 45.9124 37.0652 49.7854 41.8466 49.7854C46.629 49.7854 50.5023 45.9124 50.5023 41.131C50.5025 36.3489 46.6291 32.4762 41.8466 32.4762ZM41.8466 37.9508C40.0931 37.9508 38.6671 39.3769 38.6671 41.131C38.6671 41.8739 38.0634 42.4749 37.3228 42.4749C37.1462 42.4752 36.9713 42.4407 36.808 42.3733C36.6448 42.3059 36.4964 42.207 36.3715 42.0821C36.2466 41.9572 36.1475 41.809 36.0801 41.6457C36.0126 41.4825 35.978 41.3076 35.9782 41.131C35.9782 37.8956 38.6097 35.2618 41.8467 35.2618C42.0233 35.2616 42.1982 35.2963 42.3614 35.3638C42.5247 35.4313 42.6729 35.5303 42.7979 35.6551C42.9228 35.78 43.0219 35.9282 43.0894 36.0914C43.157 36.2545 43.1917 36.4294 43.1917 36.606C43.1917 37.3497 42.5902 37.9508 41.8466 37.9508Z"
                          fill="white"
                        />
                        <path
                          d="M74.656 26L70.672 19.16H68.032V26H65.848V9.272H71.248C72.512 9.272 73.576 9.488 74.44 9.92C75.32 10.352 75.976 10.936 76.408 11.672C76.84 12.408 77.056 13.248 77.056 14.192C77.056 15.344 76.72 16.36 76.048 17.24C75.392 18.12 74.4 18.704 73.072 18.992L77.272 26H74.656ZM68.032 17.408H71.248C72.432 17.408 73.32 17.12 73.912 16.544C74.504 15.952 74.8 15.168 74.8 14.192C74.8 13.2 74.504 12.432 73.912 11.888C73.336 11.344 72.448 11.072 71.248 11.072H68.032V17.408Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-eyestatusl"
                      data-bs-placement="right"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="84"
                        height="63"
                        viewBox="0 0 84 63"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M82.8033 39.1322C81.9345 38.35 61.3109 20 41.8467 20C22.3836 20 1.76 38.35 0.890255 39.1322C0.610071 39.3843 0.386023 39.6925 0.232653 40.0367C0.0792819 40.381 1.61156e-05 40.7537 2.45709e-09 41.1306C-1.61106e-05 41.5075 0.0792178 41.8801 0.232559 42.2244C0.3859 42.5687 0.609922 42.8769 0.890084 43.129C1.75983 43.9116 22.3835 62.2588 41.8465 62.2588C61.3109 62.2588 81.9345 43.9116 82.8031 43.129C83.0836 42.8771 83.308 42.569 83.4616 42.2247C83.6151 41.8804 83.6945 41.5076 83.6945 41.1306C83.6946 40.7536 83.6152 40.3809 83.4616 40.0366C83.3081 39.6923 83.0838 39.3841 82.8033 39.1322ZM41.8465 56.3398C33.4621 56.3398 26.6379 49.5178 26.6379 41.1309C26.6379 32.7434 33.4621 25.9215 41.8465 25.9215C50.2316 25.9215 57.0562 32.7434 57.0562 41.1309C57.0563 49.5178 50.2318 56.3398 41.8465 56.3398ZM24.6294 29.876C22.5068 33.1139 21.2596 36.9763 21.2596 41.1309C21.2596 45.2793 22.5015 49.1372 24.6234 52.375C16.9244 48.7512 10.2731 43.841 6.88297 41.1284C10.2729 38.413 16.9244 33.4973 24.6294 29.876ZM59.0651 52.3826C61.1867 49.1451 62.4346 45.2827 62.4346 41.1309C62.4346 36.982 61.1898 33.1216 59.0704 29.8837C66.7671 33.5078 73.4185 38.418 76.8107 41.1309C73.4208 43.8463 66.7702 48.7589 59.0651 52.3826Z"
                          fill="white"
                        />
                        <path
                          d="M41.8465 32.4762C37.0651 32.4762 33.1921 36.3489 33.1921 41.131C33.1921 45.9124 37.0651 49.7854 41.8465 49.7854C46.6289 49.7854 50.5023 45.9124 50.5023 41.131C50.5025 36.3489 46.6291 32.4762 41.8465 32.4762ZM41.8465 37.9508C40.093 37.9508 38.667 39.3769 38.667 41.131C38.667 41.8739 38.0633 42.4749 37.3228 42.4749C37.1462 42.4752 36.9712 42.4407 36.808 42.3733C36.6447 42.3059 36.4964 42.207 36.3714 42.0821C36.2465 41.9572 36.1475 41.809 36.08 41.6457C36.0125 41.4825 35.9779 41.3076 35.9782 41.131C35.9782 37.8956 38.6096 35.2618 41.8467 35.2618C42.0233 35.2616 42.1982 35.2963 42.3614 35.3638C42.5246 35.4313 42.6729 35.5303 42.7978 35.6551C42.9227 35.78 43.0218 35.9282 43.0894 36.0914C43.1569 36.2545 43.1917 36.4294 43.1916 36.606C43.1916 37.3497 42.5901 37.9508 41.8465 37.9508Z"
                          fill="white"
                        />
                        <path
                          d="M6.032 24.224H11.888V26H3.848V9.272H6.032V24.224Z"
                          fill="white"
                        />
                      </svg>
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
                        style={{ color: isDeviceAvailable ? "white" : "red" }}
                        -->
                      <p
                        id="lblMessageForICAO"
                        class="icao-reconnect-label text-white"
                      ></p>
                      <p class="icao-reconnect-instrcutions">
                        Please click the button to reconnect.
                      </p>
                      <button class="btn btn-primary" id="reconnect-icao-btn">
                        Connect to ICAO
                      </button>
                    </div>
                  </div>

                  <!-- right column -->

                  <div id="right-features" class="right-column d-none">
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-glassstatus"
                      data-bs-placement="left"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="90"
                        height="36"
                        viewBox="0 0 90 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M88.0083 14.9167H84.7565C83.3379 6.46488 76.0302 0 67.2324 0C58.5479 0 51.2775 6.14418 49.5934 14.2887C48.145 13.0745 46.4923 12.4301 44.75 12.4301C43.0092 12.4301 41.3579 13.0745 39.9095 14.2872C38.2448 6.14268 31.064 0 22.4824 0C13.061 0 5.31779 7.23608 4.55108 16.4083H1.49167C1.09605 16.4083 0.716641 16.5655 0.436899 16.8452C0.157157 17.125 0 17.5044 0 17.9C0 18.2956 0.157157 18.675 0.436899 18.9548C0.716641 19.2345 1.09605 19.3917 1.49167 19.3917H4.55108C5.31779 28.5639 13.061 35.8 22.4824 35.8C32.129 35.8 39.9886 28.0329 40.2496 18.3908C41.522 16.474 43.1062 15.4134 44.75 15.4134C46.3938 15.4134 47.978 16.4755 49.2504 18.3908C49.5159 28.0329 57.4709 35.8 67.2324 35.8C77.0431 35.8 85.025 27.7704 85.025 17.9H88.0083C88.4039 17.9 88.7834 17.7428 89.0631 17.4631C89.3428 17.1834 89.5 16.8039 89.5 16.4083C89.5 16.0127 89.3428 15.6333 89.0631 15.3536C88.7834 15.0738 88.4039 14.9167 88.0083 14.9167ZM22.4824 32.8167C14.1992 32.8167 7.45833 26.1251 7.45833 17.9C7.45833 9.67495 14.1992 2.98333 22.4824 2.98333C30.788 2.98333 37.2917 9.53623 37.2917 17.9C37.2917 26.2638 30.788 32.8167 22.4824 32.8167ZM67.2324 32.8167C58.9492 32.8167 52.2083 26.1251 52.2083 17.9C52.2083 9.67495 58.9492 2.98333 67.2324 2.98333C75.538 2.98333 82.0417 9.53623 82.0417 17.9C82.0417 26.2638 75.538 32.8167 67.2324 32.8167Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-heavyframe"
                      data-bs-placement="left"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsxlink="http://www.w3.org/1999/xlink"
                        xmlnssvgjs="http://svgjs.com/svgjs"
                        width="512"
                        height="512"
                        x="0"
                        y="0"
                        viewBox="0 0 24 24"
                        style="enable-background:new 0 0 512 512"
                        xmlspace="preserve"
                        class=""
                      >
                        <g>
                          <path
                            d="M21 5a1.96 1.96 0 0 0-.075-.511L18 7.414v9.172l2.925 2.925A1.96 1.96 0 0 0 21 19zM7.414 6h9.172l2.925-2.925A1.96 1.96 0 0 0 19 3H5a1.96 1.96 0 0 0-.511.075zM3.075 4.489A1.96 1.96 0 0 0 3 5v14a1.96 1.96 0 0 0 .075.511L6 16.586V7.414zM16.586 18H7.414l-2.925 2.925A1.96 1.96 0 0 0 5 21h14a1.96 1.96 0 0 0 .511-.075z"
                            fill="white"
                            data-original="#000000"
                            class=""
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-mouthstatus"
                      data-bs-placement="left"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="75"
                        height="41"
                        viewBox="0 0 75 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M45.6057 0C42.7332 0 39.9626 0.857038 37.5001 2.49395C35.0374 0.857184 32.2671 0 29.3945 0C25.6205 0 19.5953 2.9158 10.9746 8.91447C6.03326 12.3527 1.78199 15.7428 0.214014 17.0153H74.7861C73.2183 15.7428 68.9667 12.3527 64.0254 8.91447C55.4049 2.91595 49.3795 0 45.6057 0ZM0 21.5541C1.47349 23.1782 5.14337 26.9916 10.3614 30.8347C14.3394 33.7646 18.3988 36.1035 22.4267 37.7861C27.5318 39.9186 32.6029 41 37.5001 41C42.3969 41 47.4684 39.9186 52.5732 37.7861C56.6011 36.1033 60.6605 33.7646 64.6387 30.8347C69.8565 26.9918 73.5265 23.1782 75 21.5541H0Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-backgrounduniformity"
                      data-bs-placement="left"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="74"
                        height="62"
                        viewBox="0 0 74 62"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.46596 19.5213C5.25886 19.5213 5.06025 19.5898 4.91381 19.7119C4.76737 19.8339 4.68511 19.9994 4.68511 20.172V56.6117C4.68511 56.9709 5.03493 57.2624 5.46596 57.2624H49.1936C49.4007 57.2624 49.5993 57.1939 49.7458 57.0718C49.8922 56.9498 49.9745 56.7843 49.9745 56.6117V20.172C49.9745 19.9994 49.8922 19.8339 49.7458 19.7119C49.5993 19.5898 49.4007 19.5213 49.1936 19.5213H5.46596ZM0 20.172C0 17.655 2.44563 15.617 5.46596 15.617H49.1936C52.2139 15.617 54.6596 17.655 54.6596 20.172V56.6117C54.6596 57.8198 54.0837 58.9783 53.0586 59.8325C52.0336 60.6868 50.6433 61.1667 49.1936 61.1667H5.46596C4.0163 61.1667 2.62601 60.6868 1.60094 59.8325C0.575876 58.9783 0 57.8198 0 56.6117V20.172ZM40.6043 1.95213C40.6043 1.43439 40.8511 0.93786 41.2904 0.571765C41.7297 0.20567 42.3255 0 42.9468 0H49.1936C49.8149 0 50.4107 0.20567 50.8501 0.571765C51.2894 0.93786 51.5362 1.43439 51.5362 1.95213C51.5362 2.46986 51.2894 2.9664 50.8501 3.33249C50.4107 3.69859 49.8149 3.90426 49.1936 3.90426H42.9468C42.3255 3.90426 41.7297 3.69859 41.2904 3.33249C40.8511 2.9664 40.6043 2.46986 40.6043 1.95213ZM62.4681 1.95213C62.4681 1.43439 62.7149 0.93786 63.1542 0.571765C63.5935 0.20567 64.1894 0 64.8106 0H67.934C69.3837 0 70.774 0.479897 71.7991 1.33412C72.8241 2.18834 73.4 3.34691 73.4 4.55496V7.1578C73.4 7.67554 73.1532 8.17207 72.7139 8.53816C72.2746 8.90426 71.6787 9.10993 71.0574 9.10993C70.4362 9.10993 69.8403 8.90426 69.401 8.53816C68.9617 8.17207 68.7149 7.67554 68.7149 7.1578V4.55496C68.7149 4.38239 68.6326 4.21687 68.4862 4.09484C68.3398 3.97281 68.1411 3.90426 67.934 3.90426H64.8106C64.1894 3.90426 63.5935 3.69859 63.1542 3.33249C62.7149 2.9664 62.4681 2.46986 62.4681 1.95213ZM71.0574 18.2199C71.6787 18.2199 72.2746 18.4255 72.7139 18.7916C73.1532 19.1577 73.4 19.6542 73.4 20.172V25.3777C73.4 25.8954 73.1532 26.3919 72.7139 26.758C72.2746 27.1241 71.6787 27.3298 71.0574 27.3298C70.4362 27.3298 69.8403 27.1241 69.401 26.758C68.9617 26.3919 68.7149 25.8954 68.7149 25.3777V20.172C68.7149 19.6542 68.9617 19.1577 69.401 18.7916C69.8403 18.4255 70.4362 18.2199 71.0574 18.2199ZM71.0574 36.4397C71.6787 36.4397 72.2746 36.6454 72.7139 37.0115C73.1532 37.3776 73.4 37.8741 73.4 38.3918V40.9947C73.4 42.2027 72.8241 43.3613 71.7991 44.2155C70.774 45.0697 69.3837 45.5496 67.934 45.5496H64.8106C64.1894 45.5496 63.5935 45.344 63.1542 44.9779C62.7149 44.6118 62.4681 44.1153 62.4681 43.5975C62.4681 43.0798 62.7149 42.5832 63.1542 42.2172C63.5935 41.8511 64.1894 41.6454 64.8106 41.6454H67.934C68.1411 41.6454 68.3398 41.5768 68.4862 41.4548C68.6326 41.3328 68.7149 41.1673 68.7149 40.9947V38.3918C68.7149 37.8741 68.9617 37.3776 69.401 37.0115C69.8403 36.6454 70.4362 36.4397 71.0574 36.4397ZM20.3427 1.33526C21.3672 0.480895 22.757 0.000603081 24.2064 0H27.3298C27.9511 0 28.5469 0.20567 28.9862 0.571765C29.4255 0.93786 29.6723 1.43439 29.6723 1.95213C29.6723 2.46986 29.4255 2.9664 28.9862 3.33249C28.5469 3.69859 27.9511 3.90426 27.3298 3.90426H24.2064C23.9993 3.90426 23.8007 3.97281 23.6542 4.09484C23.5078 4.21687 23.4255 4.38239 23.4255 4.55496V7.1578C23.4255 7.67554 23.1787 8.17207 22.7394 8.53816C22.3001 8.90426 21.7043 9.10993 21.083 9.10993C20.4617 9.10993 19.8659 8.90426 19.4265 8.53816C18.9872 8.17207 18.7404 7.67554 18.7404 7.1578V4.55496C18.7404 3.34725 19.3151 2.18638 20.3427 1.33526Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-redeyer"
                      data-bs-placement="left"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="76"
                        height="71"
                        viewBox="0 0 76 71"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M63.5978 59.1898L64.2338 57.9378L65.5051 57.7879C68.1471 55.5396 71.1029 53.6972 74.2864 52.3443C74.958 52.0588 75.3992 51.4061 75.3992 50.6763V50.6761C75.3992 49.9464 74.958 49.2936 74.2864 49.0081C70.8341 47.5411 67.6494 45.4985 64.8426 42.9863L55.2675 36.8108L22.6144 35L17 42.2435V59.8954L22.7155 65.2183L48.0239 66.2377L63.5978 59.1898Z"
                          fill="#F27182"
                        />
                        <path
                          d="M17.9187 49.5983C17.9187 45.1159 19.0429 40.8964 21.0231 37.2046H16.6007L11.8863 41.0027L11.5076 42.2656L9.768 42.5991C7.15809 44.799 4.24584 46.6049 1.11284 47.9363C0.44121 48.2218 0 48.8745 0 49.6043C0 50.3341 0.44121 50.987 1.11284 51.2723C4.56547 52.7395 7.75062 54.7822 10.5574 57.2947L15.5193 60.6761L21.1387 62.2056C19.0866 58.4634 17.9187 54.1674 17.9187 49.5983Z"
                          fill="#ED5469"
                        />
                        <path
                          d="M65.4043 34.8391C65.1076 34.8395 64.8227 34.723 64.6112 34.5148C56.4508 26.4999 47.0758 22.2636 37.5 22.2636C27.9242 22.2636 18.5493 26.4999 10.3887 34.5148C10.2828 34.62 10.1573 34.7031 10.0192 34.7596C9.88106 34.816 9.73317 34.8446 9.58398 34.8437C9.4348 34.8427 9.28727 34.8123 9.14987 34.7542C9.01248 34.696 8.88794 34.6113 8.78341 34.5049C8.67888 34.3984 8.59642 34.2724 8.54078 34.134C8.48514 33.9955 8.45741 33.8475 8.45919 33.6983C8.46097 33.5491 8.49222 33.4018 8.55115 33.2647C8.61007 33.1277 8.69552 33.0036 8.80256 32.8997C17.3953 24.4607 27.3187 20 37.5 20C47.6813 20 57.6048 24.4607 66.1974 32.8998C66.3576 33.0573 66.4673 33.2589 66.5126 33.479C66.5579 33.6991 66.5366 33.9276 66.4516 34.1356C66.3665 34.3435 66.2215 34.5215 66.035 34.6468C65.8485 34.7721 65.629 34.839 65.4043 34.8391Z"
                          fill="#FFA68E"
                        />
                        <path
                          d="M49.5779 36.7657L46.4059 33.9279H28.5942L25.4222 36.7657C23.2991 39.4144 22.0283 42.7758 22.0283 46.4344C22.0283 54.9791 28.9553 61.906 37.5 61.906C46.0416 61.906 52.9716 54.9811 52.9716 46.4344C52.9718 42.7758 51.7009 39.4144 49.5779 36.7657Z"
                          fill="#E63850"
                        />
                        <path
                          d="M58.4663 53.8522C58.2371 53.8522 58.0132 53.7826 57.8244 53.6527C57.6356 53.5228 57.4907 53.3386 57.4089 53.1245C57.327 52.9104 57.3121 52.6765 57.3661 52.4537C57.42 52.231 57.5404 52.0299 57.7111 51.877L59.8615 49.9529C60.0859 49.7571 60.3783 49.6575 60.6756 49.6758C60.9728 49.6941 61.2509 49.8289 61.4494 50.0508C61.648 50.2728 61.7511 50.564 61.7364 50.8615C61.7217 51.1589 61.5904 51.4386 61.3709 51.6398L59.2205 53.5639C59.0133 53.7498 58.7446 53.8525 58.4663 53.8522Z"
                          fill="#F78B98"
                        />
                        <path
                          d="M64.4434 57.2943L64.4442 57.2944C64.6625 57.0989 64.883 56.906 65.1059 56.7158V54.3959C65.1067 53.7645 64.9683 53.1406 64.7005 52.5688C64.4327 51.9969 64.042 51.4912 63.5564 51.0876L61.7665 49.5959C61.5362 49.4045 61.3509 49.1646 61.2238 48.8933C61.0968 48.6221 61.0311 48.3262 61.0315 48.0267V46.1183C61.0315 45.8181 60.9122 45.5302 60.7 45.318C60.4877 45.1058 60.1999 44.9865 59.8997 44.9865C59.5996 44.9865 59.3117 45.1058 59.0995 45.318C58.8872 45.5302 58.768 45.8181 58.768 46.1183V48.0267C58.7672 48.6581 58.9056 49.282 59.1734 49.8538C59.4413 50.4256 59.8319 50.9314 60.3175 51.335L62.1075 52.8266C62.3379 53.0181 62.5232 53.258 62.6502 53.5292C62.7772 53.8005 62.8429 54.0964 62.8424 54.3959V58.3533L64.4434 57.2943ZM14.2578 49.5983C14.0286 49.5983 13.8047 49.5288 13.6159 49.3988C13.4271 49.2689 13.2822 49.0847 13.2004 48.8706C13.1185 48.6565 13.1036 48.4226 13.1576 48.1999C13.2115 47.9771 13.3319 47.776 13.5026 47.6231L15.653 45.699C15.8774 45.5032 16.1699 45.4036 16.4671 45.4219C16.7643 45.4403 17.0424 45.575 17.241 45.7969C17.4395 46.0189 17.5426 46.3101 17.5279 46.6076C17.5132 46.905 17.3819 47.1847 17.1624 47.3859L15.012 49.31C14.8048 49.4959 14.5361 49.5986 14.2578 49.5983Z"
                          fill="#F78B98"
                        />
                        <path
                          d="M11.3175 48.175L13.1074 49.6667C13.3377 49.8581 13.523 50.098 13.6501 50.3693C13.7771 50.6405 13.8428 50.9365 13.8424 51.236V53.1444C13.8424 53.4445 13.9617 53.7324 14.1739 53.9446C14.3861 54.1569 14.674 54.2761 14.9742 54.2761C15.2743 54.2761 15.5622 54.1569 15.7744 53.9446C15.9867 53.7324 16.1059 53.4445 16.1059 53.1444V51.2361C16.1067 50.6047 15.9682 49.9808 15.7004 49.409C15.4326 48.8372 15.042 48.3314 14.5564 47.9278L12.7665 46.4361C12.5361 46.2447 12.3508 46.0048 12.2238 45.7336C12.0967 45.4623 12.031 45.1664 12.0314 44.8669V40.9031L10.5565 41.9146L10.555 41.9137C10.2959 42.146 10.0335 42.3745 9.76783 42.5993V44.8669C9.76706 45.4983 9.90554 46.1221 10.1734 46.6939C10.4412 47.2657 10.8319 47.7714 11.3175 48.175Z"
                          fill="#F78B98"
                        />
                        <path
                          d="M37.4999 63.6536C31.6375 63.6536 25.9803 62.8173 20.6487 61.2656L20.2854 62.3991L23.3288 66.3729L25.6959 68.2503C29.3988 69.6953 33.3689 70.4812 37.4999 70.4812C47.0801 70.4812 55.7981 66.2644 62.3124 59.366C62.9934 58.6459 63.7044 57.9547 64.4433 57.2943C56.3967 61.3529 47.2301 63.6536 37.4999 63.6536Z"
                          fill="#FFCEBE"
                        />
                        <path
                          d="M20.6487 61.2656C17.1699 60.2543 13.7916 58.9248 10.5565 57.2941C11.2955 57.9546 12.0065 58.6457 12.6874 59.3658C16.3927 63.2896 20.8116 66.3441 25.6958 68.2501C23.6413 66.2149 21.9361 63.8552 20.6487 61.2656Z"
                          fill="#FFB1A0"
                        />
                        <path
                          d="M40.447 54.84C45.0885 53.2128 47.5321 48.1309 45.9048 43.4894C44.2775 38.8478 39.1957 36.4042 34.5541 38.0315C29.9126 39.6588 27.469 44.7407 29.0963 49.3822C30.7235 54.0238 35.8054 56.4673 40.447 54.84Z"
                          fill="#865151"
                        />
                        <path
                          d="M62.3124 39.8426C55.7981 32.9442 47.08 28.7274 37.4999 28.7274C33.3613 28.7274 29.3841 29.5159 25.6753 30.9661L23.2406 32.4564L20.6374 36.1913L20.6415 37.945C25.9751 36.392 31.6348 35.555 37.4999 35.555C47.2301 35.555 56.3966 37.8557 64.4433 41.9142C63.7043 41.2538 62.9933 40.5627 62.3124 39.8426Z"
                          fill="#FFCEBE"
                        />
                        <path
                          d="M25.6753 30.9662C20.7991 32.8729 16.3876 35.9246 12.6875 39.8427C12.0065 40.5628 11.2956 41.2541 10.5566 41.9146C13.7895 40.2851 17.1654 38.9564 20.6416 37.9453C21.9254 35.3587 23.626 33.0008 25.6753 30.9662Z"
                          fill="#FFB1A0"
                        />
                        <path
                          d="M69.656 26L65.672 19.16H63.032V26H60.848V9.272H66.248C67.512 9.272 68.576 9.488 69.44 9.92C70.32 10.352 70.976 10.936 71.408 11.672C71.84 12.408 72.056 13.248 72.056 14.192C72.056 15.344 71.72 16.36 71.048 17.24C70.392 18.12 69.4 18.704 68.072 18.992L72.272 26H69.656ZM63.032 17.408H66.248C67.432 17.408 68.32 17.12 68.912 16.544C69.504 15.952 69.8 15.168 69.8 14.192C69.8 13.2 69.504 12.432 68.912 11.888C68.336 11.344 67.448 11.072 66.248 11.072H63.032V17.408Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-redeyel"
                      data-bs-placement="left"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="76"
                        height="72"
                        viewBox="0 0 76 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M63.5978 60.1898L64.2338 58.9378L65.5051 58.7879C68.1471 56.5396 71.1029 54.6972 74.2864 53.3443C74.958 53.0588 75.3992 52.4061 75.3992 51.6763V51.6761C75.3992 50.9464 74.958 50.2936 74.2864 50.0081C70.8341 48.5411 67.6494 46.4985 64.8426 43.9863L55.2675 37.8108L22.6144 36L17 43.2435V60.8954L22.7155 66.2183L48.0239 67.2377L63.5978 60.1898Z"
                          fill="#F27182"
                        />
                        <path
                          d="M17.9187 50.5983C17.9187 46.1159 19.0429 41.8964 21.0231 38.2046H16.6007L11.8863 42.0027L11.5076 43.2656L9.768 43.5991C7.15809 45.799 4.24584 47.6049 1.11284 48.9363C0.44121 49.2218 0 49.8745 0 50.6043C0 51.3341 0.44121 51.987 1.11284 52.2723C4.56547 53.7395 7.75062 55.7822 10.5574 58.2947L15.5193 61.6761L21.1387 63.2056C19.0866 59.4634 17.9187 55.1674 17.9187 50.5983Z"
                          fill="#ED5469"
                        />
                        <path
                          d="M65.4043 35.8391C65.1076 35.8395 64.8227 35.723 64.6112 35.5148C56.4508 27.4999 47.0758 23.2636 37.5 23.2636C27.9242 23.2636 18.5493 27.4999 10.3887 35.5148C10.2828 35.62 10.1573 35.7031 10.0192 35.7596C9.88106 35.816 9.73317 35.8446 9.58398 35.8437C9.4348 35.8427 9.28727 35.8123 9.14987 35.7542C9.01248 35.696 8.88794 35.6113 8.78341 35.5049C8.67888 35.3984 8.59642 35.2724 8.54078 35.134C8.48514 34.9955 8.45741 34.8475 8.45919 34.6983C8.46097 34.5491 8.49222 34.4018 8.55115 34.2647C8.61007 34.1277 8.69552 34.0036 8.80256 33.8997C17.3953 25.4607 27.3187 21 37.5 21C47.6813 21 57.6048 25.4607 66.1974 33.8998C66.3576 34.0573 66.4673 34.2589 66.5126 34.479C66.5579 34.6991 66.5366 34.9276 66.4516 35.1356C66.3665 35.3435 66.2215 35.5215 66.035 35.6468C65.8485 35.7721 65.629 35.839 65.4043 35.8391Z"
                          fill="#FFA68E"
                        />
                        <path
                          d="M49.5779 37.7657L46.4059 34.9279H28.5942L25.4222 37.7657C23.2991 40.4144 22.0283 43.7758 22.0283 47.4344C22.0283 55.9791 28.9553 62.906 37.5 62.906C46.0416 62.906 52.9716 55.9811 52.9716 47.4344C52.9718 43.7758 51.7009 40.4144 49.5779 37.7657Z"
                          fill="#E63850"
                        />
                        <path
                          d="M58.4663 54.8522C58.2371 54.8522 58.0132 54.7827 57.8244 54.6527C57.6356 54.5228 57.4907 54.3386 57.4089 54.1245C57.327 53.9104 57.3121 53.6765 57.3661 53.4537C57.42 53.231 57.5404 53.0299 57.7111 52.877L59.8615 50.9529C60.0859 50.7571 60.3783 50.6575 60.6756 50.6758C60.9728 50.6942 61.2509 50.8289 61.4494 51.0508C61.648 51.2728 61.7511 51.564 61.7364 51.8615C61.7217 52.1589 61.5904 52.4386 61.3709 52.6398L59.2205 54.5639C59.0133 54.7498 58.7446 54.8525 58.4663 54.8522Z"
                          fill="#F78B98"
                        />
                        <path
                          d="M64.4434 58.2943L64.4442 58.2944C64.6625 58.0989 64.883 57.906 65.1059 57.7158V55.3959C65.1067 54.7645 64.9683 54.1406 64.7005 53.5688C64.4327 52.9969 64.042 52.4912 63.5564 52.0876L61.7665 50.5959C61.5362 50.4045 61.3509 50.1646 61.2238 49.8933C61.0968 49.6221 61.0311 49.3262 61.0315 49.0267V47.1183C61.0315 46.8181 60.9122 46.5302 60.7 46.318C60.4877 46.1058 60.1999 45.9865 59.8997 45.9865C59.5996 45.9865 59.3117 46.1058 59.0995 46.318C58.8872 46.5302 58.768 46.8181 58.768 47.1183V49.0267C58.7672 49.6581 58.9056 50.282 59.1734 50.8538C59.4413 51.4256 59.8319 51.9314 60.3175 52.335L62.1075 53.8266C62.3379 54.0181 62.5232 54.258 62.6502 54.5292C62.7772 54.8005 62.8429 55.0964 62.8424 55.3959V59.3533L64.4434 58.2943ZM14.2578 50.5983C14.0286 50.5983 13.8047 50.5288 13.6159 50.3988C13.4271 50.2689 13.2822 50.0847 13.2004 49.8706C13.1185 49.6565 13.1036 49.4226 13.1576 49.1999C13.2115 48.9771 13.3319 48.776 13.5026 48.6231L15.653 46.699C15.8774 46.5032 16.1699 46.4036 16.4671 46.4219C16.7643 46.4403 17.0424 46.575 17.241 46.7969C17.4395 47.0189 17.5426 47.3101 17.5279 47.6076C17.5132 47.905 17.3819 48.1847 17.1624 48.3859L15.012 50.31C14.8048 50.4959 14.5361 50.5986 14.2578 50.5983Z"
                          fill="#F78B98"
                        />
                        <path
                          d="M11.3175 49.175L13.1074 50.6667C13.3377 50.8581 13.523 51.098 13.6501 51.3693C13.7771 51.6405 13.8428 51.9365 13.8424 52.236V54.1444C13.8424 54.4445 13.9617 54.7324 14.1739 54.9446C14.3861 55.1569 14.674 55.2761 14.9742 55.2761C15.2743 55.2761 15.5622 55.1569 15.7744 54.9446C15.9867 54.7324 16.1059 54.4445 16.1059 54.1444V52.2361C16.1067 51.6047 15.9682 50.9808 15.7004 50.409C15.4326 49.8372 15.042 49.3314 14.5564 48.9278L12.7665 47.4361C12.5361 47.2447 12.3508 47.0048 12.2238 46.7336C12.0967 46.4623 12.031 46.1664 12.0314 45.8669V41.9031L10.5565 42.9146L10.555 42.9137C10.2959 43.146 10.0335 43.3745 9.76783 43.5993V45.8669C9.76706 46.4983 9.90554 47.1221 10.1734 47.6939C10.4412 48.2657 10.8319 48.7714 11.3175 49.175Z"
                          fill="#F78B98"
                        />
                        <path
                          d="M37.4999 64.6536C31.6375 64.6536 25.9803 63.8173 20.6487 62.2656L20.2854 63.3991L23.3288 67.3729L25.6959 69.2502C29.3988 70.6953 33.3689 71.4812 37.4999 71.4812C47.0801 71.4812 55.7981 67.2644 62.3124 60.366C62.9934 59.6459 63.7044 58.9547 64.4433 58.2943C56.3967 62.3529 47.2301 64.6536 37.4999 64.6536Z"
                          fill="#FFCEBE"
                        />
                        <path
                          d="M20.6487 62.2656C17.1699 61.2543 13.7916 59.9248 10.5565 58.2941C11.2955 58.9545 12.0065 59.6457 12.6874 60.3658C16.3927 64.2896 20.8116 67.3441 25.6958 69.2501C23.6413 67.2149 21.9361 64.8552 20.6487 62.2656Z"
                          fill="#FFB1A0"
                        />
                        <path
                          d="M40.447 55.84C45.0885 54.2128 47.5321 49.1309 45.9048 44.4894C44.2775 39.8478 39.1957 37.4042 34.5541 39.0315C29.9126 40.6588 27.469 45.7407 29.0963 50.3822C30.7235 55.0238 35.8054 57.4673 40.447 55.84Z"
                          fill="#865151"
                        />
                        <path
                          d="M62.3124 40.8426C55.7981 33.9442 47.08 29.7274 37.4999 29.7274C33.3613 29.7274 29.3841 30.5159 25.6753 31.9661L23.2406 33.4564L20.6374 37.1913L20.6415 38.945C25.9751 37.392 31.6348 36.555 37.4999 36.555C47.2301 36.555 56.3966 38.8557 64.4433 42.9142C63.7043 42.2538 62.9933 41.5627 62.3124 40.8426Z"
                          fill="#FFCEBE"
                        />
                        <path
                          d="M25.6753 31.9662C20.7991 33.8729 16.3876 36.9246 12.6875 40.8427C12.0065 41.5628 11.2956 42.2541 10.5566 42.9146C13.7895 41.2851 17.1654 39.9564 20.6416 38.9453C21.9254 36.3587 23.626 34.0008 25.6753 31.9662Z"
                          fill="#FFB1A0"
                        />
                        <path
                          d="M8.032 24.224H13.888V26H5.848V9.272H8.032V24.224Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-roll"
                      data-bs-placement="left"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="63"
                        height="72"
                        viewBox="0 0 63 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M55.0749 70C54.6061 70 54.1771 69.6879 54.0496 69.2137C53.7747 68.1937 53.351 67.0316 52.9034 65.8018C50.9033 60.314 48.166 52.7994 53.3882 44.4044C53.4081 44.3712 53.4307 44.3406 53.4546 44.3101C56.913 39.898 58.7419 34.6015 58.7419 28.9955C58.7405 15.2812 47.5697 4.125 33.8382 4.125C24.297 4.125 16.7107 7.37094 12.4753 13.2652C8.99961 18.1022 8.04868 24.3311 9.93196 29.9265C11.3597 34.134 9.22672 38.5487 6.33805 40.3868C4.12407 41.7933 4.11875 42.4985 4.12672 42.5742C4.17985 43.1732 6.01664 43.9223 6.80024 44.2423C7.9411 44.7085 8.69547 45.0166 8.8761 45.7896C9.03813 46.4895 8.81633 47.2904 7.92649 49.2215C7.79766 49.4991 8.15625 49.8829 8.82032 50.454C9.04078 50.6439 9.23071 50.8073 9.3861 50.9866C9.6411 51.288 9.74868 51.6506 9.69555 52.0132C9.62383 52.5033 9.30242 52.8061 9.01157 53.0146C11.5257 54.9284 11.4978 56.7559 11.4699 58.525C11.4686 58.6498 11.4659 58.776 11.4646 58.9035C11.458 60.0244 11.4832 61.1733 11.8418 61.7988C11.9693 62.0206 12.2668 62.5386 13.9097 62.5691C13.9867 62.5705 14.0664 62.5718 14.1461 62.5718C18.9685 62.5718 27.6863 59.4905 31.2776 55.7612C32.4091 54.5858 32.951 53.4542 32.8886 52.3997C32.8541 51.814 33.3003 51.3106 33.886 51.2761C34.4717 51.2415 34.9751 51.6878 35.0096 52.2735C35.1092 53.9456 34.3694 55.6151 32.8089 57.2354C31.2749 58.8291 29.033 60.2728 26.5468 61.4575C28.3119 63.4112 29.0875 65.6238 29.2296 68.8883C29.2548 69.474 28.8006 69.9708 28.2149 69.996C27.6279 70.0239 27.1325 69.567 27.1073 68.9813C26.9745 65.9452 26.2466 64.0832 24.4683 62.3646C20.7123 63.8667 16.7067 64.7565 13.8672 64.6941C9.31039 64.6065 9.32766 61.3008 9.34094 58.8889C9.34227 58.7534 9.3436 58.6219 9.34625 58.4918C9.37149 56.8861 9.3861 55.9165 7.59313 54.6057C7.32883 54.4118 6.53063 53.8248 6.55586 52.915C6.57047 52.4037 6.8268 52.0371 7.10836 51.7755C6.33407 51.0716 5.27821 49.8762 5.99938 48.3263C6.44696 47.3555 6.65016 46.8176 6.73649 46.5201C6.51868 46.4205 6.2318 46.3036 5.99672 46.208C4.38571 45.5505 2.17836 44.6487 2.00969 42.7615C1.84766 40.9433 3.75086 39.5102 5.19852 38.5912C7.3461 37.2245 8.99828 33.782 7.91985 30.6052C5.81875 24.359 6.87594 17.4142 10.7501 12.0234C12.9561 8.95406 15.9444 6.53156 19.6313 4.82226C23.6754 2.94961 28.4553 2 33.8382 2C41.0048 2 47.7729 4.80766 52.8955 9.90367C58.0353 15.0183 60.8669 21.7984 60.8669 28.9941C60.8669 35.061 58.8946 40.7932 55.1639 45.5744C50.5274 53.0704 52.9526 59.7243 54.9009 65.074C55.3658 66.349 55.8041 67.5523 56.1029 68.6612C56.2556 69.2283 55.9196 69.8114 55.3525 69.9628C55.2595 69.988 55.1666 70 55.0749 70Z"
                          fill="white"
                          stroke="white"
                          stroke-width="2.5"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-yaw"
                      data-bs-placement="left"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="63"
                        height="72"
                        viewBox="0 0 63 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.79229 70C8.26109 70 8.69009 69.6879 8.81759 69.2137C9.09249 68.1937 9.51619 67.0316 9.96379 65.8018C11.9639 60.314 14.7012 52.7994 9.47899 44.4044C9.45909 44.3712 9.43649 44.3406 9.41259 44.3101C5.95419 39.898 4.12529 34.6015 4.12529 28.9955C4.12669 15.2812 15.2975 4.125 29.029 4.125C38.5702 4.125 46.1565 7.37094 50.3919 13.2652C53.8676 18.1022 54.8185 24.3311 52.9352 29.9265C51.5075 34.134 53.6405 38.5487 56.5291 40.3868C58.7431 41.7933 58.7484 42.4985 58.7405 42.5742C58.6873 43.1732 56.8505 43.9223 56.0669 44.2423C54.9261 44.7085 54.1717 45.0166 53.9911 45.7896C53.8291 46.4895 54.0509 47.2904 54.9407 49.2215C55.0695 49.4991 54.7109 49.8829 54.0469 50.454C53.8264 50.6439 53.6365 50.8073 53.4811 50.9866C53.2261 51.288 53.1185 51.6506 53.1716 52.0132C53.2434 52.5033 53.5648 52.8061 53.8556 53.0146C51.3415 54.9284 51.3694 56.7559 51.3973 58.525C51.3986 58.6498 51.4012 58.776 51.4026 58.9035C51.4092 60.0244 51.384 61.1733 51.0254 61.7988C50.8979 62.0206 50.6004 62.5386 48.9575 62.5691C48.8805 62.5705 48.8008 62.5718 48.7211 62.5718C43.8987 62.5718 35.1809 59.4905 31.5896 55.7612C30.4581 54.5858 29.9162 53.4542 29.9786 52.3997C30.0131 51.814 29.5669 51.3106 28.9812 51.2761C28.3955 51.2415 27.8921 51.6878 27.8576 52.2735C27.758 53.9456 28.4978 55.6151 30.0583 57.2354C31.5923 58.8291 33.8342 60.2728 36.3204 61.4575C34.5553 63.4112 33.7797 65.6238 33.6376 68.8883C33.6124 69.474 34.0666 69.9708 34.6523 69.996C35.2393 70.0239 35.7347 69.567 35.7599 68.9813C35.8927 65.9452 36.6206 64.0832 38.3989 62.3646C42.1549 63.8667 46.1605 64.7565 49 64.6941C53.5568 64.6065 53.5395 61.3008 53.5262 58.8889C53.5249 58.7534 53.5236 58.6219 53.5209 58.4918C53.4957 56.8861 53.4811 55.9165 55.2741 54.6057C55.5384 54.4118 56.3366 53.8248 56.3113 52.915C56.2967 52.4037 56.0404 52.0371 55.7588 51.7755C56.5331 51.0716 57.589 49.8762 56.8678 48.3263C56.4202 47.3555 56.217 46.8176 56.1307 46.5201C56.3485 46.4205 56.6354 46.3036 56.8705 46.208C58.4815 45.5505 60.6888 44.6487 60.8575 42.7615C61.0195 40.9433 59.1163 39.5102 57.6687 38.5912C55.5211 37.2245 53.8689 33.782 54.9473 30.6052C57.0484 24.359 55.9912 17.4142 52.1171 12.0234C49.9111 8.95406 46.9228 6.53156 43.2359 4.82226C39.1918 2.94961 34.4119 2 29.029 2C21.8624 2 15.0943 4.80766 9.97169 9.90367C4.83189 15.0183 2.00029 21.7984 2.00029 28.9941C2.00029 35.061 3.97259 40.7932 7.70329 45.5744C12.3398 53.0704 9.91459 59.7243 7.96629 65.074C7.50139 66.349 7.06309 67.5523 6.76429 68.6612C6.61159 69.2283 6.94759 69.8114 7.51469 69.9628C7.60769 69.988 7.70059 70 7.79229 70Z"
                          fill="white"
                          stroke="white"
                          stroke-width="2.5"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-pitch"
                      data-bs-placement="left"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="70"
                        height="70"
                        viewBox="0 0 70 70"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.1423 69.0131C0.872666 69.0107 0.612409 68.9138 0.406816 68.7394C0.201222 68.5649 0.0633069 68.3239 0.0170717 68.0582C-0.0291636 67.7926 0.0192075 67.5191 0.153767 67.2855C0.288327 67.0518 0.500557 66.8727 0.753524 66.7794L18.3771 60.4509C19.0538 60.2149 19.6404 59.7744 20.0558 59.1904C20.4712 58.6065 20.6949 57.9078 20.696 57.1912V48.9994C20.696 48.6943 20.8171 48.4017 21.0328 48.186C21.2486 47.9703 21.5411 47.8491 21.8462 47.8491C22.1512 47.8491 22.4438 47.9703 22.6595 48.186C22.8752 48.4017 22.9964 48.6943 22.9964 48.9994V57.1912C22.9952 58.3834 22.6242 59.5458 21.9344 60.5182C21.2447 61.4906 20.2702 62.225 19.1455 62.6202L1.53107 68.9464C1.40629 68.9908 1.27476 69.0134 1.1423 69.0131ZM67.8548 69.0131C67.7223 69.0134 67.5908 68.9908 67.466 68.9464L49.8424 62.6179C48.7199 62.221 47.7479 61.4862 47.06 60.5145C46.372 59.5427 46.002 58.3818 46.0007 57.1912V48.7693C46.0007 48.4643 46.1219 48.1717 46.3376 47.956C46.5533 47.7403 46.8458 47.6191 47.1509 47.6191C47.456 47.6191 47.7485 47.7403 47.9642 47.956C48.1799 48.1717 48.3011 48.4643 48.3011 48.7693V57.1912C48.3011 58.6543 49.2282 59.9655 50.6107 60.4509L68.2435 66.7817C68.4975 66.8739 68.711 67.0525 68.8464 67.2863C68.9818 67.5201 69.0307 67.7941 68.9843 68.0603C68.9379 68.3265 68.7993 68.5679 68.5928 68.7421C68.3862 68.9163 68.125 69.0122 67.8548 69.0131ZM51.7978 38.3024C51.5255 38.304 51.2614 38.209 51.0526 38.0343C50.8438 37.8595 50.7037 37.6164 50.6573 37.3481C50.611 37.0797 50.6613 36.8037 50.7993 36.569C50.9374 36.3343 51.1542 36.1562 51.4113 36.0663C52.5205 35.6699 53.4801 34.9404 54.1587 33.9776C54.8374 33.0148 55.2019 31.8658 55.2024 30.6879V27.3523C55.2032 27.168 55.1594 26.9862 55.0749 26.8224C54.9904 26.6586 54.8676 26.5176 54.717 26.4114C54.5697 26.3052 54.3991 26.2355 54.2195 26.2083C54.0399 26.1811 53.8563 26.1971 53.6841 26.255L53.4219 26.3355C53.1361 26.4043 52.8349 26.3614 52.5797 26.2154C52.3246 26.0695 52.1349 25.8315 52.0494 25.5503C51.9638 25.2691 51.989 24.9658 52.1197 24.7026C52.2504 24.4393 52.4767 24.2359 52.7524 24.134L52.9825 24.065C53.4966 23.8941 54.0441 23.8484 54.5794 23.9316C55.1148 24.0148 55.6225 24.2246 56.0605 24.5435C56.9645 25.1922 57.5028 26.2435 57.5028 27.3523V30.6879C57.5028 34.0719 55.3634 37.1038 52.1819 38.2356C52.0587 38.28 51.9287 38.3026 51.7978 38.3024ZM17.2223 38.3254C17.0923 38.3255 16.9632 38.3037 16.8404 38.2609C15.2764 37.7051 13.9229 36.6788 12.9656 35.3228C12.0084 33.9668 11.4944 32.3477 11.4942 30.6879V27.3523C11.4956 26.8044 11.627 26.2647 11.8775 25.7775C12.1281 25.2903 12.4907 24.8695 12.9356 24.5497C13.3805 24.2299 13.8949 24.0203 14.4365 23.938C14.9782 23.8557 15.5316 23.9032 16.0514 24.0765L16.3228 24.1685C16.47 24.2131 16.6068 24.2868 16.725 24.3852C16.8432 24.4836 16.9405 24.6046 17.0111 24.7413C17.0817 24.8779 17.1242 25.0273 17.136 25.1807C17.1479 25.334 17.1288 25.4882 17.0801 25.634C17.0313 25.7799 16.9537 25.9145 16.852 26.0299C16.7503 26.1452 16.6265 26.239 16.4879 26.3057C16.3494 26.3724 16.1988 26.4106 16.0452 26.4181C15.8916 26.4256 15.738 26.4022 15.5936 26.3493L15.3175 26.2573C15.1438 26.1978 14.9584 26.1808 14.7767 26.2076C14.5951 26.2344 14.4225 26.3044 14.2734 26.4116C14.1243 26.5188 14.003 26.6601 13.9197 26.8238C13.8365 26.9875 13.7936 27.1687 13.7947 27.3523V30.6879C13.7947 33.1149 15.3268 35.2888 17.6042 36.0916C17.8592 36.1825 18.074 36.3604 18.2108 36.5941C18.3476 36.8277 18.3976 37.1021 18.3519 37.369C18.3063 37.6358 18.168 37.8781 17.9614 38.053C17.7548 38.2279 17.493 38.3244 17.2223 38.3254Z"
                          fill="white"
                        />
                        <path
                          d="M38.6623 57.5109H30.3348C30.1646 57.51 29.9967 57.4723 29.8425 57.4005C25.9985 55.5832 20.9766 49.9103 18.7935 46.6483C17.7008 44.9644 16.8197 41.9278 16.0836 37.3569C15.566 34.088 15.1381 30.0438 14.8069 25.3394C14.6895 23.8027 14.5975 22.2338 14.5055 20.6695C14.3484 18.0052 14.7414 15.337 15.66 12.831C16.5785 10.325 18.003 8.03493 19.8448 6.10322C21.6651 4.16618 23.8646 2.62467 26.3065 1.57468C28.7485 0.524698 31.3804 -0.0112631 34.0385 0.000179427H34.9816C40.4038 0.000179427 45.4463 2.17179 49.1799 6.11242C51.0172 8.03643 52.4387 10.3182 53.3557 12.8155C54.2727 15.3129 54.6657 17.9723 54.51 20.6281L54.2339 25.3049C53.8728 30.0875 53.4357 34.1271 52.9342 37.3316C52.1958 41.9623 51.2848 45.0242 50.1507 46.7012C47.9239 49.9885 42.8905 55.6614 39.1477 57.4051C38.9953 57.4746 38.8298 57.5107 38.6623 57.5109ZM30.6039 55.2105H38.3978C41.34 53.7106 45.8167 48.9993 48.2459 45.4107C48.8831 44.4675 49.8217 42.2384 50.6614 36.9727C51.156 33.8326 51.5839 29.8552 51.9404 25.1508L52.2165 20.4993C52.3527 18.1563 52.0051 15.8104 51.1953 13.6075C50.3856 11.4047 49.131 9.3921 47.5098 7.69512C45.9035 5.9844 43.9622 4.62262 41.8069 3.69455C39.6516 2.76648 37.3283 2.29199 34.9816 2.30061H34.0385C31.6931 2.29034 29.3708 2.7632 27.2162 3.68972C25.0615 4.61623 23.1208 5.97656 21.5149 7.68592C19.8909 9.38861 18.6347 11.4074 17.8245 13.6165C17.0144 15.8257 16.6677 18.178 16.8059 20.5269C16.898 22.0866 16.99 23.6417 17.1073 25.1738C17.434 29.8207 17.8526 33.7958 18.361 36.998C19.1961 42.2131 20.1048 44.4376 20.719 45.3854C23.0424 48.8567 27.6134 53.6692 30.6039 55.2105Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div
                      class="icao-card-container display-flex-centered icao-white-background"
                      data-bs-toggle="tooltip"
                      data-bs-html="true"
                      id="icao-face-feature-faceconfidence"
                      data-bs-placement="left"
                      data-bs-title="0"
                    >
                      <svg
                        class="icon-svg white-svg"
                        width="58"
                        height="76"
                        viewBox="0 0 58 76"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.233215 10.8664V0H11.1172V3.37844H3.6099V10.8647L0.233215 10.8664ZM46.3164 0H57.1688V10.8734H53.7921V3.37844H46.3164V0ZM57.1688 43.5463V54.4039H46.3409V51.0255H53.7921V43.5463H57.1688ZM11.0944 54.4039H0.233215V43.5463H3.6099V51.0255H11.0961L11.0944 54.4039Z"
                          fill="white"
                        />
                        <path
                          d="M33.8423 56.9268C33.1679 57.6035 32.3667 58.1404 31.4844 58.5067C30.6022 58.8731 29.6563 59.0616 28.701 59.0616C27.7457 59.0616 26.7998 58.8731 25.9175 58.5067C25.0353 58.1404 24.234 57.6035 23.5597 56.9268C22.7758 56.1445 22.1799 55.1943 21.817 54.148C14.6989 55.7679 9.29904 58.4328 5.65586 62.1426C2.11437 65.7472 0.217398 70.3652 0 76H57.4019C57.1845 70.3669 55.2876 65.7472 51.7461 62.1426C48.1029 58.4328 42.703 55.7679 35.585 54.148C35.222 55.1943 34.6261 56.1445 33.8423 56.9268ZM14.8655 37.6064C14.2505 35.233 13.774 32.8259 13.4384 30.3972C12.2339 30.2745 11.4572 30.6128 11.0365 31.1932C10.6192 31.7665 10.4895 32.601 10.5982 33.4829C10.7139 34.4261 11.1048 35.3939 11.7132 36.1653C12.4566 37.1085 13.5453 37.7414 14.8655 37.6064ZM46.3655 31.1932C45.9447 30.6146 45.168 30.2745 43.9636 30.3972C43.628 32.8259 43.1515 35.233 42.5364 37.6064C43.8584 37.7414 44.9471 37.1067 45.6887 36.1653C46.2971 35.3939 46.6881 34.4243 46.8038 33.4829C46.9142 32.601 46.7845 31.7665 46.3655 31.1932Z"
                          fill="white"
                        />
                        <path
                          d="M10.8576 22.1185C10.6122 20.467 10.5526 18.5507 11.2328 16.9904C12.1585 14.869 14.4412 13.9187 16.6082 13.6242C16.7783 12.2508 17.397 10.972 18.3684 9.98629C19.8323 8.28918 22.1343 7.4529 24.8009 7.07596C30.4866 6.2765 37.1996 8.11036 41.3986 11.9236C44.7823 14.9952 46.7424 19.5255 45.5256 25.5461C45.2784 26.889 44.2914 29.2874 44.1827 30.1114C43.0904 38.22 40.9217 43.7234 37.673 46.6179C34.6084 49.3529 33.5565 52.1528 28.5563 52.1528C23.9068 52.1528 22.5516 49.1671 19.6903 46.6179C16.4434 43.7234 14.2729 38.22 13.1806 30.1114C12.9545 28.3775 11.217 24.971 10.8576 22.1168V22.1185ZM42.0297 28.4687C37.8571 25.0271 34.2332 25.6109 30.0956 25.653C26.47 25.6881 22.9951 25.7231 20.0602 23.0881L18.9487 22.0887C18.4911 24.3153 18.286 24.8062 16.7607 26.726C16.1786 27.4623 16.1436 27.543 15.281 28.4634C15.4107 28.8105 15.5299 29.1559 15.6211 29.4925C16.9763 34.5541 16.943 40.7745 21.3769 44.7279C22.1693 45.4327 22.8847 46.1989 23.6122 46.9686C24.1417 47.5296 24.6922 48.1081 25.3041 48.5798C26.3104 49.3547 27.2887 49.6194 28.5563 49.6194C29.9098 49.6194 31.0108 49.4038 32.0925 48.564C32.6816 48.1081 33.2128 47.5383 33.723 46.9984C34.4594 46.2147 35.1834 45.4433 35.9882 44.7262C39.6927 41.4231 41.0672 34.2543 41.7107 29.4925C41.7352 29.3155 41.8667 28.9227 42.0297 28.4687Z"
                          fill="white"
                        />
                      </svg>
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
                <button id="open-full-screen" class="toggle-full-screen-btn">
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
                <button id="close-full-screen" class="toggle-full-screen-btn">
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
`;
