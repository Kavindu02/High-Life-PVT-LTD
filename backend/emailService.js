const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Create transporter using SMTP/Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to standard SMTP if preferred
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Sends an order confirmation email to the customer.
 * @param {Object} orderData 
 * @param {Number} orderId 
 */
const sendOrderConfirmation = async (orderData, orderId) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not set. Skipping email confirmation.");
    return;
  }

  const attachments = [];

  // Keep track of attached images to reuse cid and avoid duplicates
  const attachedImages = {};

  // Calculate subtotal
  let subtotal = 0;
  let itemsHtml = '';
  
  if (Array.isArray(orderData.items)) {
    orderData.items.forEach((item, index) => {
      const price = item.product.pricing[item.size] || 0;
      const itemTotal = price * item.quantity;
      subtotal += itemTotal;
      
      let imageHtml = '<span style="color: #E6B754; font-size: 24px; line-height:50px; font-weight: bold;">H</span>';
      
      if (item.product.image) {
        // Remove leading slash if it exists
        const imageFilename = item.product.image.replace(/^\//, '');
        
        if (!attachedImages[imageFilename]) {
          const cid = `product_${imageFilename.replace(/[^a-zA-Z0-9]/g, '')}`;
          const imagePath = path.join(__dirname, '../frontend/public/', imageFilename);
          
          if (fs.existsSync(imagePath)) {
            attachedImages[imageFilename] = cid;
            attachments.push({
              filename: imageFilename.replace('.webp', '.png'), // Fake extension for Gmail
              path: imagePath,
              cid: cid,
              contentType: 'image/png', // Trick Gmail into treating it as a standard inline image
              contentDisposition: 'inline'
            });
          }
        }
        
        const cid = attachedImages[imageFilename];
        if (cid) {
          imageHtml = `<img src="cid:${cid}" alt="${item.product.name}" width="50" height="50" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px; display: block;" />`;
        }
      }
      
      itemsHtml += `
        <tr>
          <td style="padding: 15px 0; border-bottom: 1px solid #EADFC8;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="60" valign="top">
                  <div style="width: 50px; height: 50px; border: 1px solid #EADFC8; border-radius: 8px; display: inline-block; text-align: center; background-color: #ffffff; overflow: hidden;">
                    ${imageHtml}
                  </div>
                </td>
                <td valign="top" style="padding-left: 15px;">
                  <div style="color: #2a2a2a; font-size: 16px; font-weight: 700;">${item.product.name}</div>
                  <div style="color: #666; font-size: 14px; margin-top: 5px;">Qty: ${item.quantity}</div>
                  ${item.size ? `<div style="color: #666; font-size: 14px; margin-top: 2px;">Size: ${item.size}</div>` : ''}
                </td>
                <td valign="top" align="right" style="color: #2a2a2a; font-size: 16px; font-weight: 700;">
                  Rs. ${(itemTotal).toFixed(2)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    });
  }

  console.log("=== EMAIL SERVICE DEBUG ===");
  console.log("Subtotal:", subtotal);
  console.log("OrderData Total Amount:", orderData.total_amount);
  console.log("Condition (subtotal < 5000):", subtotal < 5000);
  console.log("============================");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FAF5EC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2a2a2a;">
      <!-- Hidden Preheader Text to clear inbox preview -->
      <div style="display: none; max-height: 0px; overflow: hidden;">
        &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF5EC;">
        <tr>
          <td align="center" style="padding: 40px 15px;">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #EADFC8;">
              
              <!-- Header with Logo and Order Number -->
              <tr>
                <td style="padding-bottom: 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="50%" align="left">
                        <h2 style="margin: 0; color: #E6B754; font-size: 24px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;">HIGH LIFE</h2>
                      </td>
                      <td width="50%" align="right" style="color: #888; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                        ORDER #${orderId}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Hero Section -->
              <tr>
                <td style="padding-bottom: 40px;">
                  <h1 style="font-size: 32px; font-weight: 900; margin: 0 0 15px 0; color: #2a2a2a; letter-spacing: -0.5px;">Thank you for your order!</h1>
                  <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 5px 0;">We've received your order and are packing your fresh spices right now.</p>
                  <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0;">Your order will be delivered shortly.</p>
                </td>
              </tr>
              
              <!-- Order Summary -->
              <tr>
                <td style="padding-bottom: 20px;">
                  <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 15px 0; color: #2a2a2a;">Order summary</h2>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${itemsHtml}
                  </table>
                </td>
              </tr>
              
              <!-- Subtotal & Total -->
              <tr>
                <td style="padding: 20px 0; border-bottom: 1px solid #EADFC8;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="left" style="color: #555; font-size: 16px; font-weight: 500;">Subtotal</td>
                      <td align="right" style="color: #2a2a2a; font-size: 16px; font-weight: 700;">Rs. ${(subtotal).toFixed(2)}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 25px 0 35px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="left" style="color: #2a2a2a; font-size: 18px; font-weight: 800;">Total</td>
                      <td align="right" style="text-align: right;">
                        <span style="color: #E6B754; font-size: 28px; font-weight: 900; letter-spacing: -0.5px;">Rs. ${Number(orderData.total_amount).toFixed(2)}</span>
                        <br>
                        <span style="color: #888; font-size: 14px; font-weight: 700;">LKR</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Delivery Charge Note -->
              <tr>
                <td style="padding-bottom: 30px;">
                  ${subtotal < 5000 ? `
                  <div style="background-color: #FBF5EB; border: 1px solid #EADFC8; border-radius: 12px; padding: 20px;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #2a2a2a;">
                      <strong style="color: #e60000;">Please Note:</strong> Delivery charges are not included in the total. The applicable delivery fee must be paid directly to the delivery service upon receiving your order.
                    </p>
                  </div>
                  ` : `
                  <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px;">
                    <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #2a2a2a;">
                      <strong style="color: #16a34a;">Free Delivery!</strong> Your order qualifies for free delivery as the total is Rs. 5000 or above.
                    </p>
                  </div>
                  `}
                </td>
              </tr>
              
              <!-- Customer Information -->
              <tr>
                <td style="padding-bottom: 30px; padding-top: 10px;">
                  <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 20px 0; color: #2a2a2a;">Customer information</h2>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <!-- Address -->
                      <td width="50%" valign="top" style="padding-right: 15px;">
                        <div style="color: #888; font-size: 13px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Address</div>
                        <div style="color: #2a2a2a; font-size: 15px; font-weight: 500; line-height: 1.6;">
                          ${orderData.customer_name}<br>
                          ${orderData.location.replace(/, /g, '<br>')}
                        </div>
                      </td>
                      <!-- Contact & Payment -->
                      <td width="50%" valign="top" style="padding-left: 15px;">
                        <div style="color: #888; font-size: 13px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Contact & Payment</div>
                        <div style="color: #2a2a2a; font-size: 15px; font-weight: 500; line-height: 1.6;">
                          0${orderData.mobile_number.replace(/^0+/, '')}<br>
                          <a href="mailto:${orderData.email}" style="color: #E6B754; text-decoration: none;">${orderData.email}</a><br>
                          Payment: ${orderData.payment_method === 'onepay' ? 'Bank Card / Bank Account - One Pay' : (orderData.payment_method || 'One Pay')}
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Divider -->
              <tr>
                <td style="border-top: 2px dashed #EADFC8; padding-top: 30px; padding-bottom: 30px;"></td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td align="center">
                  <p style="font-size: 14px; line-height: 1.6; color: #666; margin: 0 0 15px 0;">
                    If you have any questions, reply to this email or contact us at <br>
                    <a href="mailto:highlifepvtltd@gmail.com" style="color: #E6B754; text-decoration: none; font-weight: 700;">highlifepvtltd@gmail.com</a>.
                  </p>
                  <p style="font-size: 13px; color: #888; margin: 0; font-weight: 500;">
                    © 2026 High Life (PVT) LTD. All Rights Reserved.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    // Send email to the customer
    const info = await transporter.sendMail({
      from: `"High Life (PVT) LTD" <${process.env.EMAIL_USER}>`,
      to: orderData.email,
      subject: `Thank you for your order!`,
      html: htmlContent,
      attachments: attachments
    });
    console.log("Email sent successfully to customer:", info.messageId);

    // Send email to the admin
    const adminHtmlContent = htmlContent.replace(
      /<!-- Hero Section -->[\s\S]*?<!-- Order Summary -->/,
      '<!-- Order Summary -->'
    );
    const adminInfo = await transporter.sendMail({
      from: `"High Life (PVT) LTD" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Order Received - Order #${orderId}`,
      html: adminHtmlContent,
      attachments: attachments
    });
    console.log("Email sent successfully to admin:", adminInfo.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

/**
 * Sends an order cancellation email to the customer.
 * @param {Object} orderData 
 * @param {Number} orderId 
 */
const sendOrderCancellationEmail = async (orderData, orderId) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not set. Skipping email cancellation.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Cancelled</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FAF5EC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2a2a2a;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF5EC;">
        <tr>
          <td align="center" style="padding: 40px 15px;">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #EADFC8;">
              
              <!-- Header with Logo and Order Number -->
              <tr>
                <td style="padding-bottom: 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="50%" align="left">
                        <h2 style="margin: 0; color: #E6B754; font-size: 24px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;">HIGH LIFE</h2>
                      </td>
                      <td width="50%" align="right" style="color: #888; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                        ORDER #${orderId}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Hero Section -->
              <tr>
                <td style="padding-bottom: 40px; padding-top: 20px;">
                  <h1 style="font-size: 32px; font-weight: 900; margin: 0 0 20px 0; color: #2a2a2a; letter-spacing: -0.5px;">Order Cancelled</h1>
                  <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0 0 25px 0;">We regret to inform you that your order <strong>#${orderId}</strong> has been cancelled.</p>
                  <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0;">To know the reason for cancellation or if you have any questions, please contact us at <br><a href="mailto:highlifepvtltd@gmail.com" style="color: #E6B754; text-decoration: none; font-weight: 700;">highlifepvtltd@gmail.com</a>.</p>
                </td>
              </tr>
              
              <!-- Divider -->
              <tr>
                <td style="border-top: 2px dashed #EADFC8; padding-top: 30px; padding-bottom: 20px;"></td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td align="center">
                  <p style="font-size: 13px; color: #888; margin: 0; font-weight: 500;">
                    © 2026 High Life (PVT) LTD. All Rights Reserved.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"High Life (PVT) LTD" <${process.env.EMAIL_USER}>`,
      to: orderData.email,
      subject: `Order Cancelled - Order #${orderId}`,
      html: htmlContent
    });
    console.log("Cancellation email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending cancellation email:", error);
  }
};

