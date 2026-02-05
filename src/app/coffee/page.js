"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  createContext,
  useContext,
  Suspense,
} from "react";
import { useSearchParams } from "next/navigation";
import { resolveNameParam } from "@/lib/utils";

const MusicContext = createContext(null);

function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;
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
      <audio ref={audioRef} src="/clair-de-lune.mp3" loop preload="auto" />
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
          ? "bg-orange-100 border-orange-400 shadow-orange-200/50"
          : "bg-orange-50 border-orange-300 shadow-orange-200/30 animate-pulse"
      }`}
    >
      <span className="text-2xl">{isPlaying ? "🎵" : "🔇"}</span>
      <span className="text-orange-700 font-semibold">
        {isPlaying ? "Playing..." : "Play song"}
      </span>
    </button>
  );
}

function CoffeeDecoration() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Floating coffee cups and beans */}
      <div className="absolute inset-0">
        {["☕", "🫘", "☕", "🫘", "☕", "🍪", "🫘", "☕", "🧁", "🫘", "☕", "🥐"].map((emoji, i) => (
          <div
            key={`float-${i}`}
            className="absolute text-3xl md:text-4xl opacity-20 coffee-float"
            style={{
              left: `${5 + (i * 8) % 90}%`,
              top: `${5 + (i * 9) % 90}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${6 + (i % 4)}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
      {/* Rising steam */}
      <div className="absolute inset-0">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={`steam-${i}`}
            className="absolute steam-rise"
            style={{
              left: `${10 + i * 9}%`,
              bottom: "0",
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          >
            <div className="w-4 h-16 bg-gradient-to-t from-orange-200/30 to-transparent rounded-full blur-sm" />
          </div>
        ))}
      </div>
      {/* Coffee ring stains */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full border-4 border-orange-300/10 coffee-ring"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i * 17) % 60}%`,
              width: `${60 + i * 10}px`,
              height: `${60 + i * 10}px`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ onOpenMessage, name }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-4">
      <style>{coffeeStyles}</style>
      <CoffeeDecoration />
      <div className="relative z-10 max-w-md w-full coffee-fade-in">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-orange-200 shadow-[0_20px_60px_rgba(251,146,60,0.2)]">
          {/* Coffee cup icon */}
          <div className="text-center mb-6">
            <div className="text-7xl mb-4 coffee-pulse">☕</div>
          </div>

          {/* Notification text */}
          <div className="text-center mb-8">
            <p className="text-orange-500 text-sm uppercase tracking-[0.2em] mb-2 font-semibold">
              You have received
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-orange-900 mb-3">
              A Coffee Date Invite{name ? `, ${name}` : ""}!
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mb-4 rounded-full" />
            <p className="text-orange-700 text-lg">
              Ala wants to explore cafes with you... 🧡
            </p>
          </div>

          {/* Open button */}
          <div className="text-center">
            <button
              onClick={onOpenMessage}
              className="px-8 py-4 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full font-bold text-xl hover:from-orange-500 hover:to-amber-600 hover:scale-105 hover:shadow-[0_10px_40px_rgba(251,146,60,0.4)] transition-all cursor-pointer"
            >
              Open Invite ☕
            </button>
          </div>

          {/* Subtle footer */}
          <p className="text-center text-orange-400 text-sm mt-6 italic">
            A warm adventure awaits...
          </p>
        </div>
      </div>
    </div>
  );
}

