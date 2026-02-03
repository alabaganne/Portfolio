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
          ? "bg-pink-50 border-pink-400 shadow-pink-200"
          : "bg-white border-pink-500 shadow-pink-300 animate-pulse"
      }`}
    >
      <span className="text-2xl">{isPlaying ? "🎵" : "🔇"}</span>
      <span className="text-pink-600 font-semibold">
        {isPlaying ? "Playing..." : "Play song"}
      </span>
    </button>
  );
}

function NotificationCard({ onOpenMessage, name }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-sm w-full text-center border-2 border-pink-200 animate-fade-in">
        {/* Heart icon */}
        <div className="text-7xl mb-4 animate-bounce">💕</div>

        {/* Notification text */}
        <p className="text-pink-400 text-base uppercase tracking-widest mb-2">
          New message
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-3">
          Ala sent you a message{name ? `, ${name}` : ""}!
        </h1>
        <p className="text-pink-400 text-lg mb-6">
          He seems nervous about something... 👀
        </p>

        {/* Open button */}
        <button
          onClick={onOpenMessage}
          className="px-8 py-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-semibold text-xl hover:from-pink-500 hover:to-pink-600 hover:scale-105 hover:shadow-lg hover:shadow-pink-300 transition-all cursor-pointer"
        >
          Open Message 💌
        </button>

        {/* Subtle footer */}
        <p className="text-pink-300 text-sm mt-6 italic">
          Go ahead, don&apos;t be shy~
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

function HeyPageContent() {
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
  const [answered, setAnswered] = useState(null); // null | "yes" | "no"
  const [submitted, setSubmitted] = useState(false);
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
        await fetch("/api/hey/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name || "Anonymous", answer }),
        });
        setSubmitted(true);
      } catch {
        // silently fail — don't ruin the moment
      }
    },
    [name, submitted]
  );

  const moveNoButton = useCallback(() => {
    const btn = noBtnRef.current;
    const container = containerRef.current;
    if (!btn || !container) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;

    const randomX = Math.floor(Math.random() * maxX) + 10;
    const randomY = Math.floor(Math.random() * maxY) + 10;

    btn.style.position = "absolute";
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border-2 border-pink-200">
          <div className="flex justify-center mb-6">
            <MusicButton />
          </div>
          <div className="text-8xl mb-6 animate-bounce">🥰</div>
          <h1 className="text-5xl font-bold text-pink-600 mb-4">Yaaay!</h1>
          <p className="text-pink-500 text-2xl">
            I knew you&apos;d say yes{name ? `, ${name}` : ""}! You just made me
            the happiest person ever 🎉
          </p>
          <p className="text-pink-400 mt-4 text-lg">
            Can&apos;t wait to see you! 💐
          </p>
        </div>
      </div>
    );
  }

  if (answered === "no") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border-2 border-pink-200">
          <div className="flex justify-center mb-6">
            <MusicButton />
          </div>
          <div className="text-8xl mb-6">🤨</div>
          <h1 className="text-5xl font-bold text-pink-600 mb-4">
            Wrong answer!
          </h1>
          <p className="text-pink-500 text-2xl">
            That wasn&apos;t even a real option
            {name ? `, ${name}` : ""}... nice try though 😏
          </p>
          <button
            onClick={() => setAnswered(null)}
            className="mt-6 px-10 py-4 bg-pink-500 text-white rounded-full font-semibold text-xl hover:bg-pink-600 transition-colors cursor-pointer"
          >
            Try again 🙄
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200 relative overflow-hidden p-4"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border-2 border-pink-200 z-10">
        <div className="flex justify-center mb-6">
          <MusicButton />
        </div>
        <div className="text-8xl mb-6">👉👈</div>
        <h1 className="text-5xl font-bold text-pink-600 mb-4">
          Hey {displayName}!
        </h1>
        <p className="text-pink-500 text-2xl mb-8">
          Sooo... I&apos;ve been meaning to ask you something...
          <br />
          <span className="font-semibold text-pink-600">
            Will you go out with me? 🙈
          </span>
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => submitAnswer("yes")}
            className="px-10 py-4 bg-pink-500 text-white rounded-full font-semibold text-2xl hover:bg-pink-600 hover:scale-110 transition-all cursor-pointer shadow-lg shadow-pink-300"
          >
            Yes! 😊
          </button>
          <button
            ref={noBtnRef}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={() => submitAnswer("no")}
            className="px-10 py-4 bg-white text-pink-400 rounded-full font-semibold text-2xl border-2 border-pink-300 hover:border-pink-400 transition-all cursor-pointer"
          >
            No 😐
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HeyPage() {
  return (
    <MusicProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200">
            <div className="text-pink-500">Loading...</div>
          </div>
        }
      >
        <HeyPageContent />
      </Suspense>
    </MusicProvider>
  );
}
