const createCsvWriter = require("csv-writer").createObjectCsvWriter;

/**
 * To store metics in a CSV file
 * @param {string} path the name of repository
 * @returns {object} the headers of CVS file
 */
const csvExporter = (path, header) =>
  createCsvWriter({
    path: path,
    header: header,
    headerIdDelimiter: ".",
  });

module.exports = {
  csvExporter,
};
