declare module 'qrcode' {
  export type QRCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

  export interface QRCodeRenderersOptions {
    errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
    margin?: number;
    scale?: number;
    type?: 'image/png' | 'svg' | 'utf8';
    width?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }

  export function toDataURL(
    text: string,
    options?: QRCodeRenderersOptions,
  ): Promise<string>;

  export function toString(
    text: string,
    options?: QRCodeRenderersOptions,
  ): Promise<string>;

  const QRCode: {
    toDataURL: typeof toDataURL;
    toString: typeof toString;
  };

  export default QRCode;
}
