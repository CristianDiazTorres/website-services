const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const { D_WEBHOOK } = process.env;

const webhookMessage = async ({ title, email, units, plan, coupon, paymentId, revenue, purchasedCodes, lastFour }) => {
    let deliveryString = "";
    purchasedCodes.forEach((code) => {
        deliveryString += `${code} \n`;
    });

    try {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setColor('#00d1d1')
            .setFooter('Daniel Services Order System', 'https://cdn.discordapp.com/attachments/784637379830218752/828291560964751381/logoC.png')
            .addField("Order ID", `${paymentId}`)
            .addField('Customer Email', email)
            .addField('Product', `${plan}`)
            .addField('Quantity', `${units}`)
            .addField('Price', `$${revenue / 10000}`)
            .addField('Coupon', coupon ? `\`${coupon}\`` : 'None')
            .addField('Purchased Stock', `${deliveryString}`)
            .addField('Last Four Digits', `${lastFour ?? 'N/A'}`)

    const response = await axios.post(D_WEBHOOK, {
      content: null,
      embeds: [embed.toJSON()],
    });
    console.log("Order webhook sent", response.data);
  } catch (e) {
    console.error(`Error sending webhook: ${e.message}`);
  }
};

module.exports = { webhookMessage };
