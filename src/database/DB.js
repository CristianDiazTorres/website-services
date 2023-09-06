const { createConnection } = require('mongoose');
require('dotenv').config()

module.exports = createConnection(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });