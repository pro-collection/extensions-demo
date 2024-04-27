console.log(`[yanle] - yanle background`);

// chrome.runtime.onInstalled 扩展程序加载的时候
chrome.runtime.onInstalled.addListener((tab) => {
  console.log(`[yanle] - tab`, tab);
  // 设置扩展程序徽标， 没有实际的功能性能理
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const extensions = "https://developer.chrome.com/docs/extensions";
const webstore = "https://developer.chrome.com/docs/webstore";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab?.url?.startsWith(extensions) || tab?.url?.startsWith(webstore)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON";

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ["background/focus-mode.css"],
        target: { tabId: tab.id as number },
      });
    } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["background/focus-mode.css"],
        target: { tabId: tab.id as number },
      });
    }
  }
});
