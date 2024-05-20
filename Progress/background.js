let interval = null;
let time = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ time: 0, running: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTimer') {
    startTimer(request.time);
    sendResponse({ success: true });
  } else if (request.action === 'getTime') {
    sendResponse({ time: time });
  } else if (request.action === 'stopTimer') {
    stopTimer();
    sendResponse({ success: true });
  } else {
    sendResponse({ success: false, message: 'Invalid action' });
  }
  return true; // Keeps the message channel open for asynchronous response
});

function startTimer(duration) {
  chrome.storage.local.set({ running: true });
  time = duration * 60;
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    time -= 1;
    chrome.storage.local.set({ time: time });
    if (time <= 0) {
      clearInterval(interval);
      chrome.storage.local.set({ running: false });
      chrome.notifications.create('timerEnd', {
        type: 'basic',
        iconUrl: 'icon128.png',
        title: 'Worktime Popup',
        message: 'Your work time is over! Time to take a break.'
      });
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  chrome.storage.local.set({ running: false });
}
