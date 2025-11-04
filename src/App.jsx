import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HeroSection from './components/HeroSection.jsx';
import ProcessingSection from './components/ProcessingSection.jsx';
import ResultsGallery from './components/ResultsGallery.jsx';
import FooterSection from './components/FooterSection.jsx';

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

function generateMockClips() {
  const clips = Array.from({ length: 10 }).map((_, i) => {
    const start = Math.max(5, Math.floor(Math.random() * 300)) + i * 5;
    const duration = Math.floor(30 + Math.random() * 30);
    const end = start + duration;
    return {
      start,
      end,
      title: `Viral Highlight #${i + 1}: Engaging moment with high energy` ,
      rating: 0,
    };
  });
  return clips;
}

export default function App() {
  const [sourceUrl, setSourceUrl] = useState('');
  const [withSubtitle, setWithSubtitle] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clips, setClips] = useState([]);

  const handleSubmit = useCallback(({ url, withSubtitle: sub }) => {
    setSourceUrl(url);
    setWithSubtitle(sub);
    setIsProcessing(true);
    setClips([]);
    setProgress(0);

    // Simulated progress while backend processes
    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 12 + 5; // accelerate
      setProgress(Math.min(95, Math.floor(p)));
    }, 400);

    // Simulate completion
    setTimeout(() => {
      clearInterval(timer);
      setProgress(100);
      setClips(generateMockClips());
      setIsProcessing(false);
    }, 4200);
  }, []);

  const handleRate = (idx, stars) => {
    setClips((prev) => prev.map((c, i) => (i === idx ? { ...c, rating: stars } : c)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5e4c3] via-[#e9d6b4] to-[#d4b48c]">
      <HeroSection onSubmit={handleSubmit} />
      <ProcessingSection visible={isProcessing} progress={progress} />
      <ResultsGallery sourceUrl={sourceUrl} clips={clips} onRate={handleRate} />
      <FooterSection />
    </div>
  );
}
