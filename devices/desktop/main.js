const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const menuTemplate = [];
const menu = Menu.buildFromTemplate(menuTemplate);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    title: "XCompressor",
    titleBarStyle: "hiddenInset",
    frame: false,
  });

  let url = "https://xcompressor.app/apps";

  url = "http://localhost:3000/apps";

  win.openDevTools();

  win.loadURL(`${url}?electron=1`);
}

app.whenReady().then(() => {
  // Menu.setApplicationMenu(menu);

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
