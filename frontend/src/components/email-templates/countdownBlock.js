// Static countdown block (computed at render/export time, email-safe tables)
const pad = (n) => String(n).padStart(2, '0');

const formatEnd = (end) =>
  `${pad(end.getDate())}.${pad(end.getMonth() + 1)}.${end.getFullYear()}, ${pad(end.getHours())}:${pad(end.getMinutes())} Uhr`;

export const LAST_CHANCE_CTA = 'JETZT NOCH SICHERN';

export const generateUrgencyBar = ({ lastChance, urgencyText, countdownEnd = '2026-11-30T23:59' } = {}) => {
  if (!lastChance) return '';
  const end = new Date(countdownEnd);
  const text = urgencyText || (isNaN(end.getTime())
    ? 'LETZTE CHANCE – Endet heute'
    : `LETZTE CHANCE – Endet am ${formatEnd(end)}`);
  return `
          <!-- Urgency Bar -->
          <tr>
            <td align="center" style="background-color: #bd1f25; padding: 12px 20px; border-radius: 12px 12px 0 0;">
              <p style="margin: 0; font-size: 14px; font-weight: 800; color: #ffffff; letter-spacing: 1px; text-transform: uppercase;" translate="no">⚠ ${text}</p>
            </td>
          </tr>`;
};

export const generateCountdownBlock = ({ countdownEnd = '2026-11-30T23:59', countdownLabel = 'NUR NOCH', paddingTop = 0 } = {}) => {
  const end = new Date(countdownEnd);
  if (isNaN(end.getTime())) return '';
  const diff = Math.max(0, end.getTime() - Date.now());
  const expired = diff === 0;
  const units = [
    [Math.floor(diff / 86400000), 'TAGE'],
    [Math.floor((diff % 86400000) / 3600000), 'STUNDEN'],
    [Math.floor((diff % 3600000) / 60000), 'MINUTEN']
  ];
  const tiles = units.map(([value, label]) => `
                        <td align="center" style="padding: 0 6px;">
                          <table role="presentation" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center" width="84" style="width: 84px; padding: 14px 0 10px 0; background-color: #121212; border: 1px solid #bd1f25; border-radius: 10px;">
                                <p style="margin: 0; font-size: 34px; font-weight: 900; color: #ffffff; line-height: 1; font-family: 'Courier New', Courier, monospace;">${pad(value)}</p>
                                <p style="margin: 6px 0 0 0; font-size: 10px; font-weight: 700; color: #bd1f25; letter-spacing: 2px;" translate="no">${label}</p>
                              </td>
                            </tr>
                          </table>
                        </td>`).join('');

  return `
          <!-- Countdown -->
          <tr>
            <td style="background-color: #171717; padding: ${paddingTop}px 40px 25px 40px;" data-countdown="true">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #1a1a1a; border: 1px dashed #333333; border-radius: 12px;">
                <tr>
                  <td align="center" style="padding: 22px 15px;">
                    <p style="margin: 0 0 14px 0; font-size: 12px; font-weight: 700; color: #888888; letter-spacing: 3px;" translate="no">
                      ${expired ? 'AKTION BEENDET' : `⏰ ${countdownLabel}`}
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>${tiles}
                      </tr>
                    </table>
                    <p style="margin: 14px 0 0 0; font-size: 13px; color: #a0a0a0;">
                      Aktion endet am <span style="color: #bd1f25; font-weight: 600;">${formatEnd(end)}</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
};
