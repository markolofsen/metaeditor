
import React from "react";

export default function usePWA() {

  const [prompt, setPrompt] = React.useState(null);
  const [isInstalled, setIsInstalled] = React.useState(false);

  const promptToInstall = async () => {
    if (prompt?.prompt) {

      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') {
        setPrompt(null)
      }

      return true
    }

    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event'
      )
    );
  };

  React.useEffect(() => {
    const ready = (e) => {
      e.preventDefault();
      setPrompt(e);
    };

    const onInstall = () => {
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", ready);
    window.addEventListener("appinstalled", onInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", ready);
      window.removeEventListener("appinstalled", onInstall);
    };
  }, []);

  return {
    accessible: prompt && !isInstalled,
    promptToInstall,
  }

}