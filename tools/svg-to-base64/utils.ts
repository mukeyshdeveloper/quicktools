export interface SvgConversion {
  base64DataUri: string;
  urlEncodedDataUri: string;
  cssBase64: string;
  cssUrlEncoded: string;
  htmlImg: string;
  isValid: boolean;
}

function minifySvg(svg: string): string {
  // A basic cleanup to remove newlines, tabs, and multiple spaces
  return svg
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

function encodeSvgForUrl(svg: string): string {
  // Optimal encoding for SVG data URIs (smaller than base64 and gzip-friendly)
  // Replaces %, <, >, #, {, }, |, \, ^, ~, [, ], `, and "
  return svg
    .replace(/%/g, '%25')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/\|/g, '%7C')
    .replace(/\\/g, '%5C')
    .replace(/\^/g, '%5E')
    .replace(/~/g, '%7E')
    .replace(/\[/g, '%5B')
    .replace(/\]/g, '%5D')
    .replace(/`/g, '%60')
    .replace(/"/g, "'") // Convert double quotes to single quotes for safer CSS usage
    .replace(/'/g, "%22"); // wait, actually swapping " to ' is often easier, but we must escape standard quotes. Let's do standard url encoding for quotes.
}

function optimalUrlEncode(svg: string): string {
  return svg
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E');
}

export function convertSvg(rawSvg: string): SvgConversion {
  const fallback = {
    base64DataUri: '',
    urlEncodedDataUri: '',
    cssBase64: '',
    cssUrlEncoded: '',
    htmlImg: '',
    isValid: false,
  };

  if (!rawSvg || !rawSvg.toLowerCase().includes('<svg')) {
    return fallback;
  }

  try {
    const cleanSvg = minifySvg(rawSvg);
    
    // Base64 encode
    let base64 = '';
    if (typeof window !== 'undefined') {
      base64 = window.btoa(unescape(encodeURIComponent(cleanSvg)));
    } else {
      base64 = Buffer.from(cleanSvg).toString('base64');
    }
    const base64DataUri = `data:image/svg+xml;base64,${base64}`;

    // URL Encode
    const urlEncodedDataUri = `data:image/svg+xml,${optimalUrlEncode(cleanSvg)}`;

    return {
      base64DataUri,
      urlEncodedDataUri,
      cssBase64: `background-image: url("${base64DataUri}");`,
      cssUrlEncoded: `background-image: url("${urlEncodedDataUri}");`,
      htmlImg: `<img src="${base64DataUri}" alt="SVG Image" />`,
      isValid: true,
    };
  } catch (e) {
    return fallback;
  }
}
