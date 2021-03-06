const AppWindow = require("@api/WindowManager");
const Shell = require("@api/Shell");
const {Notification} = require("@api/Notification");
const win = AppWindow.getCurrentWindow();
const path = require("path");
const fs = require("fs").promises;
const {clipboard, remote} = require("electron");
const wc = remote.getCurrentWebContents();
let nav = document.createElement("nav");
nav.className = "d-flex";
nav.copyClipboard = document.createElement("button");
nav.copyClipboard.className = "btn btn-sm mdi d-flex shadow-sm align-items-center mdi-content-copy mr-2 mdi-18px lh-18" + (win.options.darkMode ? " btn-dark" : " btn-light");
nav.copyClipboard.onclick = () => clipboard.writeImage(imageRes);
nav.copyClipboard.disabled = true;
nav.copyClipboard.title = "Copy to Clipboard".toLocaleString();
nav.showInFiles = document.createElement("button");
nav.showInFiles.className = "btn btn-sm mdi d-flex shadow-sm align-items-center mdi-folder-outline mr-2 mdi-18px lh-18" + (win.options.darkMode ? " btn-dark" : " btn-light");
nav.showInFiles.onclick = () => Shell.showItemInFolder(url);
nav.showInFiles.disabled = true;
nav.showInFiles.title = "Show in File Manager".toLocaleString();
nav.share = document.createElement("button");
nav.share.className = "btn btn-sm mdi d-flex shadow-sm align-items-center mdi-share mr-2 mdi-18px lh-18" + (win.options.darkMode ? " btn-dark" : " btn-light");
nav.share.onclick; // Shell.shareContent() TODO: API for sharing content
nav.share.disabled = true;
nav.share.title = "Share".toLocaleString();
nav.append(nav.copyClipboard, nav.showInFiles, nav.share);
new Tooltip(nav.copyClipboard, {
	placement: "bottom"
});
new Tooltip(nav.showInFiles, {
	placement: "bottom"
});
new Tooltip(nav.share, {
	placement: "bottom"
});
win.ui.header.prepend(nav);
win.ui.header.classList.add("border-0");
let image = document.createElement("div");
image.className = "flex-grow-1 mx-2 rounded shadow-sm" + (win.options.darkMode ? " bg-dark" : " bg-white");
image.style.backgroundRepeat = "no-repeat";
image.style.backgroundPosition = "center center";
image.style.backgroundSize = "contain";
let imageRes;
let url;
let captureButton = document.createElement("button");
captureButton.className = "btn btn-success btn-lg m-2 d-flex align-items-center justify-content-center";
captureButton.icon = document.createElement("icon");
captureButton.icon.className = "mdi mdi-24px mdi-camera-iris mr-2 lh-24 d-flex";
captureButton.header = document.createElement("div");
captureButton.header.innerText = "Capture Screen".toLocaleString();
captureButton.addEventListener("click", async () => {
	win.hide();
	try {
		await fs.mkdir(path.join(process.env.HOME, "Pictures", "Screenshots"), {recursive: true});
	} catch {
	}
	let output = path.join(process.env.HOME, "Pictures", "Screenshots", "screenshot_" + new Date().getTime() + ".png");
	url = output;
	setTimeout(() => {
		wc.capturePage(async function (result) {

			try {
				let png = result.toPNG();
				await fs.writeFile(output, png);
				image.style.backgroundImage = `url('${output}')`;
				let thumbnail = new Image();
				thumbnail.src = output;
				thumbnail.className = "mw-100";

				imageRes = result;
				nav.showInFiles.disabled = false;
				nav.copyClipboard.disabled = false;

				new Notification("Screenshot has been successfully taken", {
					body: thumbnail,
					image: true,
					actions: [{
						title: "Show in folder",
						click() {
							Shell.showItemInFolder(output);
						}
					}, {
						title: "Copy to Clipboard",
						click() {
							clipboard.writeImage(result);
						}
					}]
				});
			} catch (e) {
				console.error(e);
				new Notification("Screenshot not taken", {
					body: "See logs to find the issue",
					actions: [{
						title: "Open Developer Tools",
						click() {
							wc.openDevTools();
						}
					}]
				});
			}
		});
	}, 1000);
});
captureButton.append(captureButton.icon, captureButton.header);
win.ui.body.append(image, captureButton);
if (win.arguments.capture)
	captureButton.click();