function CoffeePageContent() {
  const searchParams = useSearchParams();
  const name = resolveNameParam(searchParams);

  const [showMessage, setShowMessage] = useState(false);
  const [answered, setAnswered] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const escapeCountRef = useRef(0);
  const noBtnRef = useRef(null);
  const containerRef = useRef(null);
  const { playMusic } = useContext(MusicContext);

  const handleOpenMessage = () => {
    playMusic();
    setShowMessage(true);
  };

  const submitAnswer = useCallback(
    async (answer) => {
      setAnswered(answer);
      if (submitted) return;
      try {
        await fetch("/api/coffee/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name || "Anonymous", answer }),
        });
        setSubmitted(true);
      } catch {
        // silently fail
      }
    },
    [name, submitted]
  );

  const moveNoButton = useCallback(() => {
    if (escapeCountRef.current >= 3) return;
    escapeCountRef.current += 1;

    const btn = noBtnRef.current;
    if (!btn) return;

    const btnRect = btn.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 20;

    const maxX = Math.max(viewportWidth - btnRect.width - padding, padding);
    const maxY = Math.max(viewportHeight - btnRect.height - padding, padding);

    const randomX = Math.floor(Math.random() * (maxX - padding)) + padding;
    const randomY = Math.floor(Math.random() * (maxY - padding)) + padding;

    btn.style.position = "fixed";
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
  }, []);

  const displayName = name || "you";

  // Show notification card first
  if (!showMessage) {
    return <NotificationCard onOpenMessage={handleOpenMessage} name={name} />;
  }

  if (answered === "yes") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-4">
        <style>{coffeeStyles}</style>
        <CoffeeDecoration />
        <div className="relative z-10 max-w-lg w-full text-center coffee-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 border border-orange-200 shadow-[0_20px_60px_rgba(251,146,60,0.25)]">
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>
            <div className="text-8xl mb-6 coffee-pulse">🥰</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-900 mb-4">
              Yaaay!
            </h1>
            <p className="text-orange-700 text-xl md:text-2xl leading-relaxed mb-4">
              I knew you&apos;d say yes{name ? `, ${name}` : ""}!
            </p>
            <p className="text-orange-500 text-xl md:text-2xl font-bold">
              Can&apos;t wait to try all the lattes with you! ☕🧡
            </p>
            <div className="mt-6 w-16 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto rounded-full" />
            <p className="text-orange-400 text-lg mt-4 italic">
              First round&apos;s on me...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (answered === "no") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-4">
        <style>{coffeeStyles}</style>
        <CoffeeDecoration />
        <div className="relative z-10 max-w-lg w-full text-center coffee-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 border border-orange-200 shadow-[0_20px_60px_rgba(251,146,60,0.2)]">
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>
            <div className="text-8xl mb-6">🤨</div>
            <h1 className="text-4xl font-extrabold text-orange-900 mb-4">
              Wrong Answer!
            </h1>
            <p className="text-orange-700 text-xl leading-relaxed mb-4">
              That button wasn&apos;t even supposed to work
              {name ? `, ${name}` : ""}... nice try though 😏
            </p>
            <button
              onClick={() => {
                setAnswered(null);
                escapeCountRef.current = 0;
              }}
              className="mt-6 px-10 py-4 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full font-bold text-xl hover:from-orange-500 hover:to-amber-600 transition-all cursor-pointer"
            >
              Try Again ☕
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100"
    >
      <style>{coffeeStyles}</style>
      <CoffeeDecoration />

      {/* Main content */}
      <div className="z-10 flex items-center justify-center min-h-screen p-4 py-12">
        <div className="max-w-xl w-full coffee-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-orange-200 shadow-[0_20px_60px_rgba(251,146,60,0.15)]">
            {/* Music Button */}
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">☕</div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-orange-900 mb-2">
                Hey {displayName}!
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto rounded-full" />
            </div>

            {/* Coffee invitation */}
            <div className="space-y-5 text-orange-700 text-lg md:text-xl leading-relaxed text-center">
              <p>
                I&apos;ve been thinking...
              </p>
              <p className="text-xl md:text-2xl text-orange-900 font-bold">
                Would you like to go on a
              </p>
              <div className="py-4">
                <div className="inline-block bg-gradient-to-r from-orange-400 to-amber-500 text-white px-6 py-4 rounded-2xl transform rotate-1 shadow-lg">
                  <span className="text-2xl md:text-3xl font-extrabold">
                    Coffee Shop Adventure
                  </span>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-orange-900 font-bold">
                with me? 🧡
              </p>
              <div className="pt-2 pb-4">
                <p className="text-orange-500 text-base md:text-lg italic">
                  Let&apos;s hop between cafes and find our favorite spot together ✨
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-orange-200 rounded-full" />
              <span className="text-orange-400 text-2xl">🫘</span>
              <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-orange-200 rounded-full" />
            </div>

            {/* Buttons */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => submitAnswer("yes")}
                  className="px-10 py-4 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full font-bold text-2xl hover:from-orange-500 hover:to-amber-600 hover:scale-110 hover:shadow-[0_10px_30px_rgba(251,146,60,0.4)] transition-all cursor-pointer z-10"
                >
                  Yes! 🥰
                </button>
                <button
                  ref={noBtnRef}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={() => submitAnswer("no")}
                  className="px-10 py-4 bg-orange-100 text-orange-400 rounded-full font-bold text-2xl border-2 border-orange-200 hover:border-orange-300 transition-all cursor-pointer z-50 shrink-0 whitespace-nowrap"
                >
                  No 😐
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoffeePage() {
  return (
    <MusicProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-orange-50">
            <div className="text-orange-500 font-semibold">Loading...</div>
          </div>
        }
      >
        <CoffeePageContent />
      </Suspense>
    </MusicProvider>
  );
}

const coffeeStyles = `
  @keyframes coffee-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes coffee-pulse {
    0%, 100% { transform: scale(1) rotate(-2deg); }
    50% { transform: scale(1.1) rotate(2deg); }
  }

  @keyframes coffee-float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(10deg); }
    66% { transform: translateY(-10px) rotate(-5deg); }
  }

  @keyframes steam-rise {
    0% {
      opacity: 0.4;
      transform: translateY(0) scaleY(1);
    }
    50% {
      opacity: 0.2;
      transform: translateY(-100px) scaleY(1.5) scaleX(1.2);
    }
    100% {
      opacity: 0;
      transform: translateY(-200px) scaleY(2) scaleX(0.5);
    }
  }

  @keyframes coffee-ring {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.15; transform: scale(1.05); }
  }

  .coffee-fade-in {
    animation: coffee-fade-in 1s ease-out;
  }

  .coffee-pulse {
    animation: coffee-pulse 2s ease-in-out infinite;
  }

  .coffee-float {
    animation: coffee-float 6s ease-in-out infinite;
  }

  .steam-rise {
    animation: steam-rise 4s ease-out infinite;
  }

  .coffee-ring {
    animation: coffee-ring 4s ease-in-out infinite;
  }
`;
