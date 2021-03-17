const {
	app,
	BrowserWindow,
	powerSaveBlocker,
	powerMonitor,
} = require("electron");
const path = require("path");

// const sleep = powerSaveBlocker.start("prevent-display-sleep");
const suspension = powerSaveBlocker.start("prevent-app-suspension");

console.log(
	// powerSaveBlocker.isStarted(sleep),
	powerSaveBlocker.isStarted(suspension),
);

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 400,
		height: 525,
		webPreferences: {
			nodeIntegration: true,
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
