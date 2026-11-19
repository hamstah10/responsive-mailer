// Password Reset Email Template
// Colors: #121212, #bd1f22, #171717

export const generatePasswordResetHTML = (data = {}) => {
  const {
    logoUrl = 'https://customer-assets-rejwkqb3.emergentagent.net/job_responsive-mailer-3--6zpp8ape/artifacts/9e30b039835ace86_Tuning-Files-Logo-Weiss-500px-breite-1.png',
    customerName = 'Max',
    resetUrl = 'https://tuningfiles-download.com/reset?token=abc123',
    expiryTime = '24 Stunden',
    supportEmail = 'support@tuningfiles-download.com'
  } = data;

  return `<!DOCTYPE html>
<html lang="de" translate="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Passwort zurücksetzen - TuningFiles Download</title>
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
          
          <!-- Lock Icon & Title -->
          <tr>
            <td style="background-color: #171717; padding: 40px 40px 20px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <!-- Lock Icon Circle -->
                    <div style="width: 80px; height: 80px; background-color: #2a1a1a; border: 2px solid #bd1f22; border-radius: 50%; display: inline-block; text-align: center; line-height: 76px; margin-bottom: 24px;">
                      <span style="font-size: 36px;">🔐</span>
                    </div>
                    <h1 style="margin: 0 0 12px 0; font-size: 26px; font-weight: 700; color: #ffffff;">
                      Passwort zurücksetzen
                    </h1>
                    <p style="margin: 0; font-size: 16px; color: #a0a0a0;">
                      Hallo ${customerName}, wir haben eine Anfrage zum Zurücksetzen Ihres Passworts erhalten.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="background-color: #171717; padding: 20px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1f1f1f; border-radius: 8px;">
                <tr>
                  <td style="padding: 30px;">
                    <p style="margin: 0 0 20px 0; font-size: 15px; color: #d0d0d0; line-height: 1.7;">
                      Klicken Sie auf den Button unten, um ein neues Passwort für Ihr TuningFiles Download Konto zu erstellen.
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #888888;">
                      <strong style="color: #bd1f22;">⏰ Wichtig:</strong> Dieser Link ist nur ${expiryTime} gültig.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Reset Button -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color: #bd1f22; border-radius: 8px;">
                    <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 18px 56px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none;">
                      🔑 Passwort zurücksetzen
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Alternative Link -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a1a; border-radius: 8px; border: 1px solid #333333;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: #888888;">
                      Button funktioniert nicht? Kopieren Sie diesen Link in Ihren Browser:
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #bd1f22; word-break: break-all;">
                      ${resetUrl}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Security Notice -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px 40px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1f1a1a; border-radius: 8px; border-left: 4px solid #bd1f22;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 600; color: #ffffff;">
                      ⚠️ Sicherheitshinweis
                    </h3>
                    <p style="margin: 0; font-size: 14px; color: #a0a0a0; line-height: 1.6;">
                      Falls Sie diese Anfrage nicht gestellt haben, ignorieren Sie diese E-Mail. 
                      Ihr Passwort bleibt unverändert. Wenn Sie verdächtige Aktivitäten bemerken, 
                      kontaktieren Sie uns bitte umgehend.
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
          
          <!-- Support Info -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 30px 40px;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #666666;">
                Fragen? Kontaktieren Sie uns:
              </p>
              <a href="mailto:${supportEmail}" style="font-size: 14px; color: #bd1f22; text-decoration: none;">
                ${supportEmail}
              </a>
            </td>
          </tr>
          
          <!-- Social Links -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 0 40px 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://instagram.com/tuningfiles" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="28" height="28" style="display: block;">
                    </a>
                  </td>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://facebook.com/tuningfiles" target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" width="28" height="28" style="display: block;">
                    </a>
                  </td>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://wa.me/tuningfiles" target="_blank">
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
                    <p style="margin: 8px 0 0 0; font-size: 11px; color: #444444;">
                      Diese E-Mail wurde automatisch generiert.
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

export const PasswordResetTemplate = ({ data }) => {
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: generatePasswordResetHTML(data) }} 
      style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}
    />
  );
};
