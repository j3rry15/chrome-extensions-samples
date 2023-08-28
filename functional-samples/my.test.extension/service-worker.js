let changeColor = document.getElementById("changeColor");

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true
    });
  });

changeColor.addEventListener("click", async() => {
  chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: storeVariables,
    });
     chrome.storage.session.get("pageTitle",({pageTitle}) => {
      $("body").append("<p>"+pageTitle+"</p>");
    });
 });
 
function storeVariables() {
    chrome.storage.session.set({ pageTitle: document.title }).then(() => {
      console.log("Value was set" + document.title);
    }); 
}