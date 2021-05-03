const { app, BrowserWindow, powerSaveBlocker, ipcMain } = require("electron");
const cache = require("v8-compile-cache");
const path = require("path");

// const sleep = powerSaveBlocker.start("prevent-display-sleep");
const suspension = powerSaveBlocker.start("prevent-app-suspension");

let mainWindow = null;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 400,
		minWidth: 400,
		minHeight: 520,
		height: 520,
		frame: false,
		titleBarStyle: "hidden",
		icon: path.join(__dirname, "/favicon.svg"),
		backgroundColor: "#222",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			backgroundThrottling: false,
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

ipcMain.on("quit-app", () => {
	app.quit();
});

ipcMain.on("minimize-app", () => {
	mainWindow.minimize();
});
