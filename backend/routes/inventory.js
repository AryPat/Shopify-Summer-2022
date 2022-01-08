const inventorySchema = require("../models/inventory.model");
const router = require("express").Router();
const { createCSV } = require("../services/ExportCsv.js");

/**
 * @swagger
 * /inventory/csv:
 *  get:
 *    description: Get CSV file
 *    summary: Get all inventory data as a downloadable CSV file
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad Request
 */
 router.get("/inventory/csv", (req, res) => {
  inventorySchema
    .find()
    .then((inventory) => {
      res.setHeader("'Content-Type'", "'application/text'");
      res.attachment(
        `Inventory-${new Date()
          .toISOString()}.csv`
      );
      res.send(createCSV(inventory));
    })
    .catch((err) => res.status(400).json(err));
});

/**
 * @swagger
 * /inventory/{id}:
 *  get:
 *    description: Get inventory item by id
 *    summary: Get inventory item by id
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "id"
 *      description: "ID of inventory"
 *      required: true
 *    responses:
 *      '200':
 *        description: Inventory item successfully fetched
 *      '404':
 *        description: Inventory not found
 */
router.get("/inventory/:id", (req, res) => {
  inventorySchema.findById(req.params.id, function (err, newInventory) {
    if (newInventory === null || newInventory == null) {
      res
        .status(404)
        .json(`Inventory with the id '${req.params.id}' not found!`);
    } else {
      res.status(200).json(newInventory);
    }
  });
});

/**
 * @swagger
 * /inventory:
 *  get:
 *    description: Get all Inventory data
 *    summary: Get all inventory data
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad Request
 */
router.get("/inventory/", (req, res) => {
  inventorySchema
    .find()
    .then((items) => {
      res.status(200).json(
        {
          count: items.length,
          items,
        }
      );
    })
    .catch((err) => res.status(400).json(err));
});

/**
 * @swagger
 * /inventory:
 *  post:
 *    description: Create new inventory item
 *    summary: Create new inventory item
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: "Inventory object that needs to be added"
 *      required: true
 *      schema:
 *        $ref: "#/definitions/Inventory"
 *    responses:
 *      '200':
 *        description: Inventory item successfully created
 *      '400':
 *        description: Bad Request
 *      '405':
 *        description: Schema Validation
 */
router.post("/inventory/", (req, res) => {
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
    .catch((err) => {
      err.name === "ValidationError"
        ? res.status(405).json(err.message)
        : res.status(400).json(err);
    });
});

/**
 * @swagger
 * /inventory/{id}:
 *  put:
 *    description: Edit existing inventory item
 *    summary: Edit existing inventory item
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "id"
 *      description: "ID of inventory"
 *      required: true
 *    - in: "body"
 *      name: "body"
 *      description: "Updated inventory item"
 *      required: true
 *      schema:
 *        $ref: "#/definitions/Inventory"
 *    responses:
 *      '200':
 *        description: Inventory item successfully updated
 *      '400':
 *        description: Bad Request
 *      '404':
 *        description: Inventory not found
 *      '405':
 *        description: Schema Validation
 */
router.put("/inventory/:id", (req, res) => {
  inventorySchema.findById(req.params.id, function (err, newInventory) {
    if (newInventory === null || newInventory == null) {
      res
        .status(404)
        .json(`Inventory with the id '${req.params.id}' not found!`);
    } else {
      for (const element in req.body) {
        newInventory[element] = req.body[element];
      }
      newInventory
        .save()
        .then(() => res.status(200).json(newInventory))
        .catch((err) => {
          err.name === "ValidationError"
            ? res.status(405).json(err.message)
            : res.status(400).json(err);
        });
    }
  });
});

/**
 * @swagger
 * /inventory/{id}:
 *  delete:
 *    description: Delete inventory item
 *    summary: Delete inventory item
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - in: "path"
 *      name: "id"
 *      description: "ID of inventory"
 *      required: true
 *    responses:
 *      '200':
 *        description: Inventory item successfully deleted
 *      '404':
 *        description: Inventory not found
 */
router.delete("/inventory/:id", (req, res) => {
  inventorySchema.findByIdAndRemove(req.params.id, function (err, message) {
    message === null || message == null
      ? res
          .status(404)
          .json(`Inventory with the id '${req.params.id}' not found!`)
      : res.status(200).json(message);
  });
});

module.exports = router;
