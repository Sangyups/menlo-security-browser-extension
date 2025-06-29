const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

browserAPI.storage.local.get('enabled').then((data) => {
  const enabled = data.enabled ?? false;
  toggle.checked = enabled;
  updateUI(enabled);
});

toggle.addEventListener('change', () => {
  browserAPI.storage.local.get('enabled').then((data) => {
    const enabled = !data.enabled;
    browserAPI.storage.local.set({ enabled });
    updateUI(enabled);
  });
});

function updateUI(enabled) {
  if (enabled) {
    status.textContent = 'ON';
    status.classList.add('status-on');
    status.classList.remove('status-off');
    toggle.checked = true;
    browserAPI.action.setIcon({ path: '../icons/icon-on.svg' });
    browserAPI.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browserAPI.tabs.sendMessage(tabs[0].id, { command: 'apply_modifications' });
    });
  } else {
    status.textContent = 'OFF';
    status.classList.add('status-off');
    status.classList.remove('status-on');
    toggle.checked = false;
    browserAPI.action.setIcon({ path: '../icons/icon-off.svg' });
    browserAPI.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browserAPI.tabs.sendMessage(tabs[0].id, { command: 'remove_modifications' });
    });
  }
}
