const menloPrefix = 'https://safe.menlosecurity.com/';

function modifyLinks() {
  const links = document.querySelectorAll('a');
  for (const link of links) {
    if (link.href && !link.href.startsWith(menloPrefix)) {
      link.href = menloPrefix + link.href;
    }
  }
}

// Initial modification when the script loads if enabled
browser.storage.local.get('enabled', (data) => {
  if (data.enabled) {
    modifyLinks();
  }
});

// Listen for messages from the background script or popup
browser.runtime.onMessage.addListener((message) => {
  if (message.command === 'apply_modifications') {
    modifyLinks();
  }
});

// Observe DOM changes for dynamically added links
const observer = new MutationObserver((mutations) => {
  browser.storage.local.get('enabled', (data) => {
    if (data.enabled) {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
              if (node.href && !node.href.startsWith(menloPrefix)) {
                node.href = menloPrefix + node.href;
              }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              // Check for links within newly added elements
              const linksInAddedNode = node.querySelectorAll('a');
              for (const link of linksInAddedNode) {
                if (link.href && !link.href.startsWith(menloPrefix)) {
                  link.href = menloPrefix + link.href;
                }
              }
            }
          }
        }
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });