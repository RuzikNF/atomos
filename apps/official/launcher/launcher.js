const fs = require("fs").promises;
const path = require("path");
root.className = "d-flex";

async function renderLauncher() {
	root.innerHTML = "";
	let items = Registry.get("launcher.items") || [];
	if (items.length) {
		for (const item of items) {
			let json = await fs.readFile(path.join(osRoot, "apps", item, "package.json"));
			let pkg = JSON.parse(json.toString());
			let elem = document.createElement('div');
			elem.className = "mr-3 position-relative active fade show";
			elem.title = pkg.productName || pkg.name;
			elem.icon = document.createElement("icon");
			elem.icon.className = "rounded-max btn border-0 mdi mdi-24px lh-24 d-flex text-white p-2 my-1";
			elem.icon.addEventListener("click", () => {
				AppWindow.launch(item)
			});
			elem.icon.style.background = pkg.color;
			elem.icon.classList.add("mdi-" + pkg.icon);
			elem.appendChild(elem.icon);
			root.append(elem);
			new Tooltip(elem);
		}
	}
}

renderLauncher();
new Registry("launcher").on("changed", renderLauncher);