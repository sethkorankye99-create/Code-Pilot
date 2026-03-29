export function getYouTubeEmbedUrl(input: string) {
  if (!input) return null;

  try {
    // Handle youtu.be/<id>?...
    if (input.includes("youtu.be/")) {
      const url = new URL(input);
      const videoId = url.pathname.split("/").filter(Boolean)[0]; // first path segment
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    // Handle youtube.com/watch?v=<id>
    const url = new URL(input);
    if (url.searchParams.get("v")) {
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    // Handle youtube.com/embed/<id>
    if (url.pathname.startsWith("/embed/")) {
      const videoId = url.pathname.split("/").filter(Boolean)[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    return null;
  } catch {
    // If input isn't a valid URL
    return null;
  }
}

export function VideoEmbed({ url }: { url: string }) {
  const embedUrl = getYouTubeEmbedUrl(url);

  if (!embedUrl) return <div className="p-4 text-center text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-xl">Invalid video URL</div>;

  return (
    <iframe
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ width: "100%", aspectRatio: "16 / 9", border: 0 }}
      className="rounded-xl shadow-lg"
    />
  );
}
