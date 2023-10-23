/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

document.getElementById("adminConsoleButtons").addEventListener('click', function() {
    document.getElementById("adminConsoleDropdown").classList.toggle("show");
  });

function openURLInCurrentPage(url) {
  window.open(window.location.origin + url, "_self");
}
// select all the buttons with the class name "btn"
const dropdownButtons = document.querySelectorAll(".dropBtn");

//Add links to each of the Admin Console Items
dropdownButtons.forEach(function(button){
button.addEventListener("click", async(event) => {
  console.log("opened function")
  chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openURLInCurrentPage,
      args : [ "/"+ event.target.id],
    });
 });
});
