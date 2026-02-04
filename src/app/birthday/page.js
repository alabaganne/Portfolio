"use client";

import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  Suspense,
} from "react";
import { useSearchParams } from "next/navigation";

const MusicContext = createContext(null);

function MusicProvider({ children }) {
  const audioRef = useRef(null);
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

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, playMusic }}>
      <audio ref={audioRef} src="/happy-birthday.mp3" loop preload="auto" />
      {children}
    </MusicContext.Provider>
  );
}

function MusicButton() {
  const { isPlaying, toggleMusic } = useContext(MusicContext);

  return (
    <button
      onClick={toggleMusic}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className={`flex items-center gap-2 px-5 py-3 rounded-full border-2 shadow-lg transition-all cursor-pointer hover:scale-105 ${
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

function BirthdayDecorations() {
  const balloonColors = [
    "from-pink-400 to-pink-600",
    "from-purple-400 to-purple-600",
    "from-blue-400 to-blue-600",
    "from-yellow-400 to-yellow-600",
    "from-green-400 to-green-600",
    "from-red-400 to-red-600",
    "from-cyan-400 to-cyan-600",
    "from-orange-400 to-orange-600",
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Floating balloons */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={`balloon-${i}`}
            className="absolute balloon-float"
            style={{
              left: `${5 + (i * 8) % 90}%`,
              bottom: `-10%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + (i % 4) * 2}s`,
            }}
          >
            <div
              className={`w-10 h-12 md:w-14 md:h-16 rounded-full bg-gradient-to-b ${balloonColors[i % balloonColors.length]} opacity-70 shadow-lg`}
              style={{
                borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
              }}
            />
            <div className="w-[2px] h-16 md:h-20 bg-gray-400/50 mx-auto" />
          </div>
        ))}
      </div>

      {/* Falling confetti */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }, (_, i) => {
          const colors = ["#ff6b9d", "#c44dff", "#4d9fff", "#ffde4d", "#4dff88", "#ff4d4d"];
          return (
            <div
              key={`confetti-${i}`}
              className="absolute confetti-fall"
              style={{
                left: `${(i * 2.5) % 100}%`,
                top: `-5%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${4 + (i % 3) * 2}s`,
              }}
            >
              <div
                className="w-2 h-3 md:w-3 md:h-4"
                style={{
                  backgroundColor: colors[i % colors.length],
                  transform: `rotate(${i * 30}deg)`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Floating emojis */}
      <div className="absolute inset-0">
        {["🎂", "🎈", "🎁", "✨", "🎉", "🥳", "💖", "⭐"].map((emoji, i) => (
          <div
            key={`emoji-${i}`}
            className="absolute text-3xl md:text-4xl opacity-30 emoji-float"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${10 + (i * 13) % 80}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + (i % 3)}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full sparkle"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ onOpenMessage, name }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-4">
      <style>{birthdayStyles}</style>
      <BirthdayDecorations />
      <div className="relative z-10 max-w-md w-full birthday-fade-in">
        <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/30 shadow-[0_0_80px_rgba(255,255,255,0.2)]">
          {/* Cake icon */}
          <div className="text-center mb-6">
            <div className="text-7xl md:text-8xl mb-4 birthday-bounce">🎂</div>
          </div>

          {/* Notification text */}
          <div className="text-center mb-8">
            <p className="text-pink-200 text-sm uppercase tracking-[0.2em] mb-2 font-semibold">
              Special Delivery
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {name ? `Hey ${name}!` : "Hey!"}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto mb-4 rounded-full" />
            <p className="text-white/80 text-lg">
              You have a birthday message waiting... 🎁
            </p>
          </div>

          {/* Open button */}
          <div className="text-center">
            <button
              onClick={onOpenMessage}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-xl hover:from-pink-400 hover:to-purple-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] transition-all cursor-pointer border border-white/20"
            >
              Open Message 🎉
            </button>
          </div>

          {/* Subtle footer */}
          <p className="text-center text-white/50 text-sm mt-6">
            Make a wish... ✨
          </p>
        </div>
      </div>
    </div>
  );
}

function BirthdayPageContent() {
  const searchParams = useSearchParams();
  const rawName = searchParams.get("name");
  const name = rawName
    ? rawName
        .trim()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ")
    : null;

  const [showMessage, setShowMessage] = useState(false);
  const { playMusic } = useContext(MusicContext);
  const notifiedRef = useRef(false);

  useEffect(() => {
    if (notifiedRef.current) return;
    notifiedRef.current = true;

    fetch("/api/birthday/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name || null }),
    }).catch(() => {
      // silently fail
    });
  }, [name]);

  const handleOpenMessage = () => {
    playMusic();
    setShowMessage(true);
  };

  const displayName = name || "you";

  // Show notification card first
  if (!showMessage) {
    return <NotificationCard onOpenMessage={handleOpenMessage} name={name} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
      <style>{birthdayStyles}</style>
      <BirthdayDecorations />

      {/* Main content */}
      <div className="z-10 flex items-center justify-center min-h-screen p-4 py-12">
        <div className="max-w-xl w-full birthday-fade-in">
          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/30 shadow-[0_0_80px_rgba(255,255,255,0.15)]">
            {/* Music Button */}
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl md:text-7xl mb-4 birthday-bounce">🎂</div>
              <div className="flex justify-center gap-2 text-4xl mb-4">
                <span className="balloon-small" style={{ animationDelay: "0s" }}>🎈</span>
                <span className="balloon-small" style={{ animationDelay: "0.2s" }}>🎈</span>
                <span className="balloon-small" style={{ animationDelay: "0.4s" }}>🎈</span>
              </div>
            </div>

            {/* Birthday message */}
            <div className="space-y-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white birthday-glow">
                Happy Birthday{name ? `, ${name}` : ""}! 🎉
              </h1>

              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto rounded-full" />

              <div className="space-y-4 text-white/90 text-lg md:text-xl leading-relaxed">
                <p>
                  Wishing you the most amazing day filled with joy, laughter, and all the cake you can eat! 🍰
                </p>
                <p>
                  May this year bring you endless happiness and all your dreams come true ✨
                </p>
              </div>

              {/* Divider with party emojis */}
              <div className="flex items-center justify-center gap-4 py-4">
                <span className="text-2xl">🎁</span>
                <span className="text-2xl">🎊</span>
                <span className="text-2xl">🥳</span>
                <span className="text-2xl">🎊</span>
                <span className="text-2xl">🎁</span>
              </div>

              {/* Signature */}
              <div className="pt-4">
                <p className="text-white/70 text-base">With love,</p>
                <p className="text-2xl md:text-3xl font-bold text-white mt-2">
                  Ala 💖
                </p>
              </div>

              {/* Extra wishes */}
              <div className="pt-6 mt-6 border-t border-white/20">
                <p className="text-pink-200 text-lg italic">
                  &ldquo;Here&apos;s to another year of being awesome!&rdquo; 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BirthdayPage() {
  return (
    <MusicProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
            <div className="text-white font-semibold">Loading...</div>
          </div>
        }
      >
        <BirthdayPageContent />
      </Suspense>
    </MusicProvider>
  );
}

const birthdayStyles = `
  @keyframes birthday-fade-in {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes birthday-bounce {
    0%, 100% { transform: scale(1) rotate(-3deg); }
    25% { transform: scale(1.1) rotate(3deg); }
    50% { transform: scale(1) rotate(-3deg); }
    75% { transform: scale(1.05) rotate(2deg); }
  }

  @keyframes balloon-float {
    0% {
      transform: translateY(100vh) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.7;
    }
    90% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(-100vh) rotate(20deg);
      opacity: 0;
    }
  }

  @keyframes balloon-small {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }

  @keyframes confetti-fall {
    0% {
      transform: translateY(-10px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }

  @keyframes emoji-float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    33% { transform: translateY(-15px) rotate(10deg); }
    66% { transform: translateY(-8px) rotate(-5deg); }
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
  }

  @keyframes birthday-glow {
    0%, 100% { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
    50% { text-shadow: 0 0 40px rgba(255,255,255,0.8), 0 0 60px rgba(236,72,153,0.5); }
  }

  .birthday-fade-in {
    animation: birthday-fade-in 1s ease-out;
  }

  .birthday-bounce {
    animation: birthday-bounce 2s ease-in-out infinite;
  }

  .balloon-float {
    animation: balloon-float 10s linear infinite;
  }

  .balloon-small {
    animation: balloon-small 2s ease-in-out infinite;
  }

  .confetti-fall {
    animation: confetti-fall 5s linear infinite;
  }

  .emoji-float {
    animation: emoji-float 5s ease-in-out infinite;
  }

  .sparkle {
    animation: sparkle 2s ease-in-out infinite;
  }

  .birthday-glow {
    animation: birthday-glow 3s ease-in-out infinite;
  }
`;
