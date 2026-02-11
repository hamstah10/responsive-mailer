// Welcome Email Template
// Colors: #121212, #bd1f22, #171717

export const generateWelcomeHTML = (data = {}) => {
  const {
    logoUrl = 'https://customer-assets.emergentagent.com/job_2fe42aa5-9907-4512-808b-ab78c4c0f3e9/artifacts/o55o7ha0_logo_tuning.png',
    customerName = 'Max',
    ctaUrl = 'https://tuningfiles-download.com/shop',
    features = [
      { icon: '⚡', title: 'Sofortiger Download', description: 'Ihre Tuning-Files sind innerhalb von Sekunden verfügbar' },
      { icon: '🔧', title: 'Professionelle Qualität', description: 'Alle Files werden von Experten erstellt und getestet' },
      { icon: '💬', title: '24/7 Support', description: 'Unser Team ist rund um die Uhr für Sie da' }
    ]
  } = data;

  return `<!DOCTYPE html>
<html lang="de">
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
          
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #121212; padding: 30px 40px; border-radius: 0 0 12px 12px;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #666666;">
                TuningFiles Download
              </p>
              <p style="margin: 0; font-size: 12px; color: #555555;">
                © ${new Date().getFullYear()} Alle Rechte vorbehalten
              </p>
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
