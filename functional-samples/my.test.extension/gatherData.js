
let getInfo = document.getElementById("getInfo");
getInfo.addEventListener("click", async() => {
  chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: storeVariables,
    });
     chrome.storage.session.get("pageTitle",({pageTitle}) => {
      if(!document.getElementById("pageTitleTest")){
      $("body").append("<div id = 'pageTitleTest'><p> Used for Logic to store variables between page and extension. <br> Example: PageTitle="+pageTitle+"</p><div>");
      }else{
        $("#pageTitleTest").replaceWith("<div id = 'pageTitleTest'><p> Used for Logic to store variables between page and extension. <br> Example: PageTitle="+pageTitle+"</p><div>");
      }
    }); 
    
 });
 
let dataButton = document.getElementById("openModelsPage");
dataButton.addEventListener("click", async() => {
  console.log("opened function")
  chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openModelsPage
    });
    
 });

 // Store the variable that will be used to populate the elements in the sidebar
 // ToDo:
function storeVariables() {
    chrome.storage.session.set({ pageTitle: document.title }).then(() => {
      console.log("Value was set " + document.title);
    }); 

}

function openModelsPage() {
  baseURL = window.location.origin
  if (document.URL.indexOf("/profile")!=-1){
    model = "candidate_profile"
    term = document.URL.split('/')[4].split('?')[0]
  } else if (document.URL.indexOf("/position")!=-1){
    model = "position"
    term = document.URL.split('=')[document.URL.split('=').length-1].split('?')[0]
 } else {
  alert("We can't open the models page as the Page URL doesn't looks like a Profile or Position. Please reach out to jmoloney@eightfold.ai with STR to update.")
  return
 }
 window.open(baseURL + "/models?model=" + model + "&terms=" + term)
}

// ToDo: get ENG help to make this robust
function getProfileAtsIdInTa(){
  profileData=document.getElementById("profile-basic-info").outerHTML.toString()
  profileId = profileData.indexOf("data-profile-id")
  profileId = profileData.substring(profileId,profileId+100).split('"')[1]

  let profileATSID = document.getElementsByClassName("profile-ats-id")[0].innerText
  return profileATSID
}
