import React from 'react';
import { Share2 } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="mt-20 border-t border-[#d4b48c]/40 bg-gradient-to-b from-white to-[#f5e4c3]/50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[#4b2e1f]">
          <a href="#" className="rounded-full border border-[#d4b48c]/50 px-3 py-1 hover:bg-white">AI short clip maker</a>
          <a href="#" className="rounded-full border border-[#d4b48c]/50 px-3 py-1 hover:bg-white">Opus Clip clone</a>
          <a href="#" className="rounded-full border border-[#d4b48c]/50 px-3 py-1 hover:bg-white">video viral maker</a>
          <a href="#" className="rounded-full border border-[#d4b48c]/50 px-3 py-1 hover:bg-white">Agung Clip Viral</a>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#4b2e1f]/70">
          <Share2 className="h-4 w-4" />
          Share with friends to help others go viral
        </div>
        <p className="text-xs text-[#4b2e1f]/60">Copyright © 2025 Agung Clip Viral</p>
      </div>
    </footer>
  );
}
