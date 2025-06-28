const menloPrefix = "https://safe.menlosecurity.com/";

function buildRegexList(patterns = []) {
  return patterns.map((p) => {
    try {
      return new RegExp(p);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

function shouldExclude(url, regexList) {
  return regexList.some((re) => re.test(url));
}

function modifyLinks(enabled = true) {
  browser.storage.local.get('exclusionRules').then(({ exclusionRules }) => {
    const regexList = buildRegexList(exclusionRules || []);
    const links = document.querySelectorAll('a');
    for (const link of links) {
      if (!link.href) continue;
      
      if (enabled) {
        // Add prefix if not already present and not excluded
        if (!link.href.startsWith(menloPrefix) && !shouldExclude(link.href, regexList)) {
          link.href = menloPrefix + link.href;
        }
      } else {
        // Remove prefix if present
        if (link.href.startsWith(menloPrefix)) {
          link.href = link.href.substring(menloPrefix.length);
        }
      }
    }
  });
}

// Initial modification when the script loads if enabled
browser.storage.local.get('enabled').then(({ enabled }) => {
  if (enabled) {
    modifyLinks(true);
  }
});

// Listen for messages from the background script or popup
browser.runtime.onMessage.addListener((message) => {
  if (message.command === "apply_modifications") {
    modifyLinks(true);
  } else if (message.command === "remove_modifications") {
    modifyLinks(false);
  }
});

// Observe DOM changes for dynamically added links
const observer = new MutationObserver((mutations) => {
  browser.storage.local.get(['enabled', 'exclusionRules']).then(({ enabled, exclusionRules }) => {
    if (!enabled) return;
    const regexList = buildRegexList(exclusionRules || []);
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const linkNodes = node.tagName === 'A' ? [node] : node.querySelectorAll('a');
          linkNodes.forEach((link) => {
            if (!link.href || link.href.startsWith(menloPrefix) || shouldExclude(link.href, regexList)) return;
            link.href = menloPrefix + link.href;
          });
        });
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

