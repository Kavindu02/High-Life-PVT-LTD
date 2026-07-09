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
  const logoPath = path.join(__dirname, '../frontend/public/logo.png');
  if (fs.existsSync(logoPath)) {
    attachments.push({
      filename: 'logo.png',
      path: logoPath,
      cid: 'logo',
      contentDisposition: 'inline'
    });
  } else {
    const logoWebpPath = path.join(__dirname, '../frontend/public/logo.webp');
    if (fs.existsSync(logoWebpPath)) {
      attachments.push({
        filename: 'logo.png', // Fake extension to hide attachment in Gmail
        path: logoWebpPath,
        cid: 'logo',
        contentType: 'image/png',
        contentDisposition: 'inline'
      });
    }
  }

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
          imageHtml = `<div style="background-image: url('cid:${cid}'); background-size: cover; background-position: center; width: 50px; height: 50px; border-radius: 8px;"></div>`;
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
              
              <!-- Header -->
              <tr>
                <td style="padding-bottom: 10px; text-align: center;">
                  <div style="background-image: url('cid:logo'); background-size: contain; background-repeat: no-repeat; background-position: center; height: 150px; width: 250px; margin: 0 auto;"></div>
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
                    <a href="mailto:hello@highlife.com" style="color: #E6B754; text-decoration: none; font-weight: 700;">hello@highlife.com</a>.
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
    const info = await transporter.sendMail({
      from: `"High Life (PVT) LTD" <${process.env.EMAIL_USER}>`,
      to: orderData.email,
      subject: `Thank you for your order!`,
      html: htmlContent,
      attachments: attachments
    });
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendOrderConfirmation
};
