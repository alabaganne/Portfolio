"use client";

import { useEffect, useRef, useState } from "react";


function MusicButton({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 shadow-lg transition-all cursor-pointer hover:scale-105 mx-auto ${
        isPlaying
          ? "bg-pink-500/20 border-pink-400 shadow-pink-400/20"
          : "bg-white/20 border-pink-300 shadow-pink-300/30 animate-pulse"
      }`}
    >
      <span className="text-2xl">{isPlaying ? "🎵" : "🔇"}</span>
      <span className="text-white font-semibold">
        {isPlaying ? "Playing..." : "Play song"}
      </span>
    </button>
  );
}

const letters = {
  sad: {
    title: "Open when you’re sad",
    emoji: "🤍",
    message:
      "My love, if today feels heavy, remember this: you are never alone. I’m always with you in every quiet breath, every heartbeat, every little step forward. You are stronger than this moment, and I’m so proud of you. Come to me, and I’ll hold you until the world feels soft again.",
  },
  miss: {
    title: "Open when you miss me",
    emoji: "💌",
    message:
      "If you miss me right now, close your eyes and imagine my hand in yours. I miss you too, always. Every day with you is my favorite memory, and every day ahead is my favorite dream. Distance is just space, never a gap in my heart. You are my home.",
  },
  sleep: {
    title: "Open when you can’t sleep",
    emoji: "🌙",
    message:
      "Hey birthday girl, breathe slowly with me. In... and out... You did enough today, and you are enough exactly as you are. Let your mind rest—I’ll keep your heart safe tonight. Sleep gently, my love. Tomorrow is waiting to smile at you again.",
  },
};

function NotificationCard({ onOpen }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-4">
      <style>{eyaStyles}</style>
      <div className="relative z-10 max-w-md w-full eya-fade-in">
        <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/30 shadow-[0_0_80px_rgba(255,255,255,0.2)] text-center">
          <div className="text-7xl md:text-8xl mb-4 eya-bounce">🎂</div>
          <p className="text-pink-200 text-sm uppercase tracking-[0.2em] mb-2 font-semibold">
            Birthday Message
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            For Eya 💖
          </h1>
          <p className="text-white/80 text-lg mb-8">
            A little surprise from Ala is waiting for you...
          </p>
          <button
            onClick={onOpen}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-xl hover:from-pink-400 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] transition-all cursor-pointer border border-white/20"
          >
            Open 🎉
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EyaPage() {
  const audioRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;
  }, []);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      // playback failed
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // playback failed
      }
    }
  };

  const handleOpen = async () => {
    await playMusic();
    setOpened(true);
  };

  return (
    <>
      <audio ref={audioRef} src="/happy-birthday.mp3" loop preload="auto" />
      {!opened ? (
        <NotificationCard onOpen={handleOpen} />
      ) : (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-4 py-12">
      <style>{eyaStyles}</style>

      <div className="max-w-2xl mx-auto eya-fade-in">
        <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/30 shadow-[0_0_80px_rgba(255,255,255,0.15)]">
          <div className="mb-6">
            <MusicButton isPlaying={isPlaying} onToggle={toggleMusic} />
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl md:text-7xl mb-4 eya-bounce">🎉</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white eya-glow mb-3">
              Happy Birthday Eya!
            </h1>
            <p className="text-white/85 text-lg md:text-xl leading-relaxed">
              My love, thank you for the best 2 years of my life. Thank you for
              teaching me about love. You make every day brighter, softer, and
              more beautiful.
            </p>
            <p className="text-pink-100 text-xl mt-4">With love, Ala 💖</p>
          </div>

          <div className="pt-6 border-t border-white/25">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
              Open When Letters 💌
            </h2>

            <div className="grid gap-3">
              <button
                onClick={() => setActiveLetter("sad")}
                className="w-full text-left px-5 py-4 rounded-2xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors cursor-pointer border border-white/30"
              >
                Open when you’re sad
              </button>
              <button
                onClick={() => setActiveLetter("miss")}
                className="w-full text-left px-5 py-4 rounded-2xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors cursor-pointer border border-white/30"
              >
                Open when you miss me
              </button>
              <button
                onClick={() => setActiveLetter("sleep")}
                className="w-full text-left px-5 py-4 rounded-2xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors cursor-pointer border border-white/30"
              >
                Open when you can’t sleep
              </button>
            </div>

            {activeLetter && (
              <div className="mt-6 rounded-2xl bg-white/20 border border-white/30 p-6 eya-letter-in">
                <p className="text-3xl mb-2">{letters[activeLetter].emoji}</p>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {letters[activeLetter].title}
                </h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  {letters[activeLetter].message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
        </div>
      )}
    </>
  );
}

const eyaStyles = `
  @keyframes eya-fade-in {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes eya-bounce {
    0%, 100% { transform: scale(1) rotate(-3deg); }
    25% { transform: scale(1.1) rotate(3deg); }
    50% { transform: scale(1) rotate(-3deg); }
    75% { transform: scale(1.05) rotate(2deg); }
  }

  @keyframes eya-glow {
    0%, 100% { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
    50% { text-shadow: 0 0 40px rgba(255,255,255,0.8), 0 0 60px rgba(236,72,153,0.5); }
  }

  @keyframes eya-letter-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .eya-fade-in {
    animation: eya-fade-in 0.8s ease-out;
  }

  .eya-bounce {
    animation: eya-bounce 2s ease-in-out infinite;
  }

  .eya-glow {
    animation: eya-glow 3s ease-in-out infinite;
  }

  .eya-letter-in {
    animation: eya-letter-in 0.3s ease-out;
  }
`;
