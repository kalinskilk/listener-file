var chokidar = require("chokidar");
const { join } = require("path");
const WindowsToaster = require("node-notifier").WindowsToaster;

const notifier = new WindowsToaster({
  withFallback: false, // Fallback to Growl or Balloons?
  customPath: undefined, // Relative/Absolute path if you want to use your fork of SnoreToast.exe
});

const watcher = chokidar.watch(join(__dirname) + "\\file-listen.txt", {
  ignored: /^\./,
  persistent: true,
});

const notifierFn = (msg) => {
  notifier.notify({
    title: "File Changed",
    message: msg,
    sound: false,
    id: "0",
    appID: "listener file",
    remove: undefined,
    install: undefined,
  });
};

const watcherFn = () => {
  watcher
    .on("change", function (path) {
      const msg = `File ${path} has been changed`;
      console.log(msg);
      notifierFn(msg);
    })
    .on("error", function (error) {
      console.error("Error happened", error);
    });
};
watcherFn();
