const {
  remote,
  ipcRenderer
} = require('electron');
const fs = require('fs');
window.arguments = ipcRenderer.sendSync("getArguments", remote.getCurrentWindow().id);
document.addEventListener("DOMContentLoaded", () => {
  window.$ = window.jQuery = require("jquery")
  console.log('yes');
  $("body").prepend('<link rel="stylesheet" href="/atomos/lib/atomos.css" />');
  window.Popper = require("popper.js");
  require("bootstrap");
  $(window).keyup(function(e) {
    if (e.shiftKey && e.ctrlKey && e.keyCode == 73) require("electron").remote.getCurrentWindow().toggleDevTools();
    if (e.ctrlKey && e.keyCode == 82) location.reload();
    if (e.keyCode == 122) require("electron").remote.getCurrentWindow().setFullScreen(!require("electron").remote.getCurrentWindow().isFullScreen())
    if ((event.key == "+" || event.key == "=") && e.ctrlKey) {
      require("electron").remote.getCurrentWebContents().getZoomFactor(function(zoomFactor) {
        zoomFactor += 0.1;
        console.log("Zooming to " + zoomFactor);
        require("electron").remote.getCurrentWebContents().setZoomFactor(zoomFactor);
      });
    }
    if (event.key == "-" && e.ctrlKey) {
      require("electron").remote.getCurrentWebContents().getZoomFactor(function(zoomFactor) {
        zoomFactor -= 0.1;
        console.log("Zooming to " + zoomFactor);
        require("electron").remote.getCurrentWebContents().setZoomFactor(zoomFactor);
      });
    }
  })
  ipcRenderer.on("return-menu", function(event, action) {
    switch (action) {
      case "__undo":
        remote.getCurrentWebContents().undo();
        break;
      case "__redo":
        remote.getCurrentWebContents().redo();
        break;
      case "__copy":
        remote.getCurrentWebContents().copy();
        break;
      case "__cut":
        remote.getCurrentWebContents().cut();
        break;
      case "__paste":
        remote.getCurrentWebContents().paste();
        break;
      case "__select all":
        remote.getCurrentWebContents().selectAll();
        break;
    }
  })

});
require('atomos-framework');
