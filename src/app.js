require("dotenv").config();
const express = require("express");
const app = express();
app.set('view engine', 'ejs');
const stripe = require("stripe")(process.env.STRIPE_LIVE);
// const stripe = require("stripe")(process.env.STRIPE_TEST);
const path = require("path");

// Import schema
const Coupon = require("./models/Coupon");
const Codes = require("./models/Codes");
const Revenue = require("./models/Revenue");

const emailDelivery = require("../utils/emailDelivery");
const { webhookMessage } = require("../utils/webhookMessage");

const loadDB = require("./database/DB");
const moment = require("moment");
loadDB.then(() => console.log("Successfully connected to MongoDB"));

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "../", "public")));

//Prices
const unitAmounts = {
  nike10: 694,
  nike20: 694,
  nike30: 10000,
  nikeIN20: 1500,
  nikeBulk: 4995,
  nikeUSacnt: 200,
  nikeCAacnt: 200,
  nikeUKacnt: 200,
  nike40: 18000,
  UA20: 1000,
  croc25: 948,
  nb15: 749,
  asos10: 494,
  sns10: 494,
  cuki10: 549,
  footChamps: 994,
  footEast: 994,
  footAction: 994,
  footLocker: 994,
  finishline: 1000,
  footLocker20: 694,
  eastBay20: 694,
  champs20: 694,
  finishline10off: 297,
  finishline15off: 349,
  hibbett15: 195,
  hibbett25new: 1485,
  hibbett25: 995,
  hibbettUnban: 4995,
  stadium5: 2000,
  dicks10: 400,
  NAgate: 15000,
  NestCode: 998,
  fetch15: 994,
  asylum10: 549,
  hm10: 448,
  pacsun10: 549,
  ae20: 449,
  adi30: 1500,
  adi25: 1000,
  ree50: 2000,
  ree40: 1500,
};
//Plan names
const plans = {
  nike10: "nike10",
  nike20: "nike20",
  nike30: "nike30",
  nikeIN20: "nikeIN20",
  nikeBulk: "nikeBulk",
  nikeUSacnt: "nikeUSacnt",
  nikeCAacnt: "nikeCAacnt",
  nikeUKacnt: "nikeUKacnt",
  nike40: "nike40",
  UA20: "UA20",
  croc25: "croc25",
  nb15: "nb15",
  asos10: "asos10",
  sns10: "sns10",
  cuki10: "cuki10",
  footChamps: "footChamps",
  footEast: "footEast",
  footAction: "footAction",
  footLocker: "footLocker",
  finishline: "finishline",
  footLocker20: "footLocker20",
  eastBay20: "eastBay20",
  champs20: "champs20",
  finishline10off: "finishline10off",
  finishline15off: "finishline15off",
  hibbett15: "hibbett15",
  hibbett25new: "hibbett25new",
  hibbett25: "hibbett25",
  hibbettUnban: "hibbettUnban",
  stadium5: "stadium5",
  dicks10: "dicks10",
  NAgate: "NAgate",
  NestCode: "NestCode",
  fetch15: "fetch15",
  asylum10: "asylum10",
  hm10: "hm10",
  pacsun10: "pacsun10",
  ae20: "ae20",
  adi30: "adi30",
  adi25: "adi25",
  ree50: "ree50",
  ree40: "ree40",
};
const purchasedCodesList = {};

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

process.on("unhandledRejection", (reason, promise) =>
  console.log("Unhandled Rejection at:", promise, "reason:", reason)
);

