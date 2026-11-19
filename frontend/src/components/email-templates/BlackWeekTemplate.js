// Black Week Angebot Email Template
// Colors: #121212, #bd1f22, #171717

export const generateBlackWeekHTML = (data = {}) => {
  const {
    logoUrl = 'https://customer-assets-rejwkqb3.emergentagent.net/job_responsive-mailer-3--6zpp8ape/artifacts/9e30b039835ace86_Tuning-Files-Logo-Weiss-500px-breite-1.png',
    headline = 'BLACK WEEK',
    subheadline = 'MEGA SALE',
    discountText = 'BIS ZU 50% RABATT',
    description = 'Sichere dir jetzt unglaubliche Rabatte auf alle unsere Tuning-Files! Nur für kurze Zeit.',
    couponCode = 'BLACKWEEK50',
    couponText = 'DEIN RABATTCODE:',
    ctaText = 'JETZT SPAREN',
    ctaUrl = 'https://tuningfiles-download.com',
    validUntil = '30. November 2024',
    features = [
      { title: 'Stage 1 Tuning', discount: '30% RABATT', originalPrice: '149€', salePrice: '104€' },
      { title: 'Stage 2 Tuning', discount: '40% RABATT', originalPrice: '249€', salePrice: '149€' },
      { title: 'DPF/EGR Lösungen', discount: '50% RABATT', originalPrice: '199€', salePrice: '99€' }
    ]
  } = data;

  const featureRows = features.map(f => `
    <tr>
      <td style="padding: 16px 20px; background-color: #1f1f1f; border-radius: 8px; margin-bottom: 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td width="60%" valign="middle">
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #ffffff;">${f.title}</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #bd1f22; font-weight: 700; text-transform: uppercase;">${f.discount}</p>
            </td>
            <td width="40%" valign="middle" align="right">
              <p style="margin: 0; font-size: 13px; color: #666666; text-decoration: line-through;">${f.originalPrice}</p>
              <p style="margin: 2px 0 0 0; font-size: 20px; color: #bd1f22; font-weight: 700;">${f.salePrice}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr><td style="height: 12px;"></td></tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>BLACK WEEK - TuningFiles Download</title>
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
              <img src="${logoUrl}" alt="TuningFiles Download" width="180" style="display: block; max-width: 180px; height: auto;">
            </td>
          </tr>
          
          <!-- BLACK WEEK Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #bd1f22 0%, #8a1618 50%, #121212 100%); padding: 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 40px 30px;">
                    <!-- Headline -->
                    <h1 style="margin: 0; font-size: 48px; font-weight: 900; color: #ffffff; letter-spacing: 8px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                      ${headline}
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 4px;">
                      ${subheadline}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Discount Highlight Box -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 30px; background-color: #0d0d0d; border: 2px dashed #bd1f22; border-radius: 12px; margin-top: -20px;">
                    <p style="margin: 0; font-size: 32px; font-weight: 900; color: #bd1f22; letter-spacing: 2px;">
                      ${discountText}
                    </p>
                    <p style="margin: 12px 0 0 0; font-size: 14px; color: #888888;">
                      Gültig bis ${validUntil}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Description -->
          <tr>
            <td style="background-color: #171717; padding: 30px 40px;">
              <p style="margin: 0; font-size: 16px; color: #cccccc; line-height: 1.7; text-align: center;">
                ${description}
              </p>
            </td>
          </tr>
          
          <!-- Featured Offers -->
          <tr>
            <td style="background-color: #171717; padding: 10px 40px 30px 40px;">
              <p style="margin: 0 0 20px 0; font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 2px; text-align: center;">
                ★ TOP ANGEBOTE ★
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                ${featureRows}
              </table>
            </td>
          </tr>
          
          <!-- Coupon Code Box -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 25px; background-color: #1a1a1a; border: 1px solid #333333; border-radius: 12px;">
                    <p style="margin: 0 0 10px 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                      ${couponText}
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 12px 30px; background-color: #bd1f22; border-radius: 8px;">
                          <p style="margin: 0; font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                            ${couponCode}
                          </p>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 12px 0 0 0; font-size: 11px; color: #555555;">
                      Rabattcode beim Checkout eingeben
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 10px 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius: 8px; background: linear-gradient(135deg, #bd1f22 0%, #9a1a1c 100%); box-shadow: 0 4px 15px rgba(189, 31, 34, 0.4);">
                    <a href="${ctaUrl}" target="_blank" style="display: inline-block; padding: 18px 50px; font-size: 18px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: 2px;">
                      ${ctaText} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Urgency Banner -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 15px; background-color: #1f1f1f; border-radius: 8px;">
                    <p style="margin: 0; font-size: 13px; color: #bd1f22; font-weight: 600;">
                      ⏰ Nur noch wenige Tage! Nicht verpassen!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="background-color: #171717; padding: 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #333333;"></td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Social Links -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 0 40px 30px 40px;">
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
          
          <!-- Address & Contact - 2 Columns -->
          <tr>
            <td style="background-color: #171717; padding: 10px 40px 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="50%" style="padding: 0 20px 0 0; border-right: 1px solid #333333;" valign="top">
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
                  <td width="50%" style="padding: 0 0 0 20px;" valign="top">
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
          
          <!-- Google Reviews & Legal Links -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px 30px 40px; border-radius: 0 0 12px 12px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <a href="https://share.google/VMlw75L8Zmsiz56Yj" target="_blank" style="display: inline-flex; align-items: center; padding: 10px 20px; background-color: #1f1f1f; border-radius: 8px; text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" width="20" height="20" style="margin-right: 8px;">
                      <span style="font-size: 13px; color: #ffffff;">Bewerten Sie uns auf Google ⭐</span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px; border-top: 1px solid #333333;">
                    <p style="margin: 0; font-size: 12px; color: #555555;">
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

export const BlackWeekTemplate = ({ data }) => {
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: generateBlackWeekHTML(data) }} 
      style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}
    />
  );
};
