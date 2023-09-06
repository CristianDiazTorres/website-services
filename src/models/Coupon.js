const { Schema } = require("mongoose");
const { Types: { Mixed } } = Schema

const CouponSchema = new Schema({
    code: { type: String, required: true },
    discountAmount: { type: Number, min: .01, max: 1, required: true },
    usesLeft: { type: Mixed, require: true },
    expiryDate: { type: Mixed, require: true },
    productList: { type: Array, require: false }, // May want to set it to required later on
});

const conn = require('../database/DB')
module.exports = conn.model("Coupon", CouponSchema);