/**
 * Sends a contact form message to the admin.
 * @param {Object} contactData 
 */
const sendContactEmail = async (contactData) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("EMAIL_USER or EMAIL_PASS not set. Skipping contact email.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Message</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FAF5EC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2a2a2a;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF5EC;">
        <tr>
          <td align="center" style="padding: 40px 15px;">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #EADFC8;">
              
              <!-- Header -->
              <tr>
                <td style="padding-bottom: 20px; border-bottom: 2px dashed #EADFC8; text-align: center;">
                  <h1 style="font-size: 24px; font-weight: 900; margin: 0; color: #2a2a2a; letter-spacing: 1px; text-transform: uppercase;">
                    <span style="color: #E6B754;">New</span> Contact Message
                  </h1>
                </td>
              </tr>
              
              <!-- Customer Info -->
              <tr>
                <td style="padding-top: 30px; padding-bottom: 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="50%" valign="top" style="padding-right: 15px;">
                        <div style="color: #888; font-size: 13px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Sender Name</div>
                        <div style="color: #2a2a2a; font-size: 16px; font-weight: 600;">
                          ${contactData.firstName} ${contactData.lastName}
                        </div>
                      </td>
                      <td width="50%" valign="top" style="padding-left: 15px;">
                        <div style="color: #888; font-size: 13px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Email Address</div>
                        <div style="color: #E6B754; font-size: 16px; font-weight: 600;">
                          <a href="mailto:${contactData.email}" style="color: #E6B754; text-decoration: none;">${contactData.email}</a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Message Box -->
              <tr>
                <td style="padding-bottom: 30px;">
                  <div style="color: #888; font-size: 13px; font-weight: 700; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</div>
                  <div style="background-color: #FAF5EC; border: 1px solid #EADFC8; border-radius: 12px; padding: 25px; color: #444; font-size: 16px; line-height: 1.8; white-space: pre-wrap;">${contactData.message}</div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td align="center" style="padding-top: 20px; border-top: 2px dashed #EADFC8;">
                  <p style="font-size: 13px; color: #888; margin: 0; font-weight: 500;">
                    This message was sent from the High Life (PVT) LTD Contact Form.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${contactData.firstName} ${contactData.lastName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: contactData.email,
      subject: `New Contact Form Submission from ${contactData.firstName} ${contactData.lastName}`,
      html: htmlContent
    });
    console.log("Contact email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
};

module.exports = {
  sendOrderConfirmation,
  sendOrderCancellationEmail,
  sendContactEmail
};
