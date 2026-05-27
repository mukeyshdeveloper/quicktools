export type QrContentType =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'vcard';

export type QrErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

export interface QrContentForm {
  type: QrContentType;
  text: string;
  url: string;
  emailAddress: string;
  emailSubject: string;
  emailBody: string;
  phone: string;
  smsNumber: string;
  smsMessage: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: WifiEncryption;
  wifiHidden: boolean;
  vcardName: string;
  vcardCompany: string;
  vcardTitle: string;
  vcardPhone: string;
  vcardEmail: string;
  vcardWebsite: string;
}

export interface QrStyleOptions {
  size: number;
  margin: number;
  errorCorrectionLevel: QrErrorCorrectionLevel;
  foregroundColor: string;
  backgroundColor: string;
}

export const defaultQrContent: QrContentForm = {
  type: 'url',
  text: 'QuickUtils makes everyday web tools fast and free.',
  url: 'https://quickutils.in',
  emailAddress: '',
  emailSubject: '',
  emailBody: '',
  phone: '',
  smsNumber: '',
  smsMessage: '',
  wifiSsid: '',
  wifiPassword: '',
  wifiEncryption: 'WPA',
  wifiHidden: false,
  vcardName: '',
  vcardCompany: '',
  vcardTitle: '',
  vcardPhone: '',
  vcardEmail: '',
  vcardWebsite: '',
};

export const defaultQrStyle: QrStyleOptions = {
  size: 320,
  margin: 2,
  errorCorrectionLevel: 'M',
  foregroundColor: '#1a1917',
  backgroundColor: '#ffffff',
};

function escapeWifiValue(value: string): string {
  return value.replace(/([\\;,":])/g, '\\$1');
}

function encodeMailtoField(value: string): string {
  return encodeURIComponent(value.trim()).replace(/%20/g, '+');
}

function normalizeUrl(value: string): string {
  const trimmedValue: string = value.trim();

  if (!trimmedValue) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmedValue)) return trimmedValue;

  return `https://${trimmedValue}`;
}

function buildVCard(form: QrContentForm): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${form.vcardName.trim()}`,
  ];

  if (form.vcardCompany.trim()) lines.push(`ORG:${form.vcardCompany.trim()}`);
  if (form.vcardTitle.trim()) lines.push(`TITLE:${form.vcardTitle.trim()}`);
  if (form.vcardPhone.trim()) lines.push(`TEL:${form.vcardPhone.trim()}`);
  if (form.vcardEmail.trim()) lines.push(`EMAIL:${form.vcardEmail.trim()}`);
  if (form.vcardWebsite.trim()) lines.push(`URL:${normalizeUrl(form.vcardWebsite)}`);

  lines.push('END:VCARD');

  return lines.join('\n');
}

export function buildQrPayload(form: QrContentForm): string {
  switch (form.type) {
    case 'url':
      return normalizeUrl(form.url);
    case 'text':
      return form.text.trim();
    case 'email': {
      const address: string = form.emailAddress.trim();
      const queryParts: string[] = [];

      if (form.emailSubject.trim()) {
        queryParts.push(`subject=${encodeMailtoField(form.emailSubject)}`);
      }
      if (form.emailBody.trim()) {
        queryParts.push(`body=${encodeMailtoField(form.emailBody)}`);
      }

      return `mailto:${address}${queryParts.length > 0 ? `?${queryParts.join('&')}` : ''}`;
    }
    case 'phone':
      return `tel:${form.phone.trim()}`;
    case 'sms':
      return `SMSTO:${form.smsNumber.trim()}:${form.smsMessage.trim()}`;
    case 'wifi':
      return [
        'WIFI:',
        `T:${form.wifiEncryption};`,
        `S:${escapeWifiValue(form.wifiSsid.trim())};`,
        form.wifiEncryption === 'nopass'
          ? ''
          : `P:${escapeWifiValue(form.wifiPassword)};`,
        form.wifiHidden ? 'H:true;' : '',
        ';',
      ].join('');
    case 'vcard':
      return buildVCard(form);
  }
}

export function getQrPayloadError(form: QrContentForm): string | null {
  switch (form.type) {
    case 'url':
      return normalizeUrl(form.url) ? null : 'Enter a URL to generate a QR code.';
    case 'text':
      return form.text.trim() ? null : 'Enter text to generate a QR code.';
    case 'email':
      return form.emailAddress.trim()
        ? null
        : 'Enter an email address to generate a QR code.';
    case 'phone':
      return form.phone.trim() ? null : 'Enter a phone number to generate a QR code.';
    case 'sms':
      return form.smsNumber.trim()
        ? null
        : 'Enter a phone number for the SMS QR code.';
    case 'wifi':
      return form.wifiSsid.trim()
        ? null
        : 'Enter a Wi-Fi network name to generate a QR code.';
    case 'vcard':
      return form.vcardName.trim()
        ? null
        : 'Enter a contact name to generate a vCard QR code.';
  }
}

export function getQrFileName(form: QrContentForm, extension: 'png' | 'svg'): string {
  const labelByType: Record<QrContentType, string> = {
    url: 'url',
    text: 'text',
    email: 'email',
    phone: 'phone',
    sms: 'sms',
    wifi: 'wifi',
    vcard: 'vcard',
  };

  return `quickutils-${labelByType[form.type]}-qr-code.${extension}`;
}
