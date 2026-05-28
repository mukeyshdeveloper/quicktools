export interface QueryParam {
  key: string;
  value: string;
}

export interface ParsedUrlDetails {
  protocol: string;
  host: string;
  pathname: string;
  searchParams: QueryParam[];
  hash: string;
  isValid: boolean;
}

export function urlEncode(text: string, encodeAll = true): string {
  try {
    return encodeAll ? encodeURIComponent(text) : encodeURI(text);
  } catch (e) {
    return text;
  }
}

export function urlDecode(text: string, decodePlusAsSpace = true): string {
  try {
    const target = decodePlusAsSpace ? text.replace(/\+/g, '%20') : text;
    return decodeURIComponent(target);
  } catch (e) {
    return text;
  }
}

export function parseUrlDetails(urlStr: string): ParsedUrlDetails {
  const fallback: ParsedUrlDetails = {
    protocol: '',
    host: '',
    pathname: '',
    searchParams: [],
    hash: '',
    isValid: false,
  };

  if (!urlStr.trim()) return fallback;

  try {
    // Add protocol if missing to make URL constructor happy
    let workingUrl = urlStr.trim();
    if (!/^https?:\/\//i.test(workingUrl) && !/^mailto:/i.test(workingUrl) && !/^ftp:/i.test(workingUrl)) {
      workingUrl = 'https://' + workingUrl;
    }

    const url = new URL(workingUrl);
    const searchParams: QueryParam[] = [];
    url.searchParams.forEach((value, key) => {
      searchParams.push({ key, value });
    });

    return {
      protocol: url.protocol,
      host: url.host,
      pathname: url.pathname,
      searchParams,
      hash: url.hash,
      isValid: true,
    };
  } catch (e) {
    // Check if it's just a query string like ?a=1&b=2
    if (urlStr.trim().startsWith('?') || urlStr.includes('=')) {
      try {
        const params = new URLSearchParams(urlStr.trim());
        const searchParams: QueryParam[] = [];
        params.forEach((value, key) => {
          searchParams.push({ key, value });
        });
        if (searchParams.length > 0) {
          return {
            protocol: '',
            host: '',
            pathname: '',
            searchParams,
            hash: '',
            isValid: true,
          };
        }
      } catch (_) {}
    }
    return fallback;
  }
}

export function rebuildUrl(details: Omit<ParsedUrlDetails, 'isValid'>): string {
  try {
    if (!details.host && details.searchParams.length > 0 && !details.protocol) {
      // Just rebuild the query string
      const params = new URLSearchParams();
      details.searchParams.forEach(p => {
        if (p.key.trim()) params.append(p.key, p.value);
      });
      const qs = params.toString();
      return qs ? '?' + qs : '';
    }

    const protocol = details.protocol || 'https:';
    const cleanProtocol = protocol.endsWith(':') ? protocol : protocol + ':';
    
    let base = `${cleanProtocol}//${details.host}`;
    if (details.pathname) {
      const path = details.pathname.startsWith('/') ? details.pathname : '/' + details.pathname;
      base += path;
    }

    const url = new URL(base);
    details.searchParams.forEach(p => {
      if (p.key.trim()) url.searchParams.append(p.key, p.value);
    });

    if (details.hash) {
      url.hash = details.hash.startsWith('#') ? details.hash : '#' + details.hash;
    }

    return url.toString();
  } catch (e) {
    return '';
  }
}
