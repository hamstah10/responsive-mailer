// Black Week Credits Template - Für Bestandskunden
// Colors: #121212, #bd1f25, #171717

export const generateBlackWeekCreditsHTML = (data = {}) => {
  const {
    logoUrl = 'https://customer-assets-rejwkqb3.emergentagent.net/job_responsive-mailer-3--6zpp8ape/artifacts/9e30b039835ace86_Tuning-Files-Logo-Weiss-500px-breite-1.png',
    headline = 'BLACK WEEK',
    subheadline = 'EXKLUSIV FÜR BESTANDSKUNDEN',
    mainTitle = '15% Bonus auf alle Credits',
    mainSubtitle = 'Ihr Treue-Bonus. Nur diese Woche.',
    greeting = 'Hallo',
    customerName = '{{ .Subscriber.FirstName | default "geschätzter Kunde" }}',
    introText = 'Als treuer Kunde erhalten Sie diese Woche exklusiven Zugang zu unserem Black Week Special:',
    discountBadge = '15% BONUS',
    discountText = 'Extra-Credits geschenkt',
    validUntil = 'Gültig bis Sonntag, 23:59 Uhr',
    creditPackages = [
      { name: '10 Credits', price: '89,00 €', bonus: '+1,5 Credits', bonusValue: 'Wert: 13,35 €' },
      { name: '25 Credits', price: '199,00 €', bonus: '+3,75 Credits', bonusValue: 'Wert: 29,85 €' },
      { name: '50 Credits', price: '349,00 €', bonus: '+7,5 Credits', bonusValue: 'Wert: 52,35 €' }
    ],
    benefitTitle = 'Ihre Vorteile als Bestandskunde',
    benefits = [
      'Sofort einsetzbare Credits',
      'Kein Verfallsdatum',
      'Premium Support inklusive',
      'Automatisch im Portal verfügbar'
    ],
    ctaText = 'JETZT IM PORTAL EINLOGGEN',
    ctaUrl = 'https://portal.tuningfiles-download.com/',
    footerNote = 'Der Rabatt wird automatisch im Portal angezeigt. Keine Code-Eingabe nötig.',
    tagline = 'Performance verbindet.'
  } = data;

  const packageRows = creditPackages.map((pkg, index) => `
    <tr>
      <td style="padding: 0 0 ${index < creditPackages.length - 1 ? '12px' : '0'} 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #1f1f1f 0%, #252525 100%); border-radius: 12px; border: 1px solid #333333;">
          <tr>
            <td style="padding: 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="45%" valign="middle">
                    <p style="margin: 0; font-size: 18px; font-weight: 700; color: #ffffff;">${pkg.name}</p>
                    <p style="margin: 6px 0 0 0; font-size: 14px; color: #888888;">${pkg.price}</p>
                  </td>
                  <td width="55%" valign="middle" align="right">
                    <p style="margin: 0; font-size: 20px; font-weight: 700; color: #22c55e;">${pkg.bonus}</p>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: #22c55e; font-weight: 500;">${pkg.bonusValue} gratis!</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  const benefitRows = benefits.map(benefit => `
    <tr>
      <td style="padding: 6px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td width="24" valign="top">
              <span style="color: #22c55e; font-size: 14px;">✓</span>
            </td>
            <td style="padding-left: 8px;">
              <span style="font-size: 14px; color: #a0a0a0;">${benefit}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="de" translate="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>BLACK WEEK - Exklusiv für Bestandskunden</title>
</head>
<body style="margin: 0; padding: 0; background-color: #121212; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #121212;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%;">
          
          <!-- Header with Logo -->
          <tr>
            <td align="center" style="padding: 30px 40px; background-color: #171717; border-radius: 12px 12px 0 0;">
              <img src="${logoUrl}" alt="TuningFiles Download" width="200" style="display: block; max-width: 200px; height: auto;">
            </td>
          </tr>
          
          <!-- Animated Gradient Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #bd1f25 0%, #8a1618 30%, #171717 70%, #121212 100%); padding: 0; position: relative;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 50px 30px;">
                    <!-- Exclusive Badge -->
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color: rgba(255,255,255,0.15); padding: 6px 16px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2);">
                          <span style="font-size: 11px; color: #ffffff; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">
                            ★ ${subheadline} ★
                          </span>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Main Headline -->
                    <h1 style="margin: 20px 0 0 0; font-size: 42px; font-weight: 900; color: #ffffff; letter-spacing: 6px; text-shadow: 2px 2px 8px rgba(0,0,0,0.5);">
                      ${headline}
                    </h1>
                    
                    <!-- Discount Highlight -->
                    <p style="margin: 16px 0 0 0; font-size: 32px; font-weight: 800; color: #ffffff;">
                      ${mainTitle}
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 16px; color: rgba(255,255,255,0.8);">
                      ${mainSubtitle}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Personal Greeting -->
          <tr>
            <td style="background-color: #171717; padding: 30px 40px 20px 40px;">
              <p style="margin: 0; font-size: 18px; color: #ffffff;">
                ${greeting} <span style="color: #bd1f25; font-weight: 600;">${customerName}</span>,
              </p>
              <p style="margin: 12px 0 0 0; font-size: 15px; color: #a0a0a0; line-height: 1.6;">
                ${introText}
              </p>
            </td>
          </tr>
          
          <!-- Big Discount Badge -->
          <tr>
            <td style="background-color: #171717; padding: 10px 40px 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #bd1f25 0%, #9a1a1c 100%); border-radius: 16px; box-shadow: 0 8px 32px rgba(189, 31, 37, 0.3);">
                      <tr>
                        <td style="padding: 25px 50px; text-align: center;">
                          <p style="margin: 0; font-size: 48px; font-weight: 900; color: #ffffff; letter-spacing: 2px;">
                            ${discountBadge}
                          </p>
                          <p style="margin: 8px 0 0 0; font-size: 16px; color: rgba(255,255,255,0.9); font-weight: 500;">
                            ${discountText}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Validity Timer -->
          <tr>
            <td style="background-color: #171717; padding: 0 40px 25px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 12px 20px; background-color: #1a1a1a; border-radius: 8px; border: 1px dashed #333333;">
                    <p style="margin: 0; font-size: 13px; color: #888888;">
                      ⏰ <span style="color: #bd1f25; font-weight: 600;">${validUntil}</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Credit Packages -->
          <tr>
            <td style="background-color: #171717; padding: 10px 40px 30px 40px;">
              <p style="margin: 0 0 16px 0; font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 2px; text-align: center;">
                Credit-Pakete im Angebot
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                ${packageRows}
              </table>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 10px 40px 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius: 12px; background: linear-gradient(135deg, #bd1f25 0%, #9a1a1c 100%); box-shadow: 0 6px 20px rgba(189, 31, 37, 0.4);">
                    <a href="${ctaUrl}" target="_blank" style="display: inline-block; padding: 20px 50px; font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: 1px;" translate="no">
                      ${ctaText} →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 16px 0 0 0; font-size: 12px; color: #666666;">
                ${footerNote}
              </p>
            </td>
          </tr>
          
          <!-- Benefits Section -->
          <tr>
            <td style="background-color: #171717; padding: 20px 40px 30px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a1a; border-radius: 12px; border: 1px solid #2a2a2a;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: #ffffff;">
                      ${benefitTitle}
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      ${benefitRows}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Tagline -->
          <tr>
            <td align="center" style="background-color: #171717; padding: 20px 40px;">
              <p style="margin: 0; font-size: 14px; color: #555555; font-style: italic;">
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
          
          <!-- Address & Contact -->
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
          
          <!-- Google Reviews & Legal -->
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

export const BlackWeekCreditsTemplate = ({ data }) => {
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: generateBlackWeekCreditsHTML(data) }} 
      style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}
    />
  );
};
