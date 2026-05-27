'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import ResetButton from '@/components/ui/ResetButton';
import {
  buildQrPayload,
  defaultQrContent,
  defaultQrStyle,
  getQrFileName,
  getQrPayloadError,
  type QrContentForm,
  type QrContentType,
  type QrErrorCorrectionLevel,
  type QrStyleOptions,
  type WifiEncryption,
} from './utils';

type QrStatus = 'idle' | 'ready' | 'error';

interface ContentTypeOption {
  description: string;
  icon: string;
  label: string;
  value: QrContentType;
}

const contentTypes: ContentTypeOption[] = [
  {
    description: 'Open a website',
    icon: '🔗',
    label: 'URL',
    value: 'url',
  },
  {
    description: 'Share plain text',
    icon: 'Aa',
    label: 'Text',
    value: 'text',
  },
  {
    description: 'Compose email',
    icon: '✉️',
    label: 'Email',
    value: 'email',
  },
  {
    description: 'Start a call',
    icon: '☎️',
    label: 'Phone',
    value: 'phone',
  },
  {
    description: 'Send message',
    icon: '💬',
    label: 'SMS',
    value: 'sms',
  },
  {
    description: 'Join network',
    icon: '📶',
    label: 'Wi-Fi',
    value: 'wifi',
  },
  {
    description: 'Save contact',
    icon: '👤',
    label: 'vCard',
    value: 'vcard',
  },
];
const defaultContentType: ContentTypeOption = contentTypes[0] ?? {
  description: 'Open a website',
  icon: '🔗',
  label: 'URL',
  value: 'url',
};

function getRelativeLuminance(hexColor: string): number {
  const normalizedColor: string = hexColor.replace('#', '');
  const red: number = Number.parseInt(normalizedColor.slice(0, 2), 16);
  const green: number = Number.parseInt(normalizedColor.slice(2, 4), 16);
  const blue: number = Number.parseInt(normalizedColor.slice(4, 6), 16);

  const channels: number[] = [red, green, blue].map((channel: number) => {
    const normalizedChannel: number = channel / 255;
    return normalizedChannel <= 0.03928
      ? normalizedChannel / 12.92
      : ((normalizedChannel + 0.055) / 1.055) ** 2.4;
  });

  return (
    (channels[0] ?? 0) * 0.2126 +
    (channels[1] ?? 0) * 0.7152 +
    (channels[2] ?? 0) * 0.0722
  );
}

function getContrastRatio(foregroundColor: string, backgroundColor: string): number {
  const foregroundLuminance: number = getRelativeLuminance(foregroundColor);
  const backgroundLuminance: number = getRelativeLuminance(backgroundColor);
  const lighterColor: number = Math.max(foregroundLuminance, backgroundLuminance);
  const darkerColor: number = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighterColor + 0.05) / (darkerColor + 0.05);
}

function downloadFile(content: string, filename: string, mimeType: string): void {
  const link: HTMLAnchorElement = document.createElement('a');
  link.href = content.startsWith('data:')
    ? content
    : URL.createObjectURL(new Blob([content], { type: mimeType }));
  link.download = filename;
  link.click();

  if (!content.startsWith('data:')) {
    URL.revokeObjectURL(link.href);
  }
}

