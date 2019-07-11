/**
 *
 * This script registers the service worker
 */

export const registerSW = () => {
  /**
   *
   * if we are in production & service workers
   *  are supported in the browser then register the service worker
   *
   * */

  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("SW registered: ", registration);
        })
        .catch(registrationError => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
};
