const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const app = express();
const db = mongoose.connection;
const inventoryRouter = require('./routes/inventory');

app.use(express.json());
app.use(cors());
app.use('/api/inventory', inventoryRouter);

/**
 * @see https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options
 */
mongoose.connect(config.DATABASE_URI);

db.once('open', () => {
  console.info('MongoDB connected!');
});

app.listen(config.PORT, () => {
  console.info(`server is running on port: ${config.PORT}`);
});

module.exports = app;

