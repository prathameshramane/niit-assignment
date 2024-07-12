const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const logger = require("./logger");

function split(inputFilePath, outputFilePath, size) {
  exec(splitCommand(inputFilePath, outputFilePath, size), (err) => {
    if (err) {
      logger.log(`Error splitting file: ${err}`);
      return;
    }

    logger.log(`File split successfully: ${inputFilePath}`);
    verifyFile(inputFilePath, outputFilePath);
  });
}

function splitCommand(inputFilePath, outputFilePath, size) {
  return `split -b ${size}m ${inputFilePath} ${outputFilePath}-chunk-`;
}

function verifyFile(inputFilePath, outputFilePath) {
  const outputFolderPath = path.parse(outputFilePath).dir;
  const chunkFiles = fs.readdirSync(outputFolderPath)
    .map(f => path.join(outputFolderPath, f));

  const concatFilePath = `${inputFilePath}-concat`;

  try {
    // Concatenate chunks back to verify
    fs.writeFileSync(concatFilePath, '');
    for (const chunkFile of chunkFiles) {
      fs.appendFileSync(concatFilePath, fs.readFileSync(chunkFile));
    }

    // Compare original file and concatenated file
    const originalFileBuffer = fs.readFileSync(inputFilePath);
    const concatFileBuffer = fs.readFileSync(concatFilePath);

    if (Buffer.compare(originalFileBuffer, concatFileBuffer) === 0) {
      logger.log(`Files ${inputFilePath} and ${outputFilePath} are identical`);
    } else {
      logger.log(`Files  ${inputFilePath} and ${outputFilePath} are different`);
    }

    fs.unlinkSync(concatFilePath); // Clean up temporary concatenated file
  } catch (err) {
    logger.log(`Error verifying file: ${err}`);
  }
}


module.exports.split = split;
