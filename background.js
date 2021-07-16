chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
      chrome.scripting
        .insertCSS({
          target: { tabId: tabId },
          files: ["./foreground_styles.css"],
        })
        .then(() => {
          console.log("style injection complete");
  
          chrome.scripting
            .executeScript({
              target: { tabId: tabId },
              files: ["./foreground.js"],
            })
            .then(() => {
              console.log("injection complete");
  
              
            });
        })
        .catch((err) => console.log(err));
    }
  });