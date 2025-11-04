import React from 'react';
import { Loader2 } from 'lucide-react';

export default function ProcessingSection({ visible, progress }) {
  if (!visible) return null;
  return (
    <section className="relative mx-auto my-12 w-full max-w-4xl rounded-2xl border border-[#d4b48c]/40 bg-gradient-to-b from-white/80 to-white/60 p-8 text-center shadow-xl backdrop-blur-md">
      <div className="mx-auto mb-4 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-[#d4b48c]/30">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#d4b48c] to-[#8a5b3a] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mx-auto flex max-w-md flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#8a5b3a]" />
        <h3 className="text-lg font-semibold text-[#4b2e1f]">Analyzing your video for viral moments...</h3>
        <p className="text-sm text-[#4b2e1f]/70">This may take a minute. We’re detecting highlights, pace and speech cues.</p>
      </div>
    </section>
  );
}
