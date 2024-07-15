import { StopWorker } from "./ICAOWorker.js";
import {
  loadScript,
  loadStyle,
  removeScript,
  modalInnerHtml,
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

  initICAOModal() {
    // Create modal structure
    const modal = document.createElement("div");
    modal.id = "icao-modal-start-container";

    modal.innerHTML = modalInnerHtml;

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
          utils,
          EnrolmentDevices,
        } = await import("./utils.js");
        const myUtils = (await import("./utils.js")).utils;

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

if (!customElements.get("icao-checker-wc")) {
  customElements.define("icao-checker-wc", ICaoChecker);
}
