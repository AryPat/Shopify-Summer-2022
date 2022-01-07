/**
 * Create CSV file
 *
 * @param {Object} inventory the inventory object
 * @returns {String} the string csv
 */
const createCSV = (inventory) => {
  const headers = ["_id","name", "price", "description", "quantity", "brand"];

  // Append headers into string equivalent of csv
  let csv = headers.join(",");

  // Append data into string equivalent of csv
  inventory.forEach((item) => {
    csv += `\n` + headers.map((key) => item[key]).join(",");
  });

  return csv;
};

module.exports = {
  createCSV,
};
