// Welcome Email Template
// Colors: #121212, #bd1f22, #171717

export const generateWelcomeHTML = (data = {}) => {
  const {
    logoUrl = 'https://customer-assets-rejwkqb3.emergentagent.net/job_responsive-mailer-3--6zpp8ape/artifacts/9e30b039835ace86_Tuning-Files-Logo-Weiss-500px-breite-1.png',
    customerName = 'Max',
    ctaUrl = 'https://tuningfiles-download.com/shop',
    features = [
      { icon: '⚡', title: 'Sofortiger Download', description: 'Ihre Tuning-Files sind innerhalb von Sekunden verfügbar' },
      { icon: '🔧', title: 'Professionelle Qualität', description: 'Alle Files werden von Experten erstellt und getestet' },
      { icon: '💬', title: '24/7 Support', description: 'Unser Team ist rund um die Uhr für Sie da' }
    ]
  } = data;

  return `<!DOCTYPE html>
<html lang="de" translate="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Willkommen bei TuningFiles Download</title>
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
          
          <!-- Welcome Hero -->
          <tr>
            <td style="background-color: #171717; padding: 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <!-- Racing Flag Decoration -->
                    <div style="margin-bottom: 24px;">
                      <span style="font-size: 48px;">🏁</span>
                    </div>
                    <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">
                      Willkommen bei<br>
                      <span style="color: #bd1f22;">TuningFiles Download!</span>
                    </h1>
                    <p style="margin: 0; font-size: 18px; color: #a0a0a0; line-height: 1.6;">
                      Hallo ${customerName}, schön dass Sie dabei sind!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Introduction Text -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="background-color: #1f1f1f; border-radius: 8px; padding: 24px;">
                    <p style="margin: 0; font-size: 16px; color: #d0d0d0; line-height: 1.7;">
                      Sie haben jetzt Zugang zu den besten Chiptuning-Dateien auf dem Markt. 
                      Egal ob Sie mehr Leistung, besseren Verbrauch oder beides wollen - 
                      wir haben die passende Lösung für Ihr Fahrzeug.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Features Section -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px 20px 40px;">
              <h2 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 600; color: #ffffff; text-align: center;">
                Was Sie erwartet
              </h2>
            </td>
          </tr>
          
          ${features.map(feature => `
          <tr>
            <td style="background-color: #171717; padding: 0 40px 16px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1f1f1f; border-radius: 8px; border-left: 4px solid #bd1f22;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="50" valign="top">
                          <span style="font-size: 28px;">${feature.icon}</span>
                        </td>
                        <td>
                          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #ffffff;">
                            ${feature.title}
                          </h3>
                          <p style="margin: 0; font-size: 14px; color: #a0a0a0; line-height: 1.5;">
                            ${feature.description}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `).join('')}
          
          <!-- CTA Section -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 30px 40px 50px 40px;">
              <p style="margin: 0 0 24px 0; font-size: 18px; color: #ffffff; font-weight: 500;">
                Bereit loszulegen?
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color: #bd1f22; border-radius: 8px;">
                    <a href="${ctaUrl}" target="_blank" style="display: inline-block; padding: 18px 56px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none;">
                      🚀 Zum Shop
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Quick Links -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #333333; padding-top: 30px;">
                    <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #ffffff; text-align: center;">
                      Nützliche Links
                    </h3>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="33%" align="center" style="padding: 8px;">
                          <a href="#" style="font-size: 14px; color: #bd1f22; text-decoration: none;">FAQ</a>
                        </td>
                        <td width="33%" align="center" style="padding: 8px;">
                          <a href="#" style="font-size: 14px; color: #bd1f22; text-decoration: none;">Anleitung</a>
                        </td>
                        <td width="33%" align="center" style="padding: 8px;">
                          <a href="#" style="font-size: 14px; color: #bd1f22; text-decoration: none;">Kontakt</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Social Links -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 0 40px 30px 40px;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #666666;">
                Folgen Sie uns auf Social Media
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://instagram.com/tuningfiles" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="32" height="32" style="display: block;">
                    </a>
                  </td>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://facebook.com/tuningfiles" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" width="32" height="32" style="display: block;">
                    </a>
                  </td>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://wa.me/tuningfiles" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174879.png" alt="WhatsApp" width="32" height="32" style="display: block;">
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

export const WelcomeTemplate = ({ data }) => {
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: generateWelcomeHTML(data) }} 
      style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}
    />
  );
};
