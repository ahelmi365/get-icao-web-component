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
    this.savedImageElm = null;
  }

  connectedCallback() {
    console.log("version 1.2.2");
    const hasisICAOWCAttr = this.getAttribute("data-is-icao-wc");
    const openModalBtnId = this.getAttribute("data-open-modal-button-id");
    const savedImageId = this.getAttribute("data-saved-image-id");

    console.log(hasisICAOWCAttr, openModalBtnId, savedImageId);

    // handle isICAO or not
    if (hasisICAOWCAttr === null) {
      this.isICAOWC = false;
    } else {
      this.isICAOWC = true;
    }

    this.loadBootstrap();

    const shadowRoot = this.attachShadow({ mode: "open" });
    // Create button to open modal
    this.initICAOModal();

    // handle open modal btn
    console.log({ openModalBtnId });

    try {
      const openModalBtn = document.getElementById(
        openModalBtnId ? openModalBtnId : "open-icao-modal"
      );
      console.log({ openModalBtn });
      if (!openModalBtn) {
        throw new Error(
          `No element found to open the ICAO Modal, please check the 'data-open-modal-button-id' attribute`
        );
      } else {
        openModalBtn.addEventListener(
          "click",
          this.openModalAndoadIcaoScripts.bind(this)
        );
      }
    } catch (error) {
      alert(error);
      console.error(
        `No element found to open the ICAO Modal, please check the 'data-open-modal-button-id' attribute`
      );
    }
    // handle saved image id

    try {
      this.savedImageElm = document.getElementById(
        savedImageId ? savedImageId : "icao-result-image"
      );
      if (!this.savedImageElm) {
        throw new Error(
          "No image element found to store the cropped image from ICAO Modal, please check the 'data-saved-image-id' attribute"
        );
      }
    } catch (error) {
      alert(error);
      console.error(
        "No image element found to store the cropped image from ICAO Modal, please check the 'data-saved-image-id' attribute"
      );
    }
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
    // loadStyle("./styles/styles.css");
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
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        )
      )
      .then(() =>
        loadStyle(
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
  }

  async openModal() {
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
    // $(modal).find(".modal").modal("show");

    const innerModal = modal.querySelector(".modal");
    if (innerModal) {
      innerModal.addEventListener("shown.bs.modal", async () => {
        const { onICAOScriptLoad } = await import("./script.js");
        onICAOScriptLoad(this.isICAOWC, this.savedImageElm);
      });
    }
    if (innerModal) {
      innerModal.addEventListener("hidden.bs.modal", async () => {
        const {
          setIsCheckingICAOServiceThread,
          reestCashedArray,
          stopVideoStream,
          ClearICAOServiceThread,
          utils,
          EnrolmentDevices,
        } = await import("./utils.js");
        // const myUtils = (await import("./utils.js")).utils;

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

    // loadScript("./utils.js");
    // loadScript("./script.js");
  }
}

if (!customElements.get("icao-checker-wc")) {
  customElements.define("icao-checker-wc", ICaoChecker);
}
