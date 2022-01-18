chrome.browserAction.onClicked.addListener(function (tab) {
	msg = { action: "toggleState", tabId: tab.id };
	chrome.tabs.sendMessage(tab.id, msg);
});