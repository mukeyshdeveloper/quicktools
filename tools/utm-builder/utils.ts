export interface UtmParams {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

export function buildUtmLink(params: UtmParams): string {
  if (!params.url) return '';

  let baseUrl = params.url;
  // Ensure basic URL structure if missing
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = 'https://' + baseUrl;
  }

  try {
    const urlObj = new URL(baseUrl);

    if (params.source) urlObj.searchParams.set('utm_source', params.source);
    if (params.medium) urlObj.searchParams.set('utm_medium', params.medium);
    if (params.campaign) urlObj.searchParams.set('utm_campaign', params.campaign);
    if (params.term) urlObj.searchParams.set('utm_term', params.term);
    if (params.content) urlObj.searchParams.set('utm_content', params.content);

    return urlObj.toString();
  } catch (e) {
    // If URL is wildly invalid, return empty or fallback
    return '';
  }
}
