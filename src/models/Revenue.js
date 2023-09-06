const mongoose = require('mongoose')

const RevenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  revenue: { type: Number, required: true},
})

const conn = require('../database/DB')
module.exports = conn.model('Revenue', RevenueSchema)
