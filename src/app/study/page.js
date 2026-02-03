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
          ? "bg-amber-900/30 border-amber-700 shadow-amber-800/20"
          : "bg-stone-800/50 border-amber-600 shadow-amber-700/30 animate-pulse"
      }`}
    >
      <span className="text-2xl">{isPlaying ? "🎵" : "🔇"}</span>
      <span className="text-amber-200 font-semibold">
        {isPlaying ? "Playing..." : "Play song"}
      </span>
    </button>
  );
}

function BookshelfDecoration() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Left bookshelf */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-amber-950 to-transparent">
        <div className="h-full flex flex-col justify-around py-8">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={`left-book-${i}`}
              className="mx-auto book-spine"
              style={{
                width: `${20 + (i % 3) * 8}px`,
                height: "24px",
                background: ["#8B4513", "#654321", "#A0522D", "#6B4423", "#8B6914"][i % 5],
                borderRadius: "2px",
                boxShadow: "inset -2px 0 4px rgba(0,0,0,0.3)",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
      {/* Right bookshelf */}
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-amber-950 to-transparent">
        <div className="h-full flex flex-col justify-around py-8">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={`right-book-${i}`}
              className="mx-auto book-spine"
              style={{
                width: `${18 + (i % 4) * 6}px`,
                height: "24px",
                background: ["#654321", "#8B4513", "#6B4423", "#A0522D", "#5D4037"][i % 5],
                borderRadius: "2px",
                boxShadow: "inset 2px 0 4px rgba(0,0,0,0.3)",
                animationDelay: `${i * 0.15 + 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
      {/* Floating books and coffee */}
      <div className="absolute inset-0">
        {["📚", "📖", "☕", "📕", "📗", "📘", "✨", "🤓", "📝", "💭"].map((emoji, i) => (
          <div
            key={`float-${i}`}
            className="absolute text-2xl md:text-3xl opacity-15 floating-element"
            style={{
              left: `${12 + (i * 8) % 76}%`,
              top: `${8 + (i * 11) % 84}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + (i % 4)}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>
      {/* Falling pages */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`page-${i}`}
            className="absolute falling-page"
            style={{
              left: `${15 + i * 10}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + (i % 3) * 2}s`,
            }}
          >
            📄
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ onOpenMessage, name }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 p-4">
      <style>{studyStyles}</style>
      <BookshelfDecoration />
      <div className="relative z-10 max-w-md w-full study-fade-in">
        <div className="bg-stone-900/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-amber-700/40 shadow-[0_0_80px_rgba(180,83,9,0.15)]">
          {/* Book icon */}
          <div className="text-center mb-6">
            <div className="text-7xl mb-4 study-pulse">📚</div>
          </div>

          {/* Notification text */}
          <div className="text-center mb-8">
            <p className="text-amber-600 text-sm uppercase tracking-[0.2em] mb-2">
              You have received
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-100 mb-3">
              A Study Invitation{name ? `, ${name}` : ""}!
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-4" />
            <p className="text-stone-400 text-lg">
              Ala wants to spend some quiet time with you... 📖
            </p>
          </div>

          {/* Open button */}
          <div className="text-center">
            <button
              onClick={onOpenMessage}
              className="px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-100 rounded-full font-bold text-xl hover:from-amber-600 hover:to-amber-700 hover:scale-105 hover:shadow-[0_0_40px_rgba(180,83,9,0.5)] transition-all cursor-pointer"
            >
              Open Invitation 📖
            </button>
          </div>

          {/* Subtle footer */}
          <p className="text-center text-stone-600 text-sm mt-6 italic">
            A cozy session awaits...
          </p>
        </div>
      </div>
    </div>
  );
}

function StudyPageContent() {
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
        await fetch("/api/study/responses", {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 p-4">
        <style>{studyStyles}</style>
        <BookshelfDecoration />
        <div className="relative z-10 max-w-lg w-full text-center study-fade-in">
          <div className="bg-stone-900/95 backdrop-blur-sm rounded-2xl p-10 border border-amber-700/40 shadow-[0_0_60px_rgba(180,83,9,0.2)]">
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>
            <div className="text-8xl mb-6 study-pulse">🥰</div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
              Yaaay!
            </h1>
            <p className="text-stone-300 text-xl md:text-2xl leading-relaxed mb-4">
              I knew you&apos;d say yes{name ? `, ${name}` : ""}!
            </p>
            <p className="text-amber-400 text-xl md:text-2xl font-bold">
              See you at the library tomorrow! ☕📚
            </p>
            <div className="mt-6 w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto" />
            <p className="text-stone-500 text-lg mt-4 italic">
              I&apos;ll bring the coffee...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (answered === "no") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 p-4">
        <style>{studyStyles}</style>
        <BookshelfDecoration />
        <div className="relative z-10 max-w-lg w-full text-center study-fade-in">
          <div className="bg-stone-900/95 backdrop-blur-sm rounded-2xl p-10 border border-amber-700/40 shadow-[0_0_60px_rgba(180,83,9,0.15)]">
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>
            <div className="text-8xl mb-6">🤨</div>
            <h1 className="text-4xl font-bold text-amber-100 mb-4">
              Wrong Answer!
            </h1>
            <p className="text-stone-300 text-xl leading-relaxed mb-4">
              That button wasn&apos;t even supposed to work
              {name ? `, ${name}` : ""}... nice try though 😏
            </p>
            <button
              onClick={() => {
                setAnswered(null);
                escapeCountRef.current = 0;
              }}
              className="mt-6 px-10 py-4 bg-amber-700 text-amber-100 rounded-full font-bold text-xl hover:bg-amber-600 transition-all cursor-pointer"
            >
              Try Again 📚
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950"
    >
      <style>{studyStyles}</style>
      <BookshelfDecoration />

      {/* Main content */}
      <div className="z-10 flex items-center justify-center min-h-screen p-4 py-12">
        <div className="max-w-xl w-full study-fade-in">
          <div className="bg-stone-900/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-amber-700/40 shadow-[0_0_80px_rgba(180,83,9,0.1)]">
            {/* Music Button */}
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📖</div>
              <h1 className="text-3xl md:text-4xl font-bold text-amber-100 mb-2">
                Hey {displayName}!
              </h1>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto" />
            </div>

            {/* Study invitation */}
            <div className="space-y-5 text-stone-300 text-lg md:text-xl leading-relaxed text-center">
              <p>
                So... I was thinking...
              </p>
              <p className="text-xl md:text-2xl text-amber-100 font-bold">
                Would you like to have a
              </p>
              <div className="py-4">
                <div className="inline-block bg-gradient-to-r from-amber-800 to-amber-900 text-amber-100 px-6 py-4 rounded-lg transform -rotate-1 shadow-lg">
                  <span className="text-2xl md:text-3xl font-bold">
                    Study Session Together
                  </span>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-amber-100 font-bold">
                tomorrow? ☕
              </p>
              <div className="pt-2 pb-4">
                <p className="text-stone-400 text-base md:text-lg italic">
                  You study, I work... but we keep each other company 📚✨
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-stone-700" />
              <span className="text-amber-500 text-2xl">📚</span>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-stone-700" />
            </div>

            {/* Buttons */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => submitAnswer("yes")}
                  className="px-10 py-4 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-100 rounded-full font-bold text-2xl hover:from-amber-600 hover:to-amber-700 hover:scale-110 hover:shadow-[0_0_30px_rgba(180,83,9,0.5)] transition-all cursor-pointer z-10"
                >
                  Yes! 🥰
                </button>
                <button
                  ref={noBtnRef}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={() => submitAnswer("no")}
                  className="px-10 py-4 bg-stone-800 text-stone-400 rounded-full font-bold text-2xl border-2 border-stone-700 hover:border-stone-600 transition-all cursor-pointer z-50 shrink-0 whitespace-nowrap"
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

export default function StudyPage() {
  return (
    <MusicProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-amber-950">
            <div className="text-amber-400">Loading...</div>
          </div>
        }
      >
        <StudyPageContent />
      </Suspense>
    </MusicProvider>
  );
}

const studyStyles = `
  @keyframes study-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes study-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes floating-element {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
  }

  @keyframes falling-page {
    0% {
      top: -10%;
      opacity: 0.3;
      transform: rotate(0deg) translateX(0);
    }
    50% {
      opacity: 0.2;
      transform: rotate(180deg) translateX(30px);
    }
    100% {
      top: 110%;
      opacity: 0;
      transform: rotate(360deg) translateX(-30px);
    }
  }

  @keyframes book-glow {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; box-shadow: 0 0 8px rgba(180,83,9,0.3); }
  }

  .study-fade-in {
    animation: study-fade-in 1s ease-out;
  }

  .study-pulse {
    animation: study-pulse 2s ease-in-out infinite;
  }

  .floating-element {
    animation: floating-element 5s ease-in-out infinite;
  }

  .falling-page {
    position: absolute;
    font-size: 1.5rem;
    opacity: 0.2;
    animation: falling-page 10s linear infinite;
  }

  .book-spine {
    animation: book-glow 3s ease-in-out infinite;
  }
`;
