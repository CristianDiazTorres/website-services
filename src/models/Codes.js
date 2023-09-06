const mongoose = require('mongoose');

const EmailPlanSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    stockList: {
        type: Array,
    },
});

const conn = require('../database/DB')
module.exports = conn.model('Code', EmailPlanSchema);