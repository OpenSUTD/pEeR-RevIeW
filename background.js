var currentSetupKey = null;
var core = { 
  "getOptions": function(){
    var result;
    try{
      result = JSON.parse(localStorage.settings);
      result = result[currentSetupKey];
    } catch(e){
      result = null;
    }
    return result;
  },
}
 

function fill(info,tab) {
  chrome.tabs.executeScript(null, { file: "jquery-3.1.1.min.js" }, function() {
    chrome.tabs.executeScript(null, { file: "faker.js" }, function() {
      chrome.tabs.executeScript(null, {code: "var deepAutofillChromeExtensionSettings = " + JSON.stringify(core.getOptions()) + ";"}, function(){
        chrome.tabs.executeScript(null, { file: "run.js" }, function () {
          chrome.notifications.create(
            'name-for-notification',{   
              type: 'basic', 
              iconUrl: 'monkey48.png', 
              title: "OK", 
              message: "Your HTML form was just filled out by a smart but very wild monkey!" 
            }, 
            function() {}  
          );
        });
      });
    });       
  });       
}
   
 
  var settings = (localStorage.settings ? JSON.parse(localStorage.settings) : {});
  var mainContextMenuItem = chrome.contextMenus.create({
    title: "pEeR RevIeW",
    contexts:["page"], 
    onclick: function(info, tab){
      currentSetupKey = null;
      fill(info, tab)
    } 
  });


chrome.browserAction.onClicked.addListener(
  function(tab) {
      currentSetupKey = null;
      // chrome.tabs.sendMessage(tab.id,{"message":"hide"});
      fill(null, tab)
  }
);