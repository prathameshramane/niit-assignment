const path = require("path");
const process = require("process");
const config = require("config");

const {
    getLastModified,
    updateLastModified,
    getFilesFromInput,
    getFileStats,
    getOutputFolderPath,
    createFolderIfNot,
    getFileName,
    getInputFilePath,
} = require("./utility");
const { split } = require("./split_file");
const logger = require("./logger");

const SIZE = config.get("SIZE");
const INTERVAL = config.get("INTERVAL");

let LAST_MODIFIED = getLastModified();

logger.log("-------- WATCHING FILES IN INPUT DIRECTORY --------")

const watcher = setInterval(() => {
  const files = getFilesFromInput();
  logger.log("Checking for updates.")

  files.forEach((relativeFilePath) => {
    const fileStats = getFileStats(relativeFilePath);

    if (fileStats.isFile() && fileStats.mtime > LAST_MODIFIED) {
      const inputFilePath = getInputFilePath(relativeFilePath);
      const fileName = getFileName(relativeFilePath);

      logger.log(`Found new file ${inputFilePath}`);

      const outputFolderPath = getOutputFolderPath(relativeFilePath);
      createFolderIfNot(outputFolderPath);

      split(inputFilePath, path.join(outputFolderPath, fileName), SIZE);
    }
  });

  LAST_MODIFIED = Date.now();
}, INTERVAL);

logger.log("Press Ctrl+C to terminate.");

process.on("exit", () => {
  clearInterval(watcher);
  updateLastModified(LAST_MODIFIED);
});

process.on("SIGINT", () => {
  clearInterval(watcher);
  updateLastModified(LAST_MODIFIED);
});
