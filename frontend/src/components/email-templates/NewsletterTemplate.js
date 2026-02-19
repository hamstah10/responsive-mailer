// Newsletter / Marketing Email Template
// Colors: #121212, #bd1f22, #171717

export const generateNewsletterHTML = (data = {}) => {
  const {
    logoUrl = 'https://customer-assets.emergentagent.com/job_2fe42aa5-9907-4512-808b-ab78c4c0f3e9/artifacts/o55o7ha0_logo_tuning.png',
    headline = 'Neue Tuning-Files verfügbar!',
    subheadline = 'Entdecken Sie unsere neuesten Performance-Upgrades',
    products = [
      { name: 'Stage 1 Tuning', description: 'Optimierte Leistung für Alltag', price: '299€' },
      { name: 'Stage 2 Tuning', description: 'Maximale Performance', price: '499€' },
      { name: 'DPF/EGR Delete', description: 'Umweltkomponenten entfernen', price: '199€' }
    ],
    ctaText = 'Jetzt entdecken',
    ctaUrl = 'https://tuningfiles-download.com',
    unsubscribeUrl = '#'
  } = data;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>TuningFiles Download - Newsletter</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #121212; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <!-- Wrapper Table -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121212;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Email Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%;">
          
          <!-- Header with Logo -->
          <tr>
            <td align="center" style="padding: 30px 40px; background-color: #171717; border-radius: 12px 12px 0 0;">
              <img src="${logoUrl}" alt="TuningFiles Download" width="200" style="display: block; max-width: 200px; height: auto;">
            </td>
          </tr>
          
          <!-- Hero Section -->
          <tr>
            <td style="background-color: #171717; padding: 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #ffffff; line-height: 1.3;">
                      ${headline}
                    </h1>
                    <p style="margin: 0 0 30px 0; font-size: 16px; color: #a0a0a0; line-height: 1.6;">
                      ${subheadline}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Products Section -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                ${products.map(product => `
                <tr>
                  <td style="padding: 20px; background-color: #1f1f1f; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid #bd1f22;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #ffffff;">
                            ${product.name}
                          </h3>
                          <p style="margin: 0 0 12px 0; font-size: 14px; color: #a0a0a0;">
                            ${product.description}
                          </p>
                          <span style="display: inline-block; font-size: 20px; font-weight: 700; color: #bd1f22;">
                            ${product.price}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td height="16"></td></tr>
                `).join('')}
              </table>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 0 40px 50px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color: #bd1f22; border-radius: 8px;">
                    <a href="${ctaUrl}" target="_blank" style="display: inline-block; padding: 16px 48px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none;">
                      ${ctaText}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #333333;"></td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Social Links -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://instagram.com/tuningfiles" target="_blank" style="text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="32" height="32" style="display: block;">
                    </a>
                  </td>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://facebook.com/tuningfiles" target="_blank" style="text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" width="32" height="32" style="display: block;">
                    </a>
                  </td>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://wa.me/tuningfiles" target="_blank" style="text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174879.png" alt="WhatsApp" width="32" height="32" style="display: block;">
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #121212; padding: 30px 40px; border-radius: 0 0 12px 12px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <!-- Company & Contact Info - 2 Columns -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1f1f1f; border-radius: 8px;">
                      <tr>
                        <td width="50%" style="padding: 20px; border-right: 1px solid #333333;" valign="top">
                          <p style="margin: 0 0 4px 0; font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Adresse</p>
                          <p style="margin: 0 0 6px 0; font-size: 15px; font-weight: 600; color: #ffffff;">
                            tuningfiles-download.com
                          </p>
                          <p style="margin: 0; font-size: 13px; color: #a0a0a0; line-height: 1.5;">
                            Hauptstr. 231a<br>
                            98529 Suhl<br>
                            Deutschland
                          </p>
                        </td>
                        <td width="50%" style="padding: 20px;" valign="top">
                          <p style="margin: 0 0 4px 0; font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Kontakt</p>
                          <p style="margin: 0 0 8px 0; font-size: 13px; color: #a0a0a0;">
                            <span style="color: #666666;">Tel:</span><br>
                            <a href="tel:+4917975111144" style="font-size: 14px; color: #bd1f22; text-decoration: none; font-weight: 500;">(0)179 / 75 111 44</a>
                          </p>
                          <p style="margin: 0; font-size: 13px; color: #a0a0a0;">
                            <span style="color: #666666;">E-Mail:</span><br>
                            <a href="mailto:info@tuningfiles-download.com" style="font-size: 14px; color: #bd1f22; text-decoration: none; font-weight: 500;">info@tuningfiles-download.com</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Google Reviews -->
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <a href="https://share.google/VMlw75L8Zmsiz56Yj" target="_blank" style="display: inline-flex; align-items: center; padding: 10px 20px; background-color: #1f1f1f; border-radius: 8px; text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" width="20" height="20" style="margin-right: 8px;">
                      <span style="font-size: 13px; color: #ffffff;">Bewerten Sie uns auf Google ⭐</span>
                    </a>
                  </td>
                </tr>
                <!-- Legal Links -->
                <tr>
                  <td align="center" style="padding-top: 16px; border-top: 1px solid #333333;">
                    <p style="margin: 0; font-size: 12px; color: #555555;">
                      <a href="${unsubscribeUrl}" style="color: #bd1f22; text-decoration: underline;">Abmelden</a> | 
                      <a href="https://tuningfiles-download.com/impressum" style="color: #666666; text-decoration: underline;">Impressum</a> | 
                      <a href="https://tuningfiles-download.com/datenschutz" style="color: #666666; text-decoration: underline;">Datenschutz</a>
                    </p>
                    <p style="margin: 12px 0 0 0; font-size: 11px; color: #444444;">
                      © ${new Date().getFullYear()} TuningFiles Download. Alle Rechte vorbehalten.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const NewsletterTemplate = ({ data }) => {
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: generateNewsletterHTML(data) }} 
      style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}
    />
  );
};
