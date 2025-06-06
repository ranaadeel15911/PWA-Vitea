import React, { useEffect, useState } from 'react';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent automatic mini-infobar
      setDeferredPrompt(e); // Save the event for later
      setShowInstallButton(true); // Show custom install button
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  return (
    <div>
      <h1>Welcome to My PWA App</h1>

      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer',
          }}
        >
          Install App
        </button>
      )}
    </div>
  );
}

export default App;
