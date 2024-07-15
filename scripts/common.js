export function removeScript(src) {
  console.log({ src });
  const scriptToRemove = document.querySelector(`script[src="${src}"]`);
  console.log({ scriptToRemove });
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
