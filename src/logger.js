function log(message) {
  console.log(`[${getTimeStamp()}] ${message}`);
}

function getTimeStamp() {
  const date = new Date();
  return date.toDateString() + " " + date.toTimeString();
}

module.exports.log = log;
