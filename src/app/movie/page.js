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
          ? "bg-amber-900/30 border-amber-500 shadow-amber-500/20"
          : "bg-black/50 border-amber-400 shadow-amber-400/30 animate-pulse"
      }`}
    >
      <span className="text-2xl">{isPlaying ? "🎵" : "🔇"}</span>
      <span className="text-amber-400 font-semibold tracking-wider">
        {isPlaying ? "Playing..." : "Play song"}
      </span>
    </button>
  );
}

function FilmStrip() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Left film strip */}
      <div className="absolute left-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-r from-zinc-900 to-transparent">
        <div className="h-full flex flex-col justify-around py-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`left-${i}`}
              className="w-8 h-6 md:w-10 md:h-8 bg-zinc-800 rounded-sm mx-auto film-hole"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
      {/* Right film strip */}
      <div className="absolute right-0 top-0 bottom-0 w-12 md:w-16 bg-gradient-to-l from-zinc-900 to-transparent">
        <div className="h-full flex flex-col justify-around py-4">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={`right-${i}`}
              className="w-8 h-6 md:w-10 md:h-8 bg-zinc-800 rounded-sm mx-auto film-hole"
              style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
            />
          ))}
        </div>
      </div>
      {/* Floating popcorn */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`popcorn-${i}`}
            className="absolute text-2xl md:text-3xl opacity-10 floating-popcorn"
            style={{
              left: `${10 + (i * 6) % 80}%`,
              top: `${5 + (i * 7) % 90}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          >
            🍿
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ onOpenMessage, name }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black p-4">
      <style>{movieStyles}</style>
      <FilmStrip />
      <div className="relative z-10 max-w-md w-full movie-fade-in">
        <div className="bg-zinc-900/95 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-amber-500/30 shadow-[0_0_80px_rgba(245,158,11,0.15)]">
          {/* Ticket icon */}
          <div className="text-center mb-6">
            <div className="text-7xl mb-4 movie-pulse">🎟️</div>
          </div>

          {/* Notification text */}
          <div className="text-center mb-8">
            <p className="text-amber-600 text-sm uppercase tracking-[0.3em] mb-2">
              You have received
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-wide">
              A Movie Invitation{name ? `, ${name}` : ""}!
            </h1>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
            <p className="text-zinc-400 text-lg tracking-wide">
              Ala wants to watch a movie with you... 🎬
            </p>
          </div>

          {/* Open button */}
          <div className="text-center">
            <button
              onClick={onOpenMessage}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-full font-bold text-xl tracking-wider hover:from-amber-400 hover:to-amber-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all cursor-pointer"
            >
              Open Ticket 🎬
            </button>
          </div>

          {/* Subtle footer */}
          <p className="text-center text-zinc-600 text-sm mt-6 italic tracking-wide">
            The show is about to begin...
          </p>
        </div>
      </div>
    </div>
  );
}

function MoviePageContent() {
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
        await fetch("/api/movie/responses", {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black p-4">
        <style>{movieStyles}</style>
        <FilmStrip />
        <div className="relative z-10 max-w-lg w-full text-center movie-fade-in">
          <div className="bg-zinc-900/95 backdrop-blur-sm rounded-2xl p-10 border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.2)]">
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>
            <div className="text-8xl mb-6 movie-pulse">🎉</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wider">
              YAAAY!
            </h1>
            <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed mb-4 tracking-wide">
              I knew you&apos;d say yes{name ? `, ${name}` : ""}!
            </p>
            <p className="text-amber-400 text-2xl md:text-3xl font-bold tracking-wider">
              See you at the movies! 🍿
            </p>
            <div className="mt-6 w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
            <p className="text-zinc-500 text-lg mt-4 tracking-wide">
              Get ready for Sahbek Rajel 2! 🎬
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (answered === "no") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black p-4">
        <style>{movieStyles}</style>
        <FilmStrip />
        <div className="relative z-10 max-w-lg w-full text-center movie-fade-in">
          <div className="bg-zinc-900/95 backdrop-blur-sm rounded-2xl p-10 border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.15)]">
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>
            <div className="text-8xl mb-6">🤨</div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-wider">
              WRONG ANSWER!
            </h1>
            <p className="text-zinc-300 text-xl leading-relaxed mb-4 tracking-wide">
              That button wasn&apos;t even supposed to work
              {name ? `, ${name}` : ""}... nice try though 😏
            </p>
            <button
              onClick={() => {
                setAnswered(null);
                escapeCountRef.current = 0;
              }}
              className="mt-6 px-10 py-4 bg-amber-500 text-black rounded-full font-bold text-xl tracking-wider hover:bg-amber-400 transition-all cursor-pointer"
            >
              Try Again 🎬
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-zinc-900 to-black"
    >
      <style>{movieStyles}</style>
      <FilmStrip />

      {/* Main content */}
      <div className="z-10 flex items-center justify-center min-h-screen p-4 py-12">
        <div className="max-w-xl w-full movie-fade-in">
          <div className="bg-zinc-900/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-amber-500/30 shadow-[0_0_80px_rgba(245,158,11,0.1)]">
            {/* Music Button */}
            <div className="flex justify-center mb-6">
              <MusicButton />
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎬</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider">
                Hey {displayName}!
              </h1>
              <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
            </div>

            {/* Movie invitation */}
            <div className="space-y-5 text-zinc-300 text-lg md:text-xl leading-relaxed text-center tracking-wide">
              <p>
                So... I was wondering...
              </p>
              <p className="text-2xl md:text-3xl text-white font-bold">
                Would you like to go watch
              </p>
              <div className="py-4">
                <div className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3 rounded-lg transform -rotate-1">
                  <span className="text-3xl md:text-4xl font-bold tracking-wider">
                    SAHBEK RAJEL 2
                  </span>
                </div>
              </div>
              <p className="text-2xl md:text-3xl text-white font-bold">
                with me this weekend? 🍿
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-zinc-700" />
              <span className="text-amber-500 text-2xl">🎟️</span>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-zinc-700" />
            </div>

            {/* Buttons */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => submitAnswer("yes")}
                  className="px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-full font-bold text-2xl tracking-wider hover:from-amber-400 hover:to-amber-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all cursor-pointer z-10"
                >
                  Yes! 🎉
                </button>
                <button
                  ref={noBtnRef}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={() => submitAnswer("no")}
                  className="px-10 py-4 bg-zinc-800 text-zinc-400 rounded-full font-bold text-2xl tracking-wider border-2 border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer z-50 shrink-0 whitespace-nowrap"
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

export default function MoviePage() {
  return (
    <MusicProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-amber-500 tracking-wider">Loading...</div>
          </div>
        }
      >
        <MoviePageContent />
      </Suspense>
    </MusicProvider>
  );
}

const movieStyles = `
  @keyframes movie-fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes movie-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes film-hole-glow {
    0%, 100% { box-shadow: inset 0 0 10px rgba(0,0,0,0.8); }
    50% { box-shadow: inset 0 0 10px rgba(0,0,0,0.8), 0 0 5px rgba(245,158,11,0.2); }
  }

  @keyframes floating-popcorn {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
  }

  .movie-fade-in {
    animation: movie-fade-in 1s ease-out;
  }

  .movie-pulse {
    animation: movie-pulse 2s ease-in-out infinite;
  }

  .film-hole {
    animation: film-hole-glow 3s ease-in-out infinite;
  }

  .floating-popcorn {
    animation: floating-popcorn 4s ease-in-out infinite;
  }
`;