//Verify user input discounts
app.get("/verify_discount", async (req, res) => {
  const foundDiscount = await Coupon.findOne({
    code: req.query.discount,
  });

  try {
    if (!foundDiscount) throw new Error("Coupon not found.");
    //Uses left
    if (
      typeof foundDiscount.usesLeft === "number" &&
      foundDiscount.usesLeft <= 0
    )
      throw new Error("Coupon has reached max uses.");
    if (
      !(
        typeof foundDiscount.usesLeft === "number" ||
        foundDiscount.usesLeft === false
      )
    )
      throw new Error("Coupon usage status is unknown.");

    //Expiry
    if (
      !(
        typeof foundDiscount.expiryDate === "string" ||
        foundDiscount.expiryDate === false
      )
    )
      throw new Error("Coupon expiry status is unknown.");
    if (
      typeof foundDiscount.expiryDate === "string" &&
      moment(foundDiscount.expiryDate).isValid() &&
      moment(foundDiscount.expiryDate).isBefore()
    )
      throw new Error("Coupon is expired.");
    if (
      typeof foundDiscount.expiryDate === "string" &&
      !moment(foundDiscount.expiryDate).isValid()
    )
      throw new Error("Coupon expiry status is unknown.");

    //Discount Amount
    if (typeof foundDiscount.discountAmount !== "number")
      throw new Error("Coupon discount amount is unknown.");
    if (
      typeof foundDiscount.discountAmount !== "number" &&
      (foundDiscount.discountAmount > 1 || foundDiscount.discountAmount <= 0)
    )
      throw new Error("Coupon discount amount is not valid.");

    // Coupon has plan listed
    if (!foundDiscount.productList.some((plan) => plan === req.query.plan)) throw new Error("Coupon is not applicable for this product.");

    return res.json({
      discount: foundDiscount.discountAmount,
      message: "Success",
    });
  } catch ({ message }) {
    return res.json({ discount: 0, message });
  }
});