export default function QrCodeGenerator(): React.ReactElement {
  const [form, setForm] = useState<QrContentForm>(defaultQrContent);
  const [style, setStyle] = useState<QrStyleOptions>(defaultQrStyle);
  const [pngDataUrl, setPngDataUrl] = useState<string>('');
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const [status, setStatus] = useState<QrStatus>('idle');
  const [message, setMessage] = useState<string>('Your QR code is ready.');
  const [copyMessage, setCopyMessage] = useState<string>('Copy PNG');

  const payload: string = useMemo(() => buildQrPayload(form), [form]);
  const payloadError: string | null = useMemo(() => getQrPayloadError(form), [form]);
  const selectedType: ContentTypeOption =
    contentTypes.find((item: ContentTypeOption) => item.value === form.type) ??
    defaultContentType;
  const contrastRatio: number = getContrastRatio(
    style.foregroundColor,
    style.backgroundColor,
  );
  const scanQualityLabel: string =
    contrastRatio >= 7 ? 'Excellent' : contrastRatio >= 4.5 ? 'Good' : 'Low';
  const scanQualityClass: string =
    contrastRatio >= 7
      ? 'scan-quality-good'
      : contrastRatio >= 4.5
        ? 'scan-quality-ok'
        : 'scan-quality-low';

  useEffect(() => {
    let isActive = true;

    async function renderQrCode(): Promise<void> {
      if (payloadError) {
        setPngDataUrl('');
        setSvgMarkup('');
        setStatus('idle');
        setMessage(payloadError);
        return;
      }

      try {
        const options = {
          errorCorrectionLevel: style.errorCorrectionLevel,
          margin: style.margin,
          width: style.size,
          color: {
            dark: style.foregroundColor,
            light: style.backgroundColor,
          },
        };
        const [nextPngDataUrl, nextSvgMarkup] = await Promise.all([
          QRCode.toDataURL(payload, {
            ...options,
            type: 'image/png',
          }),
          QRCode.toString(payload, {
            ...options,
            type: 'svg',
          }),
        ]);

        if (!isActive) return;

        setPngDataUrl(nextPngDataUrl);
        setSvgMarkup(nextSvgMarkup);
        setStatus('ready');
        setMessage('Your QR code is ready.');
        setCopyMessage('Copy PNG');
      } catch {
        if (!isActive) return;

        setPngDataUrl('');
        setSvgMarkup('');
        setStatus('error');
        setMessage('This QR code is too complex. Try less content or lower error correction.');
      }
    }

    renderQrCode();

    return () => {
      isActive = false;
    };
  }, [payload, payloadError, style]);

  function updateForm<Value extends keyof QrContentForm>(
    key: Value,
    value: QrContentForm[Value],
  ): void {
    setForm((currentForm: QrContentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  }

  function updateStyle<Value extends keyof QrStyleOptions>(
    key: Value,
    value: QrStyleOptions[Value],
  ): void {
    setStyle((currentStyle: QrStyleOptions) => ({
      ...currentStyle,
      [key]: value,
    }));
  }

  async function handleCopyPng(): Promise<void> {
    if (!pngDataUrl || typeof ClipboardItem === 'undefined') {
      setCopyMessage('Download instead');
      return;
    }

    try {
      const response: Response = await fetch(pngDataUrl);
      const blob: Blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopyMessage('Copied');
    } catch {
      setCopyMessage('Copy failed');
    }
  }

  function handleReset(): void {
    setForm(defaultQrContent);
    setStyle(defaultQrStyle);
  }

  return (
    <div className="tool-panel qr-panel">
      <div className="mb-5">
        <span className="tool-pill">Custom QR code studio</span>
        <h2 className="mt-4 text-lg font-semibold tracking-tight text-text">
          Create a QR Code
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Pick the content type, tune the design, and download a clean QR code.
        </p>
      </div>

      <div className="qr-workspace">
        <div className="qr-control-stack">
          <section className="qr-section">
            <div className="qr-section-heading">
              <span>1</span>
              <div>
                <h3>Choose QR Type</h3>
                <p>Start with what the scanner should do.</p>
              </div>
            </div>
            <div className="qr-type-grid">
              {contentTypes.map((item: ContentTypeOption) => (
                <button
                  key={item.value}
                  className={`qr-type-btn ${form.type === item.value ? 'active' : ''}`}
                  type="button"
                  onClick={() => updateForm('type', item.value)}
                >
                  <span className="qr-type-icon">{item.icon}</span>
                  <span>
                    <span className="block">{item.label}</span>
                    <span className="qr-type-description">{item.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="qr-section">
            <div className="qr-section-heading">
              <span>2</span>
              <div>
                <h3>Add Details</h3>
                <p>{selectedType.description} with a QR code.</p>
              </div>
            </div>
            {renderContentFields(form, updateForm)}
          </section>

          <section className="qr-section">
            <div className="qr-section-heading">
              <span>3</span>
              <div>
                <h3>Tune Design</h3>
                <p>Keep contrast high for reliable scanning.</p>
              </div>
            </div>
            <div className="qr-options-grid">
              <div>
                <label className="tool-label" htmlFor="qr-size">
                  Size
                </label>
                <input
                  id="qr-size"
                  className="password-slider"
                  max="640"
                  min="160"
                  step="20"
                  type="range"
                  value={style.size}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    updateStyle('size', Number(event.target.value))
                  }
                />
                <p className="mt-1 text-xs text-muted">{style.size}px</p>
              </div>

              <div>
                <label className="tool-label" htmlFor="qr-margin">
                  Quiet Zone
                </label>
                <input
                  id="qr-margin"
                  className="password-slider"
                  max="8"
                  min="0"
                  type="range"
                  value={style.margin}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    updateStyle('margin', Number(event.target.value))
                  }
                />
                <p className="mt-1 text-xs text-muted">{style.margin} modules</p>
              </div>

              <div>
                <label className="tool-label" htmlFor="qr-error">
                  Error Correction
                </label>
                <select
                  id="qr-error"
                  className="tool-input"
                  value={style.errorCorrectionLevel}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    updateStyle(
                      'errorCorrectionLevel',
                      event.target.value as QrErrorCorrectionLevel,
                    )
                  }
                >
                  <option value="L">Low - 7%</option>
                  <option value="M">Medium - 15%</option>
                  <option value="Q">Quartile - 25%</option>
                  <option value="H">High - 30%</option>
                </select>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="tool-label" htmlFor="qr-foreground">
                      Foreground
                    </label>
                    <input
                      id="qr-foreground"
                      className="color-input"
                      type="color"
                      value={style.foregroundColor}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        updateStyle('foregroundColor', event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="tool-label" htmlFor="qr-background">
                      Background
                    </label>
                    <input
                      id="qr-background"
                      className="color-input"
                      type="color"
                      value={style.backgroundColor}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        updateStyle('backgroundColor', event.target.value)
                      }
                    />
                  </div>
                </div>
                <p className={`scan-quality ${scanQualityClass}`}>
                  Scan contrast: {scanQualityLabel}
                </p>
              </div>
            </div>
          </section>

          <section className="result-panel">
            <p className="result-label">Encoded Payload</p>
            <p className="break-all font-mono text-sm leading-6 text-text">
              {payload || 'No payload yet'}
            </p>
          </section>
        </div>

        <aside className="qr-preview-panel">
          <div className="qr-preview-header">
            <span className="qr-preview-badge">{selectedType.label}</span>
            <span>{style.size}px</span>
          </div>
          <div className="qr-preview-box">
            {pngDataUrl ? (
              <Image
                alt="Generated QR code preview"
                height={style.size}
                src={pngDataUrl}
                unoptimized
                width={style.size}
              />
            ) : (
              <p className="px-4 text-center text-sm leading-6 text-muted">
                {message}
              </p>
            )}
          </div>
          <div>
            <p className="result-label">Preview Status</p>
            <p className="text-lg font-semibold text-text">
              {status === 'ready'
                ? 'Scannable QR generated'
                : 'Waiting for valid content'}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">{message}</p>
          </div>
          <div className="qr-action-grid">
            <button
              className="btn-primary"
              disabled={!pngDataUrl}
              type="button"
              onClick={() =>
                downloadFile(pngDataUrl, getQrFileName(form, 'png'), 'image/png')
              }
            >
              Download PNG
            </button>
            <button
              className="btn-secondary"
              disabled={!svgMarkup}
              type="button"
              onClick={() =>
                downloadFile(svgMarkup, getQrFileName(form, 'svg'), 'image/svg+xml')
              }
            >
              Download SVG
            </button>
            <button
              className="btn-secondary"
              disabled={!pngDataUrl}
              type="button"
              onClick={handleCopyPng}
            >
              {copyMessage}
            </button>
            <ResetButton onClick={handleReset} />
          </div>
          <div className="qr-quick-tip">
            Test before printing. Dark foreground on a light background scans
            fastest.
          </div>
        </aside>
      </div>
    </div>
  );
}

function renderContentFields(
  form: QrContentForm,
  updateForm: <Value extends keyof QrContentForm>(
    key: Value,
    value: QrContentForm[Value],
  ) => void,
): React.ReactElement {
  switch (form.type) {
    case 'url':
      return (
        <div>
          <label className="tool-label" htmlFor="qr-url">
            Website URL
          </label>
          <input
            id="qr-url"
            className="tool-input"
            value={form.url}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateForm('url', event.target.value)
            }
            placeholder="https://example.com"
          />
        </div>
      );
    case 'text':
      return (
        <div>
          <label className="tool-label" htmlFor="qr-text">
            Text
          </label>
          <textarea
            id="qr-text"
            className="tool-textarea"
            value={form.text}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateForm('text', event.target.value)
            }
            placeholder="Enter any text"
            rows={5}
          />
        </div>
      );
    case 'email':
      return (
        <div className="grid gap-4">
          <div>
            <label className="tool-label" htmlFor="qr-email">
              Email Address
            </label>
            <input
              id="qr-email"
              className="tool-input"
              type="email"
              value={form.emailAddress}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateForm('emailAddress', event.target.value)
              }
              placeholder="hello@example.com"
            />
          </div>
          <div>
            <label className="tool-label" htmlFor="qr-email-subject">
              Subject
            </label>
            <input
              id="qr-email-subject"
              className="tool-input"
              value={form.emailSubject}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateForm('emailSubject', event.target.value)
              }
              placeholder="Quick question"
            />
          </div>
          <div>
            <label className="tool-label" htmlFor="qr-email-body">
              Body
            </label>
            <textarea
              id="qr-email-body"
              className="tool-textarea"
              value={form.emailBody}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateForm('emailBody', event.target.value)
              }
              placeholder="Message body"
              rows={4}
            />
          </div>
        </div>
      );
    case 'phone':
      return (
        <div>
          <label className="tool-label" htmlFor="qr-phone">
            Phone Number
          </label>
          <input
            id="qr-phone"
            className="tool-input"
            value={form.phone}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateForm('phone', event.target.value)
            }
            placeholder="+91 98765 43210"
          />
        </div>
      );
    case 'sms':
      return (
        <div className="grid gap-4">
          <div>
            <label className="tool-label" htmlFor="qr-sms-number">
              SMS Number
            </label>
            <input
              id="qr-sms-number"
              className="tool-input"
              value={form.smsNumber}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateForm('smsNumber', event.target.value)
              }
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="tool-label" htmlFor="qr-sms-message">
              Message
            </label>
            <textarea
              id="qr-sms-message"
              className="tool-textarea"
              value={form.smsMessage}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateForm('smsMessage', event.target.value)
              }
              placeholder="Type the SMS message"
              rows={4}
            />
          </div>
        </div>
      );
    case 'wifi':
      return (
        <div className="grid gap-4">
          <div>
            <label className="tool-label" htmlFor="qr-wifi-ssid">
              Network Name
            </label>
            <input
              id="qr-wifi-ssid"
              className="tool-input"
              value={form.wifiSsid}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateForm('wifiSsid', event.target.value)
              }
              placeholder="My Wi-Fi"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="tool-label" htmlFor="qr-wifi-password">
                Password
              </label>
              <input
                id="qr-wifi-password"
                className="tool-input"
                value={form.wifiPassword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  updateForm('wifiPassword', event.target.value)
                }
                placeholder="Network password"
              />
            </div>
            <div>
              <label className="tool-label" htmlFor="qr-wifi-encryption">
                Encryption
              </label>
              <select
                id="qr-wifi-encryption"
                className="tool-input"
                value={form.wifiEncryption}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  updateForm('wifiEncryption', event.target.value as WifiEncryption)
                }
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No password</option>
              </select>
            </div>
          </div>
          <label className="password-toggle" htmlFor="qr-wifi-hidden">
            <span>
              <span className="block text-sm font-semibold text-text">
                Hidden network
              </span>
              <span className="mt-0.5 block text-xs leading-5 text-muted">
                Mark the Wi-Fi network as hidden.
              </span>
            </span>
            <input
              id="qr-wifi-hidden"
              checked={form.wifiHidden}
              type="checkbox"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateForm('wifiHidden', event.target.checked)
              }
            />
          </label>
        </div>
      );
    case 'vcard':
      return (
        <div className="grid gap-4">
          <div>
            <label className="tool-label" htmlFor="qr-vcard-name">
              Full Name
            </label>
            <input
              id="qr-vcard-name"
              className="tool-input"
              value={form.vcardName}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateForm('vcardName', event.target.value)
              }
              placeholder="Aarav Sharma"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              aria-label="Company"
              className="tool-input"
              value={form.vcardCompany}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateForm('vcardCompany', event.target.value)
              }
              placeholder="Company"
            />
            <input
              aria-label="Job title"
              className="tool-input"
              value={form.vcardTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateForm('vcardTitle', event.target.value)
              }
              placeholder="Job title"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              aria-label="Contact phone"
              className="tool-input"
              value={form.vcardPhone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateForm('vcardPhone', event.target.value)
              }
              placeholder="Phone"
            />
            <input
              aria-label="Contact email"
              className="tool-input"
              type="email"
              value={form.vcardEmail}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                updateForm('vcardEmail', event.target.value)
              }
              placeholder="Email"
            />
          </div>
          <input
            aria-label="Contact website"
            className="tool-input"
            value={form.vcardWebsite}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateForm('vcardWebsite', event.target.value)
            }
            placeholder="Website"
          />
        </div>
      );
  }
}
