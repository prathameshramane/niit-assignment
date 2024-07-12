const fs = require("fs");
const path = require("path");
const config = require("config");

const INPUT_FILE_DIR = config.get("INPUT_FILE_DIR");
const OUTPUT_FILE_DIR = config.get("OUTPUT_FILE_DIR");
const TEMP_INFO = config.get("TEMP_INFO");

function getLastModified() {
  const isFileExists = fs.existsSync(TEMP_INFO);
  if (isFileExists) {
    const data = fs.readFileSync(TEMP_INFO, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData?.lastModified ?? null;
  }
  return null;
}

function updateLastModified(lastModified) {
  fs.writeFileSync(TEMP_INFO, JSON.stringify({ lastModified }));
}

function getFilesFromInput() {
  return fs.readdirSync(INPUT_FILE_DIR, { recursive: true });
}

function getFileStats(relativePath) {
  const fullFilePath = getInputFilePath(relativePath);
  return fs.statSync(fullFilePath);
}

function getInputFilePath(relativePath) {
  return path.join(INPUT_FILE_DIR, relativePath);
}

function getOutputFolderPath(relativePath) {
  const parsedPath = path.parse(relativePath);
  return path.join(OUTPUT_FILE_DIR, parsedPath.dir, parsedPath.name);
}

function getFileName(relativePath) {
  return path.basename(relativePath);
}

function createFolderIfNot(folderPath) {
  if (!fs.existsSync(folderPath))
    fs.mkdirSync(folderPath, { recursive: true });

  return folderPath;
}

module.exports.getLastModified = getLastModified;
module.exports.updateLastModified = updateLastModified;
module.exports.getFilesFromInput = getFilesFromInput;
module.exports.getFileStats = getFileStats;
module.exports.getInputFilePath = getInputFilePath;
module.exports.getFileName = getFileName;
module.exports.getOutputFolderPath = getOutputFolderPath;
module.exports.createFolderIfNot = createFolderIfNot;
