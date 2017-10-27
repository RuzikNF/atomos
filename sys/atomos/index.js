const fs = require("fs");
const {ipcRenderer, remote, clipboard} = require("electron");
window.this = remote.getCurrentWindow();
window.mimeList = []
window.getMimeType = function(ext) {
  console.log(window.mimeList.find(o => o.extension === ext), ext)
  if (window.mimeList.find(o => o.extension === ext) === undefined) return "text/plain";
  else return window.mimeList.find(o => o.extension === ext)["mime"]
}

// File Clipboard API

window.fileClipboard = {}
window.fileClipboard.add = function(path) {
  window.fileClipboard.isFilled = true;
  var oldcb = clipboard.readText("fileBuffer");
  oldcb = $.parseJSON(oldcb);
  oldcb.push(path);
  clipboard.writeText(JSON.stringify(oldcb));
}
window.fileClipboard.copyMode = "copy";
window.fileClipboard.overwrite = false;
window.fileClipboard.clear = function() {
  window.fileClipboard.isFilled = false;
  clipboard.writeText("[]", "fileBuffer");
}
window.fileClipboard.isFilled = false;
window.fileClipboard.flush = function(target) {
  var cb = $.parseJSON(clipboard.readText("fileBuffer"));
  cb.forEach(function(file) {
    fs.writeFileSync(target + file.substring(file.lastIndexOf("/")), fs.readFileSync(file), {flag: (window.fileClipboard.overwrite ? "w" : "wx")});
    if(window.fileClipboard.copyMode === "cut") fs.unlinkSync(file);
  })
  window.fileClipboard.clear();
}
if(clipboard.readText("fileBuffer")) window.fileClipboard.clear();

// } //

window.fileOpen = function(path) {
	var mime = window.getMimeType(path.substring(path.lastIndexOf("/") + 1));
	fs.readFile("/atomos/etc/associations.json","utf8",function(err,assocs) {
		console.log(assocs);
		assocs = $.parseJSON(assocs);

		assocs = assocs.filter(function (obj) {
			return obj.mime == mime
		})
		if (assocs.length > 0) window.new(assocs[0].app, {
			path: path
		});
		else window.new("aos-appchooserdialog", {
			path: path,
			mimeType: mime
		});
	})
}
window.new = function(app, args, electronOptions) {
  $.getJSON("/atomos/etc/apps/" + app.replace("/","-") + ".json", function(settings) {
    var defaultOptions = {
      width: settings.width || 400,
      height: settings.height || 300,
      minWidth: settings.minWidth || 100,
      minHeight: settings.minHeight || 100,
      resizable: (settings.resizable === undefined ? true : settings.resizable),
      minimizable: (settings.minimizable === undefined ? true : settings.minimizable),
      maximizable: (settings.maximizable === undefined ? true : settings.maximizable),
      closable: (settings.closable === undefined ? true : settings.closable),
      title: settings.name || "New Application",
      acceptFirstMouse: true,
      webPreferences: {
        preload: "/atomos/apps/preload.js",
        defaultEncoding: "utf-8"
      }
    };
    const {
      BrowserWindow
    } = require("electron").remote;
    Object.assign(defaultOptions, defaultOptions, settings, electronOptions);
    let win = new BrowserWindow(defaultOptions);
    require('electron').ipcRenderer.send("setArguments", {
      wid: win.id,
      arguments: args
    })
    win.setIcon = function(icon) {ipcRenderer.send("icon-change", {icon: icon, wid: win.id})};
    win.setIcon(settings.icon || "/atomos/icons/Application.png");
		win.setMenu(null);
    win.loadURL("file:///atomos/apps/" + app + "/index.html");
    win.show();
    return win;
  })
}
fs.readFile("/etc/mime.types", "utf8", function(errno, mimeList) {
  var mimeArr = mimeList.split("\n");
  mimeArr.forEach(function(mime) {
    if (mime[0] != "#" && mime.trim() != "" && mime.indexOf("	") !== -1) {
      var m1 = mime.trim().split("	");
      m1 = m1.filter((n) => {
        return n != ""
      });
      var exts = m1[1].trim().split(" ");
      exts.forEach(function(ext) {
        window.mimeList.push({
          mime: m1[0].trim(),
          extension: ext
        });
      })
    }
  })
})