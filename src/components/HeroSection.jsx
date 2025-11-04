import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Link, Sparkles } from 'lucide-react';

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

export default function HeroSection({ onSubmit }) {
  const [url, setUrl] = useState('');
  const [withSubtitle, setWithSubtitle] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!extractYouTubeId(url)) return;
    onSubmit({ url, withSubtitle });
  };

  const isValid = Boolean(extractYouTubeId(url));

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlays - don't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f5e4c3]/70 via-[#d4b48c]/60 to-[#4b2e1f]/80" />
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[2px]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 text-center text-[#2b1a12]">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-lg backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-[#4b2e1f]" />
          <span className="text-xs font-medium tracking-wide">AI short clip maker</span>
        </div>

        <h1 className="mt-6 bg-gradient-to-b from-[#4b2e1f] to-[#8a5b3a] bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl">
          Agung Clip Viral
        </h1>
        <p className="mt-3 max-w-2xl text-base text-[#4b2e1f]/80 md:text-lg">
          Cut, Discover, and Spread Your Viral Moments.
        </p>

        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-3xl rounded-2xl border border-white/40 bg-white/70 p-4 shadow-xl backdrop-blur-md"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Link className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#4b2e1f]/70" />
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube link (e.g., https://youtu.be/...)"
                className="w-full rounded-xl border border-[#d4b48c]/50 bg-white/80 py-3 pl-10 pr-4 text-sm outline-none ring-0 placeholder:text-[#4b2e1f]/50 focus:border-[#8a5b3a] focus:bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#d4b48c] to-[#8a5b3a] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Rocket className="h-4 w-4 transition-transform group-hover:translate-y-[-1px]" />
              Create Clip Now
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#8a5b3a]"
                checked={withSubtitle}
                onChange={(e) => setWithSubtitle(e.target.checked)}
              />
              <span className="text-[#4b2e1f]/80">With Subtitle</span>
            </label>
            <span className="text-xs text-[#4b2e1f]/60">Generates 10 viral clips • 30–60 seconds each</span>
          </div>
        </form>
      </div>
    </section>
  );
}
