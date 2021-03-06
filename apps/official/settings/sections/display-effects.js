const Registry = require(`@api/Registry`);
const {Snackbar} = require("@api/Notification");
setTitle("Effects");
let main = document.createElement("main");
root.append(main);

let list = document.createElement("section");
list.className = "list-group flex-shrink-0 rounded-0";
list.thumbEnabled = newSmallListItem({
	label: "Thumbnails",
	sublabel: "View small shots of running apps",
	type: "checkbox",
	checked: Registry.get("system.enableThumbnails"),
	click(checked) {
		Registry.set("system.enableThumbnails", checked);
	}
});
list.thumbEnabled.input.disabled = true;
list.thumbEnabled.classList.add("disabled");
list.transparency = newSmallListItem({
	label: "Transparency",
	sublabel: "Semi-transparent windows, may affect performance",
	type: "checkbox",
	checked: Registry.get("system.enableTransparentWindows"),
	click(checked) {
		Registry.set("system.enableTransparentWindows", checked);
	}
});
list.blurUI = newSmallListItem({
	label: "Blur",
	sublabel: "Use blur in UI",
	type: "checkbox",
	checked: Registry.get("system.enableBlur"),
	click(checked) {
		Registry.set("system.enableBlur", checked);
	}
});
list.shadows = newSmallListItem({
	label: "Shadows",
	sublabel: "Cast shadows behind windows",
	type: "checkbox",
	checked: Registry.get("system.enableWindowShadows"),
	click(checked) {
		Registry.set("system.enableWindowShadows", checked);
	}
});
list.windowGlyphs = newSmallListItem({
	label: "Show window buttons glyphs",
	sublabel: "Get macOS-like close, maximize, minimize button glyphs",
	type: "checkbox",
	checked: Registry.get("system.enableWindowButtonGlyphs"),
	click(checked) {
		Registry.set("system.enableWindowButtonGlyphs", checked);
		document.body.classList.toggle("showWindowButtonGlyphs", checked)
	}
});
list.liveTransforms = newSmallListItem({
	label: "Live Transformations",
	sublabel: "Transform window's content immediately<br />Disabling this significantly improves UI performance",
	type: "checkbox",
	checked: !Registry.get("system.disableLiveTransformations"),
	click(checked) {
		Registry.set("system.disableLiveTransformations", !checked);
	}
});
list.lowPerformance = newSmallListItem({
	label: "Low Performance Mode",
	sublabel: "Limits FPS to 40, puts a gradient wallpaper and disables shadows",
	type: "checkbox",
	checked: Registry.get("system.enableSimpleEffects"),
	click(checked) {
		Registry.set("system.enableSimpleEffects", checked);
	}
});
list.noAnimations = newSmallListItem({
	label: "Disable Animations",
	sublabel: "Disable all animations in the UI",
	type: "checkbox",
	checked: Registry.get("system.disableAnimations"),
	click(checked) {
		Registry.set("system.disableAnimations", checked);
	}
});
list.menuIcons = newSmallListItem({
	label: "Show icons in menus",
	type: "checkbox",
	checked: Registry.get('system.showMenuIcons') !== false,
	click(checked) {
		Registry.set("system.showMenuIcons", checked);
	}
});
list.append(list.thumbEnabled, list.transparency, list.blurUI, list.shadows, list.windowGlyphs, list.liveTransforms, list.noAnimations, list.lowPerformance, list.menuIcons);
main.append(list);
