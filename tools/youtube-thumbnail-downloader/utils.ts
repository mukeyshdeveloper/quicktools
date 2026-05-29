export function parseYoutubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7] && match[7].length === 11) ? match[7] : null;
}

export interface YouTubeThumbnails {
  maxres: string;
  hq: string;
  mq: string;
  default: string;
}

export function getThumbnails(videoId: string): YouTubeThumbnails {
  return {
    maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
  };
}
