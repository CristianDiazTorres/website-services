const nodemailer = require("nodemailer");
const { webhookError } = require("./webhookMessage");

const emailCredentials = {
  username: "support@daniel-services.com",
  password: "iHildy#3839",
};

const sendEmail = async (
  amount,
  plan,
  paymentId,
  receiverEmail,
  purchasedCodes,
    prodPrice
) => {
  try {
    // create reusable transporter object using the default SMTP transport
    var transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailCredentials.username,
        pass: emailCredentials.password,
      },
    });
    console.log('Verified by Transporter:', await transporter.verify());

    let deliveryString = "";
    purchasedCodes.forEach((code) => {
      deliveryString += `${code}<br />`;
    });

    console.log(`Product price: $${prodPrice}`)

    // setup e-mail data with unicode symbols
    const mailOptions = {
        from: "Daniel Services <support@daniel-services.com>", // sender address
      to: receiverEmail, // receiver
      subject: "Your Daniel Services Order", // Subject lined
      text: `Thanks for ordering with us. You have purchased ${amount} codes from the ${plan} plan. Order ID: ${paymentId} Your codes are below: ${deliveryString}`, // plaintext body
      html: `
    <div bgcolor="#007fe0" class="st-Email"
        style="border: 0; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100v%; min-width: 100%; width: 100%; min-height: 100vh; height: 100vh; background-color: #007fe0;">
        <!-- Background -->
        <table bgcolor="#007fe0" border="0" cellpadding="0" cellspacing="0" class="st-Background"
            style="border: 0; margin: 0; padding: 0;" width="100%">
            <tbody>
                <tr>
                    <td style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td>
                        <!-- Wrapper -->
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="st-Wrapper"
                            style="width: 480px; min-width: 480px; max-width: 480px;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0"
                                            class="st-Preheader st-Width st-Width--mobile" style="min-width: 480px;"
                                            width="480">
                                            <tbody>
                                                <tr>
                                                    <td align="center" height="0"
                                                        style="border: 0; margin: 0; padding: 0; color: #ffffff; display: none !important; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; mso-hide: all !important; opacity: 0; overflow: hidden; visibility: hidden;">
                                                        <span class="st-Delink st-Delink--preheader"
                                                            style="color: #ffffff; text-decoration: none;">Your order from
                                                            Daniel Services
                                                            <!-- Prevents elements showing up in email client preheader text -->
                                                            ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
                                                            ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
                                                            ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
                                                            ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
                                                            ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
                                                            ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
                                                            ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
                                                            ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
                                                            ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
                                                            ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌ ‌
                                                            ‌ ‌ ‌ ‌
                                                            <!-- /Prevents elements showing up in email client preheader text -->
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0"
                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td height="58"
                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                        <div class="st-Spacer st-Spacer--filler"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table cellpadding="0" cellspacing="0" style="">
                                            <tbody>
                                                <tr>
                                                    <td height="32"
                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; height: 32px;"
                                                        valign="middle">
                                                        <a href="https://daniel-services.com"
                                                            style="border: 0; margin: 0; padding: 0; text-decoration: none; outline: 0; ;"></a>
                                                        <div
                                                            style=" width: 32px; height: 32px; background-color: white; border-radius: 100%; box-shadow: 0 2px 5px 0 rgb(50 50 93 / 10%), 0 1px 1px 0 rgb(0 0 0 / 7%);">
                                                            <div
                                                                style=" border-radius: 100%; width: 32px; height: 32px; text-align: center; background-color: white; background-position: center; background: url('https://d1wqzb5bdbcre6.cloudfront.net/a5ebf7bfeab515e46be46faaf6572eb05290c75a/68747470733a2f2f66696c65732e7374726970652e636f6d2f66696c65732f4d44423859574e6a6446387853556853576c64444d574e78565863334d474a3266475a6662476c325a563947646c70534d4468435a464a615954426954484d3457486c555232785261334130305252786279486969'); background-origin: border-box; background-size: contain; background-position: center; background-repeat: no-repeat; line-height: 100%;">
                                                                <div>
                                                                    <div></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 12px;">
                                                        <span
                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none;"></span>
                                                    </td>
                                                    <td style=" border: 0; border-collapse: collapse; margin: 0; padding: 0;"
                                                        valign="middle"><span
                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; font-weight: 500; color: rgb(255, 255, 255); font-size: 16px;">Daniel
                                                            Services</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0"
                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td height="32"
                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                        <div class="st-Spacer st-Spacer--filler"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table cellpadding="0" cellspacing="0" style=" width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td align=""
                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 100%; width: 482px; border-radius: 12px; box-shadow: 0 2px 5px 0 rgb(50 50 93 / 10%), 0 1px 1px 0 rgb(0 0 0 / 7%);">
                                                        <table cellpadding="0" cellspacing="0" style=" width: 100%;">
                                                            <tbody>
                                                                <tr>
                                                                    <td align=""
                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 100%; width: 482px; border-radius: 12px; background-color: #e3e8ee; padding: 1px;">
                                                                        <table cellpadding="0" cellspacing="0"
                                                                            style=" width: 100%; background-color: #ffffff; border-radius: 12px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td
                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0;">
                                                                                        <table border="0" cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile"
                                                                                            width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td height="32"
                                                                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                                                        <div
                                                                                                            class="st-Spacer st-Spacer--filler">
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <table cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            style=" width: 100%;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; min-width: 32px; width: 32px;">
                                                                                                    </td>
                                                                                                    <td
                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0;">
                                                                                                        <table
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            style=" width: 100%;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 100%;">
                                                                                                                        <table
                                                                                                                            cellpadding="0"
                                                                                                                            cellspacing="0"
                                                                                                                            style=" width: 100%;">
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td align=""
                                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 100%; padding-bottom: 2px;">
                                                                                                                                        <span
                                                                                                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #7A7A7A; font-size: 14px; line-height: 20px; font-weight: 500;">Order
                                                                                                                                            from
                                                                                                                                            Daniel
                                                                                                                                            Services</span>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                        <table
                                                                                                                            cellpadding="0"
                                                                                                                            cellspacing="0"
                                                                                                                            style=" width: 100%;">
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td align=""
                                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 100%; padding-bottom: 2px;">
                                                                                                                                        <span
                                                                                                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 36px; line-height: 40px; font-weight: 600;">$${prodPrice}</span>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                        <table
                                                                                                                            cellpadding="0"
                                                                                                                            cellspacing="0"
                                                                                                                            style=" width: 100%;">
                                                                                                                            <tbody>
                                                                                                                                <tr>
                                                                                                                                    <td colspan="1"
                                                                                                                                        height="16"
                                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; height: 16px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td height="1"
                                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; height: 1px; font-size: 1px; background-color: #ebebeb; line-height: 1px;">
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                <tr>
                                                                                                                                    <td colspan="1"
                                                                                                                                        height="12"
                                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; height: 12px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 76px; max-width: 76px;">
                                                                                                                        <img alt="invoice illustration"
                                                                                                                            height="91"
                                                                                                                            src="https://cdn.discordapp.com/attachments/784637379830218752/831515292176875570/invoices_invoice_illustration.png"
                                                                                                                            style="border: 0; margin: 0 auto; padding: 0; display: block;"
                                                                                                                            width="94">
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                        <table
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            style=" width: 100%">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; vertical-align: top; white-space: nowrap;">
                                                                                                                        <span
                                                                                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #7A7A7A; font-size: 14px; line-height: 16px;">Order
                                                                                                                            Number</span>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 24px;">
                                                                                                                    </td>
                                                                                                                    <td align="right"
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0;">
                                                                                                                        <span
                                                                                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px;">${paymentId}</span>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td colspan="2"
                                                                                                                        height="8"
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; height: 8px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; vertical-align: top; white-space: nowrap;">
                                                                                                                        <span
                                                                                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #7A7A7A; font-size: 14px; line-height: 16px;">Product:</span>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 24px;">
                                                                                                                    </td>
                                                                                                                    <td align="right"
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0;">
                                                                                                                        <span
                                                                                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px;">${plan}</span>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td colspan="2"
                                                                                                                        height="8"
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; height: 8px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; vertical-align: top; white-space: nowrap;">
                                                                                                                        <span
                                                                                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #7A7A7A; font-size: 14px; line-height: 16px;">Quantity:</span>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 24px;">
                                                                                                                    </td>
                                                                                                                    <td align="right"
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0;">
                                                                                                                        <span
                                                                                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px;">${amount}</span>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                    <td
                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; min-width: 32px; width: 32px;">
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <table border="0" cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile"
                                                                                            width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td height="24"
                                                                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                                                        <div
                                                                                                            class="st-Spacer st-Spacer--filler">
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0"
                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td height="20"
                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                        <div class="st-Spacer st-Spacer--filler"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table cellpadding="0" cellspacing="0" style=" width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td align=""
                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 100%; width: 482px; border-radius: 12px; box-shadow: 0 2px 5px 0 rgb(50 50 93 / 10%), 0 1px 1px 0 rgb(0 0 0 / 7%);">
                                                        <table cellpadding="0" cellspacing="0" style=" width: 100%;">
                                                            <tbody>
                                                                <tr>
                                                                    <td align=""
                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 100%; width: 482px; border-radius: 12px; background-color: #e3e8ee; padding: 1px;">
                                                                        <table cellpadding="0" cellspacing="0"
                                                                            style=" width: 100%; background-color: #ffffff; border-radius: 12px;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td
                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0;">
                                                                                        <table cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            style=" width: 100%;">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td
                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0;">
                                                                                                        <table border="0"
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile"
                                                                                                            width="100%">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td height="26"
                                                                                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                                                                        <div
                                                                                                                            class="st-Spacer st-Spacer--filler">
                                                                                                                        </div>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                        <table border="0"
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile"
                                                                                                            width="100%">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td height="8"
                                                                                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                                                                        <div
                                                                                                                            class="st-Spacer st-Spacer--filler">
                                                                                                                        </div>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                        <table
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            style=" width: 100%;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; min-width: 32px; width: 32px;">
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; padding-left: 0px;">
                                                                                                                        <table
                                                                                                                            cellpadding="0"
                                                                                                                            cellspacing="0"
                                                                                                                            style=" width: 100%;">
                                                                                                                            <tbody>
                                                                                                                                <td align=""
                                                                                                                                    style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 100%; padding-bottom: 2px;">
                                                                                                                                    <span
                                                                                                                                        style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 20px; line-height: 40px; font-weight: 600;">Here
                                                                                                                                        is
                                                                                                                                        your
                                                                                                                                        product:</span>
                                                                                                                                </td>
                                                                                                                                <tr style="background-color: #F2F4F8;">
                                                                                                                                    <td align=""
                                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; width: 100%; padding: 0.5rem; background-color: #F2F4F8';">
                                                                                                                                        <span
                                                                                                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; padding: 0.5rem; padding-top: 0.5rem; padding-bottom 0.5rem; color: #A2A2A3; min-width: 100%; font-size: 14px; line-height: 16px; font-weight: 500;">${deliveryString}</span>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                            </tbody>
                                                                                                                        </table>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; min-width: 32px; width: 32px;">
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td colspan="5"
                                                                                                                        height="0"
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; height: 0px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                        <table
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            style=" width: 100%;">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td colspan="3"
                                                                                                                        height="16"
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; height: 16px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; min-width: 32px; width: 32px;">
                                                                                                                    </td>
                                                                                                                    <td height="1"
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; height: 1px; font-size: 1px; background-color: #ebebeb; line-height: 1px;">
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; min-width: 32px; width: 32px;">
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td colspan="3"
                                                                                                                        height="20"
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; height: 20px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                        <table
                                                                                                            cellpadding="0"
                                                                                                            cellspacing="0"
                                                                                                            style=" width: 100%">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; min-width: 32px; width: 32px;">
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; font-size: 14px; line-height: 16px; color: #999999;">
                                                                                                                        <p
                                                                                                                            style="border: 0; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;">
                                                                                                                            Questions?
                                                                                                                            Contact
                                                                                                                            us
                                                                                                                            at
                                                                                                                            <a href="https://discord.com/invite/UQPZKVrbc5"
                                                                                                                                style="border: 0; margin: 0; padding: 0; color: #556cd6 !important; text-decoration: none;">here</a>!
                                                                                                                        </p>
                                                                                                                    </td>
                                                                                                                    <td
                                                                                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; min-width: 32px; width: 32px;">
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <table border="0" cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile"
                                                                                            width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td height="24"
                                                                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                                                        <div
                                                                                                            class="st-Spacer st-Spacer--filler">
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0"
                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile" width="100%">
                                            <tbody>
                                                <tr>
                                                    <td height="32"
                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                        <div class="st-Spacer st-Spacer--filler"></div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table cellpadding="0" cellspacing="0" style=" width: 100%;">
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style=" border: 0; border-collapse: collapse; margin: 0; padding: 0; width: 100%; text-align: center; color: rgb(255, 255, 255); opacity: 0.5;">
                                                        <span
                                                            style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; font-size: 12px; line-height: 14px;">Powered
                                                            by <a href="https://stripe.com"
                                                                style="border: 0; margin: 0; padding: 0; text-decoration: none; outline: 0; ;"><img
                                                                    align="middle" alt="stripe logo" height="24"
                                                                    src="https://cdn.discordapp.com/attachments/784637379830218752/831514062214135808/invoices_stripe_logo_light.png"
                                                                    style=" border: 0; line-height: 100%; vertical-align: middle;"
                                                                    width="51"></a> | <a href="https://stripe.com/payments"
                                                                style="border: 0; margin: 0; padding: 0; text-decoration: none; outline: 0; ;"><span
                                                                    style=" font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: rgb(255, 255, 255);">Learn
                                                                    more about Stripe Payments</span></a></span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td style="font-size: 16px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <tr>
                    <td class="st-Spacer st-Spacer--emailEnd" colspan="3" height="64"
                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
                        <div class="st-Spacer st-Spacer--filler">
                            &nbsp;
                        </div>
                    </td>
                </tr>
            </tbody>
        </table><!-- /Background -->
    </div>`, // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("There has been an error.");
        console.error(error);
        throw new Error(error);
      } else {
        console.log("Message sent: " + info.response);
      }
    });
  } catch (e) {
    console.error(e)
  }
};

module.exports = sendEmail;
