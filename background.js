// Toolbar ikonuna tıklandığında ilgili sekmeye mesaj gönder
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { action: 'toggleVisibility' });
});
