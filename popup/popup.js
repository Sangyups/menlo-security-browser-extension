const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

browser.storage.local.get('enabled', (data) => {
  const enabled = data.enabled ?? false;
  toggle.checked = enabled;
  updateUI(enabled);
});
toggle.addEventListener('change', () => {
  browser.storage.local.get('enabled', (data) => {
    const enabled = !data.enabled;
    browser.storage.local.set({ enabled });
    updateUI(enabled);
  });
});

function updateUI(enabled) {
  if (enabled) {
    status.textContent = 'ON';
    status.classList.add('status-on');
    status.classList.remove('status-off');
    toggle.checked = true;
    browser.browserAction.setIcon({ path: '../icons/icon-on.svg' });
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { command: 'apply_modifications' });
    });
  } else {
    status.textContent = 'OFF';
    status.classList.add('status-off');
    status.classList.remove('status-on');
    toggle.checked = false;
    browser.browserAction.setIcon({ path: '../icons/icon-off.svg' });
  }
}
