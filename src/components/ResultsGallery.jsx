import React, { useMemo, useState } from 'react';
import { Download, Share2, Star, Play } from 'lucide-react';

function extractYouTubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
    return '';
  } catch {
    return '';
  }
}

function timeToQuery(t) {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}m${s}s`;
}

export default function ResultsGallery({ sourceUrl, clips = [], onRate }) {
  const videoId = useMemo(() => extractYouTubeId(sourceUrl), [sourceUrl]);
  if (!clips.length) return null;

  return (
    <section className="mx-auto my-16 max-w-6xl px-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#4b2e1f]">Your Viral Clips Are Ready!</h2>
          <p className="text-sm text-[#4b2e1f]/70">Download, share, and rate the results to help improve quality.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clips.map((clip, idx) => (
          <ClipCard
            key={idx}
            idx={idx}
            videoId={videoId}
            clip={clip}
            onRate={(stars) => onRate(idx, stars)}
          />
        ))}
      </div>
    </section>
  );
}

function ClipCard({ idx, videoId, clip, onRate }) {
  const [hovered, setHovered] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const { start, end, title, rating = 0 } = clip;
  const duration = end - start;

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}&t=${timeToQuery(start)}`;

  const shareText = encodeURIComponent(`${title} — Agung Clip Viral`);
  const shareUrl = encodeURIComponent(watchUrl);

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#d4b48c]/40 bg-white/70 shadow-lg backdrop-blur-sm">
      <div
        className="relative aspect-video w-full overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={thumb} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4b2e1f]/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <a
            href={watchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#4b2e1f] shadow hover:bg-white"
          >
            <Play className="h-4 w-4" />
            Preview Segment
          </a>
        </div>
        <div className="absolute bottom-2 left-2 rounded-full bg-[#2b1a12]/80 px-2 py-1 text-xs font-semibold text-white">
          {Math.max(30, Math.min(60, duration))}s
        </div>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-[15px] font-semibold text-[#2b1a12]">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onClick={() => onRate(i + 1)}
                aria-label={`Rate ${i + 1} stars`}
                className="text-[#d4b48c] transition-transform hover:scale-110"
              >
                <Star className={i < rating ? 'h-5 w-5 fill-[#d4b48c] text-[#d4b48c]' : 'h-5 w-5'} />
              </button>
            ))}
          </div>
          <span className="text-xs text-[#4b2e1f]/60">Clip {idx + 1}</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={watchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#d4b48c]/50 bg-white/80 px-3 py-2 text-sm font-medium text-[#4b2e1f] transition hover:bg-white"
          >
            <Share2 className="h-4 w-4" />
            Share
          </a>
          <button
            onClick={() => alert('Download will be available after processing on server.')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#d4b48c] to-[#8a5b3a] px-3 py-2 text-sm font-semibold text-white shadow hover:shadow-md"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
