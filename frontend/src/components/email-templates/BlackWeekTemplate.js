// Black Week Angebot Email Template - KESS3 Slave
// Colors: #121212, #bd1f25, #171717

export const generateBlackWeekHTML = (data = {}) => {
  const {
    logoUrl = 'https://customer-assets-rejwkqb3.emergentagent.net/job_responsive-mailer-3--6zpp8ape/artifacts/9e30b039835ace86_Tuning-Files-Logo-Weiss-500px-breite-1.png',
    productImageUrl = 'https://blackfriday.tuningfiles-download.com/__l5e/assets-v1/fa5de819-408f-4e46-8855-b9a6d2c8328f/kess3-newsletter-original.png',
    headline = 'BLACK FRIDAY',
    subheadline = 'ALIENTECH',
    mainTitle = 'Starten Sie mit Chiptuning.',
    mainSubtitle = 'KESS3 Slave. Ihr Einstieg auf das nächste Level.',
    badgeText = 'FÜR NEUKUNDEN · HARDWARE & FILESERVICE',
    productName = 'KESS3 Slave',
    originalPrice = '3.090,00 €',
    salePrice = '1.690,00 €',
    savings = '1.400,00 €',
    creditsValue = '550€',
    creditsText = '5 Tuningfiles inklusive',
    featureText = 'Inklusive OBD, Bench und Boot für Pkw. Wir unterstützen Sie online beim Einstieg und beim ersten Auto.',
    priceNote = 'Preisangaben netto, zzgl. gesetzlicher Mehrwertsteuer. Maßgeblich sind die finalen Konditionen im Shop.',
    ctaText = 'JETZT ANGEBOT ANSEHEN',
    ctaUrl = 'https://www.chiptuning-tools.shop/alientech/alientech-starter-paket',
    tagline = 'Performance verbindet.'
  } = data;

  return `<!DOCTYPE html>
<html lang="de" translate="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>BLACK FRIDAY - TuningFiles Download</title>
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
          
          <!-- BLACK FRIDAY / ALIENTECH Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #bd1f25 0%, #8a1618 50%, #121212 100%); padding: 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 50px 30px;">
                    <!-- Subheadline -->
                    <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.8); letter-spacing: 4px; text-transform: uppercase;">
                      ${headline} / ${subheadline}
                    </p>
                    <!-- Main Title -->
                    <h1 style="margin: 0; font-size: 36px; font-weight: 900; color: #ffffff; line-height: 1.2;">
                      ${mainTitle}
                    </h1>
                    <p style="margin: 12px 0 0 0; font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.9);">
                      ${mainSubtitle}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Badge -->
          <tr>
            <td style="background-color: #171717; padding: 25px 40px 15px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; padding: 8px 20px; background-color: #bd1f25; border-radius: 4px; font-size: 11px; font-weight: 700; color: #ffffff; letter-spacing: 1px; text-transform: uppercase;">
                      ${badgeText}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Product Image -->
          <tr>
            <td style="background-color: #171717; padding: 20px 40px;">
              <a href="${ctaUrl}" target="_blank" style="display: block; text-decoration: none;">
                <img src="${productImageUrl}" alt="${productName}" width="520" style="display: block; width: 100%; max-width: 520px; height: auto; border-radius: 12px; border: 2px solid #333333;">
              </a>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 20px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius: 8px; background: linear-gradient(135deg, #bd1f25 0%, #9a1a1c 100%); box-shadow: 0 4px 15px rgba(189, 31, 34, 0.4);">
                    <a href="${ctaUrl}" target="_blank" style="display: inline-block; padding: 16px 40px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: 1px;" translate="no">
                      ${ctaText} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Product Details Box -->
          <tr>
            <td style="background-color: #171717; padding: 20px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a1a; border: 1px solid #333333; border-radius: 12px;">
                <tr>
                  <td style="padding: 30px;">
                    <!-- Product Badge -->
                    <p style="margin: 0 0 8px 0; font-size: 11px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">
                      FÜR NEUKUNDEN · HARDWARE
                    </p>
                    
                    <!-- Product Name -->
                    <h2 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700; color: #ffffff;">
                      ${productName}
                    </h2>
                    
                    <!-- Price Table -->
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #333333;">
                          <span style="font-size: 14px; color: #888888;">Regulärer Paketwert inklusive Credits</span>
                        </td>
                        <td align="right" style="padding: 8px 0; border-bottom: 1px solid #333333;">
                          <span style="font-size: 14px; color: #666666; text-decoration: line-through;">${originalPrice}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #333333;">
                          <span style="font-size: 16px; font-weight: 600; color: #ffffff;">Aktionspreis</span>
                        </td>
                        <td align="right" style="padding: 12px 0; border-bottom: 1px solid #333333;">
                          <span style="font-size: 24px; font-weight: 700; color: #bd1f25;">${salePrice}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #333333;">
                          <span style="font-size: 14px; font-weight: 600; color: #22c55e;">Ihr Gesamtvorteil</span>
                        </td>
                        <td align="right" style="padding: 12px 0; border-bottom: 1px solid #333333;">
                          <span style="font-size: 18px; font-weight: 700; color: #22c55e;">${savings}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" align="center" style="padding: 16px 0 0 0;">
                          <div style="display: inline-block; padding: 10px 16px; background-color: #0d3320; border-radius: 6px;">
                            <span style="font-size: 13px; color: #22c55e; font-weight: 600;">
                              ✓ ${creditsText} im Wert von ${creditsValue}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Features -->
                    <p style="margin: 20px 0 0 0; font-size: 14px; color: #a0a0a0; line-height: 1.6;">
                      ${featureText}
                    </p>
                    
                    <!-- Price Note -->
                    <p style="margin: 16px 0 0 0; font-size: 11px; color: #666666; font-style: italic;">
                      ${priceNote}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Tagline -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 30px 40px;">
              <p style="margin: 0; font-size: 14px; color: #888888; font-style: italic;">
                tuningfiles-download.com · ${tagline}
              </p>
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
                    <a href="https://www.instagram.com/tuningfilesdownloadcom" target="_blank" style="text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="32" height="32" style="display: block;">
                    </a>
                  </td>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://www.facebook.com/tuningfilesdownload" target="_blank" style="text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" width="32" height="32" style="display: block;">
                    </a>
                  </td>
                  <td align="center" style="padding: 0 12px;">
                    <a href="https://wa.me/491797511144" target="_blank" style="text-decoration: none;">
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
  <!-- Listmonk Content Placeholder (required) -->
  <div style="display:none;font-size:0;line-height:0;max-height:0;overflow:hidden;">
    {{ template "content" . }}
  </div>
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
