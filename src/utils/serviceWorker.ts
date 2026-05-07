// Service Worker registration and updates
export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('Service Worker registered:', registration);

    // Check for updates periodically
    setInterval(async () => {
      try {
        await registration.update();
      } catch (err) {
        console.warn('Service Worker update check failed:', err);
      }
    }, 60000); // Check every minute

    // Listen for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      newWorker?.addEventListener('statechange', () => {
        if (newWorker.state === 'activated') {
          // New service worker is ready
          console.log('New Service Worker available');
          // Optional: Notify user to refresh
          notifyUserOfUpdate();
        }
      });
    });

    // Handle controller change
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  } catch (err) {
    console.error('Service Worker registration failed:', err);
  }
};

// Notify user of new version
const notifyUserOfUpdate = () => {
  const message = document.createElement('div');
  message.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #E62B1E;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
      font-size: 14px;
    ">
      <strong>Update available!</strong> Refresh to get the latest version.
      <button onclick="window.location.reload()" style="
        margin-left: 12px;
        padding: 4px 12px;
        background: white;
        color: #E62B1E;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
      ">Refresh</button>
    </div>
  `;
  document.body.appendChild(message);
};

// Unregister all service workers (useful for development)
export const unregisterServiceWorkers = async () => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
  }
};
