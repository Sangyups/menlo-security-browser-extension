const listEl = document.getElementById('rules');
const inputEl = document.getElementById('pattern');
const addBtn = document.getElementById('add');
const tpl = document.getElementById('rule-template');

function renderRule(pattern) {
  const clone = tpl.content.cloneNode(true);
  clone.querySelector('.expr').textContent = pattern;
  clone.querySelector('.remove').addEventListener('click', () => deleteRule(pattern));
  listEl.appendChild(clone);
}

function load() {
  browserAPI.storage.local.get('exclusionRules').then(({ exclusionRules }) => {
    listEl.innerHTML = '';
    (exclusionRules || []).forEach(renderRule);
  });
}

function save(newRules) {
  browserAPI.storage.local.set({ exclusionRules: newRules });
}

function addRule() {
  const pattern = inputEl.value.trim();
  if (!pattern) return;
  browserAPI.storage.local.get('exclusionRules').then(({ exclusionRules }) => {
    const rules = exclusionRules || [];
    if (!rules.includes(pattern)) {
      rules.push(pattern);
      save(rules);
      renderRule(pattern);
    }
    inputEl.value = '';
  });
}

function deleteRule(pattern) {
  browserAPI.storage.local.get('exclusionRules').then(({ exclusionRules }) => {
    const rules = (exclusionRules || []).filter((p) => p !== pattern);
    save(rules);
    load();
  });
}

addBtn.addEventListener('click', addRule);
inputEl.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') addRule();
});

document.addEventListener('DOMContentLoaded', load);
