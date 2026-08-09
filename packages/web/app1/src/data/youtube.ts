export interface YouTubeVideo {
  slug: string;
  videoId: string;
  watchUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
}

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@blankpane";
export const YOUTUBE_PLAYLIST = "https://www.youtube.com/playlist?list=PLdD5GB_2pClc";

const ids: Record<string, string> = {
  "white-screen": "gOJhbS_LhrM",
  "black-screen": "uKxlXodGgVk",
  "green-screen": "3IoSremub3w",
  "zoom-background-screen": "IB-26SHvzME",
  "yellow-screen": "tU-aHhKT8-I",
  "gray-screen": "tPOPPR58skY",
  "blue-screen": "6DnxAgMh2Pg",
  "red-screen": "bGpDgnVqYdE",
  "pink-screen": "Y48nBveYgDA",
  "purple-screen": "QEoiOxf8JuY",
  "orange-screen": "ej_gQko78Bc",
  "blank-screen": "-k29_wn5Qz0",
};

export const youtubeVideos: YouTubeVideo[] = Object.entries(ids).map(([slug, videoId]) => ({
  slug,
  videoId,
  watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
  embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0`,
  thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
}));

export function getYouTubeVideo(slug: string): YouTubeVideo | undefined {
  return youtubeVideos.find((v) => v.slug === slug);
}
