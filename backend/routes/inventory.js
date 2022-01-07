const inventorySchema = require("../models/inventory.model");
const exportCSV = require("../services/exportCSV.js");
const router = require("express").Router();

router.put("/csv", (req, res) => {
  const headers = [
    { id: "name", title: "Name of Inventory" },
    { id: "price", title: "Price of Inventory" },
    { id: "description", title: "Inventory Description" },
    { id: "quantity", title: "Quantity" },
    { id: "brand", title: "Inventory Brand" },
  ];
  try {
    exportCSV
      .csvExporter("ExportedCsvFile/InventoryData.csv", headers)
      .writeRecords(req.body);
    res.status(200).json("Successfully Downloaded InventoryData.csv");
  } catch (err) {
    res.status(500);
  }
});

router.get("/", (req, res) => {
  inventorySchema
    .find()
    .then((items) => {
      res.status(200).json(items ?? []);
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const { name, price, description, quantity, brand, tags } = req.body;
  const newItem = new inventorySchema({
    name,
    price,
    description,
    quantity,
    brand,
    tags,
  });
  newItem
    .save()
    .then(() => res.status(200).json(newItem))
    .catch((err) => res.status(400).json(err));
});

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
