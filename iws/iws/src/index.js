const cache = require('v8-compile-cache');
const { app, BrowserWindow, powerSaveBlocker } = require("electron");
const path = require("path");

// const sleep = powerSaveBlocker.start("prevent-display-sleep");
const suspension = powerSaveBlocker.start("prevent-app-suspension");

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		show: false,
		width: 400,
		height: 525,
		backgroundColor: "#222",
		webPreferences: {
			nodeIntegration: true,
			enableWebSQL: false,
			spellcheck: false,
			webgl: false,
		},
	});
	mainWindow.loadFile(path.join(__dirname, "index.html"));
	mainWindow.setMenuBarVisibility(false);
	mainWindow.setAutoHideMenuBar(true);
	mainWindow.setMenu(null);
	mainWindow.setMaximizable(false);
	mainWindow.setResizable(false);

	mainWindow.webContents.on("did-finish-load", () => {
		mainWindow.show();
	});
};

app.on("ready", () => {
	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
