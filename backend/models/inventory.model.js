const mongoose = require("mongoose");
const { Schema, model } = mongoose;

/**
 * Schema for Inventory
 *
 * @property {String}       _id             Inventory id
 * @property {String}       name            Name of inventory
 * @property {Number}       price           Price of each inventory
 * @property {String}       description     Inventory description
 * @property {Quantity}     quantity        number of same inventory items
 * @property {String}       brand           Inventory brand
 *
 * Validation is done within the Schema itself
 * Hence there being no need to have separate  validation methods
 * that run before hitting the end points
 */
const inventorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name must not be empty!",
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be less then 0!"],
    },
    description: {
      type: String,
      trim: true,
      required: "Description must not be empty!"
      maxlength: 120,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity cannot be below 1!"],
    },
    brand: {
      type: String,
      required: "Brand must not be empty!",
    },
  },
  { timestamps: true }
);

module.exports = model("Inventory", inventorySchema);
