var chokidar = require("chokidar");
const { join } = require("path");

const watcher = chokidar.watch(join(__dirname) + "\\file-listen.txt", {
  ignored: /^\./,
  persistent: true,
});

watcher
  .on("change", function (path) {
    console.log("File", path, "has been changed");
  })
  .on("error", function (error) {
    console.error("Error happened", error);
  });
