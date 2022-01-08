const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config");
const app = express();
const db = mongoose.connection;
const inventoryRouter = require("./routes/inventory");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API - Inventory Manager",
      description: "Inventory Manager Information",
      contact: {
        name: "Aryan Patel",
      },
    },
    host: ["localhost:5000"],
    schemes: ["http"],
    definitions: {
      Inventory: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          price: {
            type: "integer",
            format: "int64",
          },
          description: {
            type: "string",
          },
          quantity: {
            type: "integer",
            format: "int64",
          },
          brand: {
            type: "string",
          },
        },
      },
    },
  },
  apis: ["./routes/inventory.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cors());
app.use("/", inventoryRouter);

/**
 * @see https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
 */
mongoose.connect(config.DATABASE_URI);

db.once("open", () => {
  console.info("MongoDB connected!");
});

app.listen(config.PORT, () => {
  console.info(`server is running on port: ${config.PORT}`);
});

module.exports = app;
