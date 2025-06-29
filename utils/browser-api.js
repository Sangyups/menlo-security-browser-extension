const browserAPI = (() => {
  const api = typeof browser !== "undefined" ? browser : chrome;

  return {
    storage: {
      local: {
        get: (keys) => {
          if (typeof browser !== "undefined") {
            return api.storage.local.get(keys);
          } else {
            return new Promise((resolve) => {
              api.storage.local.get(keys, resolve);
            });
          }
        },
        set: (items) => {
          if (typeof browser !== "undefined") {
            return api.storage.local.set(items);
          } else {
            return new Promise((resolve) => {
              api.storage.local.set(items, resolve);
            });
          }
        },
      },
    },
    runtime: {
      onMessage: {
        addListener: (callback) => {
          api.runtime.onMessage.addListener(callback);
        },
      },
    },
    tabs: {
      query: (queryInfo) => {
        if (typeof browser !== "undefined") {
          return api.tabs.query(queryInfo);
        } else {
          return new Promise((resolve) => {
            api.tabs.query(queryInfo, resolve);
          });
        }
      },
      sendMessage: (tabId, message) => {
        if (typeof browser !== "undefined") {
          return api.tabs.sendMessage(tabId, message);
        } else {
          return new Promise((resolve) => {
            api.tabs.sendMessage(tabId, message, resolve);
          });
        }
      },
    },
    action: {
      setIcon: (details) => {
        const actionAPI = api.action || api.browserAction;
        if (typeof browser !== "undefined") {
          return actionAPI.setIcon(details);
        } else {
          return new Promise((resolve) => {
            actionAPI.setIcon(details, resolve);
          });
        }
      },
    },
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = browserAPI;
}