//Initiate Stripe checkout session
app.post("/checkout_session", async (req, res) => {
  const planName = plans[req.query.product];
  const emailPlan = await Codes.findOne({ name: planName });
  if (!emailPlan) return res.json({ id: 'not_found' });
  if (req.query.amount > emailPlan.stockList.length)
    return res.json({ id: 'stock_error' });

  var discount = 0;
  const foundDiscount = await Coupon.findOne({ code: req.query.discount });
  if (foundDiscount) discount = foundDiscount.discountAmount;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${planName.toTitleCase()} Plan`,
          },
          unit_amount: Math.ceil(unitAmounts[planName] * (1 - discount)),
        },
        quantity: req.query.amount,
      },
    ],
    metadata:
      discount < 1
        ? {
          coupon: req.query.discount,
          plan: planName,
          units: req.query.amount,
        }
        : {
          plan: planName,
          units: req.query.amount,
        },
    mode: 'payment',
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: req.headers.origin,
  });

  // Return JSON
  res.json({ id: session.id });
});

// Get the last four digits of card
async function getLastFourDigits(payment_intent) {
  try {
    const { charges } = await stripe.paymentIntents.retrieve(payment_intent);
    return charges.data[0]?.payment_method_details.card.last4;
  } catch (e) {
    console.log('Could not retrieve charges for payment intent', payment_intent);
    return null;
  }
}



//Create coupon codes
app.post("/coupon_code", async (req, res) => {
  let { code, percentageOff, usesLeft } = req.query;
  if (req.code !== process.env.API_KEY) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  if (!usesLeft) usesLeft = null;
  const newCoupon = new Coupon({
    code,
    discountAmount: percentageOff / 100,
    usesLeft,
  });
  const savedCoupon = await newCoupon.save();
  if (savedCoupon)
    return res.send({
      message: `:white_check_mark: New coupon created: ${code} at ${percentageOff}% off.`,
    });
  return res.send({ message: `Coupon could not be created` });
});

//Delete a coupon code
app.delete("/coupon_code", async (req, res) => {
  if (req.code !== process.env.API_KEY)
    return res.status(401).json({ message: "Unauthorized" });
  const { code } = req.query;
  const deletedCoupon = await Coupon.deleteOne({ code });
  if (deletedCoupon)
    return res.send({ message: "Coupon deleted successfully" });
  return res.send({ message: "Coupon was not found" });
});

app.get("/coupon_code", async (req, res) => {
  const { code } = req.query;
  const foundCoupon = await Coupon.findOne({ code });
  if (foundCoupon) {
    if (!foundCoupon.usesLeft || foundCoupon.usesLeft > 0) {
      const curDate = new Date();
      if (foundCoupon.expiryDate)
        foundCoupon.expiryDate = new Date(foundCoupon.expiryDate);
      if (!foundCoupon.expiryDate || foundCoupon.expiryDate > curDate) {
        return res.send({ message: "Coupon data found", data: foundCoupon });
      } else {
        return res.send({ message: "Coupon has expired" });
      }
    } else {
      return res.send({ message: "Coupon has reach its max uses" });
    }
  }
  return res.send({ message: "Coupon could not be found" });
});

app.get('/success', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  const { payment_intent: orderNum } = session;
  const { plan: product, units: quantity } = session.metadata;

  const codeType = await Codes.findOne({ name: product });

  // Check if the purchased codes have already been sent before fetching
  const purchasedCodes = purchasedCodesList[orderNum] ?? codeType.stockList.splice(0, quantity);
  purchasedCodesList[orderNum] = purchasedCodes;

  res.render('success', {
    orderNum,
    product,
    quantity,
    purchasedCodes,
  });
});

//Send out webhooks
app.post("/webhooks", async (req, res) => {
  try {
    let webhookBody = req.body;
    try {
      webhookBody = JSON.parse(req.body);
    } catch { }
    const customerId = webhookBody.data.object.customer;
    const metadata = webhookBody.data.object.metadata;
    const payment_intent = webhookBody.data.object.payment_intent;
    const charges = webhookBody.data.object.charges;

    console.log(
      `The customer ${customerId} ${payment_intent} just purchased from the store`
    );
    console.log('Metadata:', metadata);
    if (Object.keys(metadata).length === 0) console.error('ERROR - Metadata is empty.');
    const customer = await stripe.customers.retrieve(customerId);
    console.log(`The customer's email is ${customer.email}`);

    const codeType = await Codes.findOne({ name: metadata.plan });
    if (codeType) {
      var purchasedCodes = purchasedCodesList[payment_intent] ?? codeType.stockList.splice(0, metadata.units);
      purchasedCodesList[payment_intent] = purchasedCodes;
    } else {
      console.log(
        `There was an error finding the code list on webhook delivery. Couldn't find \`${metadata.plan}\``
      );
    }

    codeType.save();

    const usedCoupon = await Coupon.findOne({ code: metadata.coupon });
    let revenue = unitAmounts[metadata.plan] * metadata.units * (usedCoupon ? 1 - usedCoupon.discountAmount : 1) * 100;
    var prodPrice = revenue / 10000;

    // Get the last four digits of card
    const lastFour = await getLastFourDigits(payment_intent);
    console.log('Last four digits are', lastFour);

    emailDelivery(
      metadata.units,
      metadata.plan,
      payment_intent,
      customer.email,
      purchasedCodes,
      prodPrice
    );

    await webhookMessage({
      title: "New Order",
      email: customer.email,
      units: metadata.units,
      plan: metadata.plan,
      paymentId: payment_intent,
      coupon: usedCoupon ? metadata.coupon : null,
      revenue: unitAmounts[metadata.plan] * metadata.units * (usedCoupon ? 1 - usedCoupon.discountAmount : 1) * 100,
      purchasedCodes: purchasedCodes,
      lastFour,
    });

  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }

  try {
    const webhookBody = req.body;
    const metadata = webhookBody.data.object.metadata;

    // Update the revenue asynchronously in the database
    await Revenue.findOneAndUpdate(
      { name: metadata.plan },
      { $inc: { revenue: prodPrice } },
      { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false },
      (err, res) => {
        if (err) return;

        // We don't do anything here since it auto inserts for us!
      }
    );

    // Remove the code from the stock list
    // Assuming purchasedCodes is an array
    await Codes.findOneAndUpdate(
      { name: metadata.plan },
      { $pull: { stockList: { $in: purchasedCodes } } }
    );

    // Add it to removed codes
    await Codes.findOneAndUpdate(
      { name: "removedCodes" },
      { $addToSet: { stockList: { $each: purchasedCodes } } }
    );

    console.log('Removed codes', purchasedCodes);
  } catch (e) {
    console.error(e);
  }

  return res.status(200).send("Success sending");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server starting on port " + PORT));
