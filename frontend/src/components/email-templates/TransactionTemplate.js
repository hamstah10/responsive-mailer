// Transaction / Order Confirmation Email Template
// Colors: #121212, #bd1f25, #171717

export const generateTransactionHTML = (data = {}) => {
  const {
    logoUrl = 'https://customer-assets-rejwkqb3.emergentagent.net/job_responsive-mailer-3--6zpp8ape/artifacts/9e30b039835ace86_Tuning-Files-Logo-Weiss-500px-breite-1.png',
    customerName = '{{ .Subscriber.FirstName | default "Kunde" }}',
    orderNumber = 'TF-2024-001234',
    orderDate = new Date().toLocaleDateString('de-DE'),
    items = [
      { name: 'BMW 320d Stage 1 Tuning File', quantity: 1, price: '299,00€' },
      { name: 'DPF Delete Software', quantity: 1, price: '149,00€' }
    ],
    subtotal = '448,00€',
    total = '448,00€',
    downloadUrl = 'https://tuningfiles-download.com/download',
    supportEmail = 'support@tuningfiles-download.com'
  } = data;

  return `<!DOCTYPE html>
<html lang="de" translate="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Bestellbestätigung - TuningFiles Download</title>
</head>
<body style="margin: 0; padding: 0; background-color: #121212; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121212;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 30px 40px; background-color: #171717; border-radius: 12px 12px 0 0;">
              <img src="${logoUrl}" alt="TuningFiles Download" width="180" style="display: block; max-width: 180px; height: auto;">
            </td>
          </tr>
          
          <!-- Success Icon & Title -->
          <tr>
            <td style="background-color: #171717; padding: 40px 40px 20px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <!-- Checkmark Circle -->
                    <div style="width: 80px; height: 80px; background-color: #1a3d1a; border-radius: 50%; display: inline-block; text-align: center; line-height: 80px; margin-bottom: 24px;">
                      <span style="font-size: 40px; color: #4ade80;">✓</span>
                    </div>
                    <h1 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 700; color: #ffffff;">
                      Bestellung erfolgreich!
                    </h1>
                    <p style="margin: 0; font-size: 16px; color: #a0a0a0;">
                      Vielen Dank für Ihre Bestellung, ${customerName}!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Order Info -->
          <tr>
            <td style="background-color: #171717; padding: 20px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1f1f1f; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="50%">
                          <p style="margin: 0 0 4px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Bestellnummer</p>
                          <p style="margin: 0; font-size: 16px; color: #ffffff; font-weight: 600;">${orderNumber}</p>
                        </td>
                        <td width="50%" align="right">
                          <p style="margin: 0 0 4px 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Datum</p>
                          <p style="margin: 0; font-size: 16px; color: #ffffff; font-weight: 600;">${orderDate}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Order Items -->
          <tr>
            <td style="background-color: #171717; padding: 20px 40px;">
              <h2 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #ffffff;">
                Ihre Bestellung
              </h2>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                ${items.map(item => `
                <tr>
                  <td style="padding: 16px 0; border-bottom: 1px solid #333333;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <p style="margin: 0 0 4px 0; font-size: 16px; color: #ffffff; font-weight: 500;">
                            ${item.name}
                          </p>
                          <p style="margin: 0; font-size: 14px; color: #666666;">
                            Menge: ${item.quantity}
                          </p>
                        </td>
                        <td align="right" style="vertical-align: top;">
                          <p style="margin: 0; font-size: 16px; color: #bd1f25; font-weight: 600;">
                            ${item.price}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `).join('')}
                
                <!-- Total -->
                <tr>
                  <td style="padding: 20px 0 0 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <p style="margin: 0; font-size: 14px; color: #a0a0a0;">Zwischensumme</p>
                        </td>
                        <td align="right">
                          <p style="margin: 0; font-size: 14px; color: #a0a0a0;">${subtotal}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 12px;">
                          <p style="margin: 0; font-size: 18px; color: #ffffff; font-weight: 700;">Gesamt</p>
                        </td>
                        <td align="right" style="padding-top: 12px;">
                          <p style="margin: 0; font-size: 22px; color: #bd1f25; font-weight: 700;">${total}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Download Button -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 30px 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color: #bd1f25; border-radius: 8px;">
                    <a href="${downloadUrl}" target="_blank" style="display: inline-block; padding: 16px 48px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none;">
                      📥 Dateien herunterladen
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 20px 0 0 0; font-size: 14px; color: #666666;">
                Der Download-Link ist 30 Tage gültig.
              </p>
            </td>
          </tr>
          
          <!-- Support Box -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a2e; border-radius: 8px; border: 1px solid #bd1f25;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #ffffff;">
                      Brauchen Sie Hilfe?
                    </h3>
                    <p style="margin: 0; font-size: 14px; color: #a0a0a0; line-height: 1.6;">
                      Unser Support-Team steht Ihnen zur Verfügung:<br>
                      <a href="mailto:${supportEmail}" style="color: #bd1f25; text-decoration: none;">${supportEmail}</a>
                    </p>
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
                    <a href="https://www.instagram.com/tuningfilesdownloadcom" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="28" height="28" style="display: block;">
                    </a>
                  </td>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://www.facebook.com/tuningfilesdownload" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" width="28" height="28" style="display: block;">
                    </a>
                  </td>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://wa.me/491797511144" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174879.png" alt="WhatsApp" width="28" height="28" style="display: block;">
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Address & Contact - 2 Columns (no extra background) -->
          <tr>
            <td style="background-color: #171717; padding: 10px 40px 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="50%" style="padding: 0 20px 0 0; border-right: 1px solid #333333;" valign="top">
                    <p style="margin: 0 0 4px 0; font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Adresse</p>
                    <p style="margin: 0 0 6px 0; font-size: 15px; font-weight: 600; color: #ffffff;" translate="no">
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
                      <a href="tel:+4917975111144" style="font-size: 14px; color: #bd1f25; text-decoration: none; font-weight: 500;">(0)179 / 75 111 44</a>
                    </p>
                    <p style="margin: 0; font-size: 13px; color: #a0a0a0;">
                      <span style="color: #666666;">E-Mail:</span><br>
                      <a href="mailto:info@tuningfiles-download.com" style="font-size: 14px; color: #bd1f25; text-decoration: none; font-weight: 500;">info@tuningfiles-download.com</a>
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

export const TransactionTemplate = ({ data }) => {
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: generateTransactionHTML(data) }} 
      style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}
    />
  );
};
