const inventorySchema = require("../models/inventory.model");
const router = require("express").Router();
const { createCSV } = require("../services/ExportCsv.js");

/**
 * Get inventory as a CSV
 *
 * @param {Object} req the request body
 * @param {Object} res the response object
 */
router.get("/csv", (req, res) => {
  inventorySchema
    .find()
    .then((inventory) => {
      res.setHeader("'Content-Type'", "'application/text'");
      res.attachment("stupid.csv");
      res.send(createCSV(inventory));
    })
    .catch((err) => res.status(400).json(err));
});

/**
 * Get all inventory
 *
 * @param {Object} req the request body
 */
router.get("/", (req, res) => {
  inventorySchema
    .find()
    .then((items) => {
      res.status(200).json(items ?? []);
    })
    .catch((err) => res.status(400).json(err));
});

/**
 * Get inventory as a CSV
 *
 * @param {Object} req the request body
 * @param {Object} res the response object
 */
router.post("/", (req, res) => {
  const { name, price, description, quantity, brand } = req.body;
  const newItem = new inventorySchema({
    name,
    price,
    description,
    quantity,
    brand,
  });
  newItem
    .save()
    .then(() => res.status(200).json(newItem))
    .catch((err) => res.status(400).json(err));
});

/**
 * Edit specific inventory item
 *
 * @param {Object} req the request body
 * @param {Object} res the response object
 * @query {String} id the inventory object id
 */
router.put("/:id", (req, res) => {
  inventorySchema.findById(req.params.id).then((newInventory) => {
    for (const element in req.body) {
      newInventory[element] = req.body[element];
    }
    newInventory
      .save()
      .then(() => res.status(200).json(newInventory))
      .catch((err) => res.status(400).json(err));
  });
});

/**
 * Delete specific inventory
 *
 * @param {Object} req the request body
 * @param {Object} res the response object
 * @query {String} id the inventory object id
 */
router.delete("/:id", (req, res) => {
  inventorySchema.findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      res.status(200).json(`Inventory Item by the id ${req.params.id} deleted`);
    } else {
      return res.status(400).send();
    }
  });
});

module.exports = router;
