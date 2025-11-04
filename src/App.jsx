import React, { useCallback, useState } from 'react';
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

export default function App() {
  const [sourceUrl, setSourceUrl] = useState('');
  const [withSubtitle, setWithSubtitle] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clips, setClips] = useState([]);
  const [videoId, setVideoId] = useState('');

  const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  const handleSubmit = useCallback(async ({ url, withSubtitle: sub }) => {
    // Basic validation
    if (!extractYouTubeId(url)) {
      alert('Link YouTube tidak valid. Coba lagi.');
      return;
    }

    setSourceUrl(url);
    setWithSubtitle(sub);
    setIsProcessing(true);
    setClips([]);
    setProgress(0);

    // Simulated progress while waiting for backend
    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 10 + 7;
      setProgress(Math.min(95, Math.floor(p)));
    }, 400);

    try {
      const res = await fetch(`${backendBase}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, with_subtitle: sub, language: 'auto' })
      });

      if (!res.ok) {
        throw new Error(`Gagal memproses video (${res.status})`);
      }
      const data = await res.json();
      clearInterval(timer);
      setProgress(100);
      setClips(data.clips || []);
      setVideoId(data.video_id || extractYouTubeId(url));
    } catch (err) {
      console.error(err);
      clearInterval(timer);
      setProgress(0);
      alert('Terjadi error saat memproses. Pastikan link benar dan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  }, [backendBase]);

  const handleRate = async (idx, stars) => {
    setClips((prev) => prev.map((c, i) => (i === idx ? { ...c, rating: stars } : c)));
    try {
      await fetch(`${backendBase}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_id: videoId || extractYouTubeId(sourceUrl), index: idx, rating: stars })
      });
    } catch (e) {
      // no-op; UI already updated
    }
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